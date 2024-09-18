import { SCALES } from '@/const';
import { Bar, Beat, DiatonicChord, Music, Note } from '@/models';
import { Interval, RootNote, ScaleType, Settings } from '@/types';

/**
 * Interval と beat から音楽データを生成する
 *
 * @param intervals 音程
 * @param beats 拍子
 */
export function createMusic(
  rootNote: RootNote,
  scaleType: ScaleType,
  intervals: Interval[],
  beats: Beat[],
  settings: Settings,
): Music {
  const { barCount, beatCount, minNoteDuration } = settings;

  const bars = Array.from({ length: barCount }).map((_, barIndex) => {
    // 1小節の音符の先頭と末尾
    const beatStart = barIndex * beatCount;
    const beatEnd = (barIndex + 1) * beatCount;

    // 1小節の音程
    const barIntervals = intervals.slice(beatStart, beatEnd);
    // 1小節の拍子
    const barBeats = beats.slice(beatStart, beatEnd);

    const notes = createNotes(rootNote, barIntervals, barBeats);
    const chords = createDiatonicChordCandidates(rootNote, scaleType, notes[0], beatCount * minNoteDuration);

    return new Bar({
      notes,
      chordIndex: 0,
      chords,
    });
  });

  return new Music({
    bars,
  });
}

/**
 * 音符を生成する
 */
export function createNotes(rootNote: RootNote, intervals: Interval[], beats: Beat[]): Note[] {
  return beats.map((beat) => {
    const intervalIndex = beat.start;

    const octave = rootNote.octave + (intervals[intervalIndex] % 12);
    const scale = SCALES[intervals[intervalIndex] % SCALES.length];

    return new Note({
      octave,
      scale,
      start: beat.start,
      duration: beat.duration,
    });
  });
}

/**
 * コード進行の候補を生成する
 *
 * @param barFirstNote 小節の最初の音符
 * @param barDuration 小節の長さ(拍数 * 1拍の長さ)
 */
export function createDiatonicChordCandidates(
  rootNote: RootNote,
  scaleType: ScaleType,
  barFirstNote: Note,
  barDuration: number,
): DiatonicChord[] {
  const chords = getDiatonicChords(rootNote, scaleType.intervals, barDuration);
  const chordCandidates: DiatonicChord[] = chords.filter((chord) => {
    const notes = chord.getNotes();
    return notes.some((note) => note.scale === barFirstNote.scale);
  });

  return chordCandidates;
}

/**
 * コードを全て生成する
 */
export function getDiatonicChords(rootNote: RootNote, scale: Interval[], duration: number): DiatonicChord[] {
  const initDiatonicChord: DiatonicChord[] = [];
  const diatonicChord = scale.reduce((notes, interval) => {
    const prevNote = notes.at(notes.length - 1);

    if (prevNote === undefined) {
      return [new DiatonicChord({ octave: rootNote.octave, scale: rootNote.scale, start: 0, duration })];
    }

    const prevScaleIndex = prevNote.getScaleIndex();
    const scaleIndex = (prevScaleIndex + interval) % SCALES.length;
    const scale = SCALES[scaleIndex];

    const octave = scaleIndex < prevScaleIndex ? prevNote.octave + 1 : prevNote.octave;

    const chord = new DiatonicChord({ octave, scale, start: 0, duration });
    return [...notes, chord];
  }, initDiatonicChord);

  return diatonicChord;
}
