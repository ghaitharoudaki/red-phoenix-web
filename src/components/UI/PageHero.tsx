'use client';

import dynamic from 'next/dynamic';
import ScrollCue from './ScrollCue';

const InteractiveEarth = dynamic(() => import('./InteractiveEarth'), { ssr: false });

export default function PageHero({ 
  title, 
  intro, 
  eyebrow, 
  globeBackground = false
}: { 
  title: string; 
  intro: string; 
  eyebrow?: string; 
  globeBackground?: boolean;
}) {
  return (
    <section data-snap-section className="relative isolate flex min-h-screen items-center overflow-hidden bg-ink text-white">
      {/* Full-screen background interactive globe */}
      {globeBackground && (
        <div className="absolute inset-0 z-0 size-full opacity-80 sm:opacity-90 pointer-events-auto">
          <InteractiveEarth />
        </div>
      )}

      {!globeBackground && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="animate-float-a absolute -top-24 end-[-8%] size-96 rounded-full bg-phoenix/30 blur-3xl" />
          <div className="animate-float-b absolute bottom-[-10rem] start-[-6%] size-80 rounded-full bg-ember/20 blur-3xl" />
        </div>
      )}

      {/* Optimized bottom-left text container for mobile and desktop */}
      <div className="absolute bottom-16 left-6 sm:left-12 lg:left-20 z-20 max-w-lg lg:max-w-xl pointer-events-auto pr-6">
        {eyebrow && (
          <p className="animate-fade-up mb-3 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-ember">
            <span className="h-px w-6 bg-ember" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h1 className="animate-fade-up font-display text-3xl sm:text-5xl lg:text-6xl font-bold" style={{ animationDelay: '80ms' }}>
          {title}
        </h1>
        <p className="animate-fade-up mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-white/80" style={{ animationDelay: '160ms' }}>
          {intro}
        </p>
      </div>

      <ScrollCue className="absolute inset-x-0 bottom-4 sm:bottom-6 mx-auto z-20" />
    </section>
  );
}