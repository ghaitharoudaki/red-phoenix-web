'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const VERTICALS = ['sports', 'fitness', 'commercial', 'industrial'] as const;
const field = 'mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3 outline-none transition-colors focus:border-phoenix';

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
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
      <label className="block text-sm font-medium">{t('pages.contact.name')}
        <input required name="name" className={field} />
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
        <textarea required name="message" rows={5} className={field} />
      </label>
      <button className="w-full rounded-full bg-phoenix px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-phoenix/90 hover:shadow-lg hover:shadow-phoenix/30 active:scale-95">
        {t('pages.contact.submit')}
      </button>
    </form>
  );
}
