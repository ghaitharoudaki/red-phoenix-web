import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Reveal from './Reveal';

export default function CtaBand() {
  const t = useTranslations('ctaBand');
  return (
    <section className="relative isolate overflow-hidden bg-phoenix py-32 text-center text-white">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '46px 46px' }}
        />
        <div className="animate-float-a absolute -top-24 start-[10%] size-96 rounded-full bg-white/15 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Reveal><h2 className="font-display text-5xl font-bold sm:text-7xl">{t('title')}</h2></Reveal>
        <Reveal delay={150}><p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">{t('text')}</p></Reveal>
        <Reveal delay={300}>
          <Link href="/contact" className="mt-12 inline-flex rounded-full bg-white px-10 py-5 font-bold text-phoenix transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 text-lg">
            {t('button')}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}