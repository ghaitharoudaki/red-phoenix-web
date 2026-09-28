import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import FAQ from '@/components/ui/FAQ';
import CtaBand from '@/components/ui/CtaBand';

interface ServiceItemMeta {
  id: string;
  number: string;
  categoryKey: string;
  image: string;
}

const SERVICES_META: ServiceItemMeta[] = [
  {
    id: 'sports-facilities',
    number: '01',
    categoryKey: 'sports-wellness',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'office-furniture',
    number: '02',
    categoryKey: 'interior',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'restaurant-setup',
    number: '03',
    categoryKey: 'hospitality',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'advertising-signage',
    number: '04',
    categoryKey: 'branding',
    image: 'https://images.unsplash.com/photo-1513757378314-e46255f6ed16?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'raw-materials',
    number: '05',
    categoryKey: 'supply',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'industrial-heavy-equipment',
    number: '06',
    categoryKey: 'industrial',
    image: 'https://images.unsplash.com/photo-1610891015188-5369212db097?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'electronics',
    number: '07',
    categoryKey: 'tech',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
  },
];

const CATEGORY_KEYS = [
  'sports-wellness',
  'interior',
  'hospitality',
  'branding',
  'supply',
  'industrial',
  'tech',
] as const;

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.services');

  const servicesData = SERVICES_META.map((meta) => ({
    ...meta,
    title: t(`items.${meta.id}.title`),
    category: t(`items.${meta.id}.category`),
    description: t(`items.${meta.id}.description`),
  }));

  return (
    <div data-services-page className="min-h-screen bg-paper text-ink pt-32 pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Editorial Grid Layout */}
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:items-start">
          
          {/* Left Column: Sticky Title & Filter Navigation */}
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-phoenix">
                {t('eyebrow')}
              </span>
              <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl tracking-tight text-ink">
                {t('title')}
              </h1>
            </Reveal>
            
            <Reveal delay={100}>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink/75 font-light">
                {t('intro')}
              </p>
            </Reveal>

            {/* Category Sidebar Static Info / Labels */}
            <Reveal delay={200}>
              <div className="mt-12 hidden flex-col space-y-3 lg:flex">
                <span className="text-xs font-mono uppercase tracking-widest text-ink/40">
                  {t('allCategories') || 'All Sectors'}
                </span>
                {CATEGORY_KEYS.map((key) => (
                  <span key={key} className="text-start text-sm font-medium text-ink/75 py-1">
                    {t(`categories.${key}`)}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Static Full List Display */}
          <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
            {servicesData.map((service) => (
              <div key={service.id} className="py-8 transition-all duration-300">
                <div className="flex items-center gap-6 sm:gap-10">
                  <span className="font-mono text-sm font-bold text-phoenix">
                    {service.number}
                  </span>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
                      {service.title}
                    </h2>
                    <span className="text-xs font-medium uppercase tracking-wider text-ink/40 mt-1 block">
                      {service.category}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-[1.2fr_1fr] sm:items-center">
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-xl border border-ink/10 shadow-sm">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed text-ink/75 font-light">
                      {service.description}
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-phoenix hover:underline"
                    >
                      {t('cta')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      <div className="mt-32">
        <FAQ />
      </div>
      <div>
        <CtaBand />
      </div>
    </div>
  );
}