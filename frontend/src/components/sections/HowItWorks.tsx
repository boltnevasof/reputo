import { useState, type CSSProperties } from 'react';
import { Icon, Stars } from '@/components/ui/Icon';
import { RatingSparkline } from '@/components/charts/RatingSparkline';
import { SOURCES } from '@/lib/sources';

const panelLabel: CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em',
  textTransform: 'uppercase', color: 'var(--ink-400)' };

interface Step {
  n: string;
  t: string;
  d: string;
  points: string[];
}

const STEPS: Step[] = [
  { n: '01', t: 'Все карточки сети в одном окне',
    d: 'Подключаем карточки всех точек на Яндекс Картах, 2ГИС и Google. Рейтинг и отзывы всей сети видны на одном экране.',
    points: [
      'Подтверждаем владение карточками и настраиваем доступ к ответам',
      'Дополняем профили адресами, врачами, услугами и фото. Полные карточки карты ранжируют выше',
      'Уведомления о новых отзывах приходят вам в Telegram или на почту',
      'Новый отзыв на любой карте виден в системе через 15 минут',
    ] },
  { n: '02', t: 'Перехватываем негатив до публикации',
    d: 'Недовольный пациент попадает в приватный канал, а не на карту. Вы решаете вопрос лично, и публичный рейтинг не страдает.',
    points: [
      'Ставим QR и ссылку на приватную форму в зоне после приёма',
      'Пациент пишет напрямую, менеджер отвечает в течение 30 минут',
      'Отвечаем без раскрытия диагнозов и деталей лечения',
      'Когда вопрос решён, приглашаем пациента оставить публичный отзыв',
    ] },
  { n: '03', t: 'Отчёт владельцу и подсказки, что поправить в сервисе',
    d: 'Раз в неделю владелец получает рейтинг по точкам, динамику и перехваченный негатив. Отдельно показываем, где сеть теряет звёзды и что исправить. Чтение занимает две минуты.',
    points: [
      'Рейтинг и динамика каждого филиала на одной странице',
      'Сколько негатива перехвачено и сколько выручки это защитило',
      'Звонки, маршруты и переходы на сайт по каждой точке',
      'Видно, какой филиал теряет рейтинг и по какой причине',
      'Рекомендации, что поправить в сервисе, а не просто цифры',
    ] },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const panels = [StepMaps, StepIntercept, StepReport];
  const Panel = panels[active];

  return (
    <section className="section" id="how">
      <div className="container">
        <div className="reveal" style={{ maxWidth: 600, marginBottom: 48 }}>
          <h2 className="h2">Три шага до стабильного потока с карт</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 56, alignItems: 'center' }}
          className="how-grid">
          {/* clickable steps */}
          <div className="reveal" style={{ display: 'grid' }}>
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <button key={i} onClick={() => setActive(i)} style={{
                    textAlign: 'left', cursor: 'pointer', border: 'none', borderTop: i ? '1px solid var(--line)' : 'none',
                    background: 'transparent', borderRadius: 0, padding: '28px 0 28px 24px',
                    display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18, position: 'relative',
                    fontFamily: 'inherit', transition: 'opacity .28s var(--ease-out)' }}>
                    {/* minimal active accent */}
                    <span aria-hidden style={{ position: 'absolute', left: 0, top: i ? 1 : 0, bottom: 0, width: 2,
                      background: 'var(--brand-600)', borderRadius: 2, opacity: on ? 1 : 0,
                      transition: 'opacity .28s var(--ease-out)' }}></span>
                    <span style={{ width: 30, height: 30, borderRadius: 999, flex: 'none',
                      background: on ? 'var(--brand-600)' : 'transparent',
                      border: on ? '1px solid var(--brand-600)' : '1px solid var(--line-strong)',
                      color: on ? '#fff' : 'var(--ink-400)', display: 'grid', placeItems: 'center',
                      fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 600, marginTop: 2,
                      transition: 'all .28s var(--ease-out)' }}>{s.n}</span>
                    <div>
                      <div className="h3" style={{ fontSize: 19, lineHeight: 1.3, color: on ? 'var(--ink-900)' : 'var(--ink-400)',
                        transition: 'color .28s' }}>{s.t}</div>
                      <div style={{ display: 'grid', gridTemplateRows: on ? '1fr' : '0fr',
                        transition: 'grid-template-rows .42s cubic-bezier(.22,1,.36,1)' }}>
                        <div style={{ overflow: 'hidden' }}>
                          <p className="muted" style={{ fontSize: 15, lineHeight: 1.65, margin: '14px 0 0', maxWidth: 440 }}>{s.d}</p>
                          <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0, display: 'grid', gap: 10, maxWidth: 460 }}>
                            {s.points.map((p, j) => (
                              <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start',
                                fontSize: 14, lineHeight: 1.55, color: 'var(--ink-700)' }}>
                                <Icon name="check" size={15} stroke={2} style={{ color: 'var(--brand-600)', flex: 'none', marginTop: 3 }} />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </button>
              );
            })}
          </div>

          {/* interface mock — desktop only */}
          <div className="reveal how-window-outer">
            <div className="how-window" style={{ background: 'var(--surface)', border: '1px solid var(--line)',
              borderRadius: 'var(--r-2xl)', boxShadow: '0 30px 70px -28px rgba(14,20,36,.28), 0 6px 18px rgba(14,20,36,.06)',
              overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '13px 18px',
                borderBottom: '1px solid var(--line)', background: 'var(--surface-tint)' }}>
                <img src="/logo-mark.svg" alt="" style={{ width: 20, height: 20 }} />
                <span style={{ fontWeight: 600, fontSize: 13.5 }}>Reputo</span>
                <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-400)' }}>
                  / {['Филиалы', 'Приватный канал', 'Отчёт'][active]}</span>
                <span style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
                  {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: 999,
                    background: i === active ? 'var(--brand-500)' : 'var(--line-strong)', transition: 'background .28s' }}></span>)}
                </span>
              </div>
              <div key={active} style={{ padding: 22, minHeight: 318, animation: 'fadeStep .4s var(--ease-out)' }}>
                <Panel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- panel 01: all maps in one profile ---- */
function StepMaps() {
  const rows = [
    { name: 'Дентал-Сити', city: 'Казань', r: 4.8, rising: true },
    { name: 'Премьер Мед', city: 'Уфа', r: 4.9, rising: true },
    { name: 'Эстетика+', city: 'Самара', r: 4.6, rising: false },
    { name: 'Линия Улыбки', city: 'Пермь', r: 4.7, rising: true },
  ];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={panelLabel}>Рейтинг по филиалам</span>
        <span style={{ display: 'inline-flex', gap: 14 }}>
          {SOURCES.map(s => (
            <span key={s.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: s.color }}></span>{s.name.replace(' Карты', '')}</span>
          ))}
        </span>
      </div>
      <div style={{ display: 'grid' }}>
        {rows.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0',
            borderTop: i ? '1px solid var(--line)' : 'none' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14.5 }}>{b.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-400)' }}>{b.city}</div>
            </div>
            <div style={{ width: 80 }}><RatingSparkline rising={b.rising} w={80} h={26} /></div>
            <Stars value={b.r} size={13} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontVariantNumeric: 'tabular-nums',
              width: 32, textAlign: 'right' }}>{b.r}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, paddingTop: 16,
        borderTop: '1px solid var(--line)' }}>
        <span style={panelLabel}>Средний по сети</span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 300, fontSize: 30, letterSpacing: '-.02em', lineHeight: 1,
            fontVariantNumeric: 'tabular-nums' }}>4.78</span>
          <Icon name="star" size={18} fill style={{ color: 'var(--gold-500)' }} />
        </span>
      </div>
    </div>
  );
}

/* ---- panel 02: intercept negative ---- */
function StepIntercept() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={panelLabel}>Входящий отзыв</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'var(--red-100)', color: 'var(--red-600)', fontSize: 12, fontWeight: 500,
          padding: '5px 10px', borderRadius: 999 }}>
          <Icon name="shield-alert" size={13} /> Перехвачено · не на картах
        </span>
      </div>
      <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 16, background: 'var(--surface-tint)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}>
          <span style={{ width: 34, height: 34, borderRadius: 999, background: 'var(--surface-sunken)',
            display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 13, color: 'var(--ink-500)' }}>АП</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>Анна П.</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-400)' }}>Дентал-Сити · Казань</div>
          </div>
          <Stars value={2} size={14} />
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--ink-700)' }}>
          «Ждала приёма 40 минут, никто не предупредил о задержке. Очень неприятно после предоплаты.»
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
        <span className="btn btn-primary" style={{ fontSize: 13.5, padding: '10px 16px' }}>
          <Icon name="message-circle" size={16} /> Ответить лично</span>
        <span className="btn btn-secondary" style={{ fontSize: 13.5, padding: '10px 16px' }}>
          <Icon name="user-plus" size={16} /> Назначить</span>
      </div>
      <p style={{ margin: '16px 0 0', fontSize: 12.5, color: 'var(--ink-500)', lineHeight: 1.5,
        display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ display: 'inline-flex', gap: 5 }}>
          {SOURCES.map(s => <span key={s.id} style={{ width: 6, height: 6, borderRadius: 999, background: s.color, opacity: 0.4 }}></span>)}
        </span>
        Отзыв не опубликован на картах — решаете в приватном канале.
      </p>
    </div>
  );
}

/* ---- panel 03: weekly report ---- */
function StepReport() {
  const kpis: Array<[string, string, string]> = [
    ['Средний рейтинг', '4.78', '+0.31 за квартал'],
    ['Перехвачено', '23', 'за месяц'],
    ['Обращений с карт', '+34%', 'к прошлому мес'],
  ];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <span style={panelLabel}>Еженедельный отчёт · Июнь</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--brand-600)' }}>
          <Icon name="check" size={13} /> отправлен владельцу</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 18 }}>
        {kpis.map(([l, v, sub], i) => (
          <div key={i} style={{ borderLeft: i ? '1px solid var(--line)' : 'none', paddingLeft: i ? 16 : 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em',
              textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 8 }}>{l}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontWeight: 300, fontSize: 30, letterSpacing: '-.03em', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums' }}>{v}</span>
              {i === 0 && <Icon name="star" size={15} fill style={{ color: 'var(--gold-500)' }} />}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--brand-600)', marginTop: 6 }}>{sub}</div>
          </div>
        ))}
      </div>
      <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 16, background: 'var(--surface-tint)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={panelLabel}>Поток отзывов · 6 мес</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-500)' }}>опубликовано ×2.4</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 64 }}>
          {[38, 45, 52, 61, 74, 92].map((v, i) => {
            const cur = i === 5;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', maxWidth: 26, height: Math.round(v / 92 * 52), borderRadius: '5px 5px 0 0',
                  background: cur ? 'var(--brand-500)' : 'var(--brand-300)' }}></div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: cur ? 'var(--ink-700)' : 'var(--ink-400)' }}>
                  {['Я', 'Ф', 'М', 'А', 'М', 'И'][i]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
