import React from 'react';
import { QWERTY_ROWS } from './keyboard-layout.js';

function getHeatColor(intensity) {
  // intensity 0-1: dark blue -> blue -> purple -> red -> orange -> yellow -> white
  if (intensity <= 0) return 'rgba(26, 26, 46, 0.6)';
  if (intensity < 0.15) return `rgba(15, 52, 96, ${0.6 + intensity * 2})`;
  if (intensity < 0.3) return `rgba(67, 35, 130, ${0.7 + intensity})`;
  if (intensity < 0.5) return `rgba(233, 69, 96, ${0.8 + intensity * 0.4})`;
  if (intensity < 0.7) return `rgba(255, 107, 107, 1)`;
  if (intensity < 0.85) return `rgba(255, 165, 2, 1)`;
  if (intensity < 0.95) return `rgba(255, 218, 121, 1)`;
  return `rgba(255, 255, 255, 1)`;
}

function getTextColor(intensity) {
  return intensity > 0.6 ? '#000' : '#ccc';
}

function getGlowStyle(intensity) {
  if (intensity <= 0) return {};
  const alpha = Math.min(1, intensity * 1.5);
  const color = intensity < 0.5
    ? `rgba(233, 69, 96, ${alpha * 0.5})`
    : `rgba(255, 165, 2, ${alpha * 0.6})`;
  return { boxShadow: `0 0 ${8 + intensity * 20}px ${color}, inset 0 0 ${4 + intensity * 8}px ${color}` };
}

export default function Keyboard({ keyCounts, maxKeyCount, activeKeys }) {
  const keyUnit = 52; // px per 1u key
  const gap = 4;

  return (
    <div className="flex flex-col items-center gap-1" role="img" aria-label="Keyboard heatmap">
      {QWERTY_ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((keyDef, ki) => {
            const count = keyCounts[keyDef.code] || 0;
            const intensity = maxKeyCount > 0 ? count / maxKeyCount : 0;
            const isActive = activeKeys.has(keyDef.code);
            const bgColor = getHeatColor(intensity);
            const textColor = getTextColor(intensity);
            const glowStyle = getGlowStyle(intensity);
            const width = keyDef.width * keyUnit + (keyDef.width - 1) * gap;

            return (
              <div
                key={ki}
                className="relative flex items-center justify-center rounded-lg border border-white/10 transition-all duration-100 select-none"
                style={{
                  width: `${width}px`,
                  height: `${keyUnit}px`,
                  backgroundColor: bgColor,
                  color: textColor,
                  fontSize: keyDef.width > 1.5 ? '11px' : '13px',
                  fontWeight: 600,
                  transform: isActive ? 'scale(0.92) translateY(2px)' : 'scale(1)',
                  ...glowStyle,
                }}
                data-testid={`key-${keyDef.code}`}
              >
                <span className="z-10">{keyDef.label}</span>
                {count > 0 && (
                  <span
                    className="absolute bottom-1 right-1.5 text-[9px] opacity-60"
                    style={{ color: textColor }}
                  >
                    {count}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
