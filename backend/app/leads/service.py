from sqlalchemy.ext.asyncio import AsyncSession

from app.leads.models import Lead
from app.leads.schemas import LeadCreate


async def create_lead(session: AsyncSession, data: LeadCreate) -> Lead:
    lead = Lead(
        clinic_name=data.clinic_name.strip(),
        clinic_link=(data.clinic_link or "").strip() or None,
        city=(data.city or "").strip() or None,
        clinics_count=(data.clinics_count or "").strip() or None,
        contact=data.contact.strip(),
    )
    session.add(lead)
    await session.commit()
    await session.refresh(lead)
    return lead
