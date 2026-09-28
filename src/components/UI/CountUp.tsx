'use client';
import { useEffect, useRef, useState } from 'react';

export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const parsed = /^(\d+)(.*)$/.exec(value);
  const suffix = parsed ? parsed[2] : '';
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const m = /^(\d+)(.*)$/.exec(value);
    const el = ref.current;
    if (!el || !m) return;
    const target = parseInt(m[1], 10);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        if (!entry.isIntersecting) { setN(0); return; }
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]);

  if (!parsed) return <span>{value}</span>;
  return <span ref={ref}>{n}{suffix}</span>;
}