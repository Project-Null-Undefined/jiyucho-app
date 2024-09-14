import { Interval, ScaleInterval } from '@/types';
import { Coordinate } from '@/types/draw';
import { HALF_NOTE, SCALE_NUM, WHOLE_NOTE } from '@/const/draw';

export function createInterval(curveCoordinates: Coordinate[]): Interval[] {
  const yBase = curveCoordinates[0].y;
  const yMax = Math.max(...curveCoordinates.map((c) => c.y - yBase));
  const yMin = Math.min(...curveCoordinates.map((c) => c.y - yBase));
  const yMaxAbs = Math.max(Math.abs(yMax), Math.abs(yMin));

  const normalizedCurve = curveCoordinates.map((c) => ({
    x: c.x,
    y: Math.abs((c.y - yBase) / yMaxAbs),
  }));
  const scaledCurveY: ScaleInterval[] = normalizedCurve.map((nc) => {
    return Math.floor(nc.y * SCALE_NUM) as ScaleInterval;
  });

  const interval: Interval[] = scaledCurveY.map((scy) => {
    if (WHOLE_NOTE.includes(scy)) {
      return 2;
    } else if (HALF_NOTE.includes(scy)) {
      return 1;
    } else {
      return 0;
    }
  });

  return interval;
}
