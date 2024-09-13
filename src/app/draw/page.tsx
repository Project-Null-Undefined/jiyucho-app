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
    console.log('Clicked');
  };

  const onClickRewrite = () => {
    console.log('Clicked');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.freeDrawingCanvasContainer}>
          <FreeDrawingCanvas canvasRef={canvasRef} />
        </div>
        <div className={styles.confirmButtonContainer}>
          <ConfirmButton disabled={!isCurveDrawn} onClick={onClickRewrite}>
            NO
          </ConfirmButton>
          <ConfirmButton disabled={!isCurveDrawn} onClick={onClickComplete}>
            OK
          </ConfirmButton>
        </div>
        <div className={styles.drawingTextContainer}>
          <DrawingText text={isCurveDrawn ? 'Are these curves correct?' : 'Draw freely'} />
        </div>
      </div>
    </>
  );
}

export default DrawPage;
