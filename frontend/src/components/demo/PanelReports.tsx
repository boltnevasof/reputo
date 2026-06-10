import { Icon, type IconName } from '@/components/ui/Icon';
import { monoLabel } from './data';

const VOLUME = [38, 45, 52, 61, 74, 92];
const MONTHS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'];

interface Highlight {
  i: IconName;
  t: string;
  s: string;
}

const HIGHLIGHTS: Highlight[] = [
  { i: 'shield-check', t: '23 негатива перехвачено', s: 'Каждый — звонок менеджера в течение 30 мин. ≈ ₽840 тыс. защищённой выручки.' },
  { i: 'trending-up', t: '+0.31 к среднему рейтингу за квартал', s: 'Премьер Мед и Линия Улыбки выросли быстрее сети.' },
  { i: 'map-pin', t: 'Самара требует внимания', s: 'Эстетика+ ниже целевого 4.7 и NPS 58 — план ответов на следующей неделе.' },
];

/** Panel 3 · Отчёты — weekly report mock. */
export function PanelReports() {
  const max = Math.max(...VOLUME);

  const miniMetrics: Array<[string, string, string, string | null]> = [
    ['Средний', '4.78', '+0.04 за нед.', 'star'],
    ['Перехв.', '6', 'на этой неделе', null],
    ['Обращ.', '312', 'с карт · +9%', null],
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 0 }} className="demo-body">
      {/* LEFT: weekly report */}
      <div style={{ padding: '18px 22px', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }} className="demo-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={monoLabel}>Еженедельный отчёт · 02–08 июня</span>
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--brand-600)' }}>
            <Icon name="check" size={12} stroke={2} /> отправлен владельцу
          </span>
        </div>

        {/* report title */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 'var(--r-lg)', padding: '18px 18px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>Репутация сети — июнь, неделя 1</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>1 страница · A4</span>
          </div>

          {/* mini metric row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 18 }}>
            {miniMetrics.map(([lab, val, sub, icon], i) => (
              <div key={i} style={{ borderLeft: i ? '1px solid var(--line)' : 'none', paddingLeft: i ? 14 : 0 }}>
                <div style={{ ...monoLabel, fontSize: 9.5, marginBottom: 5 }}>{lab}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <span style={{ fontWeight: 300, fontSize: 24, letterSpacing: '-.03em',
                    fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{val}</span>
                  {icon === 'star' && <Icon name="star" size={13} fill style={{ color: 'var(--gold-500)' }} />}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--brand-600)', marginTop: 4 }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* volume mini-chart */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={monoLabel}>Поток отзывов · 6 мес</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--brand-600)' }}>×2.4 к Q1</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 58 }}>
              {VOLUME.map((v, i) => {
                const cur = i === VOLUME.length - 1;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5,
                      color: cur ? 'var(--brand-600)' : 'var(--ink-300)' }}>{v}</span>
                    <div style={{ width: '100%', maxWidth: 24, borderRadius: '4px 4px 0 0',
                      height: Math.round((v / max) * 36),
                      background: cur ? 'var(--brand-500)' : 'var(--brand-300)',
                      animation: `dpRise .6s var(--ease-out) ${i * 60}ms both`,
                      transformOrigin: 'bottom center' }}></div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5,
                      color: cur ? 'var(--ink-700)' : 'var(--ink-400)' }}>{MONTHS[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', gap: 8 }}>
          <span className="btn btn-primary" style={{ fontSize: 12.5, padding: '8px 14px' }}>
            <Icon name="file-text" size={14} stroke={2} /> Скачать PDF
          </span>
          <span className="btn btn-secondary" style={{ fontSize: 12.5, padding: '8px 14px' }}>
            <Icon name="users" size={14} stroke={2} /> Переслать команде
          </span>
        </div>
      </div>

      {/* RIGHT: highlights & schedule */}
      <div style={{ padding: '18px 22px', background: 'var(--surface-tint)', display: 'flex', flexDirection: 'column' }} className="demo-right">
        <span style={monoLabel}>Что важно за неделю</span>
        <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '11px 12px',
              background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)',
              animation: `dpStep .4s var(--ease-out) ${i * 80}ms both` }}>
              <span style={{ width: 28, height: 28, borderRadius: 'var(--r-sm)', background: 'var(--brand-50)',
                color: 'var(--brand-600)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                <Icon name={h.i} size={14} stroke={2} />
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--ink-900)', lineHeight: 1.35 }}>{h.t}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-500)', lineHeight: 1.45, marginTop: 4 }}>{h.s}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="clock" size={14} stroke={2} style={{ color: 'var(--ink-400)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>
            Следующий отчёт — <b style={{ color: 'var(--ink-900)' }}>пн, 09 июня · 09:00</b>
          </span>
        </div>
      </div>
    </div>
  );
}
