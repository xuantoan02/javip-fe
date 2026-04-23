import React, { useEffect, useState } from 'react';
import type { AssistantState } from '../types';

interface OrbProps {
  state?: AssistantState;
  size?: number;
}

export const Orb: React.FC<OrbProps> = ({ state = 'idle', size = 360 }) => {
  const [heights, setHeights] = useState<number[]>(Array(18).fill(0.2));

  useEffect(() => {
    let frame: number;
    const t0 = performance.now();

    const loop = (t: number) => {
      const dt = (t - t0) / 1000;
      const next: number[] = [];

      for (let i = 0; i < 18; i++) {
        const phase = i * 0.35;
        let h: number;

        if (state === 'idle') {
          h = 0.12 + Math.sin(dt * 1.2 + phase) * 0.04 + 0.04;
        } else if (state === 'listening') {
          const base = 0.35 + Math.sin(dt * 3 + phase) * 0.25;
          const jitter = (Math.random() - 0.5) * 0.35;
          h = Math.max(0.08, Math.min(0.95, base + jitter));
        } else if (state === 'thinking') {
          const pulse = Math.max(0, 1 - Math.abs(((dt * 2) % 2) - i / 9));
          h = 0.15 + pulse * 0.55;
        } else if (state === 'speaking') {
          const w1 = Math.sin(dt * 4 + phase) * 0.3;
          const w2 = Math.sin(dt * 2.3 + phase * 1.5) * 0.2;
          h = Math.max(0.15, Math.min(0.9, 0.45 + w1 + w2));
        } else if (state === 'muted') {
          h = 0.05;
        } else {
          h = 0.2;
        }
        next.push(h);
      }

      setHeights(next);
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [state]);

  return (
    <div
      className={`orb-stage state-${state}`}
      style={{ width: size, height: size }}
    >
      <div className="orb-halo" />
      <div className="orb-core">
        <div className="wave">
          {heights.map((h, i) => (
            <div
              key={i}
              className="bar"
              style={{
                height: `${Math.round(h * 100)}%`,
                opacity: state === 'muted' ? 0.25 : 0.88,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MINI_BARS = [0.3, 0.7, 0.5, 0.9, 0.45];

export const OrbMini: React.FC<OrbProps> = ({ state = 'idle', size = 44 }) => (
  <div
    className={`orb-stage state-${state}`}
    style={{ width: size, height: size }}
  >
    <div className="orb-halo" style={{ filter: 'blur(14px)' }} />
    <div
      className="orb-core"
      style={{
        boxShadow:
          'inset 0 0 12px oklch(0.35 0.14 305 / 0.5), 0 6px 16px oklch(0.35 0.18 310 / 0.25)',
      }}
    >
      <div className="wave" style={{ gap: 2, padding: '0 22%' }}>
        {MINI_BARS.map((h, i) => (
          <div
            key={i}
            className="bar"
            style={{ width: 2, height: `${h * 100}%`, background: 'oklch(1 0 0 / 0.9)' }}
          />
        ))}
      </div>
    </div>
  </div>
);
