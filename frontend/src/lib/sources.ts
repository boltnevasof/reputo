/** Map sources (geo platforms) shared across the site. */

export interface MapSource {
  id: 'yandex' | '2gis' | 'google';
  name: string;
  color: string;
}

export const SOURCES: MapSource[] = [
  { id: 'yandex', name: 'Яндекс Карты', color: 'var(--src-yandex)' },
  { id: '2gis', name: '2ГИС', color: 'var(--src-2gis)' },
  { id: 'google', name: 'Google', color: 'var(--src-google)' },
];

export const SRC_COLOR: Record<MapSource['id'], string> = {
  yandex: 'var(--src-yandex)',
  '2gis': 'var(--src-2gis)',
  google: 'var(--src-google)',
};
