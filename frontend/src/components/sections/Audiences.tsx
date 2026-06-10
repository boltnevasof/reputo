import { useState } from 'react';
import { Icon, type IconName } from '@/components/ui/Icon';

interface Sphere {
  icon: IconName;
  title: string;
  sub: string;
  grad: string;
  check: string;
  points: string[];
  stat: string;
  statLabel: string;
  gold: boolean;
  tags: string[];
}

const SPHERES: Sphere[] = [
  {
    icon: 'tooth',
    title: 'Стоматологические сети',
    sub: 'Стоматология · имплантация · ортодонтия',
    grad: 'radial-gradient(120% 120% at 0% 0%, rgba(47,75,224,.55), transparent 55%), radial-gradient(120% 130% at 100% 100%, rgba(85,112,240,.42), transparent 58%), linear-gradient(155deg,#10163C,#080B22)',
    check: 'var(--brand-300)',
    points: [
      'Пациент сначала ищет врача по фамилии и читает отзывы на ПроДокторов, и только потом записывается на имплантацию',
      'Один негативный отзыв о цене или боли висит в топе карточки месяцами и уводит дорогих пациентов к конкурентам',
      'Мы следим за рейтингом каждого врача и отвечаем аккуратно, не задевая врачебную тайну',
    ],
    stat: '4.7+',
    statLabel: 'держим средний рейтинг по всей сети',
    gold: true,
    tags: ['Стоматология', 'Имплантация', 'Детская стом.'],
  },
  {
    icon: 'stethoscope',
    title: 'Медицинские центры',
    sub: 'Многопрофильные клиники · диагностика · МРТ',
    grad: 'radial-gradient(120% 120% at 100% 0%, rgba(168,85,247,.45), transparent 55%), radial-gradient(120% 130% at 0% 100%, rgba(124,58,237,.42), transparent 58%), linear-gradient(155deg,#231140,#0D0722)',
    check: '#D8B4FE',
    points: [
      'Чаще всего жалобы не на врачей, а на очередь, телефон и регистратуру',
      'Пациент открывает карту, сравнивает вас с центром через дорогу и записывается туда, где рейтинг выше',
      'Мы перехватываем недовольных до публикации и показываем, на какой точке и из-за чего проседают звёзды',
    ],
    stat: '+34%',
    statLabel: 'обращений с карт за первый квартал',
    gold: false,
    tags: ['Медцентр', 'Диагностика', 'МРТ-центр'],
  },
];

export function Audiences() {
  const [active, setActive] = useState(0);

  return (
    <section className="section" id="spheres">
      <div className="container">
        <div className="reveal" style={{ maxWidth: 640, marginBottom: 44 }}>
          <h2 className="h2">Двадцать карточек, четыре площадки и владелец, который ждёт цифры</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Так живёт репутация сети из пяти клиник, если вести её вручную. Плохой отзыв замечают через неделю, и то случайно. Администраторы просят оставить отзыв у стойки, МИС ведёт расписание и больше ничего. Reputo забирает всю эту рутину себе.
          </p>
        </div>

        <div className="spheres-row reveal">
          {SPHERES.map((s, i) => {
            const on = i === active;
            return (
              <div key={i} className={'sphere' + (on ? ' on' : '')}
                onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}>
                <div className="sphere-bg" style={{ backgroundImage: s.grad }}>
                  <div className="sphere-grain"></div>
                </div>

                {/* collapsed (light) */}
                <div className="sphere-collapsed">
                  <span style={{ width: 52, height: 52, borderRadius: 'var(--r-lg)', background: 'var(--brand-50)',
                    border: '1px solid var(--brand-100)', color: 'var(--brand-600)', display: 'grid', placeItems: 'center' }}>
                    <Icon name={s.icon} size={26} />
                  </span>
                  <span className="sphere-vtitle">{s.title}</span>
                  <span style={{ width: 34, height: 34, borderRadius: 999, border: '1px solid var(--line-strong)',
                    color: 'var(--ink-400)', display: 'grid', placeItems: 'center' }}>
                    <Icon name="plus" size={16} />
                  </span>
                </div>

                {/* expanded (dark) */}
                <div className="sphere-expanded">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ width: 52, height: 52, borderRadius: 'var(--r-lg)', flex: 'none',
                      background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)',
                      color: '#fff', display: 'grid', placeItems: 'center' }}>
                      <Icon name={s.icon} size={26} />
                    </span>
                    <div>
                      <h3 className="h3" style={{ fontSize: 24, color: '#fff' }}>{s.title}</h3>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,.6)',
                        letterSpacing: '.02em', marginTop: 5 }}>{s.sub}</div>
                    </div>
                  </div>

                  <ul style={{ listStyle: 'none', margin: '28px 0 0', padding: 0, display: 'grid', gap: 14, maxWidth: 440 }}>
                    {s.points.map((p, j) => (
                      <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15.5,
                        lineHeight: 1.55, color: 'rgba(255,255,255,.88)' }}>
                        <Icon name="check" size={18} style={{ color: s.check, flex: 'none', marginTop: 1 }} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end',
                    justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <span style={{ fontWeight: 300, fontSize: 46, letterSpacing: '-.03em', lineHeight: 1,
                          fontVariantNumeric: 'tabular-nums', color: '#fff' }}>{s.stat}</span>
                        {s.gold && <Icon name="star" size={22} fill style={{ color: 'var(--gold-500)' }} />}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'rgba(255,255,255,.6)',
                        marginTop: 10, maxWidth: 240, lineHeight: 1.45 }}>{s.statLabel}</div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
                      {s.tags.map((t, j) => (
                        <span key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,.85)',
                          background: 'rgba(255,255,255,.12)', borderRadius: 'var(--r-pill)', padding: '6px 12px' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
