import React from 'react';

interface IconProps {
  size?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}

const Ico: React.FC<IconProps & { d?: string; viewBox?: string; w?: number; children?: React.ReactNode }> = ({
  d,
  size = 20,
  fill = 'none',
  stroke = 'currentColor',
  w = 1.6,
  children,
  viewBox = '0 0 24 24',
}) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill={fill}
    stroke={stroke}
    strokeWidth={w}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d ? <path d={d} /> : children}
  </svg>
);

export const IMic: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <rect x="9" y="3" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <path d="M12 18v3" />
  </Ico>
);

export const IMicOff: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M3 3l18 18" />
    <path d="M9 9v2a3 3 0 0 0 5 2.2" />
    <path d="M15 11V6a3 3 0 0 0-5.5-1.7" />
    <path d="M19 11a7 7 0 0 1-1 3.6M5 11a7 7 0 0 0 10 6" />
    <path d="M12 18v3" />
  </Ico>
);

export const IStop: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </Ico>
);

export const IPlay: React.FC<IconProps> = (p) => (
  <Ico {...p} fill="currentColor" stroke="none">
    <polygon points="6,4 20,12 6,20" />
  </Ico>
);

export const IReplay: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 3v6h6" />
  </Ico>
);

export const ISpeaker: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M4 10v4h4l5 4V6L8 10H4z" />
    <path d="M16 8a5 5 0 0 1 0 8" />
    <path d="M19 5a9 9 0 0 1 0 14" />
  </Ico>
);

export const ISpeakerOff: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M4 10v4h4l5 4V6L8 10H4z" />
    <path d="M17 9l5 6M22 9l-5 6" />
  </Ico>
);

export const ISettings: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </Ico>
);

export const IClose: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Ico>
);

export const IGlobe: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
  </Ico>
);

export const IText: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M4 6h16M4 12h10M4 18h16" />
  </Ico>
);

export const ISend: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4z" />
  </Ico>
);

export const IKbd: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" />
  </Ico>
);

export const IHistory: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 8v4l3 2" />
  </Ico>
);

export const IArrow: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Ico>
);

export const IMoon: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Ico>
);

export const ISun: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Ico>
);

export const IPause: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </Ico>
);

export const ISpark: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
  </Ico>
);

export const ICheck: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M4 12l5 5L20 6" />
  </Ico>
);

export const IChev: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M9 6l6 6-6 6" />
  </Ico>
);

export const IWave: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M3 12h2l2-7 3 14 3-10 3 6 2-3h3" />
  </Ico>
);

export const ISearch: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3-3" />
  </Ico>
);

export const IAlert: React.FC<IconProps> = (p) => (
  <Ico {...p}>
    <path d="M12 9v4M12 17h.01" />
    <path d="M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
  </Ico>
);
