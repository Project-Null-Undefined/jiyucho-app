import { WHITE_KEYS } from "..";
import styles from "./index.module.scss";

interface Props {
  scale: (typeof WHITE_KEYS)[number];
  octave: number;
}

export default function PianoKey({ scale, octave }: Props) {
  switch (scale) {
    case "C":
      return <PianoKeyC octave={octave} />;
    case "D":
      return <PianoKeyD />;
    case "E":
      return <PianoKeyE />;
    case "F":
      return <PianoKeyF />;
    case "G":
      return <PianoKeyG />;
    case "A":
      return <PianoKeyA />;
    case "B":
      return <PianoKeyB />;
    default:
      throw new Error("Invalid scale");
  }
}

interface PianoKeyCProps {
  octave: number;
}
function PianoKeyC({ octave }: PianoKeyCProps) {
  return <div className={styles.key_c}>C{octave}</div>;
}

function PianoKeyD() {
  return <div className={styles.key_d} />;
}

function PianoKeyE() {
  return <div className={styles.key_e} />;
}

function PianoKeyF() {
  return <div className={styles.key_f} />;
}

function PianoKeyG() {
  return <div className={styles.key_g} />;
}

function PianoKeyA() {
  return <div className={styles.key_a} />;
}

function PianoKeyB() {
  return <div className={styles.key_b} />;
}
