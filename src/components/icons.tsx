import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Filled paw print: main pad plus four toes. */
export function Paw({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12 12.2c-2.6 0-5.6 3.3-5.6 5.6 0 1.6 1.2 2.4 2.6 2.4 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.4 0 2.6-.8 2.6-2.4 0-2.3-3-5.6-5.6-5.6Z" />
      <ellipse cx="6" cy="10.4" rx="1.9" ry="2.4" transform="rotate(-18 6 10.4)" />
      <ellipse cx="9.6" cy="6.4" rx="2" ry="2.6" transform="rotate(-6 9.6 6.4)" />
      <ellipse cx="14.4" cy="6.4" rx="2" ry="2.6" transform="rotate(6 14.4 6.4)" />
      <ellipse cx="18" cy="10.4" rx="1.9" ry="2.4" transform="rotate(18 18 10.4)" />
    </svg>
  );
}

export const Check = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </Svg>
);
export const Phone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
  </Svg>
);
export const Mail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </Svg>
);
export const MapPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </Svg>
);
export const Clock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);
export const Arrow = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
export const ArrowLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);
export const External = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 5h5v5M19 5l-8 8M17 14v4a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 5 18V8.5A1.5 1.5 0 0 1 6.5 7H10" />
  </Svg>
);
export const Download = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />
  </Svg>
);
export const Plus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const Close = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);
export const Menu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Svg>
);
export const Pill = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)" />
    <path d="m9.2 8 5.6 8" />
  </Svg>
);
export const Refill = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4h-4" />
  </Svg>
);
export const Door = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 20.5V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5v16M4 20.5h16" />
    <circle cx="14.5" cy="12" r=".9" fill="currentColor" />
  </Svg>
);
export const Doc = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 3h7l5 5v11.5A1.5 1.5 0 0 1 17.5 21h-10A1.5 1.5 0 0 1 6 19.5v-15A1.5 1.5 0 0 1 7 3Z" />
    <path d="M14 3v5h5M9 13h6M9 16.5h4" />
  </Svg>
);
export const Alert = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
    <path d="M12 10v4.5M12 17.4v.1" />
  </Svg>
);

/* Service icons */
export const Stethoscope = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3.5v5a4 4 0 0 0 8 0v-5" />
    <path d="M10 12.5v2.5a4.5 4.5 0 0 0 9 0v-2" />
    <circle cx="19" cy="11" r="2" />
  </Svg>
);
export const Syringe = (p: IconProps) => (
  <Svg {...p}>
    <path d="m15 4 5 5M17.5 6.5 14 10M18 11 9.5 19.5 6 20l.5-3.5L15 8" />
    <path d="m11 12 1.5 1.5M8.5 14.5 10 16M3.5 20.5 6 18" />
  </Svg>
);
export const Heart = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
  </Svg>
);
export const Bowl = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 12.5h18a9 9 0 0 1-18 0Z" />
    <path d="M8.5 9.5c0-1.5 1.5-1.5 1.5-3M13.5 9.5c0-1.5 1.5-1.5 1.5-3" />
  </Svg>
);
export const PulseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 12h4l2-5 4 10 2-5h6" />
  </Svg>
);
export const Xray = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M9 8.5a1.5 1.5 0 1 1 1.5-1.5L13.5 17a1.5 1.5 0 1 1 1.5 1.5" />
  </Svg>
);
export const Surgery = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 3.5h4v6.5h6.5v4H14v6.5h-4V14H3.5v-4H10Z" />
  </Svg>
);
export const Leaf = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
    <path d="M5 19c3-4 6-6.5 9-8" />
  </Svg>
);

export const serviceIcons = {
  exams: Stethoscope,
  vaccines: Syringe,
  spay: Heart,
  nutrition: Bowl,
  pulse: PulseIcon,
  xray: Xray,
  surgery: Surgery,
  leaf: Leaf,
};

export const Facebook = (p: IconProps) => (
  <svg width={p.size ?? 20} height={p.size ?? 20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3Z" />
  </svg>
);
export const Instagram = (p: IconProps) => (
  <Svg size={p.size ?? 20}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
  </Svg>
);
