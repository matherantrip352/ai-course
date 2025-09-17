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


async def create_and_send_otp(session: AsyncSession, email: str) -> None:
    # Rate limit by Redis key
    redis = await get_redis()
    rate_key = f"otp_rate:{email}"
    already = await redis.get(rate_key)
    if already:
        raise ValueError("OTP recently sent. Please wait a minute.")

    code = generate_otp_code()
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=OTP_TTL_MINUTES)

    otp = EmailOTP(email=email, code=code, expires_at=expires_at, consumed=False)
    session.add(otp)
    await session.commit()

    await send_email(
        to_email=email,
        subject="Your AI Mini Course OTP",
        body=f"Your OTP is {code}. It expires in {OTP_TTL_MINUTES} minutes.",
    )

    # Set 60s rate limit window
    await redis.set(rate_key, "1", ex=60)


async def verify_otp(session: AsyncSession, email: str, code: str) -> bool:
    stmt = (
        select(EmailOTP)
        .where(EmailOTP.email == email)
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



