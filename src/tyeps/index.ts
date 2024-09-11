import { BASE_SCALES } from "@/const";

export interface BaseScale {
  scale: string;
  // 周波数(Hz) ex: 261.63
  frequency: number;
}
export type Scale = (typeof BASE_SCALES)[number]["scale"];

// 1拍
export type Beat = {
  // 開始位置 ex: 1/4拍=1
  start: number;
  // 音の長さ ex: 1/4拍=1
  duration: number;
};

// 1音
export interface Note extends Beat {
  // 音階 ex: C, C#
  scale: Scale;
  // オクターブ ex: 1
  octave: number;
}

// コードの種類
export type DiatonicChordType = "major" | "minor" | "diminished" | "augmented";

// コード
export interface DiatonicChord {
  // 音階
  note: Note;
  // コードの種類を返す ex: minor
  getType: () => DiatonicChordType;
}

// メロディー (length = 4拍 * 8小節)
export type Melody = Note[];

// 1小節
export interface Bar {
  notes: Note[]; // length = 4拍
  chord: DiatonicChord;
}

// 設定
export interface Settings {
  // テンポ ex: 120
  bpm: number;
  // 表示する音階の範囲
  octaveRange: [number, number];
  // 小節数
  barCount: number;
  // 1小節あたりの拍数
  beatCount: number;
  // 最小の音符の長さ (1/N 拍)
  minNoteDuration: number;
}

// 楽譜
export interface Music extends Settings {
  bars: Bar[];
}

// 音程 (1音目を0として 全音:2, 半音:1 で表現)
export type Interval = number[];

// リズム (8小節の場合は length = 8小節 * 4拍 * 4 = 128)
export type Rhythm = Beat[];
