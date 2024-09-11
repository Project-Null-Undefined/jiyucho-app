"use client";

import { useAtomValue } from "jotai";
import styles from "./index.module.scss";
import PianoKey from "./PianoKey";
import { octaveRangeAtom } from "@/stores/settings";

export const WHITE_KEYS = ["C", "D", "E", "F", "G", "A", "B"] as const;

export default function Piano() {
  const octaveRange = useAtomValue(octaveRangeAtom);

  const length = octaveRange[1] - octaveRange[0] + 1;
  const octaves = Array.from({ length }, (_, i) => octaveRange[1] - i);

  return (
    <section className={styles.piano}>
      {octaves.map((octave) =>
        [...WHITE_KEYS]
          .reverse()
          .map((scale, i) => (
            <PianoKey key={i} scale={scale} octave={octave} />
          )),
      )}
    </section>
  );
}
