import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Prototype1Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="home" />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Heavy Materials Quoting System</h1>
          <p className="text-lg mb-10 text-center text-gray-600 dark:text-gray-300">
            Prototype 1: Quote Request and Management
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Customer Journey</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Link 
                href="/prototype-1/request" 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Request Quote</h3>
                <p className="text-gray-600 dark:text-gray-400">Submit materials quote request</p>
              </Link>

              <Link 
                href="/prototype-1/view" 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">View Quote</h3>
                <p className="text-gray-600 dark:text-gray-400">Review and respond to quotes</p>
              </Link>

              <Link 
                href="/prototype-1/track" 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Track Order</h3>
                <p className="text-gray-600 dark:text-gray-400">Follow order status and delivery</p>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Link 
                href="/prototype-1/admin" 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:border-primary hover:shadow-md transition-all group"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Quote Management</h3>
                <p className="text-gray-600 dark:text-gray-400">Process and fulfill quote requests</p>
              </Link>

              <Link 
                href="/prototype-1/metrics" 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:border-primary hover:shadow-md transition-all group"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Analytics Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-400">View quote conversion metrics</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}