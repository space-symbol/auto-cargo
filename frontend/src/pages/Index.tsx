
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import AdvantagesSection from '@/components/home/AdvantagesSection';
import CallToAction from '@/components/home/CallToAction';

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <AdvantagesSection />
      <CallToAction />
    </Layout>
  );
}
