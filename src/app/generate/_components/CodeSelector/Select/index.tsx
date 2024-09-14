import { Bar } from '@/models';
import styles from './index.module.scss';

interface Props {
  bar: Bar;
}

export default function Select({ bar }: Props) {
  return (
    <div className={styles.select_container}>
      <select className={styles.select}>
        {bar.chords.map((chord, i) => (
          <option key={chord.id} value={i}>
            {chord.getTypeName()}
          </option>
        ))}
      </select>
    </div>
  );
}
