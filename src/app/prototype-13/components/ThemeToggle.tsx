'use client';

import { useState, useEffect } from 'react';

type ThemeType = 'light' | 'dark';
type ColorTheme = 'default' | 'blue' | 'green' | 'purple' | 'orange';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('default');
  const [isOpen, setIsOpen] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if dark mode is stored in localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    
    if (savedColorTheme) {
      setColorTheme(savedColorTheme);
    }
  }, []);

  // Update theme when state changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Set light/dark mode
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Set color theme
    root.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-orange');
    if (colorTheme !== 'default') {
      root.classList.add(`theme-${colorTheme}`);
    }
    
    // Save preferences
    localStorage.setItem('theme', theme);
    localStorage.setItem('colorTheme', colorTheme);
  }, [theme, colorTheme]);

  // Toggle light/dark mode
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Set color theme
  const changeColorTheme = (newTheme: ColorTheme) => {
    setColorTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Theme Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>

        {/* Color Theme Toggle */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Change color theme"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 12a4 4 0 1 1 -8 0"></path>
              <path d="M12 16a4 4 0 1 1 0 -8"></path>
              <path d="M12 8a4 4 0 1 1 0 8"></path>
            </svg>
          </button>
          
          {/* Color Theme Dropdown */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700 animate-fade-in-up">
              <ul>
                {[
                  { id: 'default', name: 'Default', color: '#0070f3' },
                  { id: 'blue', name: 'Blue', color: '#2563eb' },
                  { id: 'green', name: 'Green', color: '#10b981' },
                  { id: 'purple', name: 'Purple', color: '#8b5cf6' },
                  { id: 'orange', name: 'Orange', color: '#f97316' },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => changeColorTheme(item.id as ColorTheme)}
                      className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        colorTheme === item.id ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <span 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></span>
                      {item.name}
                      {colorTheme === item.id && (
                        <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}