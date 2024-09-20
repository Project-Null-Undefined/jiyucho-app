import { Music } from '@/models';
import { Settings } from '@/types';
import MidiWriter from 'midi-writer-js';

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
export function createMidiFile(music: Music, durationRate: number): Blob {
  const track = new MidiWriter.Track();

  // テンポ設定
  track.setTempo(Math.round(60 / durationRate));

  // 音符の長さのマッピング
  const durationMapping: Record<number, string> = {
    1: '4',    // 全音符
    0.5: '8',  // 1/2音符
    0.25: '16' // 1/4音符
  };
  
  // Musicオブジェクトから各Barを処理
  music.bars.forEach((bar) => {
    bar.notes.forEach((note) => {
      // マッピングを使用する際、キーを数値から文字列に変換
      const durationStr = durationMapping[Number(Math.round(note.duration * durationRate))] || '4';

      const startTick = Math.round(note.start * 480 * durationRate); // MIDIのタイムベース（例: 480）

      // MIDIノートを生成
      const midiNote = new MidiWriter.NoteEvent({
        pitch: [`${note.getName()}`], // "C4"のような音名
        duration: durationStr, // 持続時間
        startTick: startTick, // 開始位置
      });
      // トラックにノートを追加
      track.addEvent(midiNote);
    });
  });

  // MIDIファイルを生成
  const writer = new MidiWriter.Writer(track);
  return new Blob([writer.buildFile()], { type: 'audio/midi' });
}
export function save(blob: Blob, name: string) {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', name);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
