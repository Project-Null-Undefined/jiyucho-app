"use client";

import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import colors from "@/styles/colors.module.scss";

type ProgressBarProps = {
  duration: number; // バーが満タンになるまでの時間（秒）
  highlight?: boolean; // true の場合にバーの色を変える
  barWidth:number;
};

export default function ProgressBar({ duration, highlight = false ,barWidth}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [highlightedSections, setHighlightedSections] = useState<{ start: number, end: number }[]>([]);
  const [currentHighlightStart, setCurrentHighlightStart] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (duration * 100);
        const newProgress = parseFloat((prev + increment).toFixed(2));
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    if (highlight) {
      if (currentHighlightStart === null && progress < 100) {
        setCurrentHighlightStart(progress);
      }
    } else {
      if (currentHighlightStart !== null) {
        setHighlightedSections((prev) => [
          ...prev,
          { start: currentHighlightStart, end: progress },
        ]);
        setCurrentHighlightStart(null);
      }
    }
  }, [progress, highlight]);

  // ハイライト区間の表示
  const renderHighlightedSections = () => {
    return highlightedSections.map((section, index) => (
      <div
        key={index}
        className={styles.highlightedSection}
        style={{
          left: `${section.start}%`,
          width: `${section.end - section.start}%`,
          backgroundColor: colors.primaryColor, // ハイライト色の適用
        }}
      />
    ));
  };

  return (
    <div 
	  className={styles.container}
	  style={{
		width: `${barWidth}%`
	  }}
	>
      <div className={styles.progressContainer}>
        {/* 進捗バー */}
        <div
          className={styles.progressBar}
          style={{
            width: '100%',
            backgroundColor: '#eee', // 背景色（進捗バーのベース）
            position: 'relative',
          }}
        >
          {/* 現在の進捗バー */}
          <div
            className={styles.progressBar}
            style={{
              width: `${progress}%`,
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: colors.primaryLightColor, // 進捗バーの色
            }}
          />

          {/* ハイライト区間の表示 */}
          {highlight && currentHighlightStart !== null && (
            <div
              className={styles.highlightedSection}
              style={{
                left: `${currentHighlightStart}%`,
                width: `${progress - currentHighlightStart}%`,
                backgroundColor: colors.primaryColor, // ハイライト色の適用
              }}
            />
          )}
          {renderHighlightedSections()}
        </div>
      </div>
    </div>
  );
}
