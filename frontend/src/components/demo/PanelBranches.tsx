import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { SRC_COLOR, type MapSource } from '@/lib/sources';
import { DEMO_BRANCHES, monoLabel } from './data';

/** Panel 1 · Филиалы — detailed per-branch table, picked branch on the right. */
export function PanelBranches() {
  const [picked, setPicked] = useState(0);
  const b = DEMO_BRANCHES[picked];

  const perSource: Array<[string, number, MapSource['id']]> = [
    ['Яндекс', b.ya, 'yandex'],
    ['2ГИС', b.g2, '2gis'],
    ['Google', b.gg, 'google'],
  ];

  const branchKpis: Array<[string, string | number, string]> = [
    ['NPS', '+' + b.nps, b.nps >= 70 ? 'var(--brand-600)' : 'var(--ink-900)'],
    ['Сотрудников', b.staff, 'var(--ink-900)'],
    ['Отзывов / мес', b.reviewsMo, 'var(--ink-900)'],
    ['Перехвачено', b.intercepted, 'var(--brand-600)'],
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 0 }} className="demo-body">
      {/* LEFT: full branch table */}
      <div style={{ padding: '18px 22px', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }} className="demo-left">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={monoLabel}>Филиалы · все точки</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>4 из 4 активны</span>
        </div>

        {/* header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr repeat(3, 50px) 70px 60px',
          gap: 10, padding: '8px 0', borderBottom: '1px solid var(--line)' }} className="demo-hide">
          <span style={{ ...monoLabel, fontSize: 9.5 }}>филиал</span>
          {['я', '2г', 'g'].map((s, i) => (
            <span key={i} style={{ ...monoLabel, fontSize: 9.5, textAlign: 'center' }}>{s}</span>
          ))}
          <span style={{ ...monoLabel, fontSize: 9.5, textAlign: 'right' }}>сред.</span>
          <span style={{ ...monoLabel, fontSize: 9.5, textAlign: 'right' }}>nps</span>
        </div>

        {/* rows */}
        <div>
          {DEMO_BRANCHES.map((row, i) => {
            const on = i === picked;
            return (
              <button key={i} onClick={() => setPicked(i)} type="button"
                style={{ width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                  display: 'grid', gridTemplateColumns: '1.7fr repeat(3, 50px) 70px 60px', gap: 10,
                  alignItems: 'center', padding: '11px 8px', margin: '0 -8px',
                  background: on ? 'var(--brand-50)' : 'transparent',
                  border: 'none', borderLeft: on ? '2px solid var(--brand-600)' : '2px solid transparent',
                  borderRadius: 'var(--r-sm)',
                  transition: 'background .2s, border-color .2s' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 500, fontSize: 13.5, color: 'var(--ink-900)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>{row.city}</div>
                </div>
                {[row.ya, row.g2, row.gg].map((v, j) => (
                  <span key={j} className="demo-hide" style={{ fontFamily: 'var(--font-mono)', fontSize: 12,
                    fontVariantNumeric: 'tabular-nums', textAlign: 'center', color: 'var(--ink-700)' }}>
                    {v.toFixed(2)}
                  </span>
                ))}
                <div style={{ textAlign: 'right' }} className="demo-hide">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontVariantNumeric: 'tabular-nums',
                    color: 'var(--ink-900)' }}>{row.rating.toFixed(2)}</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: row.rising ? 'var(--brand-600)' : 'var(--ink-400)' }}>{row.delta}</div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontVariantNumeric: 'tabular-nums',
                  textAlign: 'right', fontWeight: 600,
                  color: row.nps >= 70 ? 'var(--brand-600)' : row.nps >= 60 ? 'var(--ink-700)' : 'var(--ink-500)' }}>
                  +{row.nps}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between', gap: 12,
          fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          <span style={{ color: 'var(--ink-400)' }}>Средняя по сети <b style={{ color: 'var(--ink-900)', fontSize: 13 }}>4.78</b></span>
          <span style={{ color: 'var(--ink-400)' }}>Сотрудников <b style={{ color: 'var(--ink-900)', fontSize: 13 }}>42</b></span>
          <span style={{ color: 'var(--ink-400)' }}>Перехвачено <b style={{ color: 'var(--brand-600)', fontSize: 13 }}>23</b></span>
        </div>
      </div>

      {/* RIGHT: picked branch detail */}
      <div key={picked} style={{ padding: '18px 22px', background: 'var(--surface-tint)',
        display: 'flex', flexDirection: 'column',
        animation: 'dpFade .35s var(--ease-out)' }} className="demo-right">
        <span style={monoLabel}>Профиль филиала</span>
        <div style={{ fontWeight: 600, fontSize: 19, letterSpacing: '-.015em', marginTop: 8 }}>{b.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4,
          fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-500)' }}>
          <Icon name="map-pin" size={12} stroke={2} /> {b.city} · {b.addr}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
          <span style={{ fontWeight: 300, fontSize: 38, letterSpacing: '-.03em', lineHeight: 1,
            fontVariantNumeric: 'tabular-nums' }}>{b.rating.toFixed(2)}</span>
          <Icon name="star" size={20} fill style={{ color: 'var(--gold-500)' }} />
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--brand-600)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon name="trending-up" size={12} stroke={2} /> {b.delta} за месяц
          </span>
        </div>

        {/* per-source mini */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
          {perSource.map(([n, v, id], i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--line)',
              borderRadius: 'var(--r-sm)', padding: '8px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: 999, background: SRC_COLOR[id] }}></span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)' }}>{n}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontVariantNumeric: 'tabular-nums',
                color: 'var(--ink-900)' }}>{v.toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* KPIs of the branch */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
          {branchKpis.map(([lab, val, col], i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ ...monoLabel, fontSize: 9.5 }}>{lab}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontVariantNumeric: 'tabular-nums',
                fontWeight: 600, color: col }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', padding: '10px 12px', background: 'var(--surface)',
          border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="sparkles" size={14} stroke={2} style={{ color: 'var(--brand-600)', flex: 'none' }} />
          <span style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.4 }}>
            рекомендация: <b style={{ color: 'var(--ink-900)' }}>обновить фото врачей</b> — 2 точки без портретов
          </span>
        </div>
      </div>
    </div>
  );
}
