'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

const KEYS = ['leadTime', 'customs', 'projectSize', 'afterSales', 'payment'] as const;

export default function FAQ() {
  const t = useTranslations('faq');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative isolate overflow-hidden bg-paper py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-24 end-[-8%] size-96 rounded-full bg-phoenix/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] start-[-8%] size-96 rounded-full bg-ember/10 blur-3xl" />
      </div>
      
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <Reveal><h2 className="font-display text-3xl font-bold sm:text-5xl">{t('title')}</h2></Reveal>
        <Reveal delay={150} className="mt-8">
          <div className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
            {KEYS.map((k, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={k}>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start font-medium"
                  >
                    {t(`items.${k}.q`)}
                    <svg
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                      strokeLinecap="round" className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  <div
                    className={`grid overflow-hidden px-6 text-sm leading-relaxed text-ink/70 transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">{t(`items.${k}.a`)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}