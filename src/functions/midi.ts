import { Music } from '@/models';
import { Settings } from '@/types';
import MidiWriter from 'midi-writer-js';

export function exportMidi(music: Music, bpm: Settings['bpm'], minNoteDuration: Settings['minNoteDuration']) {
  const durationRate = 60 / bpm / minNoteDuration;
  const bynary = createMidiFile(music, durationRate, bpm);
  save(bynary as unknown as Blob, 'music.mid');
}

/**
 * MIDIファイルの中身を作成する
 *
 * @param music 音楽データ
 * @param durationRate 音符の長さの倍率 (note.duration * durationRate = 音符の再生時間)
 */
export function createMidiFile(music: Music, durationRate: number, bpm: number): Blob {
  // Cメジャーコードの音名を取得
  const chord = ["C4", "E4", "G4"]
  const track = new MidiWriter.Track();
  const cordTrack = new MidiWriter.Track();
  
  // テンポ設定
  track.setTempo(bpm);
  cordTrack.setTempo(bpm);
  // ティック単位の設定
  const ppq = durationRate * bpm;

  // Musicオブジェクトから各Barを処理
  music.bars.forEach((bar) => {
    bar.notes.forEach((note) => {
      const midiNoteNumber = noteNameToMidi(note.getName());
      const durationStr = `T${Math.round(ppq * note.duration)}`;

      // MIDIノートを生成
      const midiNote = new MidiWriter.NoteEvent({
        pitch: [midiNoteNumber], // "C4"のような音名
        duration: durationStr, // 持続時間
      });
      // トラックにノートを追加
      track.addEvent(midiNote);
    });
  });

  
  // ノートを追加（Cメジャーコードを同時に鳴らす）
  cordTrack.addEvent(new MidiWriter.NoteEvent({
    pitch: chord, // ["C4", "E4", "G4"]
    duration: `T${Math.round(ppq * 16)}`, // 1/4拍
  }));

  // MIDIファイルを生成
  const writer = new MidiWriter.Writer([track,cordTrack]);
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

// 音名からMIDIノート番号に変換する関数
function noteNameToMidi(noteName: string): number {
  const noteMap: Record<string, number> = {
    C: 0,
    'C#': 1,
    Db: 1,
    D: 2,
    'D#': 3,
    Eb: 3,
    E: 4,
    F: 5,
    'F#': 6,
    Gb: 6,
    G: 7,
    'G#': 8,
    Ab: 8,
    A: 9,
    'A#': 10,
    Bb: 10,
    B: 11,
  };

  const note = noteName.slice(0, -1); // 音名部分を抽出 (例: "C#")
  const octave = parseInt(noteName.slice(-1)); // オクターブ部分を抽出 (例: "4")

  // noteMapで有効な音名が指定されているか確認
  if (!(note in noteMap)) {
    throw new Error(`Invalid note name: ${note}`);
  }

  // MIDIノート番号 = (12 * オクターブ) + 音の値
  return 12 * (octave + 1) + noteMap[note as keyof typeof noteMap];
}
