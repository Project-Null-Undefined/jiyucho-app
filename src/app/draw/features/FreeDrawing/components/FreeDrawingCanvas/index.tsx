import { ReactElement, RefObject } from 'react';

import styles from './styles.module.scss';

type Props = {
  canvasRef: RefObject<HTMLCanvasElement>;
};

function FreeDrawingCanvas({ canvasRef }: Props): ReactElement {
  return <canvas ref={canvasRef} className={styles.canvas} />;
}

export default FreeDrawingCanvas;
