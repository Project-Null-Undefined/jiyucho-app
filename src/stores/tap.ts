import { Beat } from '@/models';
import { barCountAtom, beatCountAtom, minNoteDurationAtom } from './settings';
import { highlightMap2Beat } from '@/functions/highlightMap2Beat';
import { atom } from 'jotai';

// ハイライト区間 (Read & Write)
export const highlightedSectionsAtom = atom<{ start: number; end: number }[]>([]);

// ビート (Read Only)
export const beatsAtom = atom<Beat[]>((get) => {
  const highlightedSections = get(highlightedSectionsAtom);
  const barCount = get(barCountAtom);
  const beatCount = get(beatCountAtom);
  const minNoteDuration = get(minNoteDurationAtom);
  const length = barCount * beatCount * minNoteDuration;

  return highlightMap2Beat(highlightedSections, length);
});
