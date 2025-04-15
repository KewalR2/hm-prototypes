'use client';

import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { QuoteStoreProvider } from './components/QuoteContext';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // Apply the saved theme preferences on server and client
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply dark theme by default
    root.classList.add('dark');
    
    // Apply light/dark theme from localStorage if available
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      root.classList.remove('dark');
    } else if (theme === 'dark' || theme === null) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      // Check system preference if no saved preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      }
    }
    
    // Apply color theme
    const colorTheme = localStorage.getItem('colorTheme');
    if (colorTheme && colorTheme !== 'default') {
      // Remove all theme classes first
      root.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-orange');
      // Add the current theme class
      root.classList.add(`theme-${colorTheme}`);
    }
  }, []);
  
  // Add script to handle theme immediately before hydration
  // This prevents flash of wrong theme
  useEffect(() => {
    // Inject a script into the head to set theme before any rendering
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        try {
          var root = document.documentElement;
          
          // Add dark theme by default
          root.classList.add('dark');
          
          var theme = localStorage.getItem('theme');
          var colorTheme = localStorage.getItem('colorTheme');
          
          if (theme === 'light') {
            root.classList.remove('dark');
          } else if (theme !== 'dark' && theme !== 'light') {
            // Set dark as default if no theme is stored
            localStorage.setItem('theme', 'dark');
          }
          
          if (colorTheme && colorTheme !== 'default') {
            root.classList.add('theme-' + colorTheme);
          }
        } catch (e) {}
      })();
    `;
    script.setAttribute('id', 'theme-script');
    
    // Only add if it doesn't exist already
    if (!document.getElementById('theme-script')) {
      document.head.appendChild(script);
    }
    
    return () => {
      const existingScript = document.getElementById('theme-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
      <Header currentPage="prototype-13" />
      <main className="flex-grow">
        <QuoteStoreProvider>
          {children}
        </QuoteStoreProvider>
      </main>
      <Footer />
    </div>
  );
}