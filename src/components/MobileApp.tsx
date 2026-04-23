import React from 'react';
import type { AssistantState, Theme } from '../types';
import { IClose, IHistory, IKbd, IMic, IPause, ISettings, IStop } from './Icons';
import { Orb } from './Orb';

interface MobileAppProps {
  state: AssistantState;
  setState: (s: AssistantState) => void;
  theme: Theme;
}

const STATE_CYCLE: Record<AssistantState, AssistantState> = {
  idle: 'listening',
  listening: 'thinking',
  thinking: 'speaking',
  speaking: 'idle',
  muted: 'idle',
};

export const MobileApp: React.FC<MobileAppProps> = ({ state, setState }) => {
  const isListening = state === 'listening';
  const isSpeaking = state === 'speaking';

  const cycle = () => setState(STATE_CYCLE[state]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        color: 'var(--ink)',
      }}
    >
      {/* Status bar */}
      <div className="status-bar">
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 }}>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
            <rect x="0" y="7" width="3" height="4" rx="0.5" />
            <rect x="4" y="5" width="3" height="6" rx="0.5" />
            <rect x="8" y="3" width="3" height="8" rx="0.5" />
            <rect x="12" y="0" width="3" height="11" rx="0.5" />
          </svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M1 4.5a10 10 0 0 1 13 0M3 7a7 7 0 0 1 9 0M5 9.5a4 4 0 0 1 5 0M7.5 11.5h0" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor">
            <rect x="0.5" y="1" width="20" height="10" rx="2.5" />
            <rect x="2" y="2.5" width="16" height="7" rx="1" fill="currentColor" />
            <rect x="21" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px 22px 0',
        }}
      >
        <button className="icon-btn" style={{ width: 38, height: 38, borderRadius: 12 }}>
          <IHistory size={18} />
        </button>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic' }}>
          Lumo
        </div>
        <button className="icon-btn" style={{ width: 38, height: 38, borderRadius: 12 }}>
          <ISettings size={18} />
        </button>
      </div>

      {/* Stage */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 22px',
        }}
      >
        <Orb state={state} size={240} />

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 32,
              lineHeight: 1.1,
            }}
          >
            {state === 'idle' && 'Tap to talk'}
            {state === 'listening' && "I'm listening…"}
            {state === 'thinking' && 'Thinking'}
            {state === 'speaking' && 'Lumo is speaking'}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
              marginTop: 8,
            }}
          >
            {state === 'idle' && 'or hold side button'}
            {state === 'listening' && 'say anything'}
            {state === 'thinking' && 'just a sec'}
            {state === 'speaking' && 'tap to interrupt'}
          </div>
        </div>

        {isListening && (
          <div
            style={{
              marginTop: 22,
              padding: '10px 16px',
              borderRadius: 14,
              background: 'var(--bg-2)',
              fontSize: 13,
              color: 'var(--ink-2)',
              maxWidth: 300,
              textAlign: 'center',
            }}
          >
            "What's the weather like in Ho Chi Minh…"
            <span className="caret" />
          </div>
        )}

        {isSpeaking && (
          <div
            style={{
              marginTop: 22,
              padding: '14px 16px',
              borderRadius: 16,
              background: 'var(--card)',
              border: '1px solid var(--hair-2)',
              fontSize: 14,
              color: 'var(--ink)',
              lineHeight: 1.5,
              maxWidth: 320,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            It's 32°C and sunny with scattered clouds rolling in around 4pm. Lovely day for a cà phê sữa đá, if you ask me.
          </div>
        )}
      </div>

      {/* Bottom dock */}
      <div style={{ padding: '0 22px 40px', display: 'flex', justifyContent: 'center', gap: 10 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: 8,
            borderRadius: 999,
            background: 'var(--card)',
            border: '1px solid var(--hair)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <button className="icon-btn" style={{ width: 44, height: 44, borderRadius: '50%' }}>
            <IKbd size={18} />
          </button>
          <button
            className="icon-btn primary"
            style={{ width: 64, height: 64, borderRadius: '50%' }}
            onClick={cycle}
          >
            {state === 'listening' ? (
              <IStop size={22} />
            ) : state === 'speaking' ? (
              <IPause size={22} />
            ) : (
              <IMic size={22} />
            )}
          </button>
          <button className="icon-btn" style={{ width: 44, height: 44, borderRadius: '50%' }}>
            <IClose size={18} />
          </button>
        </div>
      </div>

      {/* Home indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 134,
          height: 5,
          borderRadius: 4,
          background: 'var(--ink)',
          opacity: 0.85,
        }}
      />
    </div>
  );
};
