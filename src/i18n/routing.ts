import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar', 'zh'],
  defaultLocale: 'en',
});
export type Locale = (typeof routing.locales)[number];
export const isRtl = (l: string) => l === 'ar';
