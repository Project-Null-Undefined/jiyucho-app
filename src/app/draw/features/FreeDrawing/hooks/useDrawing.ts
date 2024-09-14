import { useEffect, useRef, useState } from 'react';
import paper from 'paper';
import { useSetAtom } from 'jotai';
import styles from '@/styles/colors.module.scss';
import { Coordinate } from '@/types/draw';
import { curveCoordinatesAtom } from '@/stores/draw';

export function useDrawing() {
  const setCurveCoordinates = useSetAtom(curveCoordinatesAtom);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isCurveDrawn, setIsCurveDrawn] = useState(false);

  useEffect(() => {
    const setupCanvas = async () => {
      const canvas = canvasRef.current;
      if (canvas) {
        paper.setup(canvas);

        const tool = new paper.Tool();
        let path: paper.Path | null = null;

        tool.onMouseDown = (event: paper.ToolEvent) => {
          if (paper.project.activeLayer.hasChildren()) {
            paper.project.activeLayer.removeChildren();
            setIsCurveDrawn(false);
          }

          path = new paper.Path();
          path.strokeColor = new paper.Color(styles.primaryColor);
          path.strokeWidth = 2;
          path.add(event.point);

          setIsCurveDrawn(false);
        };

        tool.onMouseDrag = (event: paper.ToolEvent) => {
          if (path) {
            path.add(event.point);
          }
        };

        tool.onMouseUp = () => {
          if (path) {
            path.smooth();

            const coordinates = path.segments.map((segment) => ({
              x: segment.point.x,
              y: segment.point.y,
            })) as Coordinate[];

            setCurveCoordinates(coordinates);
            setIsCurveDrawn(true);
          }
        };
      }
    };

    setupCanvas();

    return () => {
      paper.project.clear();
    };
  }, []);

  return { canvasRef, isCurveDrawn };
}
