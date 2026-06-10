import { useState } from 'react';
import { Icon, Stars } from '@/components/ui/Icon';
import { SRC_COLOR, type MapSource } from '@/lib/sources';
import { DEMO_SOURCES, STATUS_META, monoLabel, type ReviewStatus } from './data';

interface ReviewItem {
  who: string;
  src: string;
  city: string;
  stars: number;
  status: ReviewStatus;
  time: string;
  origin: MapSource['id'];
  note: string;
}

const REVIEWS: ReviewItem[] = [
  { who: 'Анна П.',    src: 'Дентал-Сити',  city: 'Казань', stars: 2, status: 'intercept', time: '7 мин',  origin: 'yandex', note: 'Ждала приёма 40 минут, никто не предупредил о задержке.' },
  { who: 'Игорь В.',   src: 'Премьер Мед',  city: 'Уфа',    stars: 5, status: 'published', time: '32 мин', origin: '2gis',   note: 'Врач объяснил всё подробно, спасибо за внимание.' },
  { who: 'Мария К.',   src: 'Линия Улыбки', city: 'Пермь',  stars: 4, status: 'reply',     time: '1 ч',    origin: 'yandex', note: 'Качественно, но дороговато по сравнению с соседями.' },
  { who: 'Дмитрий О.', src: 'Премьер Мед',  city: 'Уфа',    stars: 5, status: 'published', time: '2 ч',    origin: 'google', note: 'Записался онлайн, приняли вовремя, всё прозрачно.' },
];

const DIST = [
  { s: 5, n: 312, pct: 78 },
  { s: 4, n: 64, pct: 16 },
  { s: 3, n: 15, pct: 4 },
  { s: 2, n: 6, pct: 1.5 },
  { s: 1, n: 3, pct: 0.5 },
];

const FILTERS = ['Все', 'Перехвачено', 'Нужен ответ', '1–3★', '4–5★'];

/** Panel 2 · Отзывы — full feed + ratings distribution + filters. */
export function PanelReviews() {
  const [filt, setFilt] = useState(0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 0 }} className="demo-body">
      {/* LEFT: filters + reviews */}
      <div style={{ padding: '14px 22px', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }} className="demo-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, flexWrap: 'wrap' }} className="demo-hide">
          {FILTERS.map((f, i) => {
            const on = i === filt;
            return (
              <button key={f} onClick={() => setFilt(i)} type="button"
                style={{ fontFamily: 'inherit', fontSize: 11.5, fontWeight: 500, padding: '4px 10px',
                  borderRadius: 999, cursor: 'pointer',
                  background: on ? 'var(--brand-600)' : 'transparent',
                  color: on ? '#fff' : 'var(--ink-500)',
                  border: on ? '1px solid var(--brand-600)' : '1px solid var(--line-strong)',
                  transition: 'background .2s, color .2s, border-color .2s' }}>
                {f}
              </button>
            );
          })}
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>
            показано {REVIEWS.length} из 400
          </span>
        </div>

        <div style={{ display: 'grid', gap: 6 }}>
          {REVIEWS.map((r, i) => {
            const sm = STATUS_META[r.status];
            return (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--line)',
                borderRadius: 'var(--r-md)', padding: '9px 11px',
                animation: `dpStep .4s var(--ease-out) ${i * 50}ms both` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 999, background: 'var(--surface-sunken)',
                    display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 11,
                    color: 'var(--ink-500)', flex: 'none' }}>{r.who.split(' ')[0][0]}{r.who.split(' ')[1][0]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 12.5, lineHeight: 1.2 }}>{r.who}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-400)' }}>
                      <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999,
                        background: SRC_COLOR[r.origin], marginRight: 5, verticalAlign: 'middle' }}></span>
                      {r.src} · {r.city}
                    </div>
                  </div>
                  <Stars value={r.stars} size={11} />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 7px',
                    borderRadius: 999, background: sm.bg, color: sm.c, fontSize: 10.5, fontWeight: 500 }}>
                    <span style={{ width: 4, height: 4, borderRadius: 999, background: sm.c }}></span>{sm.t}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-400)', flex: 'none' }}>{r.time}</span>
                </div>
                <p style={{ margin: '5px 0 0', fontSize: 12, lineHeight: 1.35, color: 'var(--ink-700)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: 35 }}>«{r.note}»</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: ratings distribution + sources */}
      <div style={{ padding: '14px 22px', background: 'var(--surface-tint)', display: 'flex', flexDirection: 'column', gap: 14 }} className="demo-right">
        <div>
          <span style={monoLabel}>Распределение оценок · 30 дней</span>
          <div style={{ display: 'grid', gap: 7, marginTop: 12 }}>
            {DIST.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3,
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontVariantNumeric: 'tabular-nums',
                  color: 'var(--ink-700)', width: 20 }}>
                  {d.s}<Icon name="star" size={9} fill style={{ color: 'var(--gold-500)' }} />
                </span>
                <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 999, overflow: 'hidden',
                  border: '1px solid var(--line)' }}>
                  <div style={{ height: '100%', width: d.pct + '%',
                    background: d.s >= 4 ? 'var(--brand-500)' : d.s === 3 ? 'var(--ink-400)' : 'var(--red-600)',
                    borderRadius: 999, animation: `dpBar .8s var(--ease-out) ${i * 70}ms both`,
                    transformOrigin: 'left center' }}></div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontVariantNumeric: 'tabular-nums',
                  color: 'var(--ink-500)', width: 32, textAlign: 'right' }}>{d.n}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span style={monoLabel}>Источники</span>
          <div style={{ display: 'grid', gap: 6, marginTop: 12 }}>
            {DEMO_SOURCES.map((s) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: SRC_COLOR[s.id] }}></span>
                <span style={{ fontSize: 12.5, flex: 1 }}>{s.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>{s.reviews}</span>
                <div style={{ width: 50, height: 4, background: 'var(--surface)', borderRadius: 999, border: '1px solid var(--line)', overflow: 'hidden' }}>
                  <div style={{ width: s.share + '%', height: '100%', background: SRC_COLOR[s.id], borderRadius: 999,
                    animation: 'dpBar .8s var(--ease-out) both' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <span style={monoLabel}>Всего за месяц</span>
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontWeight: 500, fontSize: 18, letterSpacing: '-.02em',
              fontVariantNumeric: 'tabular-nums' }}>400</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--brand-600)' }}>+18%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
