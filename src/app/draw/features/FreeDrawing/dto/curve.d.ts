export interface Coordinate {
  x: number;
  y: number;
}

export interface CurveInformationDto {
  coordinates: Coordinate[];
  length: number;
}
