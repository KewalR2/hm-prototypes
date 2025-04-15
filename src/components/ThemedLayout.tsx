'use client';

import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeScript from '@/components/ThemeScript';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

interface ThemedLayoutProps {
  children: ReactNode;
  currentPage: string;
  innerComponent?: ReactNode;
}

export default function ThemedLayout({ children, currentPage, innerComponent }: ThemedLayoutProps) {
  return (
    <div className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
      <ThemeScript />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="flex-grow">
        {innerComponent ? innerComponent : children}
      </main>
    </div>
  );
}