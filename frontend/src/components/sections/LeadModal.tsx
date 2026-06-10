import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { submitLead } from '@/lib/api';

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
}

export function LeadModal({ open, onClose }: LeadModalProps) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [clinicName, setClinicName] = useState('');
  const [clinicLink, setClinicLink] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    if (open) {
      setSent(false);
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await submitLead({
        clinic_name: clinicName,
        clinic_link: clinicLink || undefined,
        contact,
      });
      setSent(true);
    } catch {
      setError('Не получилось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(14,20,36,.42)', backdropFilter: 'blur(3px)',
      display: 'grid', placeItems: 'center', padding: 20, animation: 'fadeIn .2s ease' }}>
      <div onClick={(e) => e.stopPropagation()} className="card" style={{ width: 460, maxWidth: '100%',
        padding: 32, boxShadow: 'var(--shadow-lg)', animation: 'fadeUp .3s var(--ease-out)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <img src="/logo-mark.svg" alt="" style={{ width: 40, height: 40 }} />
          <button onClick={onClose} aria-label="Закрыть" style={{ border: 0, background: 'var(--surface-sunken)',
            width: 34, height: 34, borderRadius: 999, cursor: 'pointer', display: 'grid', placeItems: 'center',
            color: 'var(--ink-500)' }}><Icon name="x" size={18} /></button>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
            <h3 className="h3" style={{ marginBottom: 8 }}>Показать рейтинг ваших клиник</h3>
            <p className="muted" style={{ fontSize: 15, marginBottom: 22 }}>
              Бесплатный разбор репутации сети на Яндекс Картах, 2ГИС и Google. Без обязательств.
            </p>
            <div style={{ display: 'grid', gap: 14 }}>
              <Field label="Название сети или клиники" placeholder="Например, Дентал-Сити"
                value={clinicName} onChange={setClinicName} required />
              <Field label="Ссылка на клинику" placeholder="Сайт или карточка на Яндекс Картах"
                value={clinicLink} onChange={setClinicLink} icon="map-pin" />
              <Field label="Контакт для связи" placeholder="Telegram или телефон"
                value={contact} onChange={setContact} icon="phone" required />
            </div>
            {error && (
              <p style={{ fontSize: 13.5, color: 'var(--red-600)', marginTop: 14, marginBottom: 0, lineHeight: 1.45 }}>{error}</p>
            )}
            <Button type="submit" size="block" iconRight="arrow-right" style={{ marginTop: 22 }} disabled={sending}>
              {sending ? 'Отправляем…' : 'Получить разбор'}
            </Button>
            <p style={{ fontSize: 12, color: 'var(--ink-400)', textAlign: 'center', marginTop: 14 }}>
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 8px 8px', animation: 'fadeUp .3s var(--ease-out)' }}>
            <div style={{ width: 60, height: 60, borderRadius: 999, background: 'var(--brand-100)',
              color: 'var(--brand-600)', display: 'grid', placeItems: 'center', margin: '0 auto 18px' }}>
              <Icon name="circle-check" size={32} /></div>
            <h3 className="h3" style={{ marginBottom: 8 }}>Заявка принята</h3>
            <p className="muted" style={{ fontSize: 15, maxWidth: 320, margin: '0 auto 22px' }}>
              Эксперт Reputo соберёт рейтинг вашей сети по всем картам и свяжется с вами в течение дня.
            </p>
            <Button variant="secondary" onClick={onClose}>Закрыть</Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon?: IconName;
  required?: boolean;
}

function Field({ label, placeholder, value, onChange, icon, required }: FieldProps) {
  const [focus, setFocus] = useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-700)' }}>{label}</span>
      <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && <span style={{ position: 'absolute', left: 13, color: 'var(--ink-400)', display: 'grid' }}>
          <Icon name={icon} size={18} /></span>}
        <input placeholder={placeholder} value={value} required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ width: '100%', fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink-900)',
            background: 'var(--surface)', border: '1px solid ' + (focus ? 'var(--brand-600)' : 'var(--line-strong)'),
            borderRadius: 'var(--r-md)', padding: icon ? '12px 14px 12px 40px' : '12px 14px', outline: 'none',
            boxShadow: focus ? 'var(--shadow-focus)' : 'none', transition: 'border-color .15s, box-shadow .15s' }} />
      </span>
    </label>
  );
}
