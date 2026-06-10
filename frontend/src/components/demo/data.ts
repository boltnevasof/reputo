import type { CSSProperties } from 'react';

/** Shared demo data: all panels read from here so the numbers stay consistent. */

export const DEMO_AUTOPLAY_MS = 4000;

export const monoLabel: CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10.5,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: 'var(--ink-400)',
};

export interface DemoBranch {
  name: string;
  city: string;
  addr: string;
  rating: number;
  delta: string;
  rising: boolean;
  reviewsMo: number;
  nps: number;
  intercepted: number;
  staff: number;
  ya: number;
  g2: number;
  gg: number;
}

export const DEMO_BRANCHES: DemoBranch[] = [
  { name: 'Дентал-Сити',  city: 'Казань · центр',   addr: 'Баумана 12',  rating: 4.83, delta: '+0.3', rising: true,  reviewsMo: 64, nps: 71, intercepted: 7, staff: 14, ya: 4.88, g2: 4.74, gg: 4.92 },
  { name: 'Премьер Мед',  city: 'Уфа · Зорге',      addr: 'Зорге 75',    rating: 4.91, delta: '+0.2', rising: true,  reviewsMo: 51, nps: 78, intercepted: 4, staff: 11, ya: 4.95, g2: 4.81, gg: 4.96 },
  { name: 'Эстетика+',    city: 'Самара · Победа',  addr: 'Победы 142а', rating: 4.62, delta: '0.0',  rising: false, reviewsMo: 42, nps: 58, intercepted: 9, staff: 9,  ya: 4.65, g2: 4.51, gg: 4.72 },
  { name: 'Линия Улыбки', city: 'Пермь · Парковый', addr: 'Парковый 28', rating: 4.74, delta: '+0.4', rising: true,  reviewsMo: 37, nps: 64, intercepted: 3, staff: 8,  ya: 4.79, g2: 4.66, gg: 4.78 },
];

export interface DemoSource {
  id: 'yandex' | '2gis' | 'google';
  name: string;
  rating: number;
  delta: string;
  reviews: number;
  views: string;
  share: number;
}

export const DEMO_SOURCES: DemoSource[] = [
  { id: 'yandex', name: 'Яндекс Карты', rating: 4.82, delta: '+0.2', reviews: 287, views: '41 250', share: 62 },
  { id: '2gis',   name: '2ГИС',         rating: 4.71, delta: '+0.1', reviews: 124, views: '18 940', share: 23 },
  { id: 'google', name: 'Google',       rating: 4.9,  delta: '+0.4', reviews: 89,  views: '12 060', share: 15 },
];

export type ReviewStatus = 'intercept' | 'published' | 'reply';

export const STATUS_META: Record<ReviewStatus, { c: string; t: string; bg: string }> = {
  intercept: { c: 'var(--red-600)',   t: 'Перехвачено', bg: 'var(--red-100)' },
  published: { c: 'var(--brand-600)', t: 'Опубликован', bg: 'var(--brand-50)' },
  reply:     { c: 'var(--ink-500)',   t: 'Нужен ответ', bg: 'var(--surface-sunken)' },
};
