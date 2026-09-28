import { useTranslations } from 'next-intl';
import SnapSection from './SnapSection';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import CountUp from './CountUp';

const ITEMS = ['onGround', 'qualityControl', 'singleContact', 'transparentProcess'] as const;
const STATS = ['countries', 'verticals', 'contact', 'process'] as const;

const ICONS: Record<(typeof ITEMS)[number], React.ReactNode> = {
  onGround: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s7-6.1 7-12A7 7 0 0 0 5 10c0 5.9 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  qualityControl: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4" /><path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4Z" />
    </svg>
  ),
  singleContact: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  ),
  transparentProcess: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </svg>
  ),
};

export default function WhyChooseUs() {
  const t = useTranslations('whyChooseUs');
  const ts = useTranslations('trust');
  return (
    <SnapSection
      className="bg-ink text-white"
      background={
        <>
          <div className="animate-float-a absolute -top-32 end-[-6%] size-96 rounded-full bg-phoenix/25 blur-3xl" />
          <div className="animate-float-b absolute bottom-[-8rem] start-[-6%] size-96 rounded-full bg-ember/15 blur-3xl" />
        </>
      }
    >
      <Reveal className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold sm:text-5xl">{t('title')}</h2>
        <p className="mt-4 text-lg text-white/70">{t('subtitle')}</p>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((k, i) => (
          <Reveal key={k} delay={120 + i * 100}>
            <div className="glass-dark rounded-2xl p-5 text-center">
              <p className="font-display text-4xl font-bold text-phoenix"><CountUp value={ts(`stats.${k}.value`)} /></p>
              <p className="mt-1 text-sm text-white/65">{ts(`stats.${k}.label`)}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((k, i) => (
          <Reveal key={k} delay={450 + i * 110}>
            <TiltCard>
              <div className="glass-dark h-full rounded-2xl p-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-phoenix/15 text-phoenix">{ICONS[k]}</div>
                <h3 className="mt-4 font-semibold">{t(`items.${k}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{t(`items.${k}.text`)}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </SnapSection>
  );
}