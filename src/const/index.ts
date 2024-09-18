import { BaseScale, ScaleType } from '@/types';

// 音階
export const BASE_SCALES = [
  {
    scale: 'C',
    frequency: 261.63,
  },
  {
    scale: 'C#',
    frequency: 277.18,
  },
  {
    scale: 'D',
    frequency: 293.66,
  },
  {
    scale: 'D#',
    frequency: 311.13,
  },
  {
    scale: 'E',
    frequency: 329.63,
  },
  {
    scale: 'F',
    frequency: 349.23,
  },
  {
    scale: 'F#',
    frequency: 369.99,
  },
  {
    scale: 'G',
    frequency: 392.0,
  },
  {
    scale: 'G#',
    frequency: 415.3,
  },
  {
    scale: 'A',
    frequency: 440.0,
  },
  {
    scale: 'A#',
    frequency: 466.16,
  },
  {
    scale: 'B',
    frequency: 493.88,
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
    intervals: [2, 2, 1, 2, 2, 2, 1],
  },
  {
    type: 'minor',
    intervals: [2, 1, 2, 2, 1, 2, 2],
  },
  {
    type: 'diminished',
    intervals: [2, 1, 2, 1, 2, 1, 2],
  },
] as const satisfies ScaleType[];
