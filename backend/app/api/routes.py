
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt, JWTError

from app.db.session import get_session
from app.models.user import User
from app.models.quiz import Question, QuizAttempt, AttemptAnswer
from app.schemas.auth import EmailRequest, OTPVerifyRequest, ProfileUpdateRequest
from app.schemas.quiz import QuestionOut, QuizStartRequest, QuizSubmitRequest, QuizResult
from app.services.certificate import generate_certificate_image
from app.services.quiz import get_random_questions
from app.services.content import list_modules, get_module
from app.core.config import settings
from datetime import datetime, timedelta, timezone

# NEW: use your AES helpers
from app.services.PIIEncryption import encode as aes_encode, decode as aes_decode

router = APIRouter()
auth_scheme = HTTPBearer(auto_error=False)

def _norm(email: str) -> str:
    return email.strip().lower()

def _enc(email_plain: str) -> str:
    # deterministically encrypt normalized email for DB equality lookups
    return aes_encode(_norm(email_plain), settings.AES_ENCRYPTION_KEY)

def require_auth(token: HTTPAuthorizationCredentials | None) -> str:
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        payload = jwt.decode(token.credentials, settings.jwt_secret, algorithms=["HS256"])
        enc_email = payload.get("sub")  # token carries encrypted email, not plaintext
        if not enc_email:
            raise HTTPException(status_code=401, detail="Invalid token")
        return str(enc_email)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/auth/request-otp")
async def request_otp(data: EmailRequest, session: AsyncSession = Depends(get_session)):
    print (data )
    # Accept plaintext at boundary, immediately encrypt for all internal use
    enc_email = _enc(data.email)

    # Check if encrypted email exists
    res = await session.execute(select(User).where(User.email == enc_email))
    user = res.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=404, detail="Email not registered")

    # Send OTP without passing plaintext around the app
    # (the service will decrypt locally only to call SMTP)
    from app.services.email import create_and_send_otp_for_enc
    await create_and_send_otp_for_enc(session, enc_email)

    # Return only an OK (or a challenge_id if you add one later)
    return {"ok": True}


@router.post("/auth/verify-otp")
async def verify_otp_route(data: OTPVerifyRequest, session: AsyncSession = Depends(get_session)):
    # Encrypt and verify without passing plaintext to the service
    enc_email = _enc(data.email)
    from app.services.email import verify_otp_for_enc
    ok = await verify_otp_for_enc(session, enc_email, data.code)
    if not ok:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    now = datetime.now(timezone.utc)
    exp = now + timedelta(minutes=settings.jwt_exp_minutes)  # e.g., 1440 for 24h
    # Issue JWT with encrypted email as subject (no plaintext in token)
    token = jwt.encode({"sub": enc_email,"type":"access","iat":int(now.timestamp()),"exp": int(exp.timestamp())}, settings.jwt_secret, algorithm="HS256")
    print (token)
    return {"ok": True, "token": token, "expires_in": int((exp - now).total_seconds())}


@router.get("/profile")
async def get_profile(
    token: HTTPAuthorizationCredentials | None = Depends(auth_scheme),
    session: AsyncSession = Depends(get_session),
):
    enc_email = require_auth(token)
    res = await session.execute(select(User).where(User.email == enc_email))
    user = res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Do NOT return plaintext email. Optionally return a masked email:
    # plain = aes_decode(enc_email, settings.AES_ENCRYPTION_KEY)
    # masked = mask_email(plain)
    return {"full_name": user.full_name, "has_name": bool(user.full_name)}


@router.post("/profile/update-name")
async def update_name(
    data: ProfileUpdateRequest,
    token: HTTPAuthorizationCredentials | None = Depends(auth_scheme),
    session: AsyncSession = Depends(get_session),
):
    enc_email = require_auth(token)
    res = await session.execute(select(User).where(User.email == enc_email))
    user = res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.full_name = data.full_name
    await session.commit()
    return {"ok": True}


@router.post("/quiz/start", response_model=list[QuestionOut])
async def quiz_start(
    _: QuizStartRequest,
    token: HTTPAuthorizationCredentials | None = Depends(auth_scheme),
    session: AsyncSession = Depends(get_session),
):
    _ = require_auth(token)
    questions = await get_random_questions(session, 5)
    return [QuestionOut(id=q.id, text=q.text, options=[q.option_a, q.option_b, q.option_c, q.option_d]) for q in questions]


@router.post("/quiz/submit", response_model=QuizResult)
async def quiz_submit(
    data: QuizSubmitRequest,
    token: HTTPAuthorizationCredentials | None = Depends(auth_scheme),
    session: AsyncSession = Depends(get_session),
):
    enc_email = require_auth(token)

    qids = [a.question_id for a in data.answers]
    res = await session.execute(select(Question).where(Question.id.in_(qids)))
    qmap = {q.id: q for q in res.scalars().all()}

    total = len(data.answers)
    correct = 0

    # Store encrypted email reference (no plaintext)
    attempt = QuizAttempt(email=enc_email, total_questions=total, correct_answers=0, passed=False)
    session.add(attempt)
    await session.flush()

    for ans in data.answers:
        q = qmap.get(ans.question_id)
        if not q:
            continue

        sel = ans.selected_index
        sel_idx = {"A": 0, "B": 1, "C": 2, "D": 3}.get(str(sel).strip().upper(), int(sel) if isinstance(sel, int) else -1)

        correct_answer = q.correct
        correct_idx = {"A": 0, "B": 1, "C": 2, "D": 3}.get(str(correct_answer).strip().upper(), int(correct_answer) if isinstance(correct_answer, int) else -1)

        is_correct = sel_idx == correct_idx
        if is_correct:
            correct += 1

        session.add(AttemptAnswer(
            attempt_id=attempt.id,
            question_id=q.id,
            selected_index=sel_idx,
            is_correct=is_correct,
        ))

    passed = (correct / max(total, 1)) >= 0.8
    attempt.correct_answers = correct
    attempt.passed = passed

    await session.commit()

    return QuizResult(
        total_questions=total,
        correct_answers=correct,
        passed=passed,
        percentage=round(100.0 * correct / max(total, 1), 2),
    )


@router.get("/certificate", response_class=Response)
async def download_certificate(
    token: HTTPAuthorizationCredentials | None = Depends(auth_scheme),
    session: AsyncSession = Depends(get_session),
):
    enc_email = require_auth(token)

    res = await session.execute(select(User).where(User.email == enc_email))
    user = res.scalar_one_or_none()
    if not user or not user.full_name:
        raise HTTPException(status_code=400, detail="Name not set")

    img_bytes = generate_certificate_image(user.full_name)
    # Avoid plaintext email in filename; use user id or short hash
    filename = f"certificate-{user.id}.png"
    headers = {"Content-Disposition": f"attachment; filename={filename}"}
    return Response(content=img_bytes, media_type="image/png", headers=headers)


@router.get("/modules")
async def modules(token: HTTPAuthorizationCredentials | None = Depends(auth_scheme)):
    require_auth(token)
    return list_modules()


@router.get("/modules/{module_id}")
async def module_detail(module_id: int, token: HTTPAuthorizationCredentials | None = Depends(auth_scheme)):
    require_auth(token)
    mod = get_module(module_id)
    if not mod:
        raise HTTPException(status_code=404, detail="Module not found")
    return mod