import { Interval, ScaleType } from '@/types';
import { Coordinate } from '@/types/draw';
import { SCALES } from '@/const';

/**
 * 音程を生成する
 *
 * @param curveCoordinates 曲線の座標
 * @param totalCellCount 総セル数(小節数 * 1小節の拍数 * 1拍の分割数)
 */
export function createInterval(
  curveCoordinates: Coordinate[],
  scaleType: ScaleType,
  totalCellCount: number,
): Interval[] {
  if (curveCoordinates.length === 0) return [];

  const yMax = Math.max(...curveCoordinates.map((c) => c.point.y));
  const yMin = Math.min(...curveCoordinates.map((c) => c.point.y));
  const xMax = Math.max(...curveCoordinates.map((c) => c.point.x));
  const xMin = Math.min(...curveCoordinates.map((c) => c.point.x));

  // 正規化
  const yRate = 1 / (yMax - yMin);
  const xRate = totalCellCount / (xMax - xMin);

  const norimalizedIntervals: Interval[] = Array.from({ length: totalCellCount }).map((_, i) => {
    // x 座標が i の左右の点を取得
    const left = curveCoordinates.filter((c) => c.point.x * xRate <= i).at(-1);
    const right = curveCoordinates.filter((c) => c.point.x * xRate >= i).at(0);
    if (left === undefined || right === undefined) return 0;

    // ベジェ曲線から y 座標を求める
    const t = (i - left.point.x) / (right.point.x - left.point.x);
    const y = (1 - t) ** 2 * left.point.y + 2 * (1 - t) * t * left.handleOut.y + t ** 2 * right.handleIn.y;
    return Math.floor((y - yMin) * yRate) * SCALES.length;
  });

  const base = norimalizedIntervals.at(0) ?? 0;
  const intervals: Interval[] = norimalizedIntervals.map((interval) => {
    const diff = interval - base;

    // スケールタイプに含まれない音程の場合は最も近い音程に修正
    if (!isInScaleType(diff, base, scaleType)) return diff + 1;

    return diff;
  });

  return intervals;
}

/**
 * 音程がスケールタイプに含まれるかどうか
 *
 * @param interval
 * @param scaleType
 * @returns
 */
function isInScaleType(interval: Interval, base: number, scaleType: ScaleType): boolean {
  const intervalsByBase = scaleType.intervals.reduce(
    (acc, cur) => {
      const prev = acc.at(-1) ?? 0;
      return [...acc, prev + cur];
    },
    [0],
  );

  return intervalsByBase.includes((interval - base) % SCALES.length);
}
