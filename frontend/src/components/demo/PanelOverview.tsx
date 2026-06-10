import { Icon, Stars } from '@/components/ui/Icon';
import { RatingSparkline } from '@/components/charts/RatingSparkline';
import { SRC_COLOR } from '@/lib/sources';
import { DEMO_BRANCHES, DEMO_SOURCES, STATUS_META, monoLabel, type ReviewStatus } from './data';

interface FeedItem {
  who: string;
  src: string;
  stars: number;
  status: ReviewStatus;
  time: string;
  note: string;
}

const FEED: FeedItem[] = [
  { who: 'Анна П.',  src: 'Дентал-Сити',  stars: 2, status: 'intercept', time: '7 мин',  note: '«Ждала приёма 40 минут, никто не предупредил»' },
  { who: 'Игорь В.', src: 'Премьер Мед',  stars: 5, status: 'published', time: '32 мин', note: '«Врач объяснил всё подробно, рекомендую»' },
  { who: 'Мария К.', src: 'Линия Улыбки', stars: 4, status: 'reply',     time: '1 ч',    note: '«Качественно, но дороговато по сравнению с»' },
];

/** Panel 0 · Обзор — sources + branches + live feed. */
export function PanelOverview() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 0 }} className="demo-body">

      {/* LEFT: sources + branches */}
      <div style={{ padding: '20px 22px', borderRight: '1px solid var(--line)', display: 'grid', gap: 18 }} className="demo-left">

        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={monoLabel}>Карты — рейтинг и охват за месяц</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>3 источника</span>
          </div>
          <div style={{ display: 'grid', gap: 2 }}>
            {DEMO_SOURCES.map((s, i) => (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 60px 50px 80px 1fr',
                alignItems: 'center', gap: 14, padding: '8px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 999, background: SRC_COLOR[s.id], flex: 'none' }}></span>
                  <span style={{ fontWeight: 500, fontSize: 13.5 }}>{s.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontVariantNumeric: 'tabular-nums',
                    color: 'var(--ink-900)' }}>{s.rating.toFixed(2)}</span>
                  <Icon name="star" size={11} fill style={{ color: 'var(--gold-500)' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--brand-600)' }}>{s.delta}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-500)' }}>
                  <b style={{ color: 'var(--ink-900)', fontWeight: 600, fontSize: 12 }}>{s.reviews}</b> отз.
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-500)', textAlign: 'right' }}>
                  <b style={{ color: 'var(--ink-900)', fontWeight: 600, fontSize: 12 }}>{s.views}</b> показов
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={monoLabel}>Рейтинг и NPS по филиалам</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>4 точки · вся сеть</span>
          </div>
          <div style={{ display: 'grid', gap: 2 }}>
            {DEMO_BRANCHES.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0',
                borderTop: i ? '1px solid var(--line)' : 'none' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 500, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden',
                    textOverflow: 'ellipsis' }}>{b.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)',
                    whiteSpace: 'nowrap' }}>{b.city}</div>
                </div>
                <div style={{ width: 70, flex: 'none' }} className="demo-hide"><RatingSparkline rising={b.rising} w={70} h={26} /></div>
                <div style={{ width: 44, textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontVariantNumeric: 'tabular-nums',
                    color: 'var(--ink-900)' }}>{b.rating.toFixed(2)}</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5,
                    color: b.rising ? 'var(--brand-600)' : 'var(--ink-400)' }}>{b.delta}</div>
                </div>
                <div style={{ width: 56, textAlign: 'right' }} className="demo-hide">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontVariantNumeric: 'tabular-nums',
                    color: 'var(--ink-900)' }}>{b.reviewsMo}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-400)',
                    letterSpacing: '.06em', textTransform: 'uppercase' }}>отз / мес</div>
                </div>
                <div style={{ width: 50, textAlign: 'right' }} className="demo-hide">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontVariantNumeric: 'tabular-nums',
                    color: b.nps >= 70 ? 'var(--brand-600)' : b.nps >= 60 ? 'var(--ink-700)' : 'var(--ink-500)' }}>
                    {b.nps >= 0 ? '+' : ''}{b.nps}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-400)',
                    letterSpacing: '.06em', textTransform: 'uppercase' }}>nps</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: live feed */}
      <div style={{ padding: '20px 22px', background: 'var(--surface-tint)', display: 'flex', flexDirection: 'column' }} className="demo-right">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={monoLabel}>Лента отзывов</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)',
            fontSize: 11, color: 'var(--ink-500)' }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--brand-500)',
              animation: 'dpPulse 1.6s ease-in-out infinite' }}></span>live
          </span>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          {FEED.map((f, i) => {
            const sm = STATUS_META[f.status];
            return (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--line)',
                borderRadius: 'var(--r-md)', padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--surface-sunken)',
                    display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 11,
                    color: 'var(--ink-500)', flex: 'none' }}>{f.who.split(' ')[0][0]}{f.who.split(' ')[1][0]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{f.who}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>{f.src}</div>
                  </div>
                  <Stars value={f.stars} size={12} />
                </div>
                <p style={{ margin: '8px 0 0', fontSize: 12.5, lineHeight: 1.4, color: 'var(--ink-700)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.note}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px',
                    borderRadius: 999, background: sm.bg, color: sm.c, fontSize: 11, fontWeight: 500 }}>
                    <span style={{ width: 5, height: 5, borderRadius: 999, background: sm.c }}></span>{sm.t}
                  </span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10.5,
                    color: 'var(--ink-400)' }}>{f.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          {[['сегодня', '7 отзывов'], ['перехв.', '2 до карт'], ['ответ', '14 мин']].map(([lab, val], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '.08em',
                textTransform: 'uppercase', color: 'var(--ink-400)' }}>{lab}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontVariantNumeric: 'tabular-nums',
                fontWeight: 600, color: 'var(--ink-900)' }}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
