import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import type { AssistantState, Theme } from './types';
import { Orb } from './components/Orb';
import { TopBar, PermissionBanner, SettingsDrawer } from './components/Chrome';
import {
  StatusLabel,
  ControlsDock,
  Suggestions,
  Transcript,
} from './components/VoiceStage';
import { MobileApp } from './components/MobileApp';
import { SAMPLE_TRANSCRIPT, STREAMING_MESSAGE } from './data';

const STATE_CYCLE: Record<AssistantState, AssistantState> = {
  idle: 'listening',
  listening: 'thinking',
  thinking: 'speaking',
  speaking: 'idle',
  muted: 'idle',
};

const DesktopApp: React.FC<{
  state: AssistantState;
  setState: (s: AssistantState) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  showConversation?: boolean;
  showPermBanner?: boolean;
}> = ({ state, setState, theme, setTheme, showConversation = false, showPermBanner = false }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showPerm, setShowPerm] = useState(showPermBanner);

  const cycle = () => setState(STATE_CYCLE[state]);

  const conversation =
    showConversation || state === 'speaking' || state === 'thinking';
  const messages = conversation ? SAMPLE_TRANSCRIPT : [];
  const streamingMsg = conversation ? STREAMING_MESSAGE : null;

  return (
    <div
      data-theme={theme}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'var(--bg)',
        color: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <TopBar
        state={state}
        theme={theme}
        setTheme={setTheme}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenHistory={() => {}}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, oklch(0.75 0.18 320 / 0.18), oklch(0.65 0.18 15 / 0.12) 35%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          opacity: state === 'listening' ? 1 : state === 'speaking' ? 0.95 : 0.75,
          transition: 'opacity 500ms ease',
        }}
      />

      {showPerm && <PermissionBanner onDismiss={() => setShowPerm(false)} />}

      {/* Stage */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: conversation ? 'flex-start' : 'center',
          padding: conversation ? '40px 24px 24px' : '24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Orb state={state} size={conversation ? 200 : 340} />
        <StatusLabel state={state} />

        <div style={{ marginTop: 36 }}>
          <ControlsDock
            state={state}
            onToggle={cycle}
            onMute={() => setMuted(!muted)}
            muted={muted}
          />
        </div>

        <div style={{ width: '100%', marginTop: 28 }}>
          {conversation && (
            <Transcript messages={messages} streaming={streamingMsg} />
          )}
          {!conversation && state === 'idle' && (
            <div style={{ marginTop: 12 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  color: 'var(--ink-3)',
                  marginBottom: 14,
                }}
              >
                Try asking
              </div>
              <Suggestions />
            </div>
          )}
        </div>
      </div>

      {/* Bottom hint bar */}
      <div
        style={{
          padding: '10px 22px',
          borderTop: '1px solid var(--hair-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 11,
          color: 'var(--ink-3)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.06em',
          background: 'color-mix(in oklch, var(--bg) 70%, transparent)',
        }}
      >
        <div style={{ display: 'flex', gap: 18 }}>
          <span><kbd>Space</kbd> talk</span>
          <span><kbd>Esc</kbd> interrupt</span>
          <span><kbd>⌘</kbd><kbd>K</kbd> history</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>Aria · Friendly</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>English (US)</span>
        </div>
      </div>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

const MobileFrame: React.FC<{
  initialState?: AssistantState;
  theme?: Theme;
}> = ({ initialState = 'idle', theme = 'light' }) => {
  const [state, setState] = useState<AssistantState>(initialState);
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height: '100%',
        padding: 40,
      }}
    >
      <div className="phone" data-theme={theme}>
        <div className="notch" />
        <MobileApp state={state} setState={setState} theme={theme} />
      </div>
    </div>
  );
};

type ViewMode = 'desktop' | 'mobile';

const App: React.FC = () => {
  const [state, setState] = useState<AssistantState>('idle');
  const [theme, setTheme] = useState<Theme>('light');
  const [view, setView] = useState<ViewMode>('desktop');

  const cycle = useCallback(() => setState((s) => STATE_CYCLE[s]), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') { e.preventDefault(); cycle(); }
      if (e.code === 'Escape' && state !== 'idle') setState('idle');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cycle, state]);

  return (
    <div
      data-theme={theme}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {/* View toggle bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          display: 'flex',
          gap: 6,
          padding: '6px 8px',
          borderRadius: 999,
          background: 'color-mix(in oklch, var(--card) 90%, transparent)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--hair)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {(['desktop', 'mobile'] as ViewMode[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: view === v ? 'white' : 'var(--ink-3)',
              background: view === v ? 'var(--grad-brand)' : 'transparent',
              transition: 'all 200ms ease',
            }}
          >
            {v}
          </button>
        ))}

        <div style={{ width: 1, background: 'var(--hair)', margin: '4px 2px' }} />

        {/* State selector */}
        {(['idle', 'listening', 'thinking', 'speaking'] as AssistantState[]).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            style={{
              padding: '8px 12px',
              borderRadius: 999,
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: state === s ? 'white' : 'var(--ink-3)',
              background: state === s ? 'var(--grad-brand)' : 'transparent',
              transition: 'all 200ms ease',
            }}
          >
            {s}
          </button>
        ))}

        <div style={{ width: 1, background: 'var(--hair)', margin: '4px 2px' }} />

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            padding: '8px 12px',
            borderRadius: 999,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--ink-3)',
          }}
        >
          {theme === 'dark' ? '☀ Light' : '☾ Dark'}
        </button>
      </div>

      {/* Main view */}
      {view === 'desktop' ? (
        <DesktopApp
          state={state}
          setState={setState}
          theme={theme}
          setTheme={setTheme}
        />
      ) : (
        <div
          style={{
            flex: 1,
            background: 'var(--bg-2)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <MobileFrame initialState={state} theme={theme} />
        </div>
      )}
    </div>
  );
};

export default App;
