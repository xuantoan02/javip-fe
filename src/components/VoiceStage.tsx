import React, { useEffect, useRef, useState } from 'react';
import type { AssistantState, Message, Suggestion } from '../types';
import { IArrow, IKbd, ISend, IText, IWave } from './Icons';
import { SUGGESTED } from '../data';

interface StatusLabelProps {
  state: AssistantState;
}

const STATUS_COPY: Record<AssistantState, { title: string; sub: string }> = {
  idle:      { title: 'Tap to talk',       sub: 'or press Space' },
  listening: { title: "I'm listening…",    sub: 'say anything' },
  thinking:  { title: 'Thinking',          sub: 'just a sec' },
  speaking:  { title: 'Lumo is speaking',  sub: 'tap to interrupt' },
  muted:     { title: 'Muted',             sub: 'mic is off' },
};

export const StatusLabel: React.FC<StatusLabelProps> = ({ state }) => {
  const { title, sub } = STATUS_COPY[state] || { title: '', sub: '' };
  return (
    <div style={{ textAlign: 'center', marginTop: 28 }}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 44,
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--ink-3)',
          marginTop: 10,
        }}
      >
        {sub}
      </div>
    </div>
  );
};

interface ControlsDockProps {
  state: AssistantState;
  onToggle: () => void;
  onMute: () => void;
  muted: boolean;
}

import { IGlobe, IMic, IPause, IReplay, ISpeaker, ISpeakerOff, IStop } from './Icons';

export const ControlsDock: React.FC<ControlsDockProps> = ({ state, onToggle, onMute, muted }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: 10,
      borderRadius: 999,
      background: 'color-mix(in oklch, var(--card) 88%, transparent)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--hair)',
      boxShadow: 'var(--shadow)',
    }}
  >
    <button className="icon-btn" title="Switch language" style={{ width: 40, height: 40 }}>
      <IGlobe size={18} />
    </button>
    <button
      className="icon-btn"
      onClick={onMute}
      title={muted ? 'Unmute assistant' : 'Mute assistant'}
      style={{ width: 40, height: 40 }}
    >
      {muted ? <ISpeakerOff size={18} /> : <ISpeaker size={18} />}
    </button>

    <button
      onClick={onToggle}
      className="icon-btn primary"
      style={{ width: 64, height: 64, borderRadius: '50%', margin: '0 4px' }}
      title={state === 'listening' ? 'Stop' : 'Start'}
    >
      {state === 'listening' ? (
        <IStop size={22} />
      ) : state === 'speaking' ? (
        <IPause size={22} />
      ) : (
        <IMic size={22} />
      )}
    </button>

    <button className="icon-btn" title="Replay last response" style={{ width: 40, height: 40 }}>
      <IReplay size={18} />
    </button>
    <button className="icon-btn" title="Type instead" style={{ width: 40, height: 40 }}>
      <IKbd size={18} />
    </button>
  </div>
);

export const Suggestions: React.FC = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      maxWidth: 540,
      margin: '0 auto',
    }}
  >
    {SUGGESTED.map((s: Suggestion, i: number) => (
      <button key={i} className="chip">
        <span style={{ color: 'var(--plum-500)', fontSize: 16 }}>{s.i}</span>
        <span>{s.t}</span>
        <IArrow size={14} className="arrow" />
      </button>
    ))}
  </div>
);

interface StreamingMessageProps {
  text: string;
  time: string;
}

export const StreamingMessage: React.FC<StreamingMessageProps> = ({ text, time }) => {
  const [shown, setShown] = useState('');

  useEffect(() => {
    setShown('');
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      if (i >= text.length) {
        setShown(text);
        clearInterval(id);
      } else {
        setShown(text.slice(0, i));
      }
    }, 20);
    return () => clearInterval(id);
  }, [text]);

  return (
    <div className="msg-row assistant">
      <div className="bubble assistant">
        <span>{shown}</span>
        {shown.length < text.length && <span className="caret" />}
        <div className="meta">
          <IWave size={11} />
          LUMO · {time}
        </div>
      </div>
    </div>
  );
};

const MessageRow: React.FC<{ m: Message }> = ({ m }) => (
  <div className={`msg-row ${m.role}`}>
    <div className={`bubble ${m.role}`}>
      <span>{m.text}</span>
      <div className="meta">{m.role === 'user' ? 'YOU' : 'LUMO'} · {m.time}</div>
    </div>
  </div>
);

interface TranscriptProps {
  messages: Message[];
  streaming?: Message | null;
}

export const Transcript: React.FC<TranscriptProps> = ({ messages, streaming }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  return (
    <div
      ref={scrollRef}
      className="scroll"
      style={{
        width: '100%',
        maxWidth: 760,
        margin: '0 auto',
        padding: '20px 24px',
        maxHeight: 360,
        overflowY: 'auto',
      }}
    >
      {messages.map((m, i) => (
        <MessageRow key={i} m={m} />
      ))}
      {streaming && <StreamingMessage text={streaming.text} time={streaming.time} />}
    </div>
  );
};

interface TextInputProps {
  onSend: (text: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ onSend }) => {
  const [v, setV] = useState('');

  const handleSend = () => {
    if (v.trim()) {
      onSend(v);
      setV('');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        maxWidth: 640,
        margin: '0 auto',
        padding: '8px 8px 8px 18px',
        background: 'var(--card)',
        border: '1px solid var(--hair)',
        borderRadius: 18,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <IText size={16} stroke="var(--ink-3)" />
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="or type a message…"
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          padding: '12px 6px',
          fontSize: 14,
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
      />
      <button
        className="icon-btn primary"
        style={{ width: 36, height: 36, borderRadius: 12 }}
        onClick={handleSend}
      >
        <ISend size={16} />
      </button>
    </div>
  );
};
