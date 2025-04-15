'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuote } from '@/app/prototype-11/components/QuoteContext';
import AIConversationInterface from '@/app/prototype-11/components/AIConversationInterface';
import ToastNotification from '@/app/prototype-11/components/ToastNotification';
export default function AIAssistantPage() {
  const router = useRouter();
  const { inputMode, setInputMode } = useQuote();
  return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">AI-Powered Quote Assistant</h1>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <h2 className="text-xl font-semibold mb-2">Smart Materials Assistant</h2>
              <p>
                Chat with our AI assistant to quickly get a quote tailored to your project. 
                The assistant will guide you through the process by asking questions about your project.
              </p>
            </div>
            <AIConversationInterface />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">About AI-Powered Quoting</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Natural Conversation</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Just describe your project needs in your own words. No need to navigate complex forms.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Smart Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Receive intelligent suggestions for materials and delivery options based on your project.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Time-Saving</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Get your quote in minutes instead of hours. The AI takes care of finding the best options.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => {
                setInputMode('manual_form');
                router.push('/prototype-11/quote-request/project-info');
              }}
              className="text-primary hover:text-blue-600 font-medium"
            >
              Switch to Manual Form Entry
            </button>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Prefer the traditional approach? You can switch to our step-by-step form anytime.
            </p>
          </div>
        </div>
      </main>
  );
}