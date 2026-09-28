'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';

export default function SectionDots() {
  const t = useTranslations('sectionNav');
  const pathname = usePathname();
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let io: IntersectionObserver | undefined;
    const timer = setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-snap-section]'));
      setCount(els.length);
      setActive(0);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement));
          }
        },
        { rootMargin: '-49% 0px -49% 0px' },
      );
      els.forEach((el) => io!.observe(el));
    }, 120);
    return () => { clearTimeout(timer); io?.disconnect(); };
  }, [pathname]);

  // All hooks have been registered unconditionally above. 
  // It is now 100% safe to do conditional returns down here!
  if (pathname.includes('/services') || count < 2) {
    return null;
  }

  return (
    <nav className="fixed end-3 top-1/2 z-40 -translate-y-1/2 sm:end-5">
      <ul className="flex flex-col gap-3 rounded-full bg-ink/40 px-2 py-3 backdrop-blur-md">
        {Array.from({ length: count }, (_, i) => (
          <li key={i}>
            <button
              type="button"
              aria-label={t('goTo', { n: i + 1 })}
              aria-current={i === active}
              onClick={() => document.querySelectorAll('[data-snap-section]')[i]?.scrollIntoView({ behavior: 'smooth' })}
              className={`block w-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'h-6 bg-phoenix' : 'h-1.5 bg-white/60 hover:bg-white'
              }`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}