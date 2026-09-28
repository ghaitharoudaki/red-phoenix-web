import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('pages.notFound');
  return (
    <section className="mx-auto max-w-2xl px-4 py-28 text-center">
      <p className="font-display text-6xl font-bold text-phoenix">404</p>
      <h1 className="mt-4 text-2xl font-bold">{t('title')}</h1>
      <p className="mt-3 text-ink/70">{t('body')}</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-7 py-3 font-semibold text-white transition-all duration-300 hover:bg-ink/90 active:scale-95">
        {t('home')}
      </Link>
    </section>
  );
}
