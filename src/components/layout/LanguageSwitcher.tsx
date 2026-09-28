'use client';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LANGS: Record<string, { native: string; short: string }> = {
  en: { native: 'English', short: 'EN' },
  ar: { native: 'العربية', short: 'AR' },
  zh: { native: '中文', short: '中' },
};

export default function LanguageSwitcher({ transparent = false }: { transparent?: boolean }) {
  const locale = useLocale();
  const t = useTranslations('languageSwitcher');
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('label')}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${
          transparent
            ? 'border-white/30 text-white/90 hover:border-white hover:text-white'
            : 'border-black/10 text-ink/80 hover:border-phoenix/40 hover:text-phoenix'
        }`}
      >
        <span>{LANGS[locale]?.short ?? locale.toUpperCase()}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <ul
        role="listbox"
        aria-label={t('label')}
        className={`absolute end-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-black/10 bg-white py-1 shadow-xl transition-all duration-200 ease-out ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        {routing.locales.map((l) => (
          <li key={l} role="option" aria-selected={l === locale}>
            <button
              type="button"
              lang={l}
              onClick={() => {
                setOpen(false);
                router.replace(pathname, { locale: l });
              }}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-paper ${
                l === locale ? 'font-semibold text-phoenix' : 'text-ink/80'
              }`}
            >
              {LANGS[l]?.native ?? l}
              {l === locale && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}