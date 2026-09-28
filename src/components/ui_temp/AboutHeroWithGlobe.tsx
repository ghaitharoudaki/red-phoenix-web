'use client';

import dynamic from 'next/dynamic';
import PageHero from '@/components/ui/PageHero';

const InteractiveEarth = dynamic(() => import('@/components/ui/InteractiveEarth'), {
  ssr: false,
});

interface AboutHeroWithGlobeProps {
  title: string;
  intro: string;
  eyebrow: string;
}

export default function AboutHeroWithGlobe({ title, intro, eyebrow }: AboutHeroWithGlobeProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-ink text-white">
      {/* 3D Earth Background Layer spanning the full hero area */}
      <div className="absolute inset-0 z-0 opacity-85 pointer-events-auto">
        <InteractiveEarth />
      </div>

      {/* Hero Content Overlay positioned centered/top */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pointer-events-none mt-12">
        <PageHero title={title} intro={intro} eyebrow={eyebrow} />
      </div>
    </section>
  );
}