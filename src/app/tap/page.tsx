"use client";

import RhythmBar from "@/app/tap/features/RecordRhythm/components/RhythmBar";
import styles from "./style.module.scss";
export default function MainPage() {
  return (
    <>
      <div className={styles.rhythmBar}>
        <RhythmBar duration={10}  barWidth={70} />
      </div>
    </>
  );
}
