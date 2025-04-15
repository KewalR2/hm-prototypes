import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Prototype2Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="home" />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Conversational Quote Requests</h1>
          <p className="text-lg mb-10 text-center text-gray-600 dark:text-gray-300">
            Prototype 2: Voice-Driven Quote Request Experience
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center">Voice-Driven Quote Requests</h2>
            <p className="text-center mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              This prototype explores a conversational approach to material quote requests, 
              allowing customers to simply speak their requirements instead of filling out forms.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Natural Conversation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Speak naturally about your project and material needs without navigating complex forms
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Time-Saving</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Complete your quote request in under 2 minutes through simple voice interaction
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Always Accurate</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  AI-powered transcription ensures your requirements are captured correctly
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Link 
                href="/prototype-2/voice-request" 
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Try Voice Quote Request
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
                  <h3 className="font-medium mb-2">Start the Voice Interview</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click the microphone button and grant microphone permissions when prompted
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-2">Answer Simple Questions</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Respond to questions about your project, material needs, quantities, and delivery preferences
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-2">Review Your Information</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Confirm that the system correctly understood your requirements or make edits if needed
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-medium mb-2">Submit & Get Your Quote</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your quote request is submitted and you'll receive a response faster than ever
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