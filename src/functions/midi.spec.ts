import { describe, test, expect, beforeAll, vi } from 'vitest';
import { createMidiFile, save } from './midi';
import { music } from '@/samples';

describe('MIDI', () => {
  // midi.spec.ts のテストファイルで追加
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'mocked-url');
     // URL.revokeObjectURLのモック
    global.URL.revokeObjectURL = vi.fn();
  });
  test('exportMidi', () => {
    const midiContent = createMidiFile(music, 1);

    // Blob型であることを確認
    expect(midiContent).toBeInstanceOf(Blob);

    const filename = 'test.mid';
    save(midiContent, filename);
  });
});
