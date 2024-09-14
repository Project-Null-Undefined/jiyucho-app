import { ReactElement, RefObject } from 'react';

import styles from './styles.module.scss';

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
}

function FreeDrawingCanvas({ canvasRef }: Props): ReactElement {
  return <canvas className={styles.canvas} ref={canvasRef} />;
}

export default FreeDrawingCanvas;
