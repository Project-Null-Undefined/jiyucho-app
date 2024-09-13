import { HighlightedSection } from "../types";

import { Beat } from "@/models";
import { ONE_BAR } from "../const";

/**
 * highlightMap2Beat
 * 
 * HighlightedSection 配列を Beat 配列に変換する関数です。
 * 各ハイライト区間の開始位置と終了位置をもとに、開始位置 (start) と音の長さ (duration) を計算します。
 * start と duration が同じ場合、そのビートは無視されます。
 * 
 * @param {HighlightedSection[]} highlightMap - ハイライト区間を表す配列
 * @param {number} numberOfBar - 小節数。1小節あたり4拍として計算されます
 * @returns {Beat[]} - Beat の配列
 */

export function highlightMap2Beat(
  highlightMap: HighlightedSection[],
  numberOfBar: number
): Beat[] {
  const length = numberOfBar * ONE_BAR;
  const minBeat = 100 / length;

  return highlightMap
    .map((section) => {
      const start = Math.round(section.start / minBeat);
      const duration = Math.round(section.end / minBeat);
      return new Beat(start, duration);
    })
    .filter((beat) => beat.start !== beat.duration); // startとdurationが同じなら無視
}
