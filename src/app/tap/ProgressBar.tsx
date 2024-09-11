"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/colors.module.scss";

type ProgressBarProps = {
  duration: number; // バーが満タンになるまでの時間（秒）
  highlight?: boolean; // true の場合にバーの色を変える
};

export default function ProgressBar({ duration, highlight = false }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [highlightedSections, setHighlightedSections] = useState<{ start: number, end: number }[]>([]);
  const [currentHighlightStart, setCurrentHighlightStart] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (duration*100);
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
        style={{
          ...styless.highlightedSection,
          left: `${section.start}%`,
          width: `${section.end - section.start}%`,
        }}
      />
    ));
  };

  return (
    <div style={styless.container}>
      <div style={styless.progressContainer}>
        {/* 進捗バー */}
        <div
          style={{
            ...styless.progressBar,
            width: '100%',
            backgroundColor: '#eee', // 背景色（進捗バーのベース）
            position: 'relative' as 'relative',
          }}
        >
          {/* 現在の進捗バー */}
          <div
            style={{
              ...styless.progressBar,
              width: `${progress}%`,
              position: 'absolute' as 'absolute',
              top: 0,
              left: 0,
            }}
          />

          {/* ハイライト区間の表示 */}
          {highlight && currentHighlightStart !== null && (
            <div
              style={{
                ...styless.highlightedSection,
                left: `${currentHighlightStart}%`,
                width: `${progress - currentHighlightStart}%`,
              }}
            />
          )}
          {renderHighlightedSections()}
        </div>
      </div>
      <div>
        {/* ハイライト区間のデバッグ表示 */}
        {highlightedSections.map((section, index) => (
          <div key={index}>
            {`Start: ${section.start.toFixed(2)}%, End: ${section.end.toFixed(2)}%`}
          </div>
        ))}
      </div>
    </div>
  );
}

const styless = {
  container: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressContainer: {
    width: '100%',
    height: '20px',
    display: 'flex',
    position: 'relative' as 'relative',
  },
  progressBar: {
    height: '100%',
    transition: 'width 0.1s ease-in-out',
	backgroundColor:styles.primaryLightColor,
    position: 'absolute' as 'absolute', // 進捗バーとハイライト区間の重ね表示のため
    top: 0,
    left: 0,
  },
  highlightedSection: {
    height: '100%',
    backgroundColor: styles.primaryColor, // ハイライト色（青）の透明度を調整
    position: 'absolute' as 'absolute',
    zIndex: 1,
  } as React.CSSProperties,
};

