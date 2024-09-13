import { SCALES } from '@/const';
import { DiatonicChordType, Scale, Settings } from '@/types';
import { CSSProperties } from 'react';

// 1拍
export class Beat {
  // 開始位置 ex: 1/4拍=1
  start: number;
  // 音の長さ ex: 1/4拍=1
  duration: number;

  constructor(start: number, duration: number) {
    this.start = start;
    this.duration = duration;
  }
}

// 1音
export class Note extends Beat {
  octave: number;
  scale: Scale;

  constructor(props: { scale: Scale; octave: number; start: number; duration: number }) {
    const { scale, octave, start, duration } = props;

    super(start, duration);

    this.octave = octave;
    this.scale = scale;
  }

  /**
   * 描画位置をcss変数として取得
   */
  public getStyleVars(octaveRange: Settings['octaveRange']): CSSProperties {
    const colStart = this.start + 1;
    const colEnd = this.start + this.duration + 1;

    const i = SCALES.findIndex((s) => s === this.scale);
    const rowStart = i + (this.octave - octaveRange[0]) * 12 + 1;

    return {
      ['--col-start' as string]: colStart,
      ['--col-end' as string]: colEnd,
      ['--row-start' as string]: rowStart,
    };
  }

  /**
   * 音名を取得
   * @example "C4"
   */
  public getName(): string {
    return `${this.scale}${this.octave}`;
  }
}

// コード
export class DiatonicChord extends Note {
  /**
   * コードの種類を取得
   */
  public getType(): DiatonicChordType {
    // TODO
    return 'major';
  }

  /**
   * コードの種類名を取得
   */
  public getTypeName(): string {
    const scale = this.scale;
    const type = this.getType();

    return `${scale}${type.charAt(0).toUpperCase}${type.slice(1)}`;
  }
}

// 1小節
export class Bar {
  notes: Note[] = [];
  chord: DiatonicChord;

  constructor(props: { notes: Note[]; chord: DiatonicChord }) {
    const { notes, chord } = props;

    this.notes = notes;
    this.chord = chord;
  }
}

// 楽譜
export class Music {
  bars: Bar[] = [];

  constructor(bars: Bar[]) {
    this.bars = bars;
  }
}
