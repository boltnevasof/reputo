/** Rising/flat rating sparkline (area + line + end dot). */
export function RatingSparkline({ rising = true, w = 280, h = 44 }: { rising?: boolean; w?: number; h?: number }) {
  const line = rising
    ? `M2,${h - 8} C40,${h - 10} 64,${h - 12} 96,${h - 14} C140,${h - 17} 156,${h - 26} 196,${h - 29} C228,${h - 32} 252,${h - 37} 278,${h - 40}`
    : `M2,${h - 22} C40,${h - 24} 64,${h - 20} 96,${h - 23} C140,${h - 27} 156,${h - 21} 196,${h - 24} C228,${h - 26} 252,${h - 23} 278,${h - 25}`;
  const endY = rising ? h - 40 : h - 25;
  const id = 'spk' + (rising ? 'a' : 'b');
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2F4BE0" stopOpacity={rising ? 0.18 : 0.12} />
          <stop offset="1" stopColor="#2F4BE0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w - 2},${h} L2,${h} Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke="var(--brand-600)" strokeWidth="2" strokeLinecap="round" opacity={rising ? 1 : 0.7} />
      <circle cx={w - 2} cy={endY} r="3.2" fill="var(--brand-600)" />
      <circle cx={w - 2} cy={endY} r="6" fill="var(--brand-600)" opacity=".18" />
    </svg>
  );
}
