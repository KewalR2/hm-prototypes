'use client';

import ThemedLayout from '@/components/ThemedLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Prototype1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemedLayout currentPage="prototype-1">
      <Header currentPage="prototype-1" />
      {children}
      <Footer />
    </ThemedLayout>
  );
}
