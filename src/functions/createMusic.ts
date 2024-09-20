import { MIN, SCALES } from '@/const';
import { Bar, Beat, DiatonicChord, Music, Note } from '@/models';
import { Interval, RootNote, ScaleType, Settings } from '@/types';

/**
 * Interval と beat から音楽データを生成する
 */
export function createMusic(
  rootNote: RootNote,
  scaleType: ScaleType,
  intervals: Interval[],
  beats: Beat[],
  settings: Settings,
): Music {
  const { barCount, beatCount, minNoteDuration, octaveRange } = settings;
  const initNotes: Note[] = [];
  const notes = beats.reduce((notes, beat) => {
    const { start, duration } = beat;
    const end = start + duration;

    // start ~ end の間のintervalを取得
    const beatIntervals = intervals.slice(start, end);
    const beatNotes = createNotes(rootNote, beatIntervals, beat);

    return [...notes, ...beatNotes];
  }, initNotes);

  const bars: Bar[] = Array.from({ length: barCount }).map((_, i) => {
    const start = i * beatCount * minNoteDuration;
    const end = start + beatCount * minNoteDuration;

    const barNotes = notes.filter((note) => start <= note.start && note.start < end);
    barNotes.forEach((note) => (note.start -= start));

    const firstNote = barNotes.at(0);
    const chords =
      firstNote === undefined
        ? []
        : createDiatonicChordCandidates(rootNote, scaleType, firstNote, beatCount * minNoteDuration, octaveRange);

    return new Bar({
      notes: barNotes,
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
export function createNotes(rootNote: RootNote, intervals: Interval[], beat: Beat): Note[] {
  const initNotes: Note[] = [];
  return intervals.reduce((notes, interval, i) => {
    const prevNote = notes.at(notes.length - 1);

    const scale = SCALES[interval % SCALES.length];
    const octave = rootNote.octave + Math.floor(interval / SCALES.length);

    // 前の音符と同じ音なら音を繋げる
    if (prevNote?.scale === scale && prevNote?.octave === octave) {
      prevNote.duration += 1;
      return [...notes.slice(0, -1), prevNote];
    }

    const note = new Note({
      start: beat.start + i,
      duration: 1,
      scale,
      octave,
    });

    return [...notes, note];
  }, initNotes);
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
  octaveRange: Settings['octaveRange'],
): DiatonicChord[] {
  const chords = getDiatonicChords(rootNote, scaleType.intervals, barDuration, octaveRange);

  const chordCandidates: DiatonicChord[] = chords.filter((chord) => {
    const notes = chord.getNotes(rootNote, scaleType);
    return notes.some((note) => note.scale === barFirstNote.scale);
  });

  return chordCandidates;
}

/**
 * コードを全て生成する
 */
export function getDiatonicChords(
  rootNote: RootNote,
  intervals: Interval[],
  duration: number,
  octaveRange: Settings['octaveRange'],
): DiatonicChord[] {
  const rootNoteScaleIndex = Note.getScaleIndex(rootNote.scale);
  const scales = intervals.map((iv) => SCALES[(iv + rootNoteScaleIndex) % SCALES.length]);

  const diatonicChord = scales.map(
    (s) => new DiatonicChord({ octave: octaveRange[MIN], scale: s, start: 0, duration }),
  );

  return diatonicChord;
}
