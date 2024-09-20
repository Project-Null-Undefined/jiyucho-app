import { Music } from '@/models';
import { Settings } from '@/types';

export function exportMidi(music: Music, bpm: Settings['bpm'], minNoteDuration: Settings['minNoteDuration']) {
  const durationRate = 60 / bpm / minNoteDuration;
  const bynary = createMidiFile(music, durationRate);
  save(bynary as unknown as Blob, 'music.mid');
}

/**
 * MIDIファイルの中身を作成する
 *
 * @param music 音楽データ
 * @param durationRate 音符の長さの倍率 (note.duration * durationRate = 音符の再生時間)
 */
export function createMidiFile(music: Music, durationRate: number): Blob {}

export function save(blob: Blob, name: string) {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', name);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
