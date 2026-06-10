import { useState } from 'react';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Audiences } from '@/components/sections/Audiences';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Results } from '@/components/sections/Results';
import { Pricing } from '@/components/sections/Pricing';
import { CtaBand, Footer } from '@/components/sections/Footer';
import { LeadModal } from '@/components/sections/LeadModal';
import { useReveal } from '@/hooks/useReveal';

export default function App() {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  useReveal();
  return (
    <>
      <Header onCta={openModal} />
      <main>
        <Hero onCta={openModal} />
        <Audiences />
        <HowItWorks />
        <Results />
        {/* Скрыто до появления реальных отзывов и кейсов: <Testimonials /> */}
        <Pricing onCta={openModal} />
        <CtaBand onCta={openModal} />
      </main>
      <Footer />
      <LeadModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}
