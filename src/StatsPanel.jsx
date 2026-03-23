import React from 'react';
import { FINGER_NAMES, FINGER_COLORS } from './keyboard-layout.js';

function StatCard({ label, value, unit, color }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col items-center min-w-[120px]">
      <span className="text-xs uppercase tracking-wider text-gray-400 mb-1">{label}</span>
      <span className="text-3xl font-bold" style={{ color: color || '#fff' }}>{value}</span>
      {unit && <span className="text-xs text-gray-500">{unit}</span>}
    </div>
  );
}

function WpmSparkline({ history }) {
  if (history.length < 2) return null;
  const maxWpm = Math.max(1, ...history.map(h => h.wpm));
  const w = 280;
  const h = 60;
  const points = history.map((entry, i) => {
    const x = (i / (history.length - 1)) * w;
    const y = h - (entry.wpm / maxWpm) * (h - 4);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <span className="text-xs uppercase tracking-wider text-gray-400 block mb-2">WPM Over Time</span>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
        <defs>
          <linearGradient id="wpmGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e94560" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e94560" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,${h} ${points} ${w},${h}`}
          fill="url(#wpmGrad)"
        />
        <polyline
          points={points}
          fill="none"
          stroke="#e94560"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function FingerChart({ fingerCounts }) {
  const maxCount = Math.max(1, ...fingerCounts);
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <span className="text-xs uppercase tracking-wider text-gray-400 block mb-3">Finger Usage</span>
      <div className="flex items-end gap-1 h-16 justify-center">
        {fingerCounts.map((count, i) => {
          const height = (count / maxCount) * 100;
          return (
            <div key={i} className="flex flex-col items-center gap-1 w-8">
              <div
                className="w-5 rounded-t-sm transition-all duration-300"
                style={{
                  height: `${Math.max(2, height * 0.6)}px`,
                  backgroundColor: FINGER_COLORS[i],
                  opacity: count > 0 ? 1 : 0.2,
                }}
              />
              <span className="text-[8px] text-gray-500 leading-none">{FINGER_NAMES[i].split(' ')[1] || FINGER_NAMES[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopBigrams({ bigrams }) {
  const sorted = Object.entries(bigrams)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  if (sorted.length === 0) return null;
  const maxCount = sorted[0]?.[1] || 1;

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <span className="text-xs uppercase tracking-wider text-gray-400 block mb-2">Top Bigrams</span>
      <div className="flex flex-wrap gap-2">
        {sorted.map(([bi, count]) => (
          <div
            key={bi}
            className="px-2 py-1 rounded-md text-xs font-mono border border-white/10"
            style={{
              backgroundColor: `rgba(233, 69, 96, ${(count / maxCount) * 0.4})`,
            }}
          >
            <span className="text-white/90">{bi}</span>
            <span className="text-white/40 ml-1">x{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatsPanel({ currentWpm, accuracy, totalChars, wpmHistory, fingerCounts, bigrams }) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[800px]">
      <div className="flex gap-3 justify-center flex-wrap">
        <StatCard label="WPM" value={currentWpm} color="#e94560" />
        <StatCard label="Accuracy" value={`${accuracy}%`} color={accuracy >= 95 ? '#6bff6b' : accuracy >= 80 ? '#ffa502' : '#ff6b6b'} />
        <StatCard label="Characters" value={totalChars} color="#69c0ff" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <WpmSparkline history={wpmHistory} />
        <FingerChart fingerCounts={fingerCounts} />
      </div>
      <TopBigrams bigrams={bigrams} />
    </div>
  );
}
