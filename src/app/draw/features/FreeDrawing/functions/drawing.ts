import paper from 'paper';

export function setupDrawingTool() {
  let path: paper.Path | null = null;

  const tool = new paper.Tool();

  tool.onMouseDown = (event: paper.ToolEvent) => {
    path = new paper.Path();
    path.strokeColor = new paper.Color('#4597f8');
    path.strokeWidth = 2;
    path.add(event.point);
  };

  tool.onMouseDrag = (event: paper.ToolEvent) => {
    if (path) {
      path.add(event.point);
    }
  };

  tool.onMouseUp = () => {
    if (path) {
      path.smooth();
    }
  };

  return tool;
}
