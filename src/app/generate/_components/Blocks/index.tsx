"use client";

import { useAtomValue } from "jotai";
import styles from "./index.module.scss";
import {
  barCountAtom,
  octaveRangeAtom,
  beatCountAtom,
} from "@/stores/settings";

export default function Blocks() {
  const octaveRange = useAtomValue(octaveRangeAtom);
  const barCount = useAtomValue(barCountAtom);
  const beatCount = useAtomValue(beatCountAtom);

  return (
    <section className={styles.block}>
      <p>ブロック</p>
    </section>
  );
}
