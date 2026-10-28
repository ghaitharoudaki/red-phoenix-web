import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Reveal from './Reveal';

export default function CtaBand() {
  const t = useTranslations('ctaBand');
  return (
    <section className="relative isolate overflow-hidden bg-phoenix py-20 text-center text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '46px 46px' }}
        />
        <div className="animate-float-a absolute -top-24 start-[10%] size-96 rounded-full bg-white/15 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Reveal><h2 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.04em]">{t('title')}</h2></Reveal>
        <Reveal delay={150}><p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">{t('text')}</p></Reveal>
        <Reveal delay={300}>
          <Link href="/contact" className="mt-10 inline-flex min-h-14 items-center rounded-full bg-white px-8 py-4 text-lg font-bold text-phoenix transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-[.98] sm:px-10 sm:py-5">
            {t('button')}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}