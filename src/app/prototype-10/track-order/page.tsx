'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Types
type OrderStatus = 'Pending Approval' | 'Approved' | 'Processing' | 'Ready for Delivery' | 'In Transit' | 'Delivered';

type TrackingEvent = {
  date: string;
  status: OrderStatus;
  description: string;
  location?: string;
};

type MaterialItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
};

type OrderData = {
  quoteId: string;
  projectName: string;
  projectAddress: string;
  projectType: string;
  timeframe: string;
  materials: MaterialItem[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequirements?: string;
  total: number;
  date: string;
  status: OrderStatus;
  estimatedDelivery?: string;
  trackingEvents?: TrackingEvent[];
  conversionMetrics?: {
    timeToApproval?: number; // hours
    processingTime?: number; // hours
    estimatedDeliveryTime?: number; // hours
  };
};

export default function TrackOrder() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [tab, setTab] = useState<'status' | 'details' | 'metrics'>('status');
  const [viewMode, setViewMode] = useState<'client' | 'business'>('client');

  // Load from session storage on initial render
  useEffect(() => {
    const savedQuote = sessionStorage.getItem('latestQuote');
    if (savedQuote) {
      try {
        const parsedQuote = JSON.parse(savedQuote) as OrderData;
        
        // Add tracking events for demo
        const trackingEvents: TrackingEvent[] = [
          {
            date: new Date(parsedQuote.date).toLocaleString(),
            status: 'Pending Approval',
            description: 'Quote request submitted and pending review'
          }
        ];
        
        // If status is 'Pending Approval', generate random delivery date 3-7 days in future
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 5) + 3);

        // For demo: add simulated conversion metrics
        const conversionMetrics = {
          timeToApproval: 4.5, // hours
          processingTime: 12.0, // hours
          estimatedDeliveryTime: 72.0 // hours
        };

        setOrder({
          ...parsedQuote,
          trackingEvents,
          estimatedDelivery: deliveryDate.toLocaleDateString(),
          conversionMetrics
        });
      } catch (e) {
        console.error('Failed to parse saved quote data');
      }
    }
  }, []);

  // Helper functions
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending Approval': return 'bg-yellow-500';
      case 'Approved': return 'bg-blue-500';
      case 'Processing': return 'bg-purple-500';
      case 'Ready for Delivery': return 'bg-indigo-500';
      case 'In Transit': return 'bg-orange-500';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Search for order
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      alert('Please enter a quote or order ID');
      return;
    }
    
    setLoading(true);
    setNotFound(false);
    
    // Simulating API call with timeout
    setTimeout(() => {
      if (order && searchQuery.trim().toUpperCase() === order.quoteId) {
        // Order already loaded, no need to do anything
      } else if (searchQuery.trim().toUpperCase() === 'QT-123456' || searchQuery.trim().toUpperCase() === 'QT-DEMO') {
        // Demo order data
        const orderDate = new Date();
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        
        // For demo: add simulated conversion metrics
        const conversionMetrics = {
          timeToApproval: 2.75, // hours
          processingTime: 8.5, // hours
          estimatedDeliveryTime: 96.0 // hours
        };
        
        const demoOrder: OrderData = {
          quoteId: 'QT-123456',
          projectName: 'Highway 95 Expansion',
          projectAddress: '1234 Construction Way, Atlanta, GA 30303',
          projectType: 'Road/Highway',
          timeframe: 'Within 1 week',
          materials: [
            { id: 'asphalt', name: 'Asphalt', quantity: 250, unit: 'tons', price: 85 },
            { id: 'gravel', name: 'Gravel', quantity: 120, unit: 'tons', price: 45 },
            { id: 'concrete', name: 'Concrete', quantity: 75, unit: 'cubic yards', price: 115 }
          ],
          contactName: 'John Smith',
          contactEmail: 'john@example.com',
          contactPhone: '(555) 123-4567',
          total: 35875,
          date: orderDate.toISOString(),
          status: 'In Transit',
          estimatedDelivery: deliveryDate.toLocaleDateString(),
          trackingEvents: [
            {
              date: new Date(orderDate.getTime() - 5*24*60*60*1000).toLocaleString(),
              status: 'Pending Approval',
              description: 'Quote request submitted and pending review'
            },
            {
              date: new Date(orderDate.getTime() - 4*24*60*60*1000).toLocaleString(),
              status: 'Approved',
              description: 'Quote approved and converted to order'
            },
            {
              date: new Date(orderDate.getTime() - 2*24*60*60*1000).toLocaleString(),
              status: 'Processing',
              description: 'Order processing and materials being prepared'
            },
            {
              date: new Date(orderDate.getTime() - 1*24*60*60*1000).toLocaleString(),
              status: 'Ready for Delivery',
              description: 'Materials prepared and scheduled for delivery',
              location: 'Atlanta Distribution Center'
            },
            {
              date: new Date(orderDate.getTime() - 12*60*60*1000).toLocaleString(),
              status: 'In Transit',
              description: 'Your order has been loaded and is on its way',
              location: 'En route to delivery address'
            }
          ],
          conversionMetrics
        };
        setOrder(demoOrder);
      } else {
        setOrder(null);
        setNotFound(true);
      }
      setLoading(false);
    }, 1500);
  };

  // Handle approving a quote
  const handleApprove = () => {
    if (!order) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const orderDate = new Date(order.date);
      const updatedEvents = [
        ...(order.trackingEvents || []),
        {
          date: new Date().toLocaleString(),
          status: 'Approved',
          description: 'Quote approved and converted to order'
        }
      ];
      
      setOrder({
        ...order,
        status: 'Approved',
        trackingEvents: updatedEvents
      });
      
      setLoading(false);
    }, 1000);
  };

  // Simulate refreshing the status
  const refreshStatus = () => {
    if (!order) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const currentStatus = order.status;
      let newStatus: OrderStatus = currentStatus;
      let newEvent: TrackingEvent | null = null;
      
      // Simulate order progressing through statuses
      if (currentStatus === 'Pending Approval') {
        newStatus = 'Approved';
        newEvent = {
          date: new Date().toLocaleString(),
          status: 'Approved',
          description: 'Quote approved and converted to order'
        };
      } else if (currentStatus === 'Approved') {
        newStatus = 'Processing';
        newEvent = {
          date: new Date().toLocaleString(),
          status: 'Processing',
          description: 'Order processing and materials being prepared'
        };
      } else if (currentStatus === 'Processing') {
        newStatus = 'Ready for Delivery';
        newEvent = {
          date: new Date().toLocaleString(),
          status: 'Ready for Delivery',
          description: 'Materials prepared and scheduled for delivery',
          location: 'Main Distribution Center'
        };
      } else if (currentStatus === 'Ready for Delivery') {
        newStatus = 'In Transit';
        newEvent = {
          date: new Date().toLocaleString(),
          status: 'In Transit',
          description: 'Your order has been loaded and is on its way',
          location: 'En route to delivery address'
        };
      } else if (currentStatus === 'In Transit') {
        newStatus = 'Delivered';
        newEvent = {
          date: new Date().toLocaleString(),
          status: 'Delivered',
          description: 'Your order has been delivered successfully',
          location: order.projectAddress
        };
      }
      
      if (newEvent) {
        setOrder({
          ...order,
          status: newStatus,
          trackingEvents: [...(order.trackingEvents || []), newEvent]
        });
      }
      
      setLoading(false);
    }, 1500);
  };

  // UI Components
  const renderTabContent = () => {
    if (!order) return null;

    switch (tab) {
      case 'status':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">Order Timeline</h3>
              <motion.button
                onClick={refreshStatus}
                disabled={loading || order.status === 'Delivered'}
                className={`text-sm px-4 py-2 rounded-lg ${
                  loading || order.status === 'Delivered'
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                }`}
                whileHover={!(loading || order.status === 'Delivered') ? { scale: 1.02 } : undefined}
                whileTap={!(loading || order.status === 'Delivered') ? { scale: 0.98 } : undefined}
              >
                {loading ? (
                  <div className="flex items-center">
                    <motion.div 
                      className="w-4 h-4 border-2 border-blue-700 dark:border-blue-300 border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Updating...
                  </div>
                ) : order.status === 'Delivered' ? 'Order Complete' : 'Refresh Status'}
              </motion.button>
            </div>
            
            {/* Timeline Visual */}
            <div className="relative">
              {order.trackingEvents && order.trackingEvents.map((event, index) => (
                <div key={index} className="mb-6 relative">
                  {/* Vertical Line */}
                  {index < (order.trackingEvents?.length || 0) - 1 && (
                    <div className="absolute top-6 bottom-0 left-[15px] w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  )}
                  
                  <div className="flex">
                    {/* Status Circle */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${getStatusColor(event.status)} text-white z-10`}>
                      {event.status === 'Pending Approval' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {event.status === 'Approved' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {event.status === 'Processing' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {event.status === 'Ready for Delivery' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      )}
                      {event.status === 'In Transit' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                      )}
                      {event.status === 'Delivered' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Event Details */}
                    <div className="ml-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h4 className="font-bold">{event.status}</h4>
                          <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                          {event.location && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Location: {event.location}
                            </p>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                          {event.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* If order is pending approval, show approve button */}
              {order.status === 'Pending Approval' && (
                <div className="ml-12 mt-4">
                  <motion.button
                    onClick={handleApprove}
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? 'Processing...' : 'Approve Quote'}
                  </motion.button>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Clicking this button will simulate approving the quote.
                  </p>
                </div>
              )}
              
              {/* Pending Delivery Info */}
              {order.status !== 'Delivered' && (
                <div className="mt-6 p-4 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-300">
                        Estimated Delivery Date
                      </p>
                      <p className="text-blue-600 dark:text-blue-400">
                        {order.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      
      case 'details':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {/* Project Details Section */}
            <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
              <button
                onClick={() => toggleSection('project')}
                className="w-full py-4 flex justify-between items-center text-left"
              >
                <span className="font-medium">Project Information</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${expandedSection === 'project' ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSection === 'project' && (
                <motion.div 
                  className="pb-4 space-y-3"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Project Name</div>
                      <div>{order.projectName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Project Type</div>
                      <div>{order.projectType}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Project Address</div>
                    <div className="whitespace-pre-line">{order.projectAddress}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Timeframe</div>
                    <div>{order.timeframe}</div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Materials Section */}
            <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
              <button
                onClick={() => toggleSection('materials')}
                className="w-full py-4 flex justify-between items-center text-left"
              >
                <span className="font-medium">Materials</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${expandedSection === 'materials' ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSection === 'materials' && (
                <motion.div 
                  className="pb-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700">
                          <th className="px-4 py-2 font-medium">Material</th>
                          <th className="px-4 py-2 font-medium">Quantity</th>
                          <th className="px-4 py-2 font-medium">Price</th>
                          <th className="px-4 py-2 font-medium text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.materials.map((material, index) => (
                          <tr key={material.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                            <td className="px-4 py-3">{material.name}</td>
                            <td className="px-4 py-3">{material.quantity} {material.unit}</td>
                            <td className="px-4 py-3">${material.price.toFixed(2)}/{material.unit}</td>
                            <td className="px-4 py-3 text-right">${(material.price * material.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 dark:bg-gray-700">
                          <td colSpan={3} className="px-4 py-3 font-bold text-right">Total:</td>
                          <td className="px-4 py-3 font-bold text-right">${order.total.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Contact Information Section */}
            <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
              <button
                onClick={() => toggleSection('contact')}
                className="w-full py-4 flex justify-between items-center text-left"
              >
                <span className="font-medium">Contact Information</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${expandedSection === 'contact' ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSection === 'contact' && (
                <motion.div 
                  className="pb-4 space-y-3"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Name</div>
                      <div>{order.contactName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <div>{order.contactEmail}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                      <div>{order.contactPhone}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Special Requirements Section */}
            {order.specialRequirements && (
              <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                <button
                  onClick={() => toggleSection('requirements')}
                  className="w-full py-4 flex justify-between items-center text-left"
                >
                  <span className="font-medium">Special Requirements</span>
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${expandedSection === 'requirements' ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'requirements' && (
                  <motion.div 
                    className="pb-4 space-y-3"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Delivery Instructions</div>
                      <div className="whitespace-pre-line">{order.specialRequirements}</div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        );
      
      case 'metrics':
        // Only show metrics in business view
        if (viewMode !== 'business') {
          return (
            <div className="p-6 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Business Metrics</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This tab is only available in business view mode.
              </p>
              <button
                onClick={() => setViewMode('business')}
                className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Switch to Business View
              </button>
            </div>
          );
        }
        
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4">Quote-to-Order Conversion Metrics</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Time to Approval */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-medium">Time to Approval</h4>
                  </div>
                  <div className="ml-13">
                    <div className="text-3xl font-bold mb-1">
                      {order.conversionMetrics?.timeToApproval || 0} 
                      <span className="text-xl text-gray-500 dark:text-gray-400 ml-1">hrs</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      From quote submission to approval
                    </div>
                  </div>
                </div>
                
                {/* Processing Time */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="font-medium">Processing Time</h4>
                  </div>
                  <div className="ml-13">
                    <div className="text-3xl font-bold mb-1">
                      {order.conversionMetrics?.processingTime || 0}
                      <span className="text-xl text-gray-500 dark:text-gray-400 ml-1">hrs</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      From approval to ready for delivery
                    </div>
                  </div>
                </div>
                
                {/* Total Delivery Time */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h4 className="font-medium">Total Delivery Time</h4>
                  </div>
                  <div className="ml-13">
                    <div className="text-3xl font-bold mb-1">
                      {order.conversionMetrics?.estimatedDeliveryTime || 0}
                      <span className="text-xl text-gray-500 dark:text-gray-400 ml-1">hrs</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      From quote to estimated delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Detailed Metrics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Performance Analysis</h3>
              
              <div className="space-y-6">
                {/* Conversion Rate Visualization */}
                <div>
                  <h4 className="font-medium mb-2">Quote-to-Order Conversion Rate</h4>
                  <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full flex items-center" style={{ width: '85%' }}>
                      <span className="px-3 font-medium text-white">85%</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>Industry average: 62%</span>
                    <span className="text-green-600 dark:text-green-400">+23% above average</span>
                  </div>
                </div>
                
                {/* Average Response Time */}
                <div>
                  <h4 className="font-medium mb-2">Average Quote Response Time</h4>
                  <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full flex items-center" style={{ width: '70%' }}>
                      <span className="px-3 font-medium text-white">3.5 hours</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>Industry average: 6 hours</span>
                    <span className="text-green-600 dark:text-green-400">42% faster</span>
                  </div>
                </div>
                
                {/* Order Fulfillment Time */}
                <div>
                  <h4 className="font-medium mb-2">Order Fulfillment Time</h4>
                  <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full flex items-center" style={{ width: '65%' }}>
                      <span className="px-3 font-medium text-white">2.5 days</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>Industry average: 3.8 days</span>
                    <span className="text-green-600 dark:text-green-400">34% faster</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Metrics Data Tables */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
              <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <h3 className="font-bold">Recent Quote-to-Order Activity</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 tracking-wider">Quote ID</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 tracking-wider">Quote Date</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 tracking-wider">Time to Convert</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{order.quoteId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{order.contactName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          order.status === 'In Transit' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{order.conversionMetrics?.timeToApproval || 0} hrs</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">${order.total.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">QT-392847</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Michael Johnson</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(Date.now() - 3*24*60*60*1000).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          Processing
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">2.4 hrs</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">$12,450.00</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">QT-573921</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Sarah Williams</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(Date.now() - 5*24*60*60*1000).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Delivered
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">5.2 hrs</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">$8,275.50</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="prototype-10" />
      
      <main className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Order Tracking
        </motion.h1>
        
        <motion.div 
          className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Track Your Order</h2>
            {/* View Mode Toggle - Only visible if an order is loaded */}
            {order && (
              <div className="relative">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm ${
                      viewMode === 'client'
                        ? 'bg-primary text-white' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setViewMode('client')}
                  >
                    Client View
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm ${
                      viewMode === 'business'
                        ? 'bg-primary text-white' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setViewMode('business')}
                  >
                    Business View
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter your Quote or Order ID (e.g., QT-123456)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:bg-gray-800 dark:text-white"
            />
            <motion.button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-medium ${
                loading 
                  ? 'opacity-50 cursor-wait bg-blue-500 text-white' 
                  : 'bg-primary hover:bg-blue-600 text-white'
              }`}
              whileHover={!loading ? { scale: 1.02 } : undefined}
              whileTap={!loading ? { scale: 0.98 } : undefined}
            >
              {loading ? (
                <div className="flex items-center">
                  <motion.div 
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Searching...
                </div>
              ) : 'Track'}
            </motion.button>
          </form>
          
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>Or use the demo IDs: <span className="text-primary cursor-pointer" onClick={() => setSearchQuery('QT-123456')}>QT-123456</span> or <span className="text-primary cursor-pointer" onClick={() => setSearchQuery('QT-DEMO')}>QT-DEMO</span></p>
            {order && (
              <p className="mt-2">Tip: For demo purposes, click the "Refresh Status" button to simulate status updates.</p>
            )}
          </div>
        </motion.div>
        
        {/* Loading Indicator */}
        {loading && !order && (
          <motion.div 
            className="max-w-3xl mx-auto text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-block">
              <motion.div 
                className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Searching for your order...</p>
          </motion.div>
        )}
        
        {/* Not Found Message */}
        {notFound && !loading && (
          <motion.div 
            className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-4 inline-block mb-4">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Order Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We couldn't find an order with the ID "{searchQuery}". Please verify the ID and try again.
            </p>
            <motion.button
              onClick={() => setNotFound(false)}
              className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
        
        {/* Order Details */}
        {order && !loading && (
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Order Status Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
              {/* Status Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <div className="text-sm mb-1">Order Status</div>
                    <h2 className="text-2xl font-bold flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusColor(order.status)}`}></span>
                      {order.status}
                    </h2>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-sm mb-1">Order ID</div>
                    <div className="font-mono">{order.quoteId}</div>
                  </div>
                </div>
              </div>
              
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex -mb-px">
                  <button 
                    className={`py-4 px-6 font-medium ${
                      tab === 'status' 
                        ? 'border-b-2 border-primary text-primary' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setTab('status')}
                  >
                    Status & Timeline
                  </button>
                  <button 
                    className={`py-4 px-6 font-medium ${
                      tab === 'details' 
                        ? 'border-b-2 border-primary text-primary' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setTab('details')}
                  >
                    Order Details
                  </button>
                  <button 
                    className={`py-4 px-6 font-medium ${
                      tab === 'metrics' 
                        ? 'border-b-2 border-primary text-primary' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setTab('metrics')}
                  >
                    Conversion Metrics
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {renderTabContent()}
              </AnimatePresence>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <motion.button
                onClick={() => router.push('/prototype-10')}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-3 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Home
              </motion.button>
              
              {order.status === 'Delivered' && (
                <motion.button
                  onClick={() => {
                    alert('This would generate a delivery receipt in a real application.');
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download Receipt
                </motion.button>
              )}
              
              {(order.status === 'Pending Approval' || order.status === 'Approved') && (
                <motion.button
                  onClick={() => {
                    alert('This would generate a quote PDF in a real application.');
                  }}
                  className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download Quote
                </motion.button>
              )}
              
              <motion.button
                onClick={() => router.push('/prototype-10/quote-builder')}
                className="border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary font-medium py-3 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                New Quote Request
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}