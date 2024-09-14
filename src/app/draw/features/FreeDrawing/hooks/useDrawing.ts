import { useEffect, useRef, useState } from 'react';
import paper from 'paper';
import { curveDraw } from '../functions/curveDraw';
import { splitCurve } from '../functions/curveSprit';
import { createInterval } from '../functions/intervalCreate';
import { useAtomValue } from 'jotai';
import { barCountAtom, beatCountAtom } from '@/stores/settings';

export function useDrawing() {
  const barCount = useAtomValue(barCountAtom);
  const beatCount = useAtomValue(beatCountAtom);
  const totalBeatCount = barCount * beatCount;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCurveDrawn, setIsCurveDrawn] = useState(false);

  useEffect(() => {
    const setupCanvas = async () => {
      const canvas = canvasRef.current;
      if (canvas) {
        paper.setup(canvas);
        const curveInformation = await curveDraw();
        const curveCoordinates = splitCurve(curveInformation.coordinates, totalBeatCount);
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
