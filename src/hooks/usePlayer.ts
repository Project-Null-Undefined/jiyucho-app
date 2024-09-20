'use client';

import { Note } from '@/models';
import { musicAtom, rootNoteAtom, scaleTypeAtom } from '@/stores/music';
import { playbackPositionAtom } from '@/stores/playbackPosition';
import { barCountAtom, beatCountAtom, bpnAtom, minNoteDurationAtom } from '@/stores/settings';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SplendidGrandPiano } from 'smplr';

interface PlayingNote {
  [key: string]: () => void;
}

const isPlayingAtom = atom(false);

export default function usePlayer() {
  const music = useAtomValue(musicAtom);

  const [context, setContext] = useState<AudioContext | undefined>(
    typeof window !== 'undefined' ? new AudioContext() : undefined,
  );
  const instrument = context ? new SplendidGrandPiano(context, {}) : null;

  const playbackPositionRef = useRef(0);
  const playIntervalRef = useRef<NodeJS.Timeout>();
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const playNotesRef = useRef<PlayingNote>({});
  const setPlaybackPosition = useSetAtom(playbackPositionAtom);
  const rootNote = useAtomValue(rootNoteAtom);

  const bpm = useAtomValue(bpnAtom);
  const barCount = useAtomValue(barCountAtom);
  const beatCount = useAtomValue(beatCountAtom);
  const minNoteDuration = useAtomValue(minNoteDurationAtom);
  const scaleType = useAtomValue(scaleTypeAtom);

  useEffect(() => {
    if (!context) setContext(new AudioContext());
  }, [context]);

  const setPlayinterval = useCallback((interval: NodeJS.Timeout | undefined) => {
    playIntervalRef.current = interval;
    setIsPlaying(interval !== undefined);
  }, []);

  const playNote = useCallback((note: Note, playingBeat: number) => {
    const durationDiff = playingBeat - note.start;
    const durationSec = (note.duration - durationDiff) * (60 / bpm);

    instrument?.start({ note: note.getName(), velocity: 80, time: 0, duration: durationSec });

    setTimeout(() => {
      delete playNotesRef.current[note.id];
    }, durationSec * 1000);

    return () => {};
  }, []);

  const playMusic = useCallback((position: number) => {
    const playingBar = Math.floor(position / (beatCount * minNoteDuration));
    const playingPos = position - playingBar * beatCount * minNoteDuration;

    const bar = music.bars.at(playingBar);
    if (!bar) return;

    const notes = bar.notes.filter((note) => note.start <= playingPos && playingPos < note.end);
    const chordNotes = bar.chord?.getNotes(rootNote, scaleType) ?? [];

    [...notes, ...chordNotes].forEach((note) => {
      // 再生中でないノートのみ再生
      if (!(note.id in playNotesRef.current)) {
        playNotesRef.current[note.id] = playNote(note, playingPos);
      }
    });
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
        playMusic(next);
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
    for (const stop of Object.values(playNotesRef.current)) stop();
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
