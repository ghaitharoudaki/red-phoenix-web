'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SnapSection from '@/components/ui/SnapSection';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';

const PATH = 'M420 80 C 340 10, 170 30, 70 215';
type Node = 'china' | 'syria';

export default function Reach() {
  const t = useTranslations();
  const [hover, setHover] = useState<Node | null>(null);
  const nodes: { key: Node; city: string; note: string }[] = [
    { key: 'china', city: 'footer.chinaCity', note: 'pages.about.chinaOfficeNote' },
    { key: 'syria', city: 'footer.syriaCity', note: 'pages.about.syriaOfficeNote' },
  ];
  const scale = (n: Node) => ({ transform: `scale(${hover === n ? 1.8 : 1})`, transition: 'transform 0.3s ease' });

  return (
    <SnapSection
      className="bg-paper"
      background={
        <>
          <div className="animate-float-a absolute -top-24 end-[-6%] size-96 rounded-full bg-phoenix/10 blur-3xl" />
          <div className="animate-float-b absolute bottom-[-8rem] start-[-6%] size-96 rounded-full bg-ember/10 blur-3xl" />
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-5xl">{t('reach.title')}</h2>
            <p className="mt-4 text-lg text-ink/70">{t('reach.subtitle')}</p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {nodes.map((n, i) => (
              <Reveal key={n.key} delay={200 + i * 120}>
                <TiltCard>
                  <div
                    onMouseEnter={() => setHover(n.key)}
                    onMouseLeave={() => setHover(null)}
                    className={`glass-light rounded-2xl p-6 transition-shadow duration-300 ${hover === n.key ? 'shadow-xl ring-1 ring-phoenix/40' : ''}`}
                  >
                    <h3 className="font-semibold text-phoenix">{t(`footer.${n.key}`)}</h3>
                    <p className="mt-1 text-sm text-ink/60">{t(n.city)}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{t(n.note)}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal variant="zoom" delay={250}>
          <svg viewBox="0 0 490 300" className="w-full" role="img" aria-label={`${t('footer.china')} → ${t('footer.syria')}`}>
            <defs>
              <linearGradient id="reachGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d62828" />
                <stop offset="100%" stopColor="#f77f00" />
              </linearGradient>
            </defs>
            <path d={PATH} fill="none" stroke="url(#reachGrad)" strokeWidth="3" className="animate-dash" />
            <circle r="6" fill="#0b0f14">
              <animateMotion dur="6s" repeatCount="indefinite" path={PATH} />
            </circle>

            <g transform="translate(420 80)">
              <circle r="16" fill="#f77f00" opacity="0.25" className="animate-pulse-ring" />
              <circle r="9" fill="#f77f00" style={scale('china')} />
              <text y="-26" textAnchor="middle" fill="#0b0f14" fontSize="15" fontWeight="700">{t('footer.china')}</text>
            </g>
            <g transform="translate(70 215)">
              <circle r="16" fill="#d62828" opacity="0.25" className="animate-pulse-ring" />
              <circle r="9" fill="#d62828" style={scale('syria')} />
              <text y="40" textAnchor="middle" fill="#0b0f14" fontSize="15" fontWeight="700">{t('footer.syria')}</text>
            </g>
          </svg>
        </Reveal>
      </div>
    </SnapSection>
  );
}