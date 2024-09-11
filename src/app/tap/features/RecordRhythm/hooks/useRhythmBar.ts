import { useEffect, useState } from "react";

export function useRhythmBar(duration:number) {
  const [pushSpaceKey, setPushSpaceKey] = useState(false);
  const [progress, setProgress] = useState(0);
  const [highlightedSections, setHighlightedSections] = useState<{ start: number, end: number }[]>([]);
  const [currentHighlightStart, setCurrentHighlightStart] = useState<number | null>(null);


  const handleKeyDownSpace = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      setPushSpaceKey(true);
      console.log("Space");
    }
  };

  const handleKeyUpSpace = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      setPushSpaceKey(false);
      console.log("Space released");
    }
  };

  // useEffectでキーボードイベントを監視
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDownSpace);
    window.addEventListener("keyup", handleKeyUpSpace);

    // クリーンアップ関数でイベントリスナーを削除
    return () => {
      window.removeEventListener("keydown", handleKeyDownSpace);
      window.removeEventListener("keyup", handleKeyUpSpace);
    };
  }, []);

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
    if (pushSpaceKey) {
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
  }, [progress, pushSpaceKey]);



  return { pushSpaceKey,progress,highlightedSections,currentHighlightStart};
}
