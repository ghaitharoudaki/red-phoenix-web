'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function SnapSection({
  children, className = '', background, width = 'max-w-7xl', id,
}: { children: ReactNode; className?: string; background?: ReactNode; width?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '-35% 0px -35% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      data-snap-section
      data-active={active ? 'true' : 'false'}
      className={`relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden ${className}`}
    >
      {background && (
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>{background}</div>
      )}
      <div className={`section-inner relative mx-auto w-full px-4 py-24 sm:px-6 ${width}`}>{children}</div>
    </section>
  );
}