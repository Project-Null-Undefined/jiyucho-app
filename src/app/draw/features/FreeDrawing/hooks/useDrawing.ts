import { useEffect, useRef } from "react";
import paper from "paper";
import { setupDrawingTool } from "../functions/drawing";

export function useDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      paper.setup(canvas);
      setupDrawingTool();
    }

    return () => {
      paper.project.clear();
    };
  });

  return { canvasRef };
}
