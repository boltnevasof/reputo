import html
import logging

import httpx

from app.config import get_settings
from app.leads.models import Lead

logger = logging.getLogger(__name__)


def _format_lead_message(lead: Lead) -> str:
    def esc(value: str | None) -> str:
        return html.escape(value) if value else "—"

    lines = [
        "🔔 <b>Новая заявка с лендинга Reputo</b>",
        "",
        f"<b>Клиника:</b> {esc(lead.clinic_name)}",
        f"<b>Ссылка:</b> {esc(lead.clinic_link)}",
        f"<b>Город:</b> {esc(lead.city)}",
        f"<b>Клиник в сети:</b> {esc(lead.clinics_count)}",
        f"<b>Контакт:</b> {esc(lead.contact)}",
        "",
        f"#lead_{lead.id} · {lead.created_at:%d.%m.%Y %H:%M} UTC",
    ]
    return "\n".join(lines)


async def notify_new_lead(lead: Lead) -> None:
    """Отправляет уведомление о заявке в Telegram через прокси (если задан)."""
    settings = get_settings()
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        logger.warning("Telegram is not configured (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID), skip notify")
        return

    url = f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage"
    payload = {
        "chat_id": settings.telegram_chat_id,
        "text": _format_lead_message(lead),
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }

    try:
        async with httpx.AsyncClient(proxy=settings.proxy_with_auth, timeout=15.0) as client:
            resp = await client.post(url, json=payload)
            resp.raise_for_status()
        logger.info("Telegram notification sent for lead #%s", lead.id)
    except httpx.HTTPError:
        logger.exception("Failed to send Telegram notification for lead #%s", lead.id)
