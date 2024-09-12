"use client";

import { ReactElement } from "react";
import FreeDrawingCanvas from "./features/FreeDrawing/components/FreeDrawingCanvas";
import styles from "./styles.module.scss";
import DrawingText from "./features/FreeDrawing/components/DrawingText";

function DrawPage(): ReactElement {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.freeDrawingCanvasContainer}>
          <FreeDrawingCanvas />
        </div>
        <div className={styles.drawingTextContainer}>
          <DrawingText text="Draw freely" />
        </div>
      </div>
    </>
  );
}

export default DrawPage;
