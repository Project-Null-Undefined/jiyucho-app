"use client";

import RhythmBar from "@/app/tap/features/RecordRhythm/components/RhythmBar";
import RhythmText from "./features/RecordRhythm/components/RhythmText";
import variables from "@/styles/variables.module.scss"
import styles from "./style.module.scss";
export default function MainPage() {
  return (
    <>
      <div className={styles.container}>
        <RhythmBar duration={10}  barWidth={70} />
        <div className={styles.text}>
        <RhythmText text={"Tap to"} fontsize={variables.fontSizeXl}/>
        </div>
        
      </div>
    </>
  );
}
