import paper from "paper";
import styles from "@/styles/colors.module.scss";
import { Coordinate, CurveInformationDto } from "../dto/curve";

function handleMouseDown(event: paper.ToolEvent): paper.Path {
  const newPath = new paper.Path();
  newPath.strokeColor = new paper.Color(styles.primaryColor);
  newPath.strokeWidth = 2;
  newPath.add(event.point);
  return newPath;
}

function handleMouseDrag(event: paper.ToolEvent, path: paper.Path | null) {
  if (path) {
    path.add(event.point);
  }
}

async function handleMouseUp(
  path: paper.Path | null
): Promise<CurveInformationDto> {
  let curveInformation: CurveInformationDto = { coordinates: [], length: 0 };

  if (path) {
    path.smooth();
    const coordinates: Coordinate[] = path.segments.map(
      (segment: paper.Segment) => ({
        x: segment.point.x,
        y: segment.point.y,
      })
    );
    const length = path.length;

    curveInformation = { coordinates, length };
  }

  return curveInformation;
}

export async function curveDraw(): Promise<CurveInformationDto> {
  let path: paper.Path | null = null;
  let curveInformation: CurveInformationDto = { coordinates: [], length: 0 };

  return new Promise((resolve) => {
    const tool = new paper.Tool();

    // イベントハンドラの呼び出し
    tool.onMouseDown = (event: paper.ToolEvent) => {
      path = handleMouseDown(event);
    };

    tool.onMouseDrag = (event: paper.ToolEvent) => {
      handleMouseDrag(event, path);
    };

    tool.onMouseUp = async () => {
      curveInformation = await handleMouseUp(path);

      resolve(curveInformation);
    };
  });
}
