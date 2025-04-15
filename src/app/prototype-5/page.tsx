import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Prototype5Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="prototype-5" />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">AI Material Recommendation Engine</h1>
          <p className="text-lg mb-10 text-center text-gray-600 dark:text-gray-300">
            Prototype 5: Smart Material Selection Powered by Artificial Intelligence
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center">Get Personalized Material Recommendations</h2>
            <p className="text-center mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              This prototype uses AI to understand your project needs and recommend the optimal materials. 
              Simply describe your project, answer a few questions, and get personalized recommendations backed by expert knowledge.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our AI analyzes your project requirements and suggests the best materials for the job
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Conversational Interface</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Interact naturally with our AI assistant through a simple conversation about your project
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Comparative Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Get side-by-side comparisons of material options with pros, cons, and cost implications
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Link 
                href="/prototype-5/advisor" 
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Try AI Advisor
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6">How It Works</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-2">Describe Your Project</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tell our AI advisor about your project in plain language - what you're building, where, and any special requirements
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-2">Answer Follow-up Questions</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    The AI will ask clarifying questions to better understand specific needs, constraints, and preferences
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-2">Review Recommendations</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get personalized material recommendations with detailed explanations of why each option is suitable
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-medium mb-2">Generate Quote</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose your preferred material options and instantly generate a detailed quote with pricing and delivery estimates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}