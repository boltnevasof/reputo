import { Fragment } from 'react';
import { Button } from '@/components/ui/Button';
import { ProductDemo } from '@/components/demo/ProductDemo';

export function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className="hero-section" style={{ paddingTop: 72, paddingBottom: 80, position: 'relative', overflow: 'hidden' }} id="top">
      <HeroBg />
      <div className="container" style={{ position: 'relative' }}>
        {/* centered intro */}
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h1 className="h-display reveal in" style={{ margin: '0 auto' }}>
            Выше рейтинг. Меньше негатива.<br />
            <span style={{ color: 'var(--brand-600)' }}>Больше пациентов с карт.</span>
          </h1>
          <p className="lead reveal in" style={{ marginTop: 22, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            Сервис управления репутацией для сетей клиник. AI готовит ответ
            на каждый отзыв за час, живой менеджер перехватывает недовольных
            до публикации. Сети с Reputo растут с 4.3 до 4.8 за четыре месяца.
          </p>
          <div className="reveal in hero-cta-row" style={{ display: 'flex', gap: 14, marginTop: 30, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button size="lg" onClick={onCta} iconRight="arrow-right">Показать рейтинг моих клиник</Button>
          </div>
          <p className="reveal in" style={{ marginTop: 14, fontSize: 14, color: 'var(--ink-500)', marginBottom: 0 }}>
            Первые 14 дней бесплатно. Менеджер настроит всё сам.
          </p>
        </div>

        {/* product demo — heading + live preview */}
        <div style={{ marginTop: 56, position: 'relative', maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
          <ProductDemo />
        </div>

        {/* sources & integrations */}
        <div className="reveal hero-sources-row" style={{ marginTop: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em',
              textTransform: 'uppercase', color: 'var(--ink-400)' }}>Площадки</span>
            {['Яндекс Карты', '2ГИС', 'Google', 'ПроДокторов', 'Zoon', 'СберЗдоровье'].map((s, i) => (
              <Fragment key={s}>
                {i > 0 && <span style={{ width: 3, height: 3, borderRadius: 999, background: 'var(--ink-300)' }}></span>}
                <span style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--ink-700)' }}>{s}</span>
              </Fragment>
            ))}
            <span style={{ width: 1, height: 18, background: 'var(--line-strong)' }}></span>
            <span style={{ fontSize: 14, color: 'var(--ink-500)' }}>
              <b style={{ color: 'var(--ink-900)', fontWeight: 600 }}>120+</b> точек
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em',
              textTransform: 'uppercase', color: 'var(--ink-400)' }}>Интеграции</span>
            {['MEDODS', 'ArchiMed+', 'Medesk', 'Yclients', '1С:Стоматология'].map((s, i) => (
              <Fragment key={s}>
                {i > 0 && <span style={{ width: 3, height: 3, borderRadius: 999, background: 'var(--ink-300)' }}></span>}
                <span style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--ink-700)' }}>{s}</span>
              </Fragment>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--ink-500)', margin: '14px auto 0', maxWidth: 560 }}>
            Отзывы и заявки с карт попадают в вашу МИС или CRM. Клиника работает в привычном контуре.
          </p>
        </div>
      </div>
    </section>
  );
}

function HeroBg() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'radial-gradient(120% 70% at 50% 42%, rgba(47,75,224,.08), transparent 60%)' }}>
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
        backgroundSize: '72px 72px', opacity: 0.4,
        maskImage: 'radial-gradient(110% 60% at 50% 40%, #000, transparent 62%)',
        WebkitMaskImage: 'radial-gradient(110% 60% at 50% 40%, #000, transparent 62%)' }} />
    </div>
  );
}
