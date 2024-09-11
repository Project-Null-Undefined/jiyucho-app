import styles from "./index.module.scss";
import PianoKey from "./PianoKey";

const MAX_OCTAVE = 4;
const MIN_OCTAVE = 2;
export const WHITE_KEYS = ["C", "D", "E", "F", "G", "A", "B"] as const;

export default function Piano() {
  const length = MAX_OCTAVE - MIN_OCTAVE + 1;
  const octaves = Array.from({ length }, (_, i) => MAX_OCTAVE - i);

  return (
    <section className={styles.piano}>
      {octaves.map((octave) =>
        [...WHITE_KEYS]
          .reverse()
          .map((scale, i) => (
            <PianoKey key={i} scale={scale} octave={octave} />
          )),
      )}
    </section>
  );
}
