/* eslint-disable no-console */
import { Coordinate } from '@/types/draw';
import { describe, expect, test } from 'vitest';
import { createInterval } from './createInterval';

describe('createInterval', () => {
  test('should convert to interval', () => {
    const coordinates: Coordinate[] = [
      { x: 109, y: 518 },
      { x: 108, y: 517 },
      { x: 108, y: 516 },
      { x: 108, y: 514 },
      { x: 108, y: 512 },
      { x: 109, y: 506 },
      { x: 113, y: 500 },
      { x: 119, y: 492 },
      { x: 128, y: 481 },
      { x: 141, y: 471 },
      { x: 156, y: 462 },
      { x: 173, y: 455 },
      { x: 194, y: 448 },
      { x: 214, y: 446 },
      { x: 237, y: 446 },
      { x: 262, y: 446 },
      { x: 287, y: 446 },
      { x: 314, y: 445 },
      { x: 344, y: 451 },
      { x: 372, y: 460 },
      { x: 427, y: 484 },
      { x: 441, y: 493 },
      { x: 470, y: 513 },
      { x: 499, y: 532 },
      { x: 523, y: 552 },
      { x: 530, y: 558 },
      { x: 549, y: 572 },
      { x: 554, y: 577 },
      { x: 568, y: 585 },
      { x: 589, y: 599 },
      { x: 600, y: 603 },
      { x: 620, y: 607 },
      { x: 637, y: 608 },
      { x: 659, y: 608 },
      { x: 704, y: 601 },
      { x: 737, y: 588 },
      { x: 777, y: 573 },
      { x: 818, y: 554 },
      { x: 836, y: 544 },
      { x: 873, y: 525 },
      { x: 907, y: 508 },
      { x: 979, y: 466 },
      { x: 993, y: 456 },
      { x: 1003, y: 448 },
      { x: 1006, y: 445 },
      { x: 1012, y: 440 },
      { x: 1015, y: 436 },
      { x: 1017, y: 433 },
      { x: 1019, y: 432 },
      { x: 1019, y: 430 },
      { x: 1020, y: 428 },
    ];

    const intervals = createInterval(coordinates);

    console.log('--intervals--\n', JSON.stringify(intervals, null, 2));
    expect(intervals).toBeDefined(); // 変換に成功したか
    expect(intervals.length).toBeGreaterThan(0); // 音程が存在するか(0より大きいか)
  });
});
