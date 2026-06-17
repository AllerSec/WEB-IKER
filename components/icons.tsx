import * as React from "react";

type SVG = React.SVGProps<SVGSVGElement>;

/** Greek lambda emblem — circular badge style used in nav, hero and CTA */
export const LambdaEmblem = ({ className, ...p }: SVG) => (
  <svg viewBox="0 0 64 64" className={className} {...p}>
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#9CD2FF" />
        <stop offset="100%" stopColor="#1F7BD0" />
      </linearGradient>
      <radialGradient id="lr" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="rgba(80,170,255,0.25)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#lr)" />
    <circle cx="32" cy="32" r="22" fill="none" stroke="rgba(120,180,255,0.55)" strokeWidth="1" />
    <circle cx="32" cy="32" r="16" fill="none" stroke="rgba(180,210,255,0.35)" strokeWidth="0.6" />
    <path
      d="M22 46 L30 26 L28 22 L24 22 L24 19 L33 19 L42 46 L38 46 L31 28 L26 46 Z"
      fill="url(#lg)"
    />
  </svg>
);

/** Brand wordmark — LAMBDA + sublabel, scalable */
export const BrandWordmark = ({ className, ...p }: SVG) => (
  <svg viewBox="0 0 220 56" className={className} {...p}>
    <g transform="translate(0,4)">
      <LambdaEmblem x={0} y={0} width={42} height={42} />
    </g>
    <g fill="#FFFFFF" fontFamily="var(--font-host), sans-serif" fontWeight={600}>
      <text x={54} y={26} fontSize={20} letterSpacing={1.6}>LAMBDA</text>
      <text x={54} y={44} fontSize={9} letterSpacing={3} fill="#9CC8F2" fontWeight={500}>
        AUTOMATIONS
      </text>
    </g>
  </svg>
);

export const ArrowUpRight = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export const SparkleIcon = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3 13.6 8.4 19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6Z" />
    <path d="M19 4v3M4 17v3M20.5 19h-3M5.5 5h-3" />
  </svg>
);

export const ChatIcon = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 12a8 8 0 0 1-12.4 6.7L3 21l2.3-5.6A8 8 0 1 1 21 12Z" />
  </svg>
);

export const DocIcon = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5" />
    <path d="M8 13h8M8 17h5" />
  </svg>
);

export const GaugeIcon = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 12a9 9 0 0 1 18 0" />
    <path d="M12 13 16 8" />
    <circle cx="12" cy="13" r="1.4" fill="currentColor" />
  </svg>
);

export const CheckIcon = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/** Verification-badge style: scalloped circle with a check inside. */
export const VerifiedIcon = (p: SVG) => (
  <svg viewBox="0 0 48 48" {...p}>
    <path
      fill="currentColor"
      d="M24 2.4l3 2.6 3.9-.8 1.8 3.5 4 .8.4 4 3.5 2.1-1 3.9 2.7 3-2.7 3 1 3.9-3.5 2.1-.4 4-4 .8-1.8 3.5-3.9-.8-3 2.6-3-2.6-3.9.8-1.8-3.5-4-.8-.4-4-3.5-2.1 1-3.9-2.7-3 2.7-3-1-3.9 3.5-2.1.4-4 4-.8 1.8-3.5 3.9.8z"
    />
    <path
      d="M16 24.5 L21.5 30 L33 18"
      fill="none"
      stroke="#0A2545"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronDown = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const InstagramIcon = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
export const LinkedinIcon = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4 4h4v4H4zM4 9h4v11H4zM10 9h4v2c.7-1.5 2.5-2.3 4.3-2.3C20.8 8.7 22 10.5 22 13v7h-4v-6c0-1.3-.7-2-1.9-2-1.3 0-2.1.9-2.1 2.4V20h-4z"/>
  </svg>
);
export const YoutubeIcon = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5C.6 9.4.6 12 .6 12s0 2.6.4 4.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4A3 3 0 0 0 23 16.5c.4-1.9.4-4.5.4-4.5s0-2.6-.4-4.5ZM10 15V9l5 3-5 3Z"/>
  </svg>
);
export const TwitterIcon = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2H21l-6.52 7.45L22 22h-5.96l-4.67-6.1L5.6 22H3l7-8L2 2h6.06l4.22 5.58L18.244 2Zm-1.04 18h1.66L7.93 4H6.16l11.044 16Z"/>
  </svg>
);
export const TiktokIcon = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5V13a1.5 1.5 0 1 0 1.5 1.5V3h2.4c.2 1.5 1.4 2.7 3.1 2.9V8c-1.4 0-2.6-.4-3.5-1Z"/>
  </svg>
);

export const MenuIcon = (p: SVG) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
