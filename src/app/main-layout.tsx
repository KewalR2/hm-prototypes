'use client';

import ThemedLayout from '@/components/ThemedLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemedLayout currentPage="home">
      <Header currentPage="home" />
      {children}
      <Footer />
    </ThemedLayout>
  );
}