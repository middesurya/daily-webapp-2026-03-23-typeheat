import React, { useCallback, useRef, useEffect, useState } from 'react';
import Keyboard from './Keyboard.jsx';
import StatsPanel from './StatsPanel.jsx';
import { useTypingStats } from './useTypingStats.js';
import { QWERTY_ROWS, buildCodeMap } from './keyboard-layout.js';

const codeMap = buildCodeMap(QWERTY_ROWS);

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog near the old stone bridge by the river.",
  "In the beginning, the universe was created. This made a lot of people very angry and has been widely regarded as a bad move.",
  "To be or not to be, that is the question. Whether it is nobler in the mind to suffer the slings and arrows of outrageous fortune.",
  "All that glitters is not gold. Not all those who wander are lost. The old that is strong does not wither.",
  "Programming is the art of telling another human what one wants the computer to do. Code is poetry written in logic.",
];

export default function App() {
  const stats = useTypingStats();
  const textareaRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [sampleText, setSampleText] = useState(() =>
    SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]
  );
  const [mode, setMode] = useState('free'); // 'free' or 'practice'

  const handleKeyDown = useCallback((e) => {
    const keyDef = codeMap[e.code];
    const finger = keyDef?.finger;
    stats.recordKeyDown(e.code, e.key, finger);

    // In practice mode, check for errors
    if (mode === 'practice' && e.key.length === 1) {
      const nextChar = sampleText[inputText.length];
      if (e.key !== nextChar) {
        stats.recordError();
      }
    }
  }, [stats, mode, sampleText, inputText]);

  const handleKeyUp = useCallback((e) => {
    stats.recordKeyUp(e.code);
  }, [stats]);

  const handleInputChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  const handleReset = useCallback(() => {
    stats.reset();
    setInputText('');
    setSampleText(SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]);
    textareaRef.current?.focus();
  }, [stats]);

  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'free' ? 'practice' : 'free');
    handleReset();
  }, [handleReset]);

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 gap-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
          TypeHeat
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Real-time keyboard heatmap & typing analytics. 100% private.
        </p>
      </header>

      {/* Mode Toggle & Controls */}
      <div className="flex gap-3 items-center">
        <button
          onClick={toggleMode}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10 hover:border-white/30"
          style={{
            backgroundColor: mode === 'practice' ? 'rgba(233,69,96,0.2)' : 'rgba(255,255,255,0.05)',
            color: mode === 'practice' ? '#e94560' : '#888',
          }}
        >
          {mode === 'free' ? 'Free Type' : 'Practice Mode'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-gray-400 hover:border-white/30 hover:text-white transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Practice Text Display */}
      {mode === 'practice' && (
        <div className="max-w-[700px] w-full bg-white/5 rounded-xl p-4 border border-white/10 font-mono text-base leading-relaxed">
          {sampleText.split('').map((char, i) => {
            let color = 'text-gray-500';
            if (i < inputText.length) {
              color = inputText[i] === char ? 'text-green-400' : 'text-red-400 underline';
            } else if (i === inputText.length) {
              color = 'text-white bg-white/20 rounded';
            }
            return (
              <span key={i} className={color}>
                {char}
              </span>
            );
          })}
        </div>
      )}

      {/* Typing Input */}
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder={mode === 'free' ? "Start typing anything to see your heatmap..." : "Type the text shown above..."}
        className="w-full max-w-[700px] h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-white text-base resize-none outline-none focus:border-red-400/50 transition-colors placeholder:text-gray-600 font-mono"
        spellCheck={false}
        autoComplete="off"
        data-testid="typing-input"
      />

      {/* Keyboard Heatmap */}
      <div className="overflow-x-auto">
        <Keyboard
          keyCounts={stats.keyCounts}
          maxKeyCount={stats.maxKeyCount}
          activeKeys={stats.activeKeys}
        />
      </div>

      {/* Stats Panel */}
      <StatsPanel
        currentWpm={stats.currentWpm}
        accuracy={stats.accuracy}
        totalChars={stats.totalChars}
        wpmHistory={stats.wpmHistory}
        fingerCounts={stats.fingerCounts}
        bigrams={stats.bigrams}
      />

      {/* Footer */}
      <footer className="text-center text-xs text-gray-600 mt-4 pb-4">
        <p>All data stays in your browser. Nothing is sent to any server.</p>
        <p className="mt-1">
          Built autonomously with Claude Code | Daily Webapp Build #1 |{' '}
          <a href="https://github.com/middesurya" className="text-gray-500 hover:text-white transition-colors">
            github.com/middesurya
          </a>
        </p>
      </footer>
    </div>
  );
}
