import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTypingStats } from '../src/useTypingStats.js';

describe('useTypingStats', () => {
  it('should initialize with zero values', () => {
    const { result } = renderHook(() => useTypingStats());
    expect(result.current.totalChars).toBe(0);
    expect(result.current.totalErrors).toBe(0);
    expect(result.current.accuracy).toBe(100);
    expect(result.current.currentWpm).toBe(0);
    expect(Object.keys(result.current.keyCounts)).toHaveLength(0);
  });

  it('should record key presses and update counts', () => {
    const { result } = renderHook(() => useTypingStats());

    act(() => {
      result.current.recordKeyDown('KeyA', 'a', 0);
    });

    expect(result.current.keyCounts['KeyA']).toBe(1);
    expect(result.current.totalChars).toBe(1);
    expect(result.current.charCounts['a']).toBe(1);
    expect(result.current.fingerCounts[0]).toBe(1);
  });

  it('should track bigrams from consecutive characters', () => {
    const { result } = renderHook(() => useTypingStats());

    act(() => {
      result.current.recordKeyDown('KeyH', 'h', 4);
      result.current.recordKeyDown('KeyE', 'e', 2);
    });

    expect(result.current.bigrams['he']).toBe(1);
  });

  it('should track errors and update accuracy', () => {
    const { result } = renderHook(() => useTypingStats());

    act(() => {
      result.current.recordKeyDown('KeyA', 'a', 0);
      result.current.recordKeyDown('KeyB', 'b', 3);
      result.current.recordError();
    });

    expect(result.current.totalChars).toBe(2);
    expect(result.current.totalErrors).toBe(1);
    expect(result.current.accuracy).toBe(50);
  });

  it('should reset all stats', () => {
    const { result } = renderHook(() => useTypingStats());

    act(() => {
      result.current.recordKeyDown('KeyA', 'a', 0);
      result.current.recordKeyDown('KeyB', 'b', 3);
      result.current.recordError();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.totalChars).toBe(0);
    expect(result.current.totalErrors).toBe(0);
    expect(result.current.accuracy).toBe(100);
    expect(Object.keys(result.current.keyCounts)).toHaveLength(0);
    expect(Object.keys(result.current.bigrams)).toHaveLength(0);
  });

  it('should manage active keys on keydown and keyup', () => {
    const { result } = renderHook(() => useTypingStats());

    act(() => {
      result.current.recordKeyDown('KeyA', 'a', 0);
    });
    expect(result.current.activeKeys.has('KeyA')).toBe(true);

    act(() => {
      result.current.recordKeyUp('KeyA');
    });
    expect(result.current.activeKeys.has('KeyA')).toBe(false);
  });
});
