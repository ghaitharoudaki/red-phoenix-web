import { useTranslations } from 'next-intl';
import TiltCard from './TiltCard';

const KEYS = ['countries', 'verticals', 'contact', 'process'] as const;

export default function TrustBar() {
  const t = useTranslations('trust');
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 py-16 sm:px-6 md:grid-cols-4">
        {KEYS.map((k) => (
          <TiltCard key={k}>
            <div className="glass-dark rounded-2xl p-6 text-center">
              <p className="font-display text-3xl font-bold text-phoenix sm:text-4xl">{t(`stats.${k}.value`)}</p>
              <p className="mt-1 text-sm text-white/70">{t(`stats.${k}.label`)}</p>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}