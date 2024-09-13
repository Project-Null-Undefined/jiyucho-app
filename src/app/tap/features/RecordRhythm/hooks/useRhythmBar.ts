import { useEffect, useState } from 'react';
import { highlightMap2Beat } from '../functions/highlightMap2Beat';

export function useRhythmBar(duration: number) {
  const [pushSpaceKey, setPushSpaceKey] = useState(false);
  const [progress, setProgress] = useState(0);
  const [highlightedSections, setHighlightedSections] = useState<{ start: number; end: number }[]>([]);
  const [currentHighlightStart, setCurrentHighlightStart] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false); // 進行状況の開始フラグ
  const [isFinished, setIsFinished] = useState(false);

  const handleKeyDownSpace = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      setPushSpaceKey(true);
      console.log('Space pressed');

      if (!isStarted) {
        // まだ開始していない場合は進行状況を開始
        setIsStarted(true);
      }
    }
  };

  const handleKeyUpSpace = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      setPushSpaceKey(false);
      console.log('Space released');
    }
  };

  // useEffectでキーボードイベントを監視
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownSpace);
    window.addEventListener('keyup', handleKeyUpSpace);

    // クリーンアップ関数でイベントリスナーを削除
    return () => {
      window.removeEventListener('keydown', handleKeyDownSpace);
      window.removeEventListener('keyup', handleKeyUpSpace);
    };
  }, []);

  useEffect(() => {
    if (!isStarted) return; // 進行状況が始まっていない場合は何もしない

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (duration * 10);
        const newProgress = parseFloat((prev + increment).toFixed(2));
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isStarted, duration]);

  useEffect(() => {
    if (pushSpaceKey) {
      if (currentHighlightStart === null && progress < 100) {
        setCurrentHighlightStart(progress);
      }
    } else {
      if (currentHighlightStart !== null) {
        setHighlightedSections((prev) => [...prev, { start: currentHighlightStart, end: progress }]);
        setCurrentHighlightStart(null);
      }
    }
    if (progress >= 100 && !pushSpaceKey) {
      setIsFinished(true);
    }
  }, [progress, pushSpaceKey]);

  useEffect(() => {
    const Beat = highlightMap2Beat(highlightedSections, 8);
  }, [isFinished]);

  return { pushSpaceKey, progress, highlightedSections, currentHighlightStart, isStarted };
}
