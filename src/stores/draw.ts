import { Interval } from '@/types';
import { Coordinate } from '@/types/draw';
import { createInterval } from '@/functions/createInterval';
import { atom } from 'jotai';

// 曲線 (Read & Write)
export const curveCoordinatesAtom = atom<Coordinate[]>([]);

// 音程 (Read Only)
export const intervalsAtom = atom<Interval[]>((get) => {
  const curveCoordinates = get(curveCoordinatesAtom);
  return createInterval(curveCoordinates);
});
