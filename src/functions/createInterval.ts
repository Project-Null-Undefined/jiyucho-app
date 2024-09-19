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
    const left = curveCoordinates.filter((c) => (c.point.x - xMin) * xRate <= i).at(-1);
    const right = curveCoordinates.filter((c) => (c.point.x - xMin) * xRate >= i).at(0);

    if (left === undefined || right === undefined) return 0;

    const y = getBezierY(i, left, right);
    return Math.floor((yMax - y - yMin) * yRate * SCALES.length);
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

function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

/**
 * ベジェ曲線の y 座標を取得する
 */
function getBezierY(x: number, left: Coordinate, right: Coordinate): number {
  // 左側のポイントのハンドル位置を計算
  const p0 = left.point;
  const p1 = left.handleOut ? { x: p0.x + left.handleOut.x, y: p0.y + left.handleOut.y } : p0;
  // 右側のポイントのハンドル位置を計算
  const p3 = right.point;
  const p2 = right.handleIn ? { x: p3.x + right.handleIn.x, y: p3.y + right.handleIn.y } : p3;

  // ニュートン法やバイナリサーチで t を求めて y を返す
  let t = 0.5;
  let lower = 0;
  let upper = 1;

  for (let j = 0; j < 20; j++) {
    const xt = cubicBezier(t, p0.x, p1.x, p2.x, p3.x);
    if (Math.abs(xt - x) < 0.001) {
      return cubicBezier(t, p0.y, p1.y, p2.y, p3.y);
    }
    if (xt < x) {
      lower = t;
    } else {
      upper = t;
    }
    t = (lower + upper) / 2;
  }

  return cubicBezier(t, p0.y, p1.y, p2.y, p3.y);
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
