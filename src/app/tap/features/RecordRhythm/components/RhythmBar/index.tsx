'use client';

import styles from './style.module.scss';

interface ProgressBarProps {
  isPushedSpaceKey: boolean;
  progress: number;
  currentHighlightStart: number | null;
}

export default function ProgressBar({ isPushedSpaceKey, progress, currentHighlightStart }: ProgressBarProps) {
  return (
    <div className={styles.container} style={{}}>
      <div className={styles.progressContainer}>
        {/* 進捗バー */}
        {/* 現在の進捗バー */}
        <div
          className={styles.progressBar}
          style={{
            width: `${progress}%`,
          }}
        />

        {/* ハイライト区間の表示 */}
        {isPushedSpaceKey === true && currentHighlightStart !== null && (
          <div
            className={styles.highlightedSection}
            style={{
              left: `${currentHighlightStart}%`,
              width: `${progress - currentHighlightStart}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}
