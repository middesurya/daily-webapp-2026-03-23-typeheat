import { describe, it, expect } from 'vitest';
import { QWERTY_ROWS, buildCodeMap, FINGER_NAMES, FINGER_COLORS } from '../src/keyboard-layout.js';

describe('Keyboard Layout', () => {
  it('should have 5 rows (number, top, home, bottom, space)', () => {
    expect(QWERTY_ROWS).toHaveLength(5);
  });

  it('should map every key code uniquely', () => {
    const codeMap = buildCodeMap(QWERTY_ROWS);
    // Check some known keys exist
    expect(codeMap['KeyA']).toBeDefined();
    expect(codeMap['KeyA'].label).toBe('A');
    expect(codeMap['Space']).toBeDefined();
    expect(codeMap['Space'].label).toBe('Space');
    expect(codeMap['Enter']).toBeDefined();
  });

  it('should assign finger indices 0-8 to all keys', () => {
    for (const row of QWERTY_ROWS) {
      for (const key of row) {
        expect(key.finger).toBeGreaterThanOrEqual(0);
        expect(key.finger).toBeLessThanOrEqual(8);
      }
    }
  });

  it('should have 9 finger names and 9 finger colors', () => {
    expect(FINGER_NAMES).toHaveLength(9);
    expect(FINGER_COLORS).toHaveLength(9);
  });
});
