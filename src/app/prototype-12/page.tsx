'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Prototype12Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="prototype-12" />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">AI-Powered Material Quote Builder</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Our system harnesses Claude AI to deeply understand your project needs and generate intelligent material quotes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/prototype-12/quote" 
              className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Start New Quote
            </Link>
          </div>
        </section>
        
        <section className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Powered by Claude AI</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 rounded-full p-2">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Deep Project Understanding</h3>
                  <p className="text-gray-600 dark:text-gray-400">Claude AI analyzes your entire project scope to understand material requirements</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 rounded-full p-2">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Intelligent Material Recommendations</h3>
                  <p className="text-gray-600 dark:text-gray-400">Get AI-generated material suggestions optimized for your specific project</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 rounded-full p-2">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Cost Optimization</h3>
                  <p className="text-gray-600 dark:text-gray-400">AI identifies cost-saving opportunities while maintaining quality standards</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 rounded-full p-2">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Contextual Learning</h3>
                  <p className="text-gray-600 dark:text-gray-400">The system continuously improves by learning from previous quotes and industry trends</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-lg aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 text-primary/30">
                <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
                <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
              </svg>
            </div>
          </div>
        </section>
        
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="mb-4 text-primary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Material Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI provides detailed explanations for each material recommendation
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="mb-4 text-primary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Plant Selection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find the optimal suppliers based on location, availability, and price
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="mb-4 text-primary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Delivery Optimization</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI optimizes delivery schedules based on weather, traffic, and project timelines
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}