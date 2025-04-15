'use client';

import ThemedLayout from '@/components/ThemedLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Prototype10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemedLayout currentPage="prototype-10">
      <Header currentPage="prototype-10" />
      {children}
      <Footer />
    </ThemedLayout>
  );
}
