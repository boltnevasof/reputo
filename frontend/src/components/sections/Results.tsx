import type { CSSProperties } from 'react';
import { Icon } from '@/components/ui/Icon';

const METRICS = [
  { v: '4.7+', c: 'средний рейтинг сети на всех картах', gold: true },
  { v: '+34%', c: 'обращений с карт за первый квартал', gold: false },
  { v: '−71%', c: 'публичного негатива после запуска перехвата', gold: false },
  { v: '2 мин', c: 'на еженедельный отчёт владельцу', gold: false },
];

export function Results() {
  const wrap: CSSProperties = {
    position: 'relative', overflow: 'hidden', color: '#fff',
    backgroundColor: '#0B1030',
    backgroundImage: 'radial-gradient(120% 120% at 0% 0%, rgba(47,75,224,.55), transparent 55%), radial-gradient(120% 130% at 100% 100%, rgba(85,112,240,.42), transparent 58%), linear-gradient(155deg,#10163C,#080B22)',
  };
  return (
    <section className="section" id="results" style={wrap}>
      <GridFade />
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'center' }}
          className="results-grid">
          <div className="reveal">
            <h2 className="h2" style={{ color: '#fff' }}>
              Полбалла рейтинга решают, к кому пациент пойдёт с карты
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,.7)', marginTop: 16, maxWidth: 460 }}>
              Пациент сравнивает клиники прямо на карте и звонит туда, где рейтинг выше.
              Точка с 4.8 собирает звонки, точка с 4.3 остаётся без записей.
              Ваша сеть держится наверху этой шкалы.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
            background: 'rgba(255,255,255,.1)', borderRadius: 'var(--r-xl)', overflow: 'hidden',
            boxShadow: '0 1px 0 rgba(255,255,255,.08) inset' }} className="reveal metrics-grid">
            {METRICS.map((m, i) => (
              <div key={i} style={{ position: 'relative', padding: '34px 30px',
                background: 'rgba(8,11,34,.55)', backdropFilter: 'blur(2px)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span className="metric-number" style={{ fontWeight: 300, fontSize: 56, lineHeight: 1, letterSpacing: '-.035em',
                    fontVariantNumeric: 'tabular-nums', color: '#fff' }}>{m.v}</span>
                  {m.gold && <Icon name="star" size={22} fill style={{ color: 'var(--gold-500)' }} />}
                </div>
                <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,.6)', marginTop: 14, lineHeight: 1.45 }}>{m.c}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Faint hairline grid that fades out, over the gradient. */
function GridFade() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
      backgroundSize: '72px 72px',
      maskImage: 'radial-gradient(120% 90% at 80% 10%, #000, transparent 70%)',
      WebkitMaskImage: 'radial-gradient(120% 90% at 80% 10%, #000, transparent 70%)' }} />
  );
}
