"use client";

import { useAtomValue } from "jotai";
import styles from "./index.module.scss";
import {
  barCountAtom,
  octaveRangeAtom,
  beatCountAtom,
  minNoteDurationAtom,
} from "@/stores/settings";
import { CSSProperties, useMemo } from "react";
import { Bar, DiatonicChord, Music, Note } from "@/models";
import Block from "./Block";
import { MAX, MIN } from "@/const";

// 仮の楽譜
const music = new Music({
  bars: [
    new Bar({
      notes: [
        new Note({ scale: "C", octave: 4, start: 0, duration: 4 }),
        new Note({ scale: "D", octave: 4, start: 4, duration: 4 }),
      ],
      chord: new DiatonicChord({
        scale: "C",
        octave: 2,
        start: 0,
        duration: 16,
      }),
    }),
    new Bar({
      notes: [
        new Note({ scale: "C", octave: 5, start: 0, duration: 4 }),
        new Note({ scale: "D", octave: 5, start: 4, duration: 4 }),
      ],
      chord: new DiatonicChord({
        scale: "C",
        octave: 2,
        start: 0,
        duration: 16,
      }),
    }),
    new Bar({
      notes: [
        new Note({ scale: "C", octave: 3, start: 0, duration: 4 }),
        new Note({ scale: "D", octave: 3, start: 4, duration: 4 }),
      ],
      chord: new DiatonicChord({
        scale: "C",
        octave: 2,
        start: 0,
        duration: 16,
      }),
    }),
  ],
});

export default function Blocks() {
  const octaveRange = useAtomValue(octaveRangeAtom);
  const barCount = useAtomValue(barCountAtom);
  const beatCount = useAtomValue(beatCountAtom);
  const minNoteDuration = useAtomValue(minNoteDurationAtom);

  const style = useMemo(
    () =>
      ({
        ["--w" as string]: barCount * beatCount * 100,
        // 1小節あたりのカラム数
        ["--cols-per-bar" as string]: beatCount * minNoteDuration,
        ["--cols" as string]: barCount * beatCount * minNoteDuration,
        ["--rows" as string]: (octaveRange[MAX] - octaveRange[MIN] + 1) * 12,
      }) satisfies CSSProperties,
    [octaveRange, barCount, beatCount, minNoteDuration],
  );

  return (
    <section className={styles.blocks}>
      <div className={styles.innner} style={style}>
        {music.bars.map((bar, i) => (
          <div key={bar.id} className={styles.bar_container}>
            {bar.notes.map((note) => (
              <Block
                key={note.id}
                note={note}
                octaveRange={octaveRange}
                barIndex={i}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
