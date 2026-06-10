import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

interface Tier {
  name: string;
  sub: string;
  price: string;
  per?: string;
  accent?: boolean;
  note: string;
  badge?: string;
  badgeStyle?: 'solid' | 'soft';
  feats: string[];
  cta: string;
  highlight: boolean;
}

const TIERS: Tier[] = [
  { name: 'Старт', sub: '1–3 точки', price: '0 ₽', per: 'первые 14 дней', accent: true,
    note: 'дальше от 2 990 ₽ за точку, каждая следующая +2 000 ₽',
    badge: '14 дней бесплатно', badgeStyle: 'solid',
    feats: [
      'Все отзывы Яндекс Карт, 2ГИС, Google и ПроДокторов в одном окне',
      'Перехват недовольных до публикации на картах',
      'Ответ на каждый отзыв в течение часа',
      'Менеджер проверяет ответы перед публикацией',
      'Еженедельный отчёт владельцу с цифрами'],
    cta: 'Попробовать бесплатно', highlight: false },
  { name: 'Сеть', sub: '4–15 точек', price: 'от 9 990 ₽',
    note: '4 точки, каждая следующая +1 500 ₽',
    badge: 'Выбирают чаще', badgeStyle: 'solid',
    feats: [
      'Всё из «Старт»',
      'Подсказки, где сеть теряет рейтинг и что поправить',
      'Ответы с учётом медицинской специфики, без диагнозов',
      'Персональный менеджер',
      'Перехват с ответом за 30 минут'],
    cta: 'Подключить сеть', highlight: true },
  { name: 'Enterprise', sub: 'от 16 точек', price: 'от 29 990 ₽',
    note: 'индивидуальный расчёт, контракт от 6 месяцев',
    feats: [
      'Всё из «Сеть»',
      'Интеграция с вашей МИС или CRM',
      'Сводный дашборд по городам и юрлицам',
      'White label и выделенный менеджер',
      'Квартальная стратегия с экспертом'],
    cta: 'Запросить расчёт', highlight: false },
];

export function Pricing({ onCta }: { onCta: () => void }) {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 40px' }}>
          <h2 className="h2">Один фикс в месяц. Дешевле штатного маркетолога</h2>
          <p className="lead" style={{ marginTop: 16 }}>Цена считается по точкам и снижается с размером сети. Никаких комиссий за отзывы.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'start' }} className="cols-3">
          {TIERS.map((t, i) => (
            <div key={i} className="card reveal" style={{ padding: 28, position: 'relative',
              border: t.highlight ? '1.5px solid var(--brand-600)' : '1px solid var(--line)',
              boxShadow: t.highlight ? 'var(--shadow-md)' : 'var(--shadow-sm)', transitionDelay: `${i * 70}ms` }}>
              {t.badge && <span style={{ position: 'absolute', top: -12, left: 28,
                background: t.badgeStyle === 'solid' ? 'var(--brand-600)' : 'var(--brand-100)',
                color: t.badgeStyle === 'solid' ? '#fff' : 'var(--brand-700)',
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '.06em',
                padding: '5px 11px', borderRadius: 999, textTransform: 'uppercase' }}>{t.badge}</span>}
              <div style={{ fontWeight: 600, fontSize: 20 }}>{t.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-400)', marginTop: 2 }}>{t.sub}</div>
              <div style={{ margin: '20px 0', minHeight: 64 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 34, letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums',
                    color: t.accent ? 'var(--brand-600)' : 'var(--ink-900)' }}>
                    {t.price}</span>
                  <span style={{ fontSize: 14, color: t.accent ? 'var(--brand-700)' : 'var(--ink-400)',
                    fontWeight: t.accent ? 600 : 400 }}>{t.per || '/ мес'}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 6 }}>{t.note}</div>
              </div>
              <Button variant={t.highlight ? 'primary' : 'secondary'} size="block" onClick={onCta}>{t.cta}</Button>
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'grid', gap: 12 }}>
                {t.feats.map((f, j) => (
                  <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--ink-700)' }}>
                    <Icon name="check" size={17} style={{ color: 'var(--brand-600)', flex: 'none', marginTop: 1 }} />{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="reveal" style={{ textAlign: 'center', fontSize: 14, color: 'var(--ink-500)', marginTop: 28 }}>
          Менеджер и перехват негатива включены в каждый тариф, в том числе на бесплатный период.
        </p>
      </div>
    </section>
  );
}
