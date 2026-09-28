import type { CSSProperties, ReactNode } from 'react';

export default function Reveal({
  children, delay = 0, variant = 'up', className = '',
}: { children: ReactNode; delay?: number; variant?: 'up' | 'zoom'; className?: string }) {
  return (
    <div data-reveal={variant} style={{ '--d': `${delay}ms` } as CSSProperties} className={className}>
      {children}
    </div>
  );
}