import { HighlightedSection } from "../types";

import { Beat } from "@/models";

export function highlightMap2Beat(
  highlightMap: HighlightedSection[],
  numberOfBar: number
): Beat[] {
  const length = numberOfBar * 16;
  const minBeat = 100 / length;

  return highlightMap
    .map((section) => {
      const start = Math.round(section.start / minBeat);
      const duration = Math.round(section.end / minBeat);
      return new Beat(start, duration);
    })
    .filter((beat) => beat.start !== beat.duration); // startとdurationが同じなら無視
}
