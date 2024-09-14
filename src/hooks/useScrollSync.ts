import { RefObject, useCallback, useEffect, useRef } from 'react';

export default function useScrollSync() {
  const ref1 = useRef<HTMLElement>(null);
  const ref2 = useRef<HTMLElement>(null);

  const scrollSyncHandler = useCallback((e: Event, ref: RefObject<HTMLElement>) => {
    const { scrollLeft } = e.target as HTMLElement;
    ref.current?.scrollTo({ left: scrollLeft });
  }, []);

  useEffect(() => {
    ref1.current?.addEventListener('scroll', (e) => scrollSyncHandler(e, ref2));
    ref2.current?.addEventListener('scroll', (e) => scrollSyncHandler(e, ref1));

    return () => {
      ref1.current?.removeEventListener('scroll', (e) => scrollSyncHandler(e, ref2));
      ref2.current?.removeEventListener('scroll', (e) => scrollSyncHandler(e, ref1));
    };
  }, []);

  return { ref1, ref2 } as const;
}
