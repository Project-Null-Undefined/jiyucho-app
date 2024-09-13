import { BAR_NUM, NOTE_NUM } from '../const';
import { Coordinate } from '../dto/curve';

export function splitCurve(coordinates: Coordinate[]): Coordinate[] {
  const resultCurve = Array.from(
    { length: BAR_NUM * NOTE_NUM },
    (_, i) => coordinates[Math.floor((i * coordinates.length) / (BAR_NUM * NOTE_NUM))],
  );

  return resultCurve;
}
