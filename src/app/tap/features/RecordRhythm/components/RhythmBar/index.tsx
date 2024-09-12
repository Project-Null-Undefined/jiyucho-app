"use client";

import styles from "./style.module.scss";
import colors from "@/styles/colors.module.scss";
import { useRhythmBar } from "../../hooks/useRhythmBar";
import HighlightedSections from "../HighlightedSections";

type ProgressBarProps = {
  barWidth:number;
  pushSpaceKey:boolean;
  progress:number;
  currentHighlightStart:number|null;

};

export default function ProgressBar({ barWidth ,pushSpaceKey,progress,currentHighlightStart}: ProgressBarProps) {
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
            backgroundColor: '#eee', // 背景色（バーのベース）
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
              backgroundColor: colors.primaryLightColor, // バーの色
            }}
          />

          {/* ハイライト区間の表示 */}
          {pushSpaceKey && currentHighlightStart !== null && (
            <div
              className={styles.highlightedSection}
              style={{
                left: `${currentHighlightStart}%`,
                width: `${progress - currentHighlightStart}%`,
                backgroundColor: colors.primaryColor, // ハイライト色の適用
              }}
            />
          )}
          {/* <HighlightedSections highlightedSections={highlightedSections}/> */}
        </div>
      </div>
    </div>
  );
}
