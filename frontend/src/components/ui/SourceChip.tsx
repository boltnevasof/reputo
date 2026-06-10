import type { MapSource } from '@/lib/sources';

export function SourceChip({ source, value }: { source: MapSource; value?: string | number }) {
  return (
    <span className="chip">
      <span className="dot" style={{ background: source.color }}></span>
      {source.name}
      {value != null && <b style={{ marginLeft: 4, color: 'var(--ink-900)' }}>{value}</b>}
    </span>
  );
}
