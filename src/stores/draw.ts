import { Interval } from '@/types';
import { Coordinate } from '@/types/draw';
import { createInterval } from '@/functions/createInterval';
import { atom } from 'jotai';
import { rootNoteAtom, scaleTypeAtom } from './music';
import { barCountAtom, beatCountAtom, minNoteDurationAtom } from './settings';

// 曲線 (Read & Write)
export const curveCoordinatesAtom = atom<Coordinate[]>([]);

// 音程 (Read Only)
export const intervalsAtom = atom<Interval[]>((get) => {
  const curveCoordinates = get(curveCoordinatesAtom);
  const scaleType = get(scaleTypeAtom);
  const barCount = get(barCountAtom);
  const beatCount = get(beatCountAtom);
  const minNoteDuration = get(minNoteDurationAtom);
  const rootNote = get(rootNoteAtom);

  return createInterval(curveCoordinates, scaleType, barCount * beatCount * minNoteDuration, rootNote);
});
