import { describe, test, expect } from 'vitest';
import { createMidiFile, save } from './midi';
import { music } from '@/samples';

describe('MIDI', () => {
  test('exportMidi', () => {
    const midiContent = createMidiFile(music, 1);

    // Blob型であることを確認
    expect(midiContent).toBeInstanceOf(Blob);

    const filename = 'test.mid';
    save(midiContent, filename);
  });
});
