'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuote } from '@/app/prototype-11/components/QuoteContext';
import { 
  PRODUCTS, 
  PLANTS, 
  TRUCKS,
  WEATHER_CONDITIONS,
  getProductById, 
  getPlantById,
  getTruckById
} from '@/app/prototype-11/mockData';
import ToastNotification from '@/app/prototype-11/components/ToastNotification';
import Link from 'next/link';
export default function TrackingPage() {
  const router = useRouter();
  const { quoteRequest } = useQuote();
  // State for order information
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState<Date | null>(null);
  const [orderStatus, setOrderStatus] = useState<'pending' | 'processing' | 'shipped' | 'delivered'>('processing');
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  // Load order data from sessionStorage
  useEffect(() => {
    setIsLoading(true);
    // Get the accepted quote ID from sessionStorage
    const quoteId = sessionStorage.getItem('acceptedQuoteId');
    if (!quoteId) {
      setToastMessage('No active order found. Please place an order first.');
      setToastType('error');
      setShowToast(true);
      setIsLoading(false);
      return;
    }
    // Simulate API fetch delay
    setTimeout(() => {
      try {
        // Generate mock order data based on the quote ID
        const mockOrderData = {
          id: `ORD-${quoteId.slice(-6)}`,
          quoteId,
          orderDate: new Date(),
          estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          status: Math.random() > 0.7 ? 'shipped' : 'processing',
          customer: quoteRequest.customer,
          deliveryAddress: quoteRequest.deliveryAddress,
          products: quoteRequest.products.map(product => {
            const productDetails = getProductById(product.productId);
            return {
              ...product,
              details: productDetails
            };
          }),
          sourceHaul: {
            plantId: quoteRequest.selectedPlantId || quoteRequest.selectedPlantIds?.[0] || '',
            truckId: 'truck-001',
            driver: {
              name: 'John Smith',
              phone: '555-123-4567',
              eta: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            },
            currentLocation: {
              lat: 39.7837304,
              lng: -86.1965858,
              updatedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
              status: 'en_route'
            }
          },
          trackingHistory: [
            {
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
              status: 'Order placed',
              details: 'Your order has been confirmed and is being processed'
            },
            {
              timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), // 20 hours ago
              status: 'Production scheduled',
              details: 'Materials production has been scheduled at the plant'
            },
            {
              timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
              status: 'Materials prepared',
              details: 'Your materials have been prepared and are ready for shipping'
            },
            {
              timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
              status: 'Loaded for delivery',
              details: 'Materials have been loaded onto the delivery truck'
            },
            {
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
              status: 'In transit',
              details: 'Your order is on its way to the delivery address'
            }
          ]
        };
        setOrderData(mockOrderData);
        setOrderStatus(mockOrderData.status);
        setEstimatedDeliveryDate(mockOrderData.estimatedDeliveryDate);
        setCurrentStep(mockOrderData.trackingHistory.length - 1);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading order data:', error);
        setToastMessage('An error occurred while loading your order data.');
        setToastType('error');
        setShowToast(true);
        setIsLoading(false);
      }
    }, 1500);
  }, [quoteRequest]);
  // Get plant details
  const getPlantDetails = () => {
    if (!orderData) return null;
    const plantId = orderData.sourceHaul.plantId;
    return getPlantById(plantId);
  };
  // Get truck details
  const getTruckDetails = () => {
    if (!orderData) return null;
    const truckId = orderData.sourceHaul.truckId;
    return getTruckById(truckId);
  };
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  // Format time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  // Calculate progress percentage
  const calculateProgress = () => {
    const steps = orderData?.trackingHistory.length || 0;
    if (steps === 0) return 0;
    return ((currentStep + 1) / steps) * 100;
  };
  return (
    <div>
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-10 text-center">Order Tracking</h1>
        {isLoading ? (
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Loading your order details...
            </p>
          </div>
        ) : !orderData ? (
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No Active Order Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              It looks like you don't have any active orders to track.
              Please place an order first before tracking.
            </p>
            <Link href="/prototype-11"
              className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              Start a New Quote
            </Link>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Order Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
              <div className="bg-primary bg-opacity-10 dark:bg-opacity-20 p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order #{orderData.id}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Placed on {formatDate(orderData.orderDate)}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      orderStatus === 'delivered' 
                        ? 'bg-green-500' 
                        : orderStatus === 'shipped' 
                        ? 'bg-blue-500' 
                        : 'bg-amber-500'
                    }`}></div>
                    <span className="font-medium capitalize">
                      {orderStatus}
                    </span>
                  </div>
                </div>
              </div>
              {/* Order Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Shipping Address</h3>
                    <p className="font-medium">{orderData.customer?.name || 'N/A'}</p>
                    <p>{orderData.deliveryAddress?.street}</p>
                    <p>{orderData.deliveryAddress?.city}, {orderData.deliveryAddress?.state} {orderData.deliveryAddress?.zipCode}</p>
                    {orderData.deliveryAddress?.specialInstructions && (
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Special Instructions:</span> {orderData.deliveryAddress.specialInstructions}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Delivery Information</h3>
                    <p>
                      <span className="font-medium">Estimated Delivery:</span> {formatDate(estimatedDeliveryDate!)}
                    </p>
                    {orderData.sourceHaul?.driver && (
                      <>
                        <p className="mt-2">
                          <span className="font-medium">Driver:</span> {orderData.sourceHaul.driver.name}
                        </p>
                        <p>
                          <span className="font-medium">Contact:</span> {orderData.sourceHaul.driver.phone}
                        </p>
                      </>
                    )}
                    <div className="mt-4">
                      <Link href="#"
                        className="text-primary hover:text-blue-600 text-sm font-medium flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {orderStatus === 'shipped' ? 'Track Live Location' : 'View on Map'}
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Order Items */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium mb-4">Order Items</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          <th className="px-4 py-3">Product</th>
                          <th className="px-4 py-3">Quantity</th>
                          <th className="px-4 py-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {orderData.products.map((item: any, index: number) => (
                          <tr key={index}>
                            <td className="px-4 py-4">
                              <div className="font-medium">
                                {item.details?.name || `Product #${item.productId}`}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.details?.category} • {item.details?.unitOfMeasure}
                              </div>
                              {item.sourcePlantId && (
                                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                  <span className="font-medium">Source:</span> {
                                    PLANTS.find(p => p.id === item.sourcePlantId)?.name || 'Unknown Plant'
                                  }
                                </div>
                              )}
                              {item.specialInstructions && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  <span className="font-medium">Note:</span> {item.specialInstructions}
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              {item.quantity} {item.details?.unitOfMeasure || 'units'}
                            </td>
                            <td className="px-4 py-4 text-right">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                orderStatus === 'delivered' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : orderStatus === 'shipped' 
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                              }`}>
                                {orderStatus === 'delivered' 
                                  ? 'Delivered' 
                                  : orderStatus === 'shipped' 
                                  ? 'In Transit' 
                                  : 'Preparing'
                                }
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Tracking Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-medium mb-6">Tracking Information</h3>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>
              {/* Timeline */}
              <div className="relative">
                {orderData.trackingHistory.map((event: any, index: number) => (
                  <div key={index} className="mb-8 flex">
                    {/* Timeline dot and line */}
                    <div className="flex flex-col items-center mr-4">
                      <div className={`rounded-full w-6 h-6 flex items-center justify-center ${
                        index <= currentStep 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      }`}>
                        {index <= currentStep ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      {/* Connecting line */}
                      {index < orderData.trackingHistory.length - 1 && (
                        <div className={`w-0.5 h-full ${
                          index < currentStep
                            ? 'bg-primary'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}></div>
                      )}
                    </div>
                    {/* Content */}
                    <div className={`transition-opacity duration-500 ${
                      index <= currentStep ? 'opacity-100' : 'opacity-50'
                    }`}>
                      <h4 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                        {event.status}
                      </h4>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {formatDate(event.timestamp)} at {formatTime(event.timestamp)}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {event.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Shipping Details */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <h4 className="text-base font-medium mb-4">Shipping Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Source Information</h5>
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      {getPlantDetails() && (
                        <>
                          <p className="font-medium">{getPlantDetails()!.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {getPlantDetails()!.location}
                          </p>
                          {getPlantDetails()!.specialCapabilities && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Capabilities:
                              </span>
                              {getPlantDetails()!.specialCapabilities.slice(0, 2).map((capability, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-1.5 py-0.5 rounded"
                                >
                                  {capability}
                                </span>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transportation</h5>
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      {getTruckDetails() && (
                        <>
                          <p className="font-medium">{getTruckDetails()!.type}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {getTruckDetails()!.description}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span className="font-medium">Capacity:</span> {getTruckDetails()!.capacity} units
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <Link href="/prototype-11"
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Link>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  onClick={() => {
                    setToastMessage('Order details have been downloaded.');
                    setToastType('success');
                    setShowToast(true);
                  }}
                >
                  Download Details
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    setToastMessage('Support has been contacted. They will reach out shortly.');
                    setToastType('success');
                    setShowToast(true);
                  }}
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Toast Notification */}
      {showToast && (
        <ToastNotification 
          message={toastMessage} 
          type={toastType}
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}