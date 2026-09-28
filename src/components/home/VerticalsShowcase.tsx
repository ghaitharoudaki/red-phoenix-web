import { useTranslations } from 'next-intl';
import SnapSection from '@/components/ui/SnapSection';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import Cube3D from '@/components/ui/Cube3D';

const VERTICALS = [
  { titleKey: 'sports', itemKey: 'sports-facilities' },
  { titleKey: 'commercial', itemKey: 'office-furniture' },
  { titleKey: 'commercial', itemKey: 'restaurant-setup' },
  { titleKey: 'industrial', itemKey: 'industrial-heavy-equipment' },
] as const;

export default function VerticalsShowcase() {
  const t = useTranslations();
  return (
    <SnapSection
      className="bg-phoenix text-white"
      background={
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '46px 46px' }}
        />
      }
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl font-bold sm:text-5xl">{t('verticalsShowcase.title')}</h2>
          <p className="mt-4 text-lg text-white/85">{t('verticalsShowcase.subtitle')}</p>
        </Reveal>
        <Reveal variant="zoom" delay={150}><Cube3D /></Reveal>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {VERTICALS.map(({ titleKey, itemKey }, i) => (
          <Reveal key={itemKey} delay={200 + i * 120}>
            <TiltCard>
              <div className="glass-red flex h-full flex-col rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold">{t(`hero.verticals.${titleKey}`)}</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/85">
                  {(t.raw(`pages.services.items.${itemKey}.bullets`) as string[]).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-white/70" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </SnapSection>
  );
}