import { Bar, DiatonicChord, Music, Note } from '@/models';

// 仮の楽譜
export const music = new Music({
  bars: [
    new Bar({
      notes: [
        new Note({ scale: 'C', octave: 4, start: 0, duration: 2 }),
        new Note({ scale: 'C', octave: 4, start: 2, duration: 2 }),
        new Note({ scale: 'D', octave: 4, start: 4, duration: 4 }),
        new Note({ scale: 'E', octave: 4, start: 8, duration: 4 }),
        new Note({ scale: 'G', octave: 4, start: 14, duration: 2 }),
      ],
      chordIndex: 0,
      chords: [
        new DiatonicChord({ scale: 'C', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'F', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'A', octave: 2, start: 0, duration: 16 }),
      ],
    }),
    new Bar({
      notes: [
        new Note({ scale: 'C', octave: 4, start: 0, duration: 4 }),
        new Note({ scale: 'C', octave: 4, start: 6, duration: 2 }),
        new Note({ scale: 'F', octave: 4, start: 8, duration: 2 }),
        new Note({ scale: 'E', octave: 4, start: 10, duration: 2 }),
        new Note({ scale: 'D', octave: 4, start: 12, duration: 2 }),
        new Note({ scale: 'C', octave: 4, start: 14, duration: 2 }),
      ],
      chordIndex: 2,
      chords: [
        new DiatonicChord({ scale: 'C', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'F', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'A', octave: 2, start: 0, duration: 16 }),
      ],
    }),
    new Bar({
      notes: [
        new Note({ scale: 'D', octave: 4, start: 0, duration: 8 }),
        new Note({ scale: 'B', octave: 3, start: 8, duration: 8 }),
      ],
      chordIndex: 0,
      chords: [
        new DiatonicChord({ scale: 'D', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'G', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'B', octave: 3, start: 0, duration: 16 }),
      ],
    }),
    new Bar({
      notes: [
        new Note({ scale: 'C', octave: 4, start: 0, duration: 2 }),
        new Note({ scale: 'A', octave: 3, start: 14, duration: 2 }),
      ],
      chordIndex: 0,
      chords: [
        new DiatonicChord({ scale: 'C', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'F', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'A', octave: 2, start: 0, duration: 16 }),
      ],
    }),
    new Bar({
      notes: [
        new Note({ scale: 'C', octave: 4, start: 0, duration: 2 }),
        new Note({ scale: 'C', octave: 4, start: 2, duration: 2 }),
        new Note({ scale: 'D', octave: 4, start: 4, duration: 4 }),
        new Note({ scale: 'E', octave: 4, start: 8, duration: 4 }),
        new Note({ scale: 'G', octave: 4, start: 14, duration: 2 }),
      ],
      chordIndex: 0,
      chords: [
        new DiatonicChord({ scale: 'C', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'F', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'A', octave: 2, start: 0, duration: 16 }),
      ],
    }),
    new Bar({
      notes: [
        new Note({ scale: 'F', octave: 4, start: 0, duration: 8 }),
        new Note({ scale: 'E', octave: 4, start: 14, duration: 2 }),
      ],
      chordIndex: 0,
      chords: [
        new DiatonicChord({ scale: 'F', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'B', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'D', octave: 3, start: 0, duration: 16 }),
      ],
    }),
    new Bar({
      notes: [
        new Note({ scale: 'D', octave: 4, start: 0, duration: 2 }),
        new Note({ scale: 'C', octave: 4, start: 2, duration: 2 }),
        new Note({ scale: 'D', octave: 4, start: 4, duration: 2 }),
        new Note({ scale: 'E', octave: 4, start: 6, duration: 2 }),
        new Note({ scale: 'A', octave: 4, start: 8, duration: 2 }),
        new Note({ scale: 'G', octave: 4, start: 10, duration: 2 }),
        new Note({ scale: 'D', octave: 4, start: 12, duration: 2 }),
        new Note({ scale: 'E', octave: 4, start: 14, duration: 2 }),
      ],
      chordIndex: 0,
      chords: [
        new DiatonicChord({ scale: 'D', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'G', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'B', octave: 3, start: 0, duration: 16 }),
      ],
    }),
    new Bar({
      notes: [new Note({ scale: 'C', octave: 4, start: 0, duration: 8 })],
      chordIndex: 0,
      chords: [
        new DiatonicChord({ scale: 'C', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'F', octave: 3, start: 0, duration: 16 }),
        new DiatonicChord({ scale: 'A', octave: 2, start: 0, duration: 16 }),
      ],
    }),
  ],
});
