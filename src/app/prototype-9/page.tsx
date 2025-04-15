'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

export default function Prototype9Landing() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Interactive Material Quotes
          </motion.h1>
          <motion.p 
            className="text-xl mb-10 max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A step-by-step guided approach to requesting quotes and tracking orders with beautiful animations and a modern UI experience.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/prototype-9/questions">
              <motion.button 
                className="bg-primary hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a New Quote
              </motion.button>
            </Link>
            <Link href="/prototype-9/tracker">
              <motion.button 
                className="bg-transparent border-2 border-primary text-primary hover:bg-primary/5 font-bold py-4 px-8 rounded-lg text-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Track My Order
              </motion.button>
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            variants={itemVariants}
          >
            A Modern, Intuitive Experience
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Step-by-Step Guidance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Intuitive question flow that simplifies the complex process of ordering construction materials.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Fluid Animations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Smooth, engaging animations create a delightful user experience while moving through each step.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Clear visual indicators of your progress with the ability to revisit previous steps.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Transparent Pricing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get real-time pricing updates as you make selections, with no hidden fees or surprises.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Order Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your order status with live updates from quote to delivery with detailed timelines.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile Optimized</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Perfect experience on any device, whether you're in the office or at the construction site.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonial/Quote Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M95.8,30.6c-5.5-9.6-13.5-17.9-23-23.7C63.7,2.5,53.5-0.3,43.2,0c-10.3,0.3-20.3,3.4-28.9,8.9
                  C5.7,14.4-0.5,21.2-3.6,29.5c-3.1,8.2-3.3,17.5-0.7,26c2.6,8.5,7.6,16.2,14.4,22.1c6.8,5.9,15.2,10.1,24.2,12
                  c9,1.9,18.4,1.5,27.1-1c8.7-2.5,16.6-7.1,23-13.1c6.4-6,11.5-13.5,14.7-21.8C102.4,45.4,101.3,40.1,95.8,30.6z"/>
              </svg>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
              
              <div className="max-w-3xl mx-auto">
                <svg className="h-12 w-12 text-white opacity-50 mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                
                <p className="text-xl italic mb-6">
                  The question-based approach made ordering complex materials so much simpler. I could answer one thing at a time instead of facing an overwhelming form. The animations made the whole process actually enjoyable!
                </p>
                
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                    JD
                  </div>
                  <div className="ml-4">
                    <p className="font-bold">John Dempsey</p>
                    <p className="text-blue-100">Site Manager, Constructex</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            variants={itemVariants}
          >
            How It Works
          </motion.h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-[calc(12.5%+2px)] right-[calc(12.5%+2px)] h-0.5 bg-blue-200 dark:bg-blue-900 z-0">
              <div className="absolute left-[33%] top-0 h-2 w-2 rounded-full bg-blue-500 -mt-0.5"></div>
              <div className="absolute left-[66%] top-0 h-2 w-2 rounded-full bg-blue-500 -mt-0.5"></div>
            </div>
            
            <motion.div 
              className="relative z-10 flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Answer Questions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simply answer step-by-step questions about your project needs.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative z-10 flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Receive Quote</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get an instant, detailed quote based on your specific requirements.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative z-10 flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Confirm Order</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Review and confirm your order with transparent pricing and timeline.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative z-10 flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-6">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Track Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your order status with real-time updates and delivery tracking.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Create your first quote in minutes with our interactive guided experience.
          </p>
          
          <Link href="/prototype-9/questions">
            <motion.button 
              className="bg-primary hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              Start Now
            </motion.button>
          </Link>
        </motion.section>
      </main>
    </div>
  );
}