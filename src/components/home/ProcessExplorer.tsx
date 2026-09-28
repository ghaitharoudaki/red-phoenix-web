'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import TiltCard from '@/components/ui/TiltCard';

const STEPS = ['sourcing', 'planning', 'supplying', 'executing'] as const;

export default function ProcessExplorer() {
  const t = useTranslations('pages.about');
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setI((n) => (n + 1) % STEPS.length), 4500);
    return () => clearInterval(id);
  }, [auto]);

  const pick = (idx: number) => { setAuto(false); setI(idx); };
  const step = STEPS[i];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <ol className="space-y-3">
        {STEPS.map((s, idx) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => pick(idx)}
              onMouseEnter={() => pick(idx)}
              aria-current={idx === i}
              className={`flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-start transition-all duration-300 ${
                idx === i
                  ? 'border-phoenix/60 bg-phoenix/15 shadow-lg shadow-phoenix/10'
                  : 'border-white/10 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              <span className={`font-display text-2xl font-bold transition-colors duration-300 ${idx === i ? 'text-phoenix' : 'text-white/30'}`}>0{idx + 1}</span>
              <span className="text-lg font-semibold">{t(`steps.${s}.title`)}</span>
              <span className={`ms-auto transition-all duration-300 rtl:-scale-x-100 ${idx === i ? 'opacity-100' : 'opacity-0'}`} aria-hidden>→</span>
            </button>
          </li>
        ))}
      </ol>

      <TiltCard>
        <div className="glass-dark relative overflow-hidden rounded-3xl p-8 sm:p-10">
          <div key={step} className="animate-fade-up min-h-[13rem]">
            <p className="font-display text-7xl font-bold text-phoenix/25">0{i + 1}</p>
            <h3 className="mt-2 font-display text-3xl font-bold">{t(`steps.${step}.title`)}</h3>
            <p className="mt-4 text-lg leading-relaxed text-white/75">{t(`steps.${step}.text`)}</p>
          </div>
          <div className="mt-8 flex gap-2" aria-hidden>
            {STEPS.map((_, idx) => (
              <span key={idx} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${idx <= i ? 'bg-phoenix' : 'bg-white/15'}`} />
            ))}
          </div>
        </div>
      </TiltCard>
    </div>
  );
}