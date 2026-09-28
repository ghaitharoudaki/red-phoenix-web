'use client';
import { useTranslations } from 'next-intl';

export default function ScrollCue({ className = '' }: { className?: string }) {
  const t = useTranslations('sectionNav');

  function go(e: React.MouseEvent<HTMLButtonElement>) {
    const current = e.currentTarget.closest('[data-snap-section]');
    const all = Array.from(document.querySelectorAll('[data-snap-section]'));
    all[all.indexOf(current as Element) + 1]?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <button
      type="button"
      onClick={go}
      aria-label={t('scrollDown')}
      className={`inline-flex size-11 items-center justify-center rounded-full border border-white/30 text-white/80 backdrop-blur transition-colors hover:border-white hover:text-white ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}