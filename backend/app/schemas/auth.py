from pydantic import BaseModel, EmailStr


class EmailRequest(BaseModel):
    email: EmailStr


class OTPVerifyRequest(BaseModel):
    email: EmailStr
    code: str


class ProfileUpdateRequest(BaseModel):
    email: EmailStr
    full_name: str



