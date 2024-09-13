'use client';

import { useAtomValue } from 'jotai';
import styles from './index.module.scss';
import PianoKey from './PianoKey';
import { octaveRangeAtom } from '@/stores/settings';
import { MAX, MIN } from '@/const';

export const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;

interface Props {
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export default function Piano({ onScroll }: Props) {
  const octaveRange = useAtomValue(octaveRangeAtom);

  const length = octaveRange[MAX] - octaveRange[MIN] + 1;
  const octaves = Array.from({ length }, (_, i) => octaveRange[MAX] - i);

  return (
    <section className={styles.piano}>
      {octaves.map((octave) =>
        [...WHITE_KEYS].reverse().map((scale, i) => <PianoKey key={i} scale={scale} octave={octave} />),
      )}
    </section>
  );
}
