import logging

from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.leads import service
from app.leads.schemas import LeadCreate, LeadOut
from app.notifications.telegram import notify_new_lead

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/leads", tags=["leads"])


@router.post("", response_model=LeadOut, status_code=201)
async def submit_lead(
    payload: LeadCreate,
    background: BackgroundTasks,
    session: AsyncSession = Depends(get_session),
) -> LeadOut:
    """Принимает заявку с лендинга: сохраняет в базу и шлёт уведомление в Telegram.

    Уведомление уходит в фоне: его сбой не должен ломать приём заявки.
    """
    lead = await service.create_lead(session, payload)
    background.add_task(notify_new_lead, lead)
    return LeadOut.model_validate(lead)
