/** API client for the Reputo backend. */

export interface LeadPayload {
  clinic_name: string;
  clinic_link?: string;
  city?: string;
  clinics_count?: string;
  contact: string;
}

const API_BASE = import.meta.env.VITE_API_URL ?? '';

export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Lead submit failed: ${res.status} ${detail}`);
  }
}
