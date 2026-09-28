type IconProps = { className?: string };
const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function IconRacket({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="9" cy="8" rx="6" ry="7" />
      <path d="M9 1a5 7 0 0 0 0 14M9 1a5 7 0 0 1 0 14" />
      <path d="M13.5 12.5L21 20" />
      <path d="M19 22l2-2-2-2-2 2z" />
    </svg>
  );
}
export function IconBasketball({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3v18" />
      <path d="M5.5 5.5c2 2.5 2 8.5 0 13M18.5 5.5c-2 2.5-2 8.5 0 13" />
    </svg>
  );
}
export function IconStadium({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="12" cy="12" rx="10" ry="6" />
      <ellipse cx="12" cy="12" rx="5" ry="3" />
    </svg>
  );
}
export function IconDumbbell({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2" y="9" width="3" height="6" rx="1" /><rect x="19" y="9" width="3" height="6" rx="1" />
      <rect x="6" y="7" width="2.5" height="10" rx="1" /><rect x="15.5" y="7" width="2.5" height="10" rx="1" />
      <path d="M8.5 12h7" />
    </svg>
  );
}
export function IconStretch({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v6M12 12l-5 4M12 12l5 4M7 8l5 2 5-2" />
    </svg>
  );
}
export function IconGear({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.5M12 18.5V21M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M3 12h2.5M18.5 12H21M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </svg>
  );
}
export function IconBriefcase({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="7" width="19" height="12" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2.5 12h19" />
    </svg>
  );
}
export function IconBuilding({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
    </svg>
  );
}
export function IconUtensils({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 2v8a2 2 0 0 0 4 0V2M8 10v12" />
      <path d="M17 2c-1.5 0-3 1.5-3 4v4h3v12" />
    </svg>
  );
}
export function IconBox({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8l9-5 9 5-9 5-9-5Z" />
      <path d="M3 8v9l9 5 9-5V8M12 13v9" />
    </svg>
  );
}
export function IconTruck({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2 6h11v10H2z" /><path d="M13 10h4l4 3.5V16h-8" />
      <circle cx="6.5" cy="18" r="1.8" /><circle cx="16.5" cy="18" r="1.8" />
    </svg>
  );
}
export function IconFactory({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 21V11l5 3v-3l5 3v-3l5 3v7Z" />
      <path d="M3 21h17" />
    </svg>
  );
}