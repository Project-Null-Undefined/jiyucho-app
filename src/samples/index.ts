import { Bar, DiatonicChord, Music, Note } from "@/models";

// 仮の楽譜
export const music = new Music({
  bars: [
    new Bar({
      notes: [
        new Note({ scale: "C", octave: 4, start: 0, duration: 4 }),
        new Note({ scale: "D", octave: 4, start: 4, duration: 4 }),
      ],
      chordIndex: 0,
      chords: [
        new DiatonicChord({
          scale: "C",
          octave: 2,
          start: 0,
          duration: 16,
        }),
      ],
    }),
    new Bar({
      notes: [
        new Note({ scale: "C", octave: 5, start: 0, duration: 4 }),
        new Note({ scale: "D", octave: 5, start: 4, duration: 4 }),
      ],
      chordIndex: 0,
      chords: [
        new DiatonicChord({
          scale: "C",
          octave: 2,
          start: 0,
          duration: 16,
        }),
      ],
    }),
    new Bar({
      notes: [
        new Note({ scale: "C", octave: 3, start: 0, duration: 4 }),
        new Note({ scale: "D", octave: 3, start: 4, duration: 4 }),
      ],
      chordIndex: 0,
      chords: [
        new DiatonicChord({
          scale: "C",
          octave: 2,
          start: 0,
          duration: 16,
        }),
        new DiatonicChord({
          scale: "D",
          octave: 2,
          start: 0,
          duration: 16,
        }),
        new DiatonicChord({
          scale: "E",
          octave: 2,
          start: 0,
          duration: 16,
        }),
      ],
    }),
  ],
});
