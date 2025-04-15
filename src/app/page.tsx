import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header currentPage="home" />
      <main className="container mx-auto px-4 py-12">
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Industrial Strength Solutions for Heavy Materials</h2>
                <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                  Specialized equipment and services for construction, mining, and industrial applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/products" className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    Explore Products
                  </Link>
                  <Link href="/prototype-1/request" className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-3 px-6 rounded-lg transition-colors">
                    Request Quote
                  </Link>
                </div>
              </div>
              <div className="relative h-80 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Hero Image Placeholder
                </div>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Prototypes</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Explore our innovative prototype solutions for Materials Sales quoting, ordering, and tracking.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/prototype-1" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 1: Form-Based</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Complete solution for quote requests, management, order conversion, and tracking.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
              
              <Link href="/prototype-2" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 2: Voice-Driven</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Innovative voice-driven approach to requesting quotes for materials.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
              
              <Link href="/prototype-3" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 3: AR-Powered</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Augmented reality tool for visualizing materials in real-world project sites.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
              
              <Link href="/prototype-4" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 4: Visual Builder</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Interactive visual project builder with drag-and-drop material selection.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
              
              <Link href="/prototype-5" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 5: AI Recommendation</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Smart AI-powered system that recommends optimal materials based on project requirements.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
              
              <Link href="/prototype-6" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 6: Materials Scheduler</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Intelligent scheduling system for optimizing delivery timelines and material availability.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
              
              <Link href="/prototype-7" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 7: Collaborative Workspace</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Multi-user environment for team collaboration on complex material quotes and procurement.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
              
              <Link href="/prototype-8" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 8: Smart Contract System</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Automated quote-to-contract system with digital signatures and milestone tracking.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>

              <Link href="/prototype-9" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 9: Interactive Question Flow</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Step-by-step guided question flow with animations for quote requests and order tracking.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
              
              <Link href="/prototype-11" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 11: Comprehensive Quoting</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">End-to-end detailed quoting system with weather analysis, plant selection, and delivery optimization.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
              
              <Link href="/prototype-12" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 12: Intelligent Adaptive Flow</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">AI-driven adaptive quoting interface that tailors its approach to each customer's project and knowledge level.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
              
              <Link href="/prototype-13" className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group p-6 border border-gray-200 dark:border-gray-700 hover:border-primary">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Prototype 13: Adaptive Quote Request Flow</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Sequential, adaptive question workflow that dynamically generates questions based on previous responses.</p>
                <div className="flex justify-end">
                  <span className="text-primary font-semibold group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
            </div>
          </section>
      </main>
      <Footer />
    </>
  );
}
