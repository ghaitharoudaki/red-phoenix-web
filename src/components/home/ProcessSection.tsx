import { useTranslations } from 'next-intl';
import SnapSection from '@/components/ui/SnapSection';
import Reveal from '@/components/ui/Reveal';
import ProcessExplorer from './ProcessExplorer';

export default function ProcessSection() {
  const t = useTranslations('pages.about');
  return (
    <SnapSection
      className="bg-ink text-white"
      background={
        <>
          <div className="animate-float-a absolute -top-24 start-[-6%] size-96 rounded-full bg-phoenix/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '42px 42px' }}
          />
        </>
      }
    >
      <Reveal><h2 className="font-display text-3xl font-bold sm:text-5xl">{t('stepsTitle')}</h2></Reveal>
      <Reveal delay={150} className="mt-10"><ProcessExplorer /></Reveal>
    </SnapSection>
  );
}