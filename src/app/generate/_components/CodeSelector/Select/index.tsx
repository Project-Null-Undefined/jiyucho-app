import { Bar } from '@/models';
import styles from './index.module.scss';
import useForceRender from '@/hooks/useForceRender';

interface Props {
  bar: Bar;
}

export default function Select({ bar }: Props) {
  const forceRender = useForceRender();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    bar.chordIndex = index;
    forceRender();
  };

  return (
    <div className={styles.select_container}>
      <select className={styles.select} defaultValue={bar.chordIndex} onChange={handleChange}>
        {bar.chords.map((chord, i) => (
          <option key={chord.id} value={i}>
            {chord.getTypeName()}
          </option>
        ))}
      </select>
    </div>
  );
}
