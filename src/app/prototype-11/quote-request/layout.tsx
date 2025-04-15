'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { QuoteProvider, useQuote } from '@/app/prototype-11/components/QuoteContext';
import Link from 'next/link';

// Progress bar component with links for quick navigation
function ProgressBar() {
  const { currentStep, totalSteps } = useQuote();
  const pathname = usePathname();
  
  // Define steps and their paths
  const steps = [
    { number: 1, name: 'Project Info', path: '/prototype-11/quote-request/project-info' },
    { number: 2, name: 'Sector & Requirements', path: '/prototype-11/quote-request/sector-info' },
    { number: 3, name: 'Materials', path: '/prototype-11/quote-request/materials' },
    { number: 4, name: 'Delivery', path: '/prototype-11/quote-request/delivery' },
    { number: 5, name: 'Review', path: '/prototype-11/quote-request/review' },
  ];
  
  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className="mb-8">
      {/* Mobile Progress Bar (simplified) */}
      <div className="block md:hidden">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Desktop Progress Steps with Navigation */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700"></div>
          
          {/* Progress Bar Fill */}
          <div 
            className="absolute top-5 left-0 h-1 bg-primary transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
          
          {/* Steps */}
          <div className="flex justify-between">
            {steps.map((step) => {
              const isCurrent = step.number === currentStep;
              const isCompleted = step.number < currentStep;
              const isActive = isCurrent || isCompleted;
              
              return (
                <Link
                  key={step.number}
                  href={isActive ? step.path : '#'}
                  className={`flex flex-col items-center relative ${isActive ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                  onClick={(e) => !isActive && e.preventDefault()}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      isCurrent 
                        ? 'bg-primary text-white' 
                        : isCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${isCurrent ? 'text-primary' : ''}`}>
                    {step.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main layout for the quote request flow
export default function QuoteRequestLayout({ children }: { children: React.ReactNode }) {
  return (
    <QuoteProvider>
      <ContentWrapper>{children}</ContentWrapper>
    </QuoteProvider>
  );
}

// Wrapper that determines the right layout based on the path and input mode
function ContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { inputMode } = useQuote();
  
  // Check if this is the AI assistant page
  const isAIAssistantPage = pathname.includes('/ai-assistant');
  
  // For AI assistant page, we don't need the progress bar and form container
  if (isAIAssistantPage) {
    return children;
  }
  
  // For regular form pages, use the standard layout with progress bar
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="prototype-11" />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-10 text-center">Comprehensive Quote Request</h1>
        
        <div className="max-w-4xl mx-auto">
          <ProgressBar />
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}