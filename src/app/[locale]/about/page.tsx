import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageHero from '@/components/ui/PageHero';
import SnapSection from '@/components/ui/SnapSection';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/ui/CtaBand';

const STEPS = ['sourcing', 'planning', 'supplying', 'executing'] as const;
const VALUES = ['reliability', 'transparency', 'partnership', 'craftsmanship'] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.about');
  const f = await getTranslations('footer');

  return (
    <>
      {/* Hero Section with the full-screen interactive globe as the background */}
      <PageHero 
        title={t('title')} 
        intro={t('intro')} 
        eyebrow={t('eyebrow')} 
        globeBackground={true} 
      />

      {/* VALUES: Editorial Clean Typography & Side-by-Side Flow (No boxed cards) */}
      <SnapSection className="bg-phoenix text-white">
        <div className="max-w-4xl">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">{t('coreEthos')}</span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-6xl tracking-tight">{t('valuesTitle')}</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-lg sm:text-xl text-white/90 leading-relaxed font-light">{t('valuesSubtitle')}</p>
          </Reveal>
        </div>

        <div className="mt-16 sm:mt-24 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {VALUES.map((v, i) => (
            <Reveal key={v} delay={150 + i * 100}>
              <div className="group relative border-t border-white/20 pt-6 transition-colors hover:border-white">
                <span className="text-xs font-mono font-bold tracking-widest text-white/60">0{i + 1} //</span>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-wide">{t(`values.${v}.title`)}</h3>
                <p className="mt-3 text-base sm:text-lg leading-relaxed text-white/80 font-light">{t(`values.${v}.text`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SnapSection>

      {/* HOW WE WORK: Horizontal Process Chain / Minimalist Editorial List */}
      <SnapSection className="bg-paper text-ink">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/10 pb-10">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-phoenix">{t('methodologyTitle')}</span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-5xl">{t('stepsTitle')}</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-md text-sm sm:text-base text-ink/70">{t('methodologyDesc')}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s} delay={150 + i * 120}>
              <div className="relative flex flex-col justify-between h-full pt-6 border-t-2 border-ink/10 transition-all duration-300 hover:border-phoenix">
                <div>
                  <span className="font-mono text-xs font-bold text-phoenix">PHASE 0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink">{t(`steps.${s}.title`)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{t(`steps.${s}.text`)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SnapSection>

      {/* OFFICES: Asymmetric Editorial Split with Atmospheric Background */}
      <SnapSection className="bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero/shanghai-street.webp" alt="" fill sizes="100vw" className="object-cover opacity-25 filter grayscale contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-phoenix">{t('globalOperations')}</span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-5xl">{t('officesTitle')}</h2>
          </Reveal>
        </div>

        <div className="relative z-10 mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {(['china', 'syria'] as const).map((k, i) => (
            <Reveal key={k} delay={200 + i * 150}>
              <div className="border-l-2 border-phoenix/60 pl-6 sm:pl-8">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">{f(`${k}City`)} Hub</span>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-white">{f(k)}</h3>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/80 font-light">{t(`${k}OfficeNote`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SnapSection>

      <CtaBand />
    </>
  );
}