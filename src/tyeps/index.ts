import { BASE_SCALES } from "@/const";
import { Beat, Note } from "@/models";

export interface BaseScale {
  scale: string;
  // 周波数(Hz) ex: 261.63
  frequency: number;
}
export type Scale = (typeof BASE_SCALES)[number]["scale"];

// コードの種類
export type DiatonicChordType = "major" | "minor" | "diminished" | "augmented";

// メロディー (length = 4拍 * 8小節)
export type Melody = Note[];

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

// 音程 (1音目を0として 全音:2, 半音:1 で表現)
export type Interval = number[];

// リズム (8小節の場合は length = 8小節 * 4拍 * 4 = 128)
export type Rhythm = Beat[];
