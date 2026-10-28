'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const VERTICALS = ['sports', 'fitness', 'commercial', 'industrial'] as const;
const field = 'mt-2 min-h-12 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition-[border-color,box-shadow] placeholder:text-ink/40 focus:border-phoenix focus:ring-4 focus:ring-phoenix/10';

export default function ContactForm() {
  const t = useTranslations();
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST to /api/quote (route handler / server action) once the backend exists.
    setSent(true);
  }

  if (sent) {
    return (
      <p className="rounded-2xl border border-black/10 bg-white p-8 text-center text-lg font-medium" role="status">
        {t('pages.contact.sent')}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-lift space-y-5 rounded-3xl p-5 sm:p-8">
      <label className="block text-sm font-medium">{t('pages.contact.name')}
        <input required name="name" placeholder={t('pages.contact.namePlaceholder')} className={field} />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">{t('pages.contact.email')}
          <input required type="email" name="email" className={field} dir="ltr" />
        </label>
        <label className="block text-sm font-medium">{t('pages.contact.phone')}
          <input type="tel" name="phone" className={field} dir="ltr" />
        </label>
      </div>
      <label className="block text-sm font-medium">{t('pages.contact.vertical')}
        <select name="vertical" className={field} defaultValue="">
          <option value="" disabled>{t('pages.contact.select')}</option>
          {VERTICALS.map((v) => <option key={v} value={v}>{t(`hero.verticals.${v}`)}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium">{t('pages.contact.message')}
        <textarea required name="message" rows={5} placeholder={t('pages.contact.messagePlaceholder')} className={field} />
      </label>
      <button type="submit" className="min-h-12 w-full rounded-full bg-phoenix px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-phoenix/90 hover:shadow-lg hover:shadow-phoenix/30 active:scale-[.98]">
        {t('pages.contact.submit')}
      </button>
    </form>
  );
}
