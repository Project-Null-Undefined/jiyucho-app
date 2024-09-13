import { ReactElement } from 'react';
import { useDrawing } from '../../hooks/useDrawing';
import styles from './styles.module.scss';

function FreeDrawingCanvas(): ReactElement {
  const { canvasRef } = useDrawing();

  return <canvas className={styles.canvas} ref={canvasRef} />;
}

export default FreeDrawingCanvas;
