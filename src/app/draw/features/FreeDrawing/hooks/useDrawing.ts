import { useEffect, useRef, useState } from 'react';
import paper from 'paper';
import { curveDraw } from '../functions/curveDraw';
import { splitCurve } from '../functions/curveSprit';
import { createInterval } from '../functions/intervalCreate';

export function useDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCurveDrawn, setIsCurveDrawn] = useState(false);

  useEffect(() => {
    const setupCanvas = async () => {
      const canvas = canvasRef.current;
      if (canvas) {
        paper.setup(canvas);
        const curveInformation = await curveDraw();
        const curveCoordinates = splitCurve(curveInformation.coordinates);
        const interval = createInterval(curveCoordinates);
      }
    };

    setupCanvas();

    return () => {
      paper.project.clear();
    };
  });
  return { canvasRef, isCurveDrawn };
}
