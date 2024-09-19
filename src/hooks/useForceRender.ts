import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

export const forceRenderAtom = atom(false);

export default function useForceRender() {
  const [, setForceRender] = useAtom(forceRenderAtom);

  const render = useCallback(() => {
    setForceRender((prev) => !prev);
  }, []);

  return render;
}
