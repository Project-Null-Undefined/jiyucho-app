'use client';

import { useRef } from 'react';
import Blocks from './_components/Blocks';
import CodeSelector from './_components/CodeSelector';
import Controller from './_components/Controller';
import Piano from './_components/Piano';
import styles from './page.module.scss';
import { useAtomValue } from 'jotai';
import { musicAtom } from '@/stores/music';

export default function Page() {
  const firstElement = useRef<HTMLElement>(null);
  const secondElement = useRef<HTMLElement>(null);
  const music = useAtomValue(musicAtom);

  const scrollSyncHandler = (e: React.UIEvent<HTMLElement, UIEvent>, ref: React.RefObject<HTMLElement>) => {
    if (e.target instanceof HTMLElement === false) return;
    const { scrollLeft } = e.target;
    ref.current?.scrollTo({ left: scrollLeft });
  };

  return (
    <main className={styles.main}>
      <div className={styles.piano_area}>
        <Piano />
        <Blocks music={music} ref={firstElement} onScroll={(e) => scrollSyncHandler(e, secondElement)} />
      </div>
      <CodeSelector music={music} ref={secondElement} onScroll={(e) => scrollSyncHandler(e, firstElement)} />
      <Controller />
    </main>
  );
}
