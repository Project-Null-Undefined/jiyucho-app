'use client';

import { music } from '@/samples';
import styles from './index.module.scss';
import { useAtomValue } from 'jotai';
import { barCountAtom, beatCountAtom, minNoteDurationAtom } from '@/stores/settings';
import { CSSProperties, useMemo } from 'react';
import Select from './Select';

export default function CodeSelector() {
  const barCount = useAtomValue(barCountAtom); // 小節数
  const beatCount = useAtomValue(beatCountAtom); // 拍子
  const minNoteDuration = useAtomValue(minNoteDurationAtom); // 最小音符の長さ

  const style = useMemo(
    () =>
      ({
        // 1小節あたりのカラム数
        ['--cols-per-bar' as string]: beatCount * minNoteDuration,
        ['--bar-count' as string]: barCount,
      }) satisfies CSSProperties,
    [barCount, beatCount, minNoteDuration],
  );

  return (
    <section className={styles.code_selector_section} style={style}>
      {Array.from({ length: barCount }).map((_, i) => {
        const bar = music.bars.at(i);
        if (bar) return <Select key={bar.id} bar={bar} />;

        return (
          <span key={i} className={styles.none}>
            -
          </span>
        );
      })}
    </section>
  );
}
