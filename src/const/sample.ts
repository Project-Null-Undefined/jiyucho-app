import { Bar, DiatonicChord, Music, Note } from '@/models';

const music: Music = new Music({
  bars: [
    new Bar({
      notes: [
        new Note({
          start: 0,
          duration: 8,
          octave: 4,
          scale: 'C',
        }),
      ],
      chordIndex: 0,
      chords: [
        new DiatonicChord({
          start: 0,
          duration: 16,
          octave: 2,
          scale: 'C',
        }),
      ],
    }),
  ],
});
