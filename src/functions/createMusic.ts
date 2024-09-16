import { Beat } from '@/models';
import { Interval, Settings } from '@/types';
import { music as musicSample } from '@/samples';

/**
 * Interval と beat から音楽データを生成する
 *
 * @param intervals 音程
 * @param beats 拍子
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createMusic(interval: Interval[], beats: Beat[], settings: Settings) {
  // TODO
  return musicSample;
}
