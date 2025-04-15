'use client';

import ThemedLayout from '@/components/ThemedLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Prototype9Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemedLayout currentPage="prototype-9">
      <Header currentPage="prototype-9" />
      {children}
      <Footer />
    </ThemedLayout>
  );
}
