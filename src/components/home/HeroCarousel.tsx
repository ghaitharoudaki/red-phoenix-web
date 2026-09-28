'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const SLIDES = [
  { src: '/hero/port-container.webp', captionKey: 'port' },
  { src: '/hero/padel-court.webp', captionKey: 'padel' },
  { src: '/hero/shanghai-street.webp', captionKey: 'street' },
] as const;

const INTERVAL_MS = 6000;

export default function HeroCarousel() {
  const t = useTranslations('hero.carousel');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || paused) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* darken for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink/90" aria-hidden />

      {/* per-slide caption, synced to the active image */}
      <div className="absolute inset-x-0 top-24 z-[1] mx-auto max-w-7xl px-4 sm:px-6 sm:top-28">
        {SLIDES.map((slide, i) => (
          <p
            key={slide.captionKey}
            className={`absolute inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-ember backdrop-blur-sm transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== index}
          >
            {t(`captions.${slide.captionKey}`)}
          </p>
        ))}
      </div>

      {/* dots */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={t('goTo', { n: i + 1 })}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}