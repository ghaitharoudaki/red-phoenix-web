import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { NAV } from './nav';

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="snap-end bg-ink text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2.5 text-lg font-bold text-white">
            <Image src="/brand/logo-icon.png" alt={t('brand')} width={32} height={32} className="size-8" />
            <span className="font-display">{t('brand')}</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">{t('footer.tagline')}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2 text-sm">
            {NAV.map(({ key, href }) => (
              <li key={key}><Link href={href} className="transition-colors hover:text-white">{t(`nav.${key}`)}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3 text-sm">
          <p><span className="block font-semibold text-white">{t('footer.china')}</span>{t('footer.chinaCity')}</p>
          <p><span className="block font-semibold text-white">{t('footer.syria')}</span>{t('footer.syriaCity')}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">
        © {new Date().getFullYear()} {t('brand')}. {t('footer.rights')}
      </div>
    </footer>
  );
}