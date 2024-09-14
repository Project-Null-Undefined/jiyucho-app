import { Music } from '@/models';
import { atom } from 'jotai';
import { settingsAtom } from './settings';
import { intervalsAtom } from './draw';
import { beatsAtom } from './tap';
import { createMusic } from '@/functions/createMusic';

// Music (Read Only)
export const musicAtom = atom<Music>((get) => {
  const settings = get(settingsAtom);
  const intervals = get(intervalsAtom);
  const beats = get(beatsAtom);

  return createMusic(intervals, beats, settings);
});
