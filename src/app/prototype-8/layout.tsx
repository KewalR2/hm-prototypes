'use client';

import ThemedLayout from '@/components/ThemedLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Prototype8Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemedLayout currentPage="prototype-8">
      <Header currentPage="prototype-8" />
      {children}
      <Footer />
    </ThemedLayout>
  );
}
