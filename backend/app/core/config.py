

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path
from dotenv import find_dotenv, load_dotenv
load_dotenv(find_dotenv())  

class Settings(BaseSettings):
    # pydantic-settings v2 config
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str 

    # Postgres
    postgres_host: str
    postgres_port: int 
    postgres_user: str 
    postgres_password: str 
    postgres_db: str 
    # Redis
    redis_url: str 

    # Secrets
    AES_ENCRYPTION_KEY: str 

    # SMTP
    smtp_host: str 
    smtp_port: int 
    smtp_username: str | None 
    smtp_password: str | None 
    smtp_from_email: str | None 

    # Certificate
    certificate_bg_path: str | None 

    # CORS (expects a JSON array in .env; see example below)
    cors_origins: list[str] 

    # JWT
    jwt_secret: str 
    jwt_exp_minutes: int 

    @property
    def database_url_async(self) -> str:
        return (
            f"postgresql+psycopg://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )


settings = Settings()
