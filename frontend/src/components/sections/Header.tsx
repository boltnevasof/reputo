import { useEffect, useState, type CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export function Header({ onCta }: { onCta: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn);
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const wrap: CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: scrolled ? 'rgba(247,248,250,0.82)' : 'transparent',
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
    transition: 'background .2s, border-color .2s',
  };
  const inner: CSSProperties = { height: 72, display: 'flex', alignItems: 'center', gap: 32 };
  const nav: CSSProperties = { display: 'flex', gap: 28, marginLeft: 8 };
  const right: CSSProperties = { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 22 };

  return (
    <header style={wrap}>
      <div className="container" style={inner}>
        <Logo />
        <nav style={nav} className="hide-sm">
          <a className="nav-link" href="#spheres">Кому</a>
          <a className="nav-link" href="#how">Как работает</a>
          <a className="nav-link" href="#results">Результаты</a>
          <a className="nav-link" href="#pricing">Тарифы</a>
          {/* Скрыто вместе с секцией отзывов: <a className="nav-link" href="#cases">Кейсы</a> */}
        </nav>
        <div style={right} className="header-cta">
          <Button onClick={onCta}>Показать рейтинг клиник</Button>
        </div>
      </div>
    </header>
  );
}
