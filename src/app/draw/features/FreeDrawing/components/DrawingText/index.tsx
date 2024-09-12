import { ReactElement } from "react";
import styles from "./styles.module.scss";

type Props = {
  text: string;
};

function DrawingText({ text }: Props): ReactElement {
  return (
    <div className={styles.container}>
      <p>{text}</p>
    </div>
  );
}

export default DrawingText;
