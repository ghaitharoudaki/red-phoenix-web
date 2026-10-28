'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ScrollCue from '@/components/ui/ScrollCue';

const SLIDES = [
  { src: '/hero/port-container.webp', key: 'port' },
  { src: '/hero/padel-court.webp', key: 'padel' },
  { src: '/hero/shanghai-street.webp', key: 'street' },
] as const;

const INTERVAL_MS = 6000;

export default function Hero() {
  const t = useTranslations('hero');
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
    <section
      data-snap-section
      className="relative isolate min-h-[min(760px,100svh)] overflow-hidden bg-ink text-white sm:min-h-screen"
      aria-label="Featured projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* background photos */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== index}
        >
          <Image src={slide.src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink/90" aria-hidden />

      {/* text + CTAs, each slide is a full self-contained block so it always sizes correctly */}
      <div className="relative z-[1] mx-auto grid min-h-[min(760px,100svh)] max-w-7xl px-4 py-24 sm:min-h-screen sm:px-6">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.key}
            className={`col-start-1 row-start-1 flex flex-col justify-center transition-opacity duration-700 ease-in-out ${
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={i !== index}
          >
            <h1 aria-live="polite" className="font-display max-w-2xl text-[clamp(2.4rem,7vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.04em]">
              {t(`slides.${slide.key}.titleLead`)}{' '}
              <span className="text-ember">
                {t(`slides.${slide.key}.titleHighlight`)}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              {t(`slides.${slide.key}.sub`)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              <Link href="/contact" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-phoenix px-7 py-3.5 font-semibold transition-all duration-300 hover:bg-phoenix/90 hover:shadow-lg hover:shadow-phoenix/30 active:scale-[.98]">
                {t('ctaPrimary')}
                <span className="inline-block transition-transform duration-300 rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden>→</span>
              </Link>
              <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 py-3.5 font-semibold transition-colors duration-300 hover:bg-white/10">
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="absolute inset-x-0 bottom-7 z-10 flex justify-center gap-3 sm:bottom-8">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={t('carousel.goTo', { n: i + 1 })}
            aria-current={i === index}
            className={`min-h-11 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-white' : 'w-8 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* scroll cue */}
      <ScrollCue className="absolute bottom-5 end-6 z-10" />
    </section>
  );
}