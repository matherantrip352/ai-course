from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "AI Mini Course"

    # Postgres
    postgres_host: str = "localhost"
    postgres_port: int = 5432
    postgres_user: str = "postgres"
    postgres_password: str = "postgres"
    postgres_db: str = "gff"

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # SMTP
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_username: str | None = "matherantrip352@gmail.com"
    smtp_password: str | None = "osdqwvljlwwnmewf"
    smtp_from_email: str | None = "matherantrip352@gmail.com"

    # Certificate
    certificate_bg_path: str | None = None

    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ]

    # JWT
    jwt_secret: str = "change-me-please"
    jwt_exp_minutes: int = 60 * 24

    class Config:
        env_file = ".env"

    @property
    def database_url_async(self) -> str:
        return (
            f"postgresql+psycopg://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )


settings = Settings()


