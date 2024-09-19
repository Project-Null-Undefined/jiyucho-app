import { CSSProperties } from 'react';
import styles from './index.module.scss';

interface Props {
  playbackPosition: number;
}

export default function SeekBar({ playbackPosition }: Props) {
  const style: CSSProperties = {
    ['--p' as string]: playbackPosition + 1,
  };

  return <div className={styles.seek_bar} style={style} />;
}
