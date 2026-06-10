from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Конфигурация приложения. Все значения приходят из переменных окружения / .env."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # Postgres
    postgres_host: str = "db"
    postgres_port: int = 5432
    postgres_user: str = "reputo"
    postgres_password: str = "reputo"
    postgres_db: str = "reputo"

    # Telegram
    telegram_bot_token: str = ""
    telegram_chat_id: str = ""

    # Прокси для Telegram API: ссылка + логин + пароль отдельными переменными
    proxy_url: str = ""  # например, http://1.2.3.4:8080 или socks5://1.2.3.4:1080
    proxy_login: str = ""
    proxy_password: str = ""

    # CORS (для локальной разработки фронта; в проде запросы идут через nginx с того же origin)
    cors_origins: str = "http://localhost:5173"

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+asyncpg://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

    @property
    def proxy_with_auth(self) -> str | None:
        """Собирает URL прокси с авторизацией: scheme://login:password@host:port."""
        if not self.proxy_url:
            return None
        if not self.proxy_login:
            return self.proxy_url
        scheme, _, rest = self.proxy_url.partition("://")
        return f"{scheme}://{self.proxy_login}:{self.proxy_password}@{rest}"


@lru_cache
def get_settings() -> Settings:
    return Settings()
