import secrets
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage

import aiosmtplib
from redis import asyncio as aioredis
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.otp import EmailOTP


OTP_TTL_MINUTES = 10


async def get_redis():
    return aioredis.from_url(settings.redis_url, decode_responses=True)


def generate_otp_code() -> str:
    return f"{secrets.randbelow(1000000):06d}"


async def send_email(to_email: str, subject: str, body: str) -> None:
    if not (settings.smtp_host and settings.smtp_port and settings.smtp_from_email):
        raise RuntimeError("SMTP not configured. Set SMTP env vars.")

    msg = EmailMessage()
    msg["From"] = settings.smtp_from_email
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content(body)

    await aiosmtplib.send(
        msg,
        hostname=settings.smtp_host,
        port=settings.smtp_port,
        username=settings.smtp_username,
        password=settings.smtp_password,
        start_tls=True,
    )


#     # Set 30s rate limit window for resend
#     await redis.set(rate_key, "1", ex=30)
async def create_and_send_otp_for_enc(session: AsyncSession, enc_email: str) -> None:
    """
    Create OTP and send it to the decrypted address.
    Stores encrypted email in DB and uses it for Redis rate limiting.
    """
    # Rate limit by encrypted email
    redis = await get_redis()
    rate_key = f"otp_rate:{enc_email}"
    already = await redis.get(rate_key)
    if already:
        raise ValueError("OTP recently sent. Please wait 30 seconds before requesting another.")

    code = generate_otp_code()
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=OTP_TTL_MINUTES)

    # Invalidate any existing non-consumed OTPs for this encrypted email
    await session.execute(
        update(EmailOTP)
        .where(EmailOTP.email == enc_email)
        .where(EmailOTP.consumed == False)  # noqa: E712
        .values(consumed=True)
    )

    otp = EmailOTP(email=enc_email, code=code, expires_at=expires_at, consumed=False)
    session.add(otp)
    await session.commit()

    # Decrypt only here to actually send the email
    from app.services.PIIEncryption import decode as aes_decode
    to_email = aes_decode(enc_email, settings.AES_ENCRYPTION_KEY)
    await send_email(
        to_email=to_email,
        subject="Your NPCI Learning Platform OTP",
        body=f"""Hello,

Your verification code for NPCI Learning Platform is: {code}

This code will expire in {OTP_TTL_MINUTES} minutes.

If you didn't request this code, please ignore this email.

Best regards,
NPCI Learning Platform Team""",
    )

    # Set 30s rate limit window for resend
    await redis.set(rate_key, "1", ex=30)




async def verify_otp_for_enc(session: AsyncSession, enc_email: str, code: str) -> bool:
    """
    Verify OTP using encrypted email. No plaintext leaves this module.
    """
    stmt = (
        select(EmailOTP)
        .where(EmailOTP.email == enc_email)
        .where(EmailOTP.code == code)
        .where(EmailOTP.consumed == False)  # noqa: E712
        .order_by(EmailOTP.id.desc())
        .limit(1)
    )
    res = await session.execute(stmt)
    otp = res.scalar_one_or_none()
    if otp is None:
        return False
    if otp.expires_at < datetime.now(timezone.utc):
        return False

    await session.execute(
        update(EmailOTP).where(EmailOTP.id == otp.id).values(consumed=True)
    )
    await session.commit()
    return True