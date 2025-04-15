'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

type Prototype = {
  id: string;
  name: string;
  number: number;
};

const PROTOTYPES: Prototype[] = [
  { id: 'prototype-1', name: 'Form-Based', number: 1 },
  { id: 'prototype-2', name: 'Voice-Driven', number: 2 },
  { id: 'prototype-3', name: 'AR-Powered', number: 3 },
  { id: 'prototype-4', name: 'Visual Builder', number: 4 },
  { id: 'prototype-5', name: 'AI Recommendation Engine', number: 5 },
  { id: 'prototype-6', name: 'Materials Scheduler', number: 6 },
  { id: 'prototype-7', name: 'Collaborative Workspace', number: 7 },
  { id: 'prototype-8', name: 'Smart Contract System', number: 8 },
  { id: 'prototype-9', name: 'Interactive Question Flow', number: 9 },
  { id: 'prototype-10', name: 'Quote Your Way', number: 10 },
  { id: 'prototype-11', name: 'Comprehensive Quoting System', number: 11 },
  { id: 'prototype-12', name: 'Intelligent Adaptive Flow', number: 12 },
  { id: 'prototype-13', name: 'Adaptive Quote Request Flow', number: 13 },
];

type HeaderPageTypes = 'home' | 'products' | 'about' | 'contact' | string;

interface HeaderProps {
  currentPage: HeaderPageTypes;
}

export default function Header({ currentPage }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if current page is a prototype page
  const isPrototypePage = currentPage.startsWith('prototype-');
  
  // Get current prototype details if on a prototype page
  const currentPrototype = isPrototypePage 
    ? PROTOTYPES.find(p => p.id === currentPage) 
    : null;

  return (
    <header className="bg-white dark:bg-gray-950 shadow-sm">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">Heavy Materials</Link>
        <nav className="hidden md:flex space-x-6">
          <Link 
            href="/" 
            className={`${currentPage === 'home' ? 'text-primary' : 'hover:text-primary'} transition-colors`}
          >
            Home
          </Link>
          <Link 
            href="/products" 
            className={`${currentPage === 'products' ? 'text-primary' : 'hover:text-primary'} transition-colors`}
          >
            Products
          </Link>
          
          {/* Prototypes Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1 ${isPrototypePage ? 'text-primary' : 'hover:text-primary'} transition-colors`}
            >
              {isPrototypePage ? `Prototype ${currentPrototype?.number}` : 'Prototypes'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {PROTOTYPES.map((proto) => (
                    <Link
                      key={proto.id}
                      href={`/${proto.id}`}
                      className={`block px-4 py-2 text-sm ${currentPage === proto.id ? 'bg-blue-50 dark:bg-blue-900 text-primary' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Prototype {proto.number}: {proto.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Link 
            href="#" 
            className={`${currentPage === 'about' ? 'text-primary' : 'hover:text-primary'} transition-colors`}
          >
            About
          </Link>
          <Link 
            href="#" 
            className={`${currentPage === 'contact' ? 'text-primary' : 'hover:text-primary'} transition-colors`}
          >
            Contact
          </Link>
        </nav>
        <button 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="absolute top-20 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                <Link 
                  href="/" 
                  className={`px-3 py-2 rounded-md ${currentPage === 'home' ? 'bg-blue-50 dark:bg-blue-900 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/products" 
                  className={`px-3 py-2 rounded-md ${currentPage === 'products' ? 'bg-blue-50 dark:bg-blue-900 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
                
                {/* Mobile Prototypes Section */}
                <div className="px-3 py-2 font-medium">Prototypes</div>
                <div className="pl-3 flex flex-col space-y-2">
                  {PROTOTYPES.map((proto) => (
                    <Link
                      key={proto.id}
                      href={`/${proto.id}`}
                      className={`px-3 py-1 rounded-md text-sm ${
                        currentPage === proto.id 
                          ? 'bg-blue-50 dark:bg-blue-900 text-primary' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Prototype {proto.number}: {proto.name}
                    </Link>
                  ))}
                </div>
                
                <Link 
                  href="#" 
                  className={`px-3 py-2 rounded-md ${currentPage === 'about' ? 'bg-blue-50 dark:bg-blue-900 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="#" 
                  className={`px-3 py-2 rounded-md ${currentPage === 'contact' ? 'bg-blue-50 dark:bg-blue-900 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}