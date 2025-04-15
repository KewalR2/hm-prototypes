'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function QuoteRequestPage() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    
    // Project Information
    projectName: '',
    projectLocation: '',
    projectDescription: '',
    startDate: '',
    projectDuration: '',
    
    // Material 1
    material1: '',
    grade1: '',
    quantity1: '',
    unit1: '',
    frequency1: '',
    
    // Material 2
    material2: '',
    grade2: '',
    quantity2: '',
    unit2: '',
    frequency2: '',
    
    // Delivery Information
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTime: '',
    
    // Additional Information
    additionalInfo: '',
    termsAgreed: false
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  // Add another material section
  const [showMaterial2, setShowMaterial2] = useState(true);
  const [materials, setMaterials] = useState(2); // Start with 2 materials

  const addMaterial = () => {
    setMaterials(prev => prev + 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store form data in sessionStorage for persistence between pages
    sessionStorage.setItem('quoteRequestData', JSON.stringify(formData));
    
    // Navigate to the quote view page with notification of successful submission
    router.push('/prototype-1/view');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="home" />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/prototype-1" className="text-primary hover:underline inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Prototype 1
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Request a Materials Quote</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Fill out the form below with your materials requirements</p>

            <form onSubmit={handleSubmit}>
              {/* Company and Contact Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Company Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-2">Company Name</label>
                    <input 
                      type="text" 
                      id="companyName" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your company name" 
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium mb-2">Contact Name</label>
                    <input 
                      type="text" 
                      id="contactName" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your full name" 
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="example@company.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="(555) 123-4567" 
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Project Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Project Information</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="projectName" className="block text-sm font-medium mb-2">Project Name</label>
                    <input 
                      type="text" 
                      id="projectName" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Project name" 
                      value={formData.projectName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="projectLocation" className="block text-sm font-medium mb-2">Project Location</label>
                    <input 
                      type="text" 
                      id="projectLocation" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="City, State" 
                      value={formData.projectLocation}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="projectDescription" className="block text-sm font-medium mb-2">Project Description</label>
                  <textarea 
                    id="projectDescription" 
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Brief description of your project"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium mb-2">Estimated Start Date</label>
                    <input 
                      type="date" 
                      id="startDate" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="projectDuration" className="block text-sm font-medium mb-2">Project Duration</label>
                    <select 
                      id="projectDuration"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.projectDuration}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select duration</option>
                      <option value="1-4 weeks">1-4 weeks</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value=">12 months">More than 12 months</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Materials Requirements */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Materials Requirements</h2>
                
                <div className="space-y-6">
                  {/* Material 1 */}
                  <div className="p-4 rounded-lg border border-gray-300 dark:border-gray-700">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="material1" className="block text-sm font-medium mb-2">Material Type</label>
                        <select 
                          id="material1"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                          value={formData.material1}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select material</option>
                          <option value="concrete">Concrete</option>
                          <option value="asphalt">Asphalt</option>
                          <option value="gravel">Gravel</option>
                          <option value="sand">Sand</option>
                          <option value="crushed-stone">Crushed Stone</option>
                          <option value="topsoil">Topsoil</option>
                          <option value="mulch">Mulch</option>
                          <option value="limestone">Limestone</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="grade1" className="block text-sm font-medium mb-2">Grade/Specification</label>
                        <input 
                          type="text" 
                          id="grade1" 
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="e.g., #57 Stone, Class A Concrete" 
                          value={formData.grade1}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="quantity1" className="block text-sm font-medium mb-2">Quantity</label>
                        <input 
                          type="number" 
                          id="quantity1" 
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Amount" 
                          value={formData.quantity1}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="unit1" className="block text-sm font-medium mb-2">Unit</label>
                        <select 
                          id="unit1"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                          value={formData.unit1}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select unit</option>
                          <option value="tons">Tons</option>
                          <option value="cubic-yards">Cubic Yards</option>
                          <option value="cubic-feet">Cubic Feet</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="frequency1" className="block text-sm font-medium mb-2">Delivery Frequency</label>
                        <select 
                          id="frequency1"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                          value={formData.frequency1}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select frequency</option>
                          <option value="one-time">One-time Delivery</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="bi-weekly">Bi-weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="as-needed">As needed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Material 2 (show after clicking "Add Material") */}
                  {showMaterial2 && (
                    <div className="p-4 rounded-lg border border-gray-300 dark:border-gray-700">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="material2" className="block text-sm font-medium mb-2">Material Type</label>
                          <select 
                            id="material2"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                            value={formData.material2}
                            onChange={handleChange}
                          >
                            <option value="">Select material</option>
                            <option value="concrete">Concrete</option>
                            <option value="asphalt">Asphalt</option>
                            <option value="gravel">Gravel</option>
                            <option value="sand">Sand</option>
                            <option value="crushed-stone">Crushed Stone</option>
                            <option value="topsoil">Topsoil</option>
                            <option value="mulch">Mulch</option>
                            <option value="limestone">Limestone</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="grade2" className="block text-sm font-medium mb-2">Grade/Specification</label>
                          <input 
                            type="text" 
                            id="grade2" 
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="e.g., #57 Stone, Class A Concrete" 
                            value={formData.grade2}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="quantity2" className="block text-sm font-medium mb-2">Quantity</label>
                          <input 
                            type="number" 
                            id="quantity2" 
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Amount" 
                            value={formData.quantity2}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="unit2" className="block text-sm font-medium mb-2">Unit</label>
                          <select 
                            id="unit2"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                            value={formData.unit2}
                            onChange={handleChange}
                          >
                            <option value="">Select unit</option>
                            <option value="tons">Tons</option>
                            <option value="cubic-yards">Cubic Yards</option>
                            <option value="cubic-feet">Cubic Feet</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="frequency2" className="block text-sm font-medium mb-2">Delivery Frequency</label>
                          <select 
                            id="frequency2"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                            value={formData.frequency2}
                            onChange={handleChange}
                          >
                            <option value="">Select frequency</option>
                            <option value="one-time">One-time Delivery</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="bi-weekly">Bi-weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="as-needed">As needed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {materials < 3 && (
                    <button 
                      type="button" 
                      className="flex items-center text-primary hover:text-blue-700 font-medium text-sm"
                      onClick={addMaterial}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Another Material
                    </button>
                  )}
                </div>
              </div>

              {/* Delivery Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Delivery Information</h2>
                <div className="mb-4">
                  <label htmlFor="deliveryAddress" className="block text-sm font-medium mb-2">Delivery Address</label>
                  <textarea 
                    id="deliveryAddress" 
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Full delivery address"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="deliveryDate" className="block text-sm font-medium mb-2">Preferred Delivery Date</label>
                    <input 
                      type="date" 
                      id="deliveryDate" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="deliveryTime" className="block text-sm font-medium mb-2">Preferred Time Window</label>
                    <select 
                      id="deliveryTime"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.deliveryTime}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select time window</option>
                      <option value="morning">Morning (8am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 4pm)</option>
                      <option value="evening">Evening (4pm - 8pm)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Additional Information</h2>
                <div className="mb-6">
                  <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">Special Requirements or Notes</label>
                  <textarea 
                    id="additionalInfo" 
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Any special requirements, site access information, or other notes"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="termsAgreed"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary"
                      checked={formData.termsAgreed}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <label htmlFor="termsAgreed" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    I acknowledge that this quote request will be reviewed and a representative may contact me for additional information.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Submit Quote Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}