'use client';

import RhythmBar from '@/app/tap/features/RecordRhythm/components/RhythmBar';
import RhythmText from './features/RecordRhythm/components/RhythmText';
import ConfirmButton from './features/RecordRhythm/components/ConfirmButton';
import variables from '@/styles/variables.module.scss';
import styles from './style.module.scss';
import { useRhythmBar } from './features/RecordRhythm/hooks/useRhythmBar';
import HighlightedSections from './features/RecordRhythm/components/HighlightedSections';
import { useRouter } from 'next/navigation';
export default function MainPage() {
  const router = useRouter();
  const onClickComplete = () => {
    router.push('/generate');
  };
  const onClickRetake = () => {
    reset();
  };
  const { pushSpaceKey, progress, highlightedSections, currentHighlightStart, isFinished, reset } = useRhythmBar(10);
  return (
    <div className={styles.container}>
      <div className={styles.rhythmBarContainer}>
        <RhythmBar currentHighlightStart={currentHighlightStart} isPushedSpaceKey={pushSpaceKey} progress={progress} />
        <HighlightedSections highlightedSections={highlightedSections} />
      </div>

      <div className={styles.text}>
        <RhythmText fontsize={variables.fontSizeXl} text="Tap to" />
      </div>

      <div className={styles.button}>
        <ConfirmButton disabled={!isFinished} onClick={onClickRetake}>
          Retake
        </ConfirmButton>

        <ConfirmButton disabled={!isFinished} onClick={onClickComplete}>
          OK
        </ConfirmButton>
      </div>
    </div>
  );
}
