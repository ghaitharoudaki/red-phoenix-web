import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import VerticalsShowcase from '@/components/home/VerticalsShowcase';
import ProcessSection from '@/components/home/ProcessSection';
import Reach from '@/components/home/Reach';
import WhyChooseUs from '@/components/ui/WhyChooseUs';
import CtaBand from '@/components/ui/CtaBand';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <VerticalsShowcase />
      <ProcessSection />
      <Reach />
      <WhyChooseUs />
      <CtaBand />
    </>
  );
}