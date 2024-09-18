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
    const scalePosition = this.getScaleIndex() + 1;
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

  /**
   * 音階のindexを取得
   */
  public getScaleIndex(): number {
    return SCALES.indexOf(this.scale);
  }

  /**
   * 音階のindexを取得
   *
   * @param scale 取得したい音階
   */
  public static getScaleIndex(scale: Scale): number {
    return SCALES.indexOf(scale);
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

    return `${scale}${type.charAt(0)}${type.slice(1)}`;
  }

  /**
   * コードのNoteを取得
   */
  public getNotes(): Note[] {
    const intervals = [0, 2, 4];

    return intervals.map((interval) => {
      const scaleIndex = (this.getScaleIndex() + interval) % SCALES.length;
      const scale = SCALES[scaleIndex];
      const octave = scaleIndex < this.getScaleIndex() ? this.octave + 1 : this.octave;

      return new Note({
        scale,
        octave,
        start: this.start,
        duration: this.duration,
      });
    });
  }
}

// 1小節
export class Bar extends Identifiable {
  declare notes: Note[];
  declare chordIndex: number;
  declare chords: DiatonicChord[];

  constructor(props: { notes: Note[]; chordIndex?: number; chords: DiatonicChord[] }) {
    const { notes, chordIndex = -1, chords = [] } = props;

    super();

    this.notes = notes;
    this.chordIndex = chordIndex;
    this.chords = chords;
  }

  get chord(): DiatonicChord | undefined {
    return this.chords[this.chordIndex];
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
