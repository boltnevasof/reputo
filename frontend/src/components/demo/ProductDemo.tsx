import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { DEMO_AUTOPLAY_MS, monoLabel } from './data';
import { PanelOverview } from './PanelOverview';
import { PanelBranches } from './PanelBranches';
import { PanelReviews } from './PanelReviews';
import { PanelReports } from './PanelReports';

const TABS = ['Обзор', 'Филиалы', 'Отзывы', 'Отчёты'];
const PANELS = [PanelOverview, PanelBranches, PanelReviews, PanelReports];

interface Kpi {
  label: string;
  value: string;
  unit: string;
  sub: string;
  tone: 'up' | 'shield';
}

const KPIS: Kpi[] = [
  { label: 'Средний рейтинг сети', value: '4.78', unit: '★', sub: '+0.31 за квартал · цель 4.7+', tone: 'up' },
  { label: 'Обращения с карт · мес', value: '1 247', unit: '', sub: '+34% к маю · звонки + маршруты', tone: 'up' },
  { label: 'Перехвачено негатива', value: '23', unit: '', sub: '≈ ₽840 тыс. защищённой выручки', tone: 'shield' },
  { label: 'Ответы быстрее 30 мин', value: '96', unit: '%', sub: 'SLA 90% · +4 п.п. за месяц', tone: 'up' },
];

/** Wide product UI demo shown under the hero. 4 tabs, auto-rotating; user click stops the rotation. */
export function ProductDemo() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TABS.length), DEMO_AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay]);

  const pickTab = (i: number) => {
    setActive(i);
    setAutoplay(false);
  };

  return (
    <div className="demo-window reveal" style={{ background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 'var(--r-2xl)', boxShadow: '0 40px 90px -30px rgba(14,20,36,.32), 0 8px 24px rgba(14,20,36,.08)',
      overflow: 'hidden' }}>

      {/* window top bar with clickable tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px',
        borderBottom: '1px solid var(--line)', background: 'var(--surface-tint)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <img src="/logo-mark.svg" alt="" style={{ width: 24, height: 24 }} />
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-.01em' }}>Reputo</span>
        </div>
        <div style={{ display: 'flex', gap: 4, marginLeft: 8 }} className="demo-tabs">
          {TABS.map((t, i) => {
            const on = i === active;
            return (
              <button key={t} onClick={() => pickTab(i)} type="button"
                style={{ position: 'relative', overflow: 'hidden',
                  fontSize: 13.5, fontWeight: 500, padding: '7px 14px', borderRadius: 'var(--r-sm)',
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  color: on ? 'var(--brand-700)' : 'var(--ink-500)',
                  background: on ? 'var(--brand-50)' : 'transparent',
                  transition: 'background .25s var(--ease-out), color .25s var(--ease-out)' }}>
                {t}
                {on && autoplay && (
                  <span key={'p' + active} aria-hidden style={{ position: 'absolute', left: 0, bottom: 0, height: 2,
                    width: '100%', background: 'var(--brand-500)', transformOrigin: 'left center',
                    animation: `dpProg ${DEMO_AUTOPLAY_MS}ms linear forwards` }}></span>
                )}
              </button>
            );
          })}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-400)',
            letterSpacing: '.04em' }} className="demo-hide">
            обновлено 2 мин назад · <span style={{ color: 'var(--brand-600)' }}>● live</span>
          </span>
          <span style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--brand-600)', color: '#fff',
            display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 12 }}>МК</span>
        </div>
      </div>

      {/* KPI STRIP — always visible */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid var(--line)' }} className="kpi-strip">
        {KPIS.map((k, i) => (
          <div key={i} style={{ padding: '14px 20px', borderLeft: i ? '1px solid var(--line)' : 'none' }}>
            <div style={{ ...monoLabel, fontSize: 10, marginBottom: 6 }}>{k.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontWeight: 300, fontSize: 28, letterSpacing: '-.03em', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums', color: 'var(--ink-900)' }}>{k.value}</span>
              {k.unit === '★' && <Icon name="star" size={16} fill style={{ color: 'var(--gold-500)' }} />}
              {k.unit && k.unit !== '★' && <span style={{ fontSize: 15, color: 'var(--ink-400)', fontWeight: 400 }}>{k.unit}</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5,
              fontFamily: 'var(--font-mono)', fontSize: 10.5, color: k.tone === 'shield' ? 'var(--ink-500)' : 'var(--brand-600)',
              lineHeight: 1.3 }}>
              {k.tone === 'up' && <Icon name="trending-up" size={11} stroke={2} />}
              {k.tone === 'shield' && <Icon name="shield-check" size={11} stroke={2} style={{ color: 'var(--brand-600)' }} />}
              <span>{k.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PANEL — all panels rendered & grid-stacked; only active is visible.
          Height is always the tallest panel → no layout shift on tab switch. */}
      <div style={{ display: 'grid' }}>
        {PANELS.map((P, i) => (
          <div key={i} style={{
            gridRow: 1, gridColumn: 1,
            display: 'grid',
            opacity: i === active ? 1 : 0,
            pointerEvents: i === active ? 'auto' : 'none',
            transition: 'opacity .35s var(--ease-out)',
          }}>
            <P />
          </div>
        ))}
      </div>
    </div>
  );
}
