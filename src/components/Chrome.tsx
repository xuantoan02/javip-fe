import React, { useState } from 'react';
import type { AssistantState, Theme } from '../types';
import {
  IAlert,
  ICheck,
  IChev,
  IClose,
  IHistory,
  IMoon,
  ISettings,
  ISun,
} from './Icons';
import { OrbMini } from './Orb';

interface TopBarProps {
  state: AssistantState;
  theme: Theme;
  setTheme: (t: Theme) => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  state,
  theme,
  setTheme,
  onOpenSettings,
  onOpenHistory,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 22px',
      borderBottom: '1px solid var(--hair-2)',
      background: 'color-mix(in oklch, var(--bg) 85%, transparent)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <OrbMini state={state} size={30} />
      <div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontStyle: 'italic',
            lineHeight: 1,
          }}
        >
          Lumo
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink-3)',
            letterSpacing: '0.1em',
            marginTop: 2,
          }}
        >
          VOICE · v2.4
        </div>
      </div>
      <span className="pill live" style={{ marginLeft: 20 }}>
        <span className="dot live" />
        Connected · 42ms
      </span>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button className="icon-btn" onClick={onOpenHistory} title="History (⌘K)">
        <IHistory />
      </button>
      <button
        className="icon-btn"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title="Toggle theme"
      >
        {theme === 'dark' ? <ISun /> : <IMoon />}
      </button>
      <button className="icon-btn" onClick={onOpenSettings} title="Settings">
        <ISettings />
      </button>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, oklch(0.7 0.15 45), oklch(0.55 0.18 305))',
          marginLeft: 6,
          display: 'grid',
          placeItems: 'center',
          color: 'white',
          fontWeight: 600,
          fontSize: 13,
        }}
      >
        M
      </div>
    </div>
  </div>
);

interface PermissionBannerProps {
  onDismiss: () => void;
}

export const PermissionBanner: React.FC<PermissionBannerProps> = ({ onDismiss }) => (
  <div
    style={{
      position: 'absolute',
      top: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 16px',
      borderRadius: 12,
      background: 'color-mix(in oklch, oklch(0.7 0.2 25) 12%, var(--card))',
      border: '1px solid color-mix(in oklch, oklch(0.7 0.2 25) 40%, var(--hair))',
      boxShadow: 'var(--shadow)',
      fontSize: 13,
      zIndex: 30,
      whiteSpace: 'nowrap',
    }}
  >
    <IAlert size={18} stroke="oklch(0.55 0.2 25)" />
    <span>
      Microphone access needed.{' '}
      <b style={{ textDecoration: 'underline', cursor: 'pointer' }}>Grant permission</b> to start
      talking.
    </span>
    <button onClick={onDismiss} style={{ padding: 4, marginLeft: 6, opacity: 0.6 }}>
      <IClose size={14} />
    </button>
  </div>
);

interface DropdownButtonProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button className="pill" onClick={() => setOpen(!open)} style={{ gap: 6 }}>
        {value}
        <IChev size={12} />
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 6px)',
            zIndex: 10,
            minWidth: 160,
            padding: 4,
            background: 'var(--card)',
            border: '1px solid var(--hair)',
            borderRadius: 10,
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {options.map((o) => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '8px 10px',
                borderRadius: 6,
                fontSize: 13,
                background: o === value ? 'var(--bg-2)' : 'transparent',
              }}
            >
              {o}
              {o === value && <ICheck size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div style={{ paddingTop: 18 }}>
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10.5,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--ink-3)',
        marginBottom: 6,
        fontWeight: 500,
      }}
    >
      {title}
    </div>
    <div>{children}</div>
  </div>
);

const Field: React.FC<{ label: string; sub?: string; children: React.ReactNode }> = ({
  label,
  sub,
  children,
}) => (
  <div className="row">
    <div>
      <div className="label">{label}</div>
      {sub && <div className="sub">{sub}</div>}
    </div>
    <div>{children}</div>
  </div>
);

interface ToggleProps {
  on: boolean;
  onClick: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ on, onClick }) => (
  <div className={`toggle ${on ? 'on' : ''}`} onClick={onClick} />
);

interface SegmentedProps {
  options: { k: string; l: string }[];
  value: string;
  onChange: (v: string) => void;
}

const Segmented: React.FC<SegmentedProps> = ({ options, value, onChange }) => (
  <div className="seg">
    {options.map((o) => (
      <button key={o.k} className={value === o.k ? 'on' : ''} onClick={() => onChange(o.k)}>
        {o.l}
      </button>
    ))}
  </div>
);

const ShortcutRow: React.FC<{ label: string; keys: string[] }> = ({ label, keys }) => (
  <div className="row">
    <div className="label">{label}</div>
    <div style={{ display: 'flex', gap: 4 }}>
      {keys.map((k, i) => (
        <kbd key={i}>{k}</kbd>
      ))}
    </div>
  </div>
);

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ open, onClose }) => {
  const [voice, setVoice] = useState('Aria');
  const [language, setLanguage] = useState('English (US)');
  const [style, setStyle] = useState('friendly');
  const [latency, setLatency] = useState('balanced');
  const [mute, setMute] = useState(false);
  const [interrupt, setInterrupt] = useState(true);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(20,10,30,0.35)',
          backdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 240ms ease',
          zIndex: 90,
        }}
      />
      <aside
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 380,
          background: 'var(--card)',
          borderLeft: '1px solid var(--hair)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 320ms cubic-bezier(.4,0,.2,1)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: open ? 'var(--shadow-lg)' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 22px',
            borderBottom: '1px solid var(--hair-2)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontStyle: 'italic' }}>
              Settings
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
              Voice, language & conversation
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <IClose />
          </button>
        </div>

        <div className="scroll" style={{ flex: 1, overflow: 'auto', padding: '4px 22px 22px' }}>
          <SettingsSection title="Voice">
            <Field label="Assistant voice" sub="Used for replies">
              <DropdownButton
                value={voice}
                onChange={setVoice}
                options={['Aria', 'Juno', 'Koa', 'Sol', 'Wren']}
              />
            </Field>
            <Field label="Speaking speed" sub="1.0× default">
              <Segmented
                options={[
                  { k: '0.85', l: '0.85×' },
                  { k: '1.0', l: '1.0×' },
                  { k: '1.15', l: '1.15×' },
                  { k: '1.3', l: '1.3×' },
                ]}
                value="1.0"
                onChange={() => {}}
              />
            </Field>
            <Field label="Mute assistant voice" sub="Read replies silently">
              <Toggle on={mute} onClick={() => setMute(!mute)} />
            </Field>
          </SettingsSection>

          <SettingsSection title="Language">
            <Field label="Input language" sub="What you speak">
              <DropdownButton
                value={language}
                onChange={setLanguage}
                options={['English (US)', 'English (UK)', 'Tiếng Việt', 'Español', '日本語', 'Français']}
              />
            </Field>
            <Field label="Output language" sub="Auto-match input">
              <Toggle on={true} onClick={() => {}} />
            </Field>
          </SettingsSection>

          <SettingsSection title="Conversation">
            <Field label="Response style">
              <Segmented
                options={[
                  { k: 'concise', l: 'Concise' },
                  { k: 'friendly', l: 'Friendly' },
                  { k: 'pro', l: 'Pro' },
                ]}
                value={style}
                onChange={setStyle}
              />
            </Field>
            <Field label="Latency preference" sub="Lower = snappier, higher = smarter">
              <Segmented
                options={[
                  { k: 'speed', l: 'Fastest' },
                  { k: 'balanced', l: 'Balanced' },
                  { k: 'quality', l: 'Best' },
                ]}
                value={latency}
                onChange={setLatency}
              />
            </Field>
            <Field label="Allow interruptions" sub="Talk over the assistant">
              <Toggle on={interrupt} onClick={() => setInterrupt(!interrupt)} />
            </Field>
          </SettingsSection>

          <SettingsSection title="Audio device">
            <Field label="Microphone" sub="MacBook Pro Microphone">
              <div className="meter">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < 9 ? 'on' : ''}
                    style={{ height: `${20 + (i % 5) * 8}%` }}
                  />
                ))}
              </div>
            </Field>
            <Field label="Speaker" sub="System default">
              <button className="pill">Change</button>
            </Field>
          </SettingsSection>

          <SettingsSection title="Shortcuts">
            <ShortcutRow label="Start / stop listening" keys={['Space']} />
            <ShortcutRow label="Replay last response" keys={['⌘', 'R']} />
            <ShortcutRow label="Open history" keys={['⌘', 'K']} />
            <ShortcutRow label="New conversation" keys={['⌘', 'N']} />
            <ShortcutRow label="Interrupt assistant" keys={['Esc']} />
          </SettingsSection>
        </div>
      </aside>
    </>
  );
};
