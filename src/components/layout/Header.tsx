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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-black/5 bg-paper/85 backdrop-blur' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
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
            className={`md:hidden p-2 transition-colors duration-300 ${solid ? 'text-ink' : 'text-white'}`}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300">
              <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
      </div>

      <nav
        className={`md:hidden overflow-hidden border-t border-black/5 bg-paper px-4 transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-80 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
        aria-label="Mobile"
      >
        {NAV.map(({ key, href }) => (
          <Link key={key} href={href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium text-ink transition-colors hover:text-phoenix">
            {t(`nav.${key}`)}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-phoenix py-3 text-center font-semibold text-white active:scale-95">
          {t('cta.quote')}
        </Link>
      </nav>
    </header>
  );
}