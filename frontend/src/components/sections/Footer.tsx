import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { SourceChip } from '@/components/ui/SourceChip';
import { SOURCES } from '@/lib/sources';

export function CtaBand({ onCta }: { onCta: () => void }) {
  return (
    <section className="section">
      <div className="container">
        <div className="reveal" style={{ background: 'var(--brand-900)', borderRadius: 'var(--r-2xl)',
          padding: '64px 56px', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 88% 12%, rgba(85,112,240,.4), transparent 45%)' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 40, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 560 }}>
              <h2 className="h2" style={{ color: '#fff' }}>Владелец спросит про рейтинг в понедельник. Вам будет что показать</h2>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,.72)', marginTop: 16 }}>
                Пришлём бесплатный разбор репутации сети на Яндекс Картах, 2ГИС и Google.
                Покажем, где теряются пациенты и что исправить в первую очередь.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Button size="lg" onClick={onCta} iconRight="arrow-right">Показать рейтинг клиник</Button>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', textAlign: 'center' }}>Ответим в течение дня</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const NAV_COLS: Array<{ h: string; items: Array<[string, string]> }> = [
  { h: 'Разделы', items: [['Кому', '#spheres'], ['Как работает', '#how'], ['Результаты', '#results'], ['Тарифы', '#pricing']] },
];

export function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', paddingTop: 56, paddingBottom: 40 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr auto', gap: 48 }} className="footer-grid">
          <div>
            <Logo />
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-500)', marginTop: 16, maxWidth: 280 }}>
              Сервис управления репутацией для сетей клиник. Держим рейтинг 4.7+, чтобы пациенты с карт выбирали вас.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              {SOURCES.map(s => <SourceChip key={s.id} source={s} />)}
            </div>
          </div>
          {NAV_COLS.map((c, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase',
                color: 'var(--ink-400)', marginBottom: 16 }}>{c.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 11 }}>
                {c.items.map((it, j) => <li key={j}><a className="nav-link" href={it[1]} style={{ fontSize: 14.5 }}>{it[0]}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 48,
          paddingTop: 24, borderTop: '1px solid var(--line)', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--ink-400)' }}>© 2026 Reputo. Все права защищены.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a className="nav-link" href="/privacy" target="_blank" rel="noopener" style={{ fontSize: 13 }}>Политика конфиденциальности</a>
            <a className="nav-link" href="/oferta" target="_blank" rel="noopener" style={{ fontSize: 13 }}>Договор-оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
