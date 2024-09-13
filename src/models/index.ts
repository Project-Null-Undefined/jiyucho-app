import { MAX, MIN, SCALES } from '@/const';
import { DiatonicChordType, Scale, Settings } from '@/types';
import { CSSProperties } from 'react';

// IDを持つ基底クラス
class Identifiable {
  private _id = `${Date.now()}-${Math.random().toString(36)}`;

  /**
   * IDを取得
   */
  get id(): string {
    return this._id;
  }
}

// 1拍
export class Beat extends Identifiable {
  // 開始位置 ex: 1/4拍=1
  declare start: number;
  // 音の長さ ex: 1/4拍=1
  declare duration: number;

  constructor(start: number, duration: number) {
    super();

    this.start = start;
    this.duration = duration;
  }
}

// 1音
export class Note extends Beat {
  declare octave: number;
  declare scale: Scale;

  constructor(props: { scale: Scale; octave: number; start: number; duration: number }) {
    const { scale, octave, start, duration } = props;

    super(start, duration);

    this.octave = octave;
    this.scale = scale;
  }

  /**
   * 描画位置をcss変数として取得
   */
  public getPositionStyleVars(barIndex: number, octaveRange: Settings['octaveRange']): CSSProperties {
    // 1小節の
    const colStart = this.start + 1;
    const colEnd = this.start + this.duration + 1;

    // 小節内の音階の位置
    const scalePosition = SCALES.findIndex((s) => s === this.scale) + 1;
    // 相対的な小節の位置
    const relativeBarPosition = this.octave - octaveRange[MIN];
    // 小節の位置
    const barPosition = (octaveRange[MAX] - octaveRange[MIN] - relativeBarPosition + 1) * 12;

    const rowStart = barPosition - scalePosition + 1;

    return {
      ['--bar-index' as string]: barIndex,
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
export class Bar extends Identifiable {
  declare notes: Note[];
  declare chord: DiatonicChord;

  constructor(props: { notes: Note[]; chord: DiatonicChord }) {
    const { notes, chord } = props;

    super();

    this.notes = notes;
    this.chord = chord;
  }
}

// 楽譜
export class Music extends Identifiable {
  declare bars: Bar[];

  constructor(props: { bars: Bar[] }) {
    const { bars } = props;

    super();

    this.bars = bars;
  }
}
