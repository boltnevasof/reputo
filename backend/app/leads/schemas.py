from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class LeadCreate(BaseModel):
    clinic_name: str = Field(min_length=1, max_length=255)
    clinic_link: str | None = Field(default=None, max_length=512)
    city: str | None = Field(default=None, max_length=128)
    clinics_count: str | None = Field(default=None, max_length=32)
    contact: str = Field(min_length=1, max_length=255)


class LeadOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    clinic_name: str
    clinic_link: str | None
    city: str | None
    clinics_count: str | None
    contact: str
    created_at: datetime
