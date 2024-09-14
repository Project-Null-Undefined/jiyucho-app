'use client';

import RhythmBar from '@/app/tap/features/RecordRhythm/components/RhythmBar';
import RhythmText from './features/RecordRhythm/components/RhythmText';
import variables from '@/styles/variables.module.scss';
import styles from './style.module.scss';
import { useRhythmBar } from './features/RecordRhythm/hooks/useRhythmBar';
import HighlightedSections from './features/RecordRhythm/components/HighlightedSections';

export default function MainPage() {
  const { pushSpaceKey, progress, highlightedSections, currentHighlightStart } = useRhythmBar(10);

  return (
    <div className={styles.container}>
      <div className={styles.rhythmBarContainer}>
        <RhythmBar currentHighlightStart={currentHighlightStart} isPushedSpaceKey={pushSpaceKey} progress={progress} />
        <HighlightedSections highlightedSections={highlightedSections} />
      </div>

      <div className={styles.text}>
        <RhythmText fontsize={variables.fontSizeXl} text="Tap to" />
      </div>
    </div>
  );
}
