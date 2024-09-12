import { HighlightedSection } from "../types";

class Beat {
  start: number;
  duration: number;

  constructor(start: number, duration: number) {
    this.start = start;
    this.duration = duration;
  }
}

export function highlightMap2Beat(
  highlightMap: HighlightedSection[],
  numberOfBar: number
): Beat[] {
  const length = numberOfBar * 16;
  // 1/4拍に相当する割合
  const minBeat = 100 / length;

  return highlightMap.map((section) => {
    const start = section.start / minBeat;
    const duration = section.end / minBeat;
    return new Beat(start, duration);
  });
}
