import { BaseScale, ScaleType } from '@/types';

// 音階
export const BASE_SCALES = [
  {
    scale: 'C',
    frequency: 440.0 * Math.pow(2, -9 / 12),
  },
  {
    scale: 'C#',
    frequency: 440.0 * Math.pow(2, -8 / 12),
  },
  {
    scale: 'D',
    frequency: 440.0 * Math.pow(2, -7 / 12),
  },
  {
    scale: 'D#',
    frequency: 440.0 * Math.pow(2, -6 / 12),
  },
  {
    scale: 'E',
    frequency: 440.0 * Math.pow(2, -5 / 12),
  },
  {
    scale: 'F',
    frequency: 440.0 * Math.pow(2, -4 / 12),
  },
  {
    scale: 'F#',
    frequency: 440.0 * Math.pow(2, -3 / 12),
  },
  {
    scale: 'G',
    frequency: 440.0 * Math.pow(2, -2 / 12),
  },
  {
    scale: 'G#',
    frequency: 440.0 * Math.pow(2, -1 / 12),
  },
  {
    scale: 'A',
    frequency: 440.0,
  },
  {
    scale: 'A#',
    frequency: 440.0 * Math.pow(2, 1 / 12),
  },
  {
    scale: 'B',
    frequency: 440.0 * Math.pow(2, 2 / 12),
  },
] as const satisfies BaseScale[];

export const SCALES = [...BASE_SCALES.map((s) => s.scale)] as const;

export enum Range {
  MIN,
  MAX,
}
export const { MIN, MAX } = Range;

// スケール
export const SCALE_TYPES = [
  {
    type: 'major',
    intervals: [0, 2, 4, 5, 7, 9, 11],
  },
  {
    type: 'minor',
    intervals: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    type: 'diminished',
    intervals: [0, 2, 3, 5, 6, 8, 9, 11],
  },
] as const satisfies ScaleType[];
