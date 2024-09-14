'use client';

import { ReactElement } from 'react';
import FreeDrawingCanvas from './features/FreeDrawing/components/FreeDrawingCanvas';
import styles from './styles.module.scss';
import DrawingText from './features/FreeDrawing/components/DrawingText';
import { useDrawing } from './features/FreeDrawing/hooks/useDrawing';
import ConfirmButton from './features/FreeDrawing/components/ConfirmButton';

function DrawPage(): ReactElement {
  const { canvasRef, isCurveDrawn } = useDrawing();

  const onClickComplete = () => {
    // eslint-disable-next-line no-console
    console.log('Complete');
  };

  return (
    <div>
      <div className={styles.container}>
        <section className={styles.freeDrawingCanvasContainer}>
          <FreeDrawingCanvas canvasRef={canvasRef} />
        </section>
        <section className={styles.confirmButtonContainer}>
          <ConfirmButton disabled={!isCurveDrawn} onClick={onClickComplete}>
            OK
          </ConfirmButton>
        </section>
        <section className={styles.drawingTextContainer}>
          <DrawingText text={isCurveDrawn ? 'Are these curves correct?' : 'Draw freely'} />
        </section>
      </div>
      <div className={styles.drawingTextContainer}>
        <DrawingText text="Draw freely" />
      </div>
    </div>
  );
}

export default DrawPage;
