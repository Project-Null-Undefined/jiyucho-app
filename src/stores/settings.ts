import { Settings } from '@/types';
import { atom } from 'jotai';

// bpm
export const bpnAtom = atom<Settings['bpm']>(120);
// 表示する音階の範囲
export const octaveRangeAtom = atom<Settings['octaveRange']>([2, 5]);
// 小節数
export const barCountAtom = atom<Settings['barCount']>(8);
// 1小節あたりの拍数
export const beatCountAtom = atom<Settings['beatCount']>(4);
// 最小の音符の長さ (1/N 拍)
export const minNoteDurationAtom = atom<Settings['minNoteDuration']>(4);

// 設定 (Read Only)
export const settingsAtom = atom<Settings>((get) => ({
  bpm: get(bpnAtom),
  octaveRange: get(octaveRangeAtom),
  barCount: get(barCountAtom),
  beatCount: get(beatCountAtom),
  minNoteDuration: get(minNoteDurationAtom),
}));
