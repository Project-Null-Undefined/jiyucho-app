import { Music } from '@/models';
import { atom } from 'jotai';
import { octaveRangeAtom, settingsAtom } from './settings';
import { intervalsAtom } from './draw';
import { beatsAtom } from './tap';
import { createMusic } from '@/functions/createMusic';
import { RootNote, ScaleType } from '@/types';
import { SCALE_TYPES, SCALES } from '@/const';

// Scale Type Index (Read & Write)
export const scaleTypeIndexAtom = atom(0);
// Scale Type (Read Only)
export const scaleTypeAtom = atom<ScaleType>((get) => {
  const scaleTypeIndex = get(scaleTypeIndexAtom);
  return SCALE_TYPES[scaleTypeIndex];
});

// Root Note (Read & Write)
export const rootNoteAtom = atom<RootNote>((get) => {
  const [_octaveMin, octaveMax] = get(octaveRangeAtom);

  return {
    octave: octaveMax - 1,
    // scale: SCALES[Math.floor(SCALES.length * Math.random())],
    scale: SCALES[0], // DEBUG のために固定する
  };
});

// Music (Read Only)
export const musicAtom = atom<Music>((get) => {
  const settings = get(settingsAtom);
  const intervals = get(intervalsAtom);
  const beats = get(beatsAtom);
  const rootNote = get(rootNoteAtom);
  const scaleType = get(scaleTypeAtom);

  return createMusic(rootNote, scaleType, intervals, beats, settings);
});
