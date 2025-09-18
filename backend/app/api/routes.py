
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.models.user import User
from app.models.quiz import Question, QuizAttempt, AttemptAnswer
from app.schemas.auth import EmailRequest, OTPVerifyRequest, ProfileUpdateRequest
from app.schemas.quiz import QuestionOut, QuizStartRequest, QuizSubmitRequest, QuizResult
from app.services.email import create_and_send_otp, verify_otp
from app.services.certificate import generate_certificate_image
from app.core.config import settings
from jose import jwt, JWTError
from app.services.quiz import get_random_questions
from app.services.content import list_modules, get_module


router = APIRouter()
auth_scheme = HTTPBearer(auto_error=False)


def require_auth(token: HTTPAuthorizationCredentials | None) -> str:
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        payload = jwt.decode(token.credentials, settings.jwt_secret, algorithms=["HS256"])
        email = payload.get("email")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
        return str(email)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/auth/request-otp")
async def request_otp(data: EmailRequest, session: AsyncSession = Depends(get_session)):
    # Check if user exists in Postgres `users` table
    res = await session.execute(select(User).where(User.email == data.email))
    user = res.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=404, detail="Email not registered")

    await create_and_send_otp(session, data.email)
    return {"ok": True}


@router.post("/auth/verify-otp")
async def verify_otp_route(data: OTPVerifyRequest, session: AsyncSession = Depends(get_session)):
    ok = await verify_otp(session, data.email, data.code)
    if not ok:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    token = jwt.encode({"email": data.email}, settings.jwt_secret, algorithm="HS256")
    return {"ok": True, "token": token}


@router.get("/profile")
async def get_profile(token: HTTPAuthorizationCredentials | None = Depends(auth_scheme), session: AsyncSession = Depends(get_session)):
    email = require_auth(token)
    res = await session.execute(select(User).where(User.email == email))
    user = res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"email": user.email, "full_name": user.full_name, "has_name": bool(user.full_name)}


@router.post("/profile/update-name")
async def update_name(data: ProfileUpdateRequest, token: HTTPAuthorizationCredentials | None = Depends(auth_scheme), session: AsyncSession = Depends(get_session)):
    email = require_auth(token)
    if email != data.email:
        raise HTTPException(status_code=403, detail="Forbidden")
    res = await session.execute(select(User).where(User.email == data.email))
    user = res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.full_name = data.full_name
    await session.commit()
    return {"ok": True}


@router.post("/quiz/start", response_model=list[QuestionOut])
async def quiz_start(_: QuizStartRequest, token: HTTPAuthorizationCredentials | None = Depends(auth_scheme), session: AsyncSession = Depends(get_session)):
    email = require_auth(token)
    questions = await get_random_questions(session, 5) #no of question displayed for each user
    items: list[QuestionOut] = []
    for q in questions:
        options = [q.option_a, q.option_b, q.option_c, q.option_d]
        items.append(QuestionOut(id=q.id, text=q.text, options=options))
    return items


@router.post("/quiz/submit", response_model=QuizResult)
async def quiz_submit(data: QuizSubmitRequest, token: HTTPAuthorizationCredentials | None = Depends(auth_scheme), session: AsyncSession = Depends(get_session)):
    email = require_auth(token)
    print(f"Email from token: {email}")
    
    qids = [a.question_id for a in data.answers]
    print(f"Question IDs: {qids}")
    
    res = await session.execute(select(Question).where(Question.id.in_(qids)))
    print(f"Database query result: {res}")
    
    qmap = {q.id: q for q in res.scalars().all()}
    print(f"Question map: {qmap}")
    
    total = len(data.answers)
    print(f"Total questions: {total}")
    
    correct = 0
    print(f"Initial correct count: {correct}")
    
    attempt = QuizAttempt(email=email, total_questions=total, correct_answers=0, passed=False)
    print(f"Created QuizAttempt: {attempt.__dict__}")
    
    session.add(attempt)
    print(f"Added attempt to session")
    
    await session.flush()
    print(f"Flushed session, attempt ID: {attempt.id}")
    
    for ans in data.answers:
        print(f"Processing answer: {ans.__dict__}")
        
        q = qmap.get(ans.question_id)
        print(f"Question for ID {ans.question_id}: {q.__dict__ if q else None}")
        
        if not q:
            print(f"No question found for ID {ans.question_id}, skipping")
            continue
        
        sel = ans.selected_index
        print(f"Selected index: {sel} (type: {type(sel)})")
        
        if isinstance(sel, str):
            letter = sel.strip().upper()
            print(f"Selected index is string, converted to: {letter}")
            sel_idx = {"A": 0, "B": 1, "C": 2, "D": 3}.get(letter, -1)
            print(f"Converted string to index: {sel_idx}")
        else:
            sel_idx = int(sel)
            print(f"Selected index as integer: {sel_idx}")
        
        correct_answer = q.correct
        print(f"Correct answer from DB: {correct_answer} (type: {type(correct_answer)})")
        
        if isinstance(correct_answer, str):
            correct_letter = correct_answer.strip().upper()
            print(f"Correct answer is string, converted to: {correct_letter}")
            correct_idx = {"A": 0, "B": 1, "C": 2, "D": 3}.get(correct_letter, -1)
            print(f"Converted correct answer to index: {correct_idx}")
        else:
            correct_idx = int(correct_answer)
            print(f"Correct answer as integer: {correct_idx}")
        
        is_correct = sel_idx == correct_idx
        print(f"Comparing sel_idx ({sel_idx}) == correct_idx ({correct_idx}): {is_correct}")
        
        if is_correct:
            correct += 1
            print(f"Incremented correct count: {correct}")
        
        session.add(
            AttemptAnswer(
                attempt_id=attempt.id,
                question_id=q.id,
                selected_index=sel_idx,
                is_correct=is_correct,
            )
        )
        print(f"Added AttemptAnswer for question {q.id}, is_correct: {is_correct}")
    
    passed = (correct / max(total, 1)) >= 0.8
    print(f"Calculated passed: {passed} (correct: {correct}, total: {total})")
    
    attempt.correct_answers = correct
    print(f"Updated attempt.correct_answers: {correct}")
    
    attempt.passed = passed
    print(f"Updated attempt.passed: {passed}")
    
    await session.commit()
    print(f"Committed session")
    
    result = QuizResult(
        total_questions=total,
        correct_answers=correct,
        passed=passed,
        percentage=round(100.0 * correct / max(total, 1), 2),
    )
    print(f"Returning QuizResult: {result.__dict__}")
    
    return result
# @router.get("/certificate", response_class=Response)
# async def download_certificate(token: HTTPAuthorizationCredentials | None = Depends(auth_scheme), session: AsyncSession = Depends(get_session)):
#     email = require_auth(token)
#     res = await session.execute(select(User).where(User.email == email))
#     user = res.scalar_one_or_none()
#     if not user or not user.full_name:
#         raise HTTPException(status_code=400, detail="Name not set")
#     img_bytes = generate_certificate_image(user.full_name)
#     headers = {"Content-Disposition": f"attachment; filename=certificate-{email}.png"}
#     return Response(content=img_bytes, media_type="image/png", headers=headers)


@router.get("/certificate", response_class=Response)
async def download_certificate(token: str = None, token_header: HTTPAuthorizationCredentials | None = Depends(auth_scheme), session: AsyncSession = Depends(get_session)):
    # Try to get email from token parameter or header
    email = None
    if token:
        try:
            payload = jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])
            email = payload.get("email")
        except JWTError:
            pass
    
    if not email and token_header:
        email = require_auth(token_header)
    
    if not email:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    res = await session.execute(select(User).where(User.email == email))
    user = res.scalar_one_or_none()
    if not user or not user.full_name:
        raise HTTPException(status_code=400, detail="Name not set")
    img_bytes = generate_certificate_image(user.full_name)
    headers = {"Content-Disposition": f"attachment; filename=certificate-{email}.png"}
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