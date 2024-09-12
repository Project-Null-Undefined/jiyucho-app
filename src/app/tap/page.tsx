"use client";

import RhythmBar from "@/app/tap/features/RecordRhythm/components/RhythmBar";
import RhythmText from "./features/RecordRhythm/components/RhythmText";
import variables from "@/styles/variables.module.scss"
import styles from "./style.module.scss";
import { useRhythmBar } from "./features/RecordRhythm/hooks/useRhythmBar";
import HighlightedSections from "./features/RecordRhythm/components/HighlightedSections";
export default function MainPage() {
  const { pushSpaceKey,progress,highlightedSections,currentHighlightStart} = useRhythmBar(10)
  return (
    
    <>
      <div className={styles.container}>
        <RhythmBar barWidth={70} pushSpaceKey={pushSpaceKey}progress={progress}currentHighlightStart={currentHighlightStart}/>
        <HighlightedSections highlightedSections={highlightedSections}/>
        <div className={styles.text}>
        <RhythmText text={"Tap to"} fontsize={variables.fontSizeXl}/>
        </div>
        
      </div>
    </>
  );
}
