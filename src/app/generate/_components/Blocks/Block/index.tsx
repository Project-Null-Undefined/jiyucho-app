import { Settings } from "@/tyeps";
import styles from "./index.module.scss";
import { Note } from "@/models";

interface Props {
  note: Note;
  octaveRange: Settings["octaveRange"];
  barIndex: number;
}

export default function Block({ note, octaveRange, barIndex }: Props) {
  return (
    <div
      className={styles.block}
      style={note.getPositionStyleVars(barIndex, octaveRange)}
    >
      <span>{note.getName()}</span>
    </div>
  );
}
