import { useTranslations } from 'next-intl';

export default function Testimonial() {
  const t = useTranslations('testimonial');
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" className="mx-auto text-phoenix/30">
          <path d="M7 9c-2.2 0-4 1.8-4 4v6h6v-6H6c0-1.1.9-2 2-2V9Zm10 0c-2.2 0-4 1.8-4 4v6h6v-6h-3c0-1.1.9-2 2-2V9Z" />
        </svg>
        <p className="mt-4 font-display text-xl leading-relaxed sm:text-2xl">{t('quote')}</p>
        <p className="mt-6 text-sm font-semibold text-ink/70">{t('role')}</p>
      </div>
    </section>
  );
}
