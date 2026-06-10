// Скрыто на странице до появления реальных отзывов и кейсов (см. App.tsx).
import { Icon, Stars } from '@/components/ui/Icon';

const QUOTES = [
  { q: 'Перестал тушить пожары в отзывах вручную. Рейтинг по всем пяти клиникам держится выше 4.7, а недовольных вижу раньше, чем они дойдут до карт.',
    who: 'Михаил К.', role: 'владелец сети стоматологий · 5 клиник', av: 'МК' },
  { q: 'Запись с карт выросла так, что мы открыли шестую точку. Отчёт читаю за пару минут в субботу утром — и всё понятно без маркетолога.',
    who: 'Елена Д.', role: 'управляющая сети медцентров · 4 клиники', av: 'ЕД' },
];

const CASES = [
  { name: 'Сеть «Дентал-Сити»', city: 'Казань · 5 клиник', before: '4.3', after: '4.8', metric: '+38%', label: 'обращений с карт за 4 мес' },
  { name: 'Клиники «Эстетика+»', city: 'Самара · 4 клиники', before: '4.4', after: '4.7', metric: '−74%', label: 'публичного негатива' },
];

export function Testimonials() {
  return (
    <section className="section" id="cases">
      <div className="container">
        <div className="reveal" style={{ maxWidth: 620, marginBottom: 48 }}>
          <h2 className="h2">Сети, которые перестали терять пациентов на картах</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="cols-2">
          {QUOTES.map((t, i) => (
            <figure key={i} className="card reveal" style={{ margin: 0, padding: 28, transitionDelay: `${i * 70}ms` }}>
              <Stars value={5} size={17} />
              <blockquote style={{ margin: '16px 0 0', fontSize: 19, lineHeight: 1.5, color: 'var(--ink-700)',
                letterSpacing: '-.01em' }}>{t.q}</blockquote>
              <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
                <span style={{ width: 42, height: 42, borderRadius: 999, background: 'var(--brand-600)', color: '#fff',
                  display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 15 }}>{t.av}</span>
                <span>
                  <b style={{ display: 'block', fontWeight: 600, fontSize: 15 }}>{t.who}</b>
                  <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="cols-2">
          {CASES.map((c, i) => (
            <div key={i} className="card reveal" style={{ padding: 28, display: 'flex', alignItems: 'center',
              gap: 28, transitionDelay: `${i * 70}ms`, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontWeight: 600, fontSize: 17 }}>{c.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--ink-400)', marginTop: 3 }}>{c.city}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
                  <span style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink-400)', fontVariantNumeric: 'tabular-nums' }}>{c.before}</span>
                  <Icon name="arrow-right" size={16} style={{ color: 'var(--ink-400)' }} />
                  <span style={{ fontSize: 26, fontWeight: 600, color: 'var(--ink-900)', fontVariantNumeric: 'tabular-nums' }}>{c.after}</span>
                  <Stars value={5} size={14} />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: 38, letterSpacing: '-.03em', color: 'var(--brand-600)',
                  fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{c.metric}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 8, maxWidth: 150 }}>{c.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
