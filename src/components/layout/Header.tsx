'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { NAV } from './nav';

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Force solid header on contact page, non-home pages, or if it's a 404 path
  const isContactPage = pathname?.includes('/contact');
  const isHome = pathname === '/' || pathname === '';
  const solid = scrolled || open || isContactPage || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        solid ? 'border-black/8 bg-paper/92 shadow-[0_8px_30px_rgba(11,15,20,0.06)] backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/brand/logo-icon.png"
            alt={t('brand')}
            width={36}
            height={36}
            priority
            className="size-9 animate-fade-up transition-transform duration-500 ease-out group-hover:rotate-[8deg] group-hover:scale-110"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {NAV.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={`relative text-sm font-medium transition-colors duration-300 hover:text-phoenix after:absolute after:-bottom-1 after:start-0 after:h-0.5 after:bg-phoenix after:transition-all after:duration-300 ${
                pathname === href
                  ? 'text-phoenix after:w-full'
                  : `after:w-0 hover:after:w-full ${solid ? 'text-ink/80' : 'text-white/90'}`
              }`}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher transparent={!solid} />
          <Link
            href="/contact"
            className="hidden sm:inline-flex rounded-full bg-phoenix px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-phoenix/90 hover:shadow-lg hover:shadow-phoenix/30 active:scale-95"
          >
            {t('cta.quote')}
          </Link>
          <button
            className={`flex size-11 items-center justify-center rounded-full transition-colors duration-300 ${solid ? 'text-ink hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300">
              <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className={`md:hidden overflow-hidden border-t border-black/5 bg-paper px-4 transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-80 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
        aria-label="Mobile"
        aria-hidden={!open}
        inert={!open}
      >
        {NAV.map(({ key, href }) => (
          <Link key={key} href={href} onClick={() => setOpen(false)} className="flex min-h-11 items-center py-2 text-base font-medium text-ink transition-colors hover:text-phoenix">
            {t(`nav.${key}`)}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-phoenix py-3 text-center font-semibold text-white shadow-lg shadow-phoenix/20 active:scale-[.98]">
          {t('cta.quote')}
        </Link>
      </nav>
    </header>
  );
}