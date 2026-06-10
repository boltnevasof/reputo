export function Logo({ white = false, size = 30 }: { white?: boolean; size?: number }) {
  return (
    <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <img src="/logo-mark.svg" alt="" style={{ width: size, height: size }} />
      <span
        style={{
          fontWeight: 600,
          fontSize: size * 0.72,
          letterSpacing: '-0.02em',
          color: white ? '#fff' : 'var(--ink-900)',
        }}
      >
        Reputo
      </span>
    </a>
  );
}
