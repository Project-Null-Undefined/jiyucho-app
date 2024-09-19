import { musicAtom } from '@/stores/music';
import { playbackPositionAtom } from '@/stores/playbackPosition';
import { barCountAtom, beatCountAtom, bpnAtom, minNoteDurationAtom } from '@/stores/settings';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useRef } from 'react';

const isPlayingAtom = atom(false);

export default function usePlayer() {
  const _music = useAtomValue(musicAtom);

  const playbackPositionRef = useRef(0);
  const playIntervalRef = useRef<NodeJS.Timeout>();
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  const setPlaybackPosition = useSetAtom(playbackPositionAtom);
  const bpm = useAtomValue(bpnAtom);
  const barCount = useAtomValue(barCountAtom);
  const beatCount = useAtomValue(beatCountAtom);
  const minNoteDuration = useAtomValue(minNoteDurationAtom);

  const setPlayinterval = useCallback((interval: NodeJS.Timeout | undefined) => {
    playIntervalRef.current = interval;
    setIsPlaying(interval !== undefined);
  }, []);

  const _playNote = useCallback((frequency: number, durationSec: number) => {
    const context = new AudioContext();

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    oscillator.start();
    gainNode.gain.setValueAtTime(1, context.currentTime);

    const stopTime = context.currentTime + durationSec;
    gainNode.gain.exponentialRampToValueAtTime(0.001, stopTime);
    oscillator.stop(stopTime);

    const stop = () => oscillator.stop();
    return stop;
  }, []);

  /**
   * 再生
   */
  const play = useCallback(() => {
    const finalBeat = barCount * beatCount * minNoteDuration;

    // 1拍の時間
    const beatDuration = 60 / bpm;
    // 最小音符の時間
    const minNoteDurationTime = beatDuration / minNoteDuration;

    const interval = setInterval(() => {
      const next = playbackPositionRef.current + 1;

      if (next <= finalBeat) {
        playbackPositionRef.current = next;
        setPlaybackPosition(next);
      } else {
        clearInterval(interval);
        setPlayinterval(undefined);
      }
    }, minNoteDurationTime * 1000);

    setPlayinterval(interval);
  }, [bpm, barCount, beatCount, minNoteDuration]);

  /**
   * 一時停止
   */
  const pause = useCallback(() => {
    clearInterval(playIntervalRef.current);
    setPlayinterval(undefined);
  }, []);

  /**
   * 次の小節の先頭に移動
   */
  const nextBar = useCallback(() => {
    const diff = playbackPositionRef.current % (beatCount * minNoteDuration);
    const next = playbackPositionRef.current + (beatCount * minNoteDuration - diff);
    playbackPositionRef.current = next;
    setPlaybackPosition(next);
  }, [beatCount, minNoteDuration]);

  /**
   * 前の小節の先頭に移動
   */
  const prevBar = useCallback(() => {
    playbackPositionRef.current -= 1;
    const diff = playbackPositionRef.current % (beatCount * minNoteDuration);
    const prev = playbackPositionRef.current - diff;
    playbackPositionRef.current = prev;
    setPlaybackPosition(prev);
  }, [beatCount, minNoteDuration]);

  /**
   * 最初へ
   */
  const rewind = useCallback(() => {
    playbackPositionRef.current = 0;
    setPlaybackPosition(0);
  }, []);

  /**
   * 最後へ
   */
  const forward = useCallback(() => {
    const finalBeat = barCount * beatCount * minNoteDuration;
    playbackPositionRef.current = finalBeat;
    setPlaybackPosition(finalBeat);
  }, [barCount, beatCount, minNoteDuration]);

  return { isPlaying, play, pause, nextBar, prevBar, rewind, forward };
}
