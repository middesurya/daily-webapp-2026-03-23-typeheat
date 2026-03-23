import { useState, useCallback, useRef } from 'react';

export function useTypingStats() {
  const [keyCounts, setKeyCounts] = useState({});     // code -> count
  const [charCounts, setCharCounts] = useState({});    // char -> count
  const [bigrams, setBigrams] = useState({});          // "ab" -> count
  const [wpmHistory, setWpmHistory] = useState([]);    // [{time, wpm}]
  const [totalChars, setTotalChars] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [fingerCounts, setFingerCounts] = useState(Array(9).fill(0));

  const startTimeRef = useRef(null);
  const lastCharRef = useRef(null);
  const wordCountRef = useRef(0);
  const wpmIntervalRef = useRef(null);

  const getCurrentWpm = useCallback(() => {
    if (!startTimeRef.current) return 0;
    const elapsed = (Date.now() - startTimeRef.current) / 60000; // minutes
    if (elapsed < 0.01) return 0;
    return Math.round(wordCountRef.current / elapsed);
  }, []);

  const recordKeyDown = useCallback((code, char, finger) => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
      // Start WPM tracking interval
      wpmIntervalRef.current = setInterval(() => {
        const wpm = getCurrentWpm();
        setWpmHistory(prev => {
          const next = [...prev, { time: Date.now() - startTimeRef.current, wpm }];
          return next.length > 60 ? next.slice(-60) : next;
        });
      }, 1000);
    }

    // Track active keys for visual press effect
    setActiveKeys(prev => new Set([...prev, code]));

    // Count key presses by code
    setKeyCounts(prev => ({ ...prev, [code]: (prev[code] || 0) + 1 }));

    // Count printable characters
    if (char && char.length === 1) {
      const lc = char.toLowerCase();
      setCharCounts(prev => ({ ...prev, [lc]: (prev[lc] || 0) + 1 }));
      setTotalChars(prev => prev + 1);

      // Track bigrams
      if (lastCharRef.current) {
        const bi = lastCharRef.current + lc;
        setBigrams(prev => ({ ...prev, [bi]: (prev[bi] || 0) + 1 }));
      }
      lastCharRef.current = lc;

      // Count words (space = new word)
      if (char === ' ') {
        wordCountRef.current += 1;
      }
    }

    // Track finger usage
    if (finger !== undefined && finger >= 0 && finger <= 8) {
      setFingerCounts(prev => {
        const next = [...prev];
        next[finger] += 1;
        return next;
      });
    }
  }, [getCurrentWpm]);

  const recordKeyUp = useCallback((code) => {
    setActiveKeys(prev => {
      const next = new Set(prev);
      next.delete(code);
      return next;
    });
  }, []);

  const recordError = useCallback(() => {
    setTotalErrors(prev => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setKeyCounts({});
    setCharCounts({});
    setBigrams({});
    setWpmHistory([]);
    setTotalChars(0);
    setTotalErrors(0);
    setActiveKeys(new Set());
    setFingerCounts(Array(9).fill(0));
    startTimeRef.current = null;
    lastCharRef.current = null;
    wordCountRef.current = 0;
    if (wpmIntervalRef.current) {
      clearInterval(wpmIntervalRef.current);
      wpmIntervalRef.current = null;
    }
  }, []);

  const accuracy = totalChars > 0 ? Math.round(((totalChars - totalErrors) / totalChars) * 100) : 100;
  const maxKeyCount = Math.max(1, ...Object.values(keyCounts));

  return {
    keyCounts,
    charCounts,
    bigrams,
    wpmHistory,
    totalChars,
    totalErrors,
    accuracy,
    activeKeys,
    fingerCounts,
    maxKeyCount,
    currentWpm: getCurrentWpm(),
    recordKeyDown,
    recordKeyUp,
    recordError,
    reset,
  };
}
