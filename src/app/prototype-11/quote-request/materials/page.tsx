'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuote } from '@/app/prototype-11/components/QuoteContext';
import { 
  PRODUCTS, 
  BASE_PRODUCTS,
  COMPOSITE_PRODUCTS,
  PLANTS, 
  getProductsForPlant as getProductsByPlant, 
  getProductById,
  getBaseProductById,
  searchProducts,
  isCompositeProduct,
  calculateCompositeCost
} from '@/app/prototype-11/mockData';
import ToastNotification from '@/app/prototype-11/components/ToastNotification';
import PlantSelectionModal from '@/app/prototype-11/components/PlantSelectionModal';
import { Product, CompositeProduct, BaseProduct } from '@/app/prototype-11/types';

export default function MaterialsPage() {
  const router = useRouter();
  const { quoteRequest, updateQuoteRequest, setCurrentStep } = useQuote();
  
  // State for plant selection
  const [selectedPlantId, setSelectedPlantId] = useState(quoteRequest.selectedPlantId || '');
  const [selectedPlantIds, setSelectedPlantIds] = useState<string[]>(quoteRequest.selectedPlantIds || []);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  
  // State for materials selection
  const [selectedProducts, setSelectedProducts] = useState<{
    productId: string;
    quantity: number;
    sourcePlantId?: string;
    specialInstructions?: string;
  }[]>(quoteRequest.products || []);
  
  // State for filtering and viewing products
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewProductId, setViewProductId] = useState<string | null>(null);
  const [productType, setProductType] = useState<'all' | 'base' | 'composite'>('all');
  
  // State for editing quantities
  const [newProduct, setNewProduct] = useState<{
    productId: string;
    quantity: number;
    sourcePlantId?: string;
    specialInstructions: string;
    customMixAdjustments?: { componentId: string; adjustedProportion: number; }[];
  }>({ 
    productId: '', 
    quantity: 0, 
    specialInstructions: '' 
  });
  
  // State for additional services
  const [requestsSamples, setRequestsSamples] = useState(quoteRequest.requestsSamples || false);
  const [requestsConsultation, setRequestsConsultation] = useState(quoteRequest.requestsConsultation || false);
  const [needsInstallation, setNeedsInstallation] = useState(quoteRequest.needsInstallation || false);
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  
  // Form validation
  const [errors, setErrors] = useState<{
    products?: string;
  }>({});

  // Get all unique categories from products
  const productCategories = ['all', ...Array.from(new Set(PRODUCTS.map(product => product.category)))];
  
  // Filter products based on selected plant, category, search term, and product type
  const getFilteredProducts = () => {
    // Start with either plant-specific products or all products
    let filteredProducts = selectedPlantId 
      ? getProductsByPlant(selectedPlantId) 
      : PRODUCTS;
    
    // Filter by category if not showing all categories
    if (categoryFilter !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    // Filter by product type (base or composite)
    if (productType === 'base') {
      filteredProducts = filteredProducts.filter(product => !isCompositeProduct(product));
    } else if (productType === 'composite') {
      filteredProducts = filteredProducts.filter(product => isCompositeProduct(product));
    }
    
    // Filter by search term
    if (searchTerm) {
      // If search term is very specific, use the search function
      if (searchTerm.length > 2) {
        const searchResults = searchProducts(searchTerm);
        // Intersect search results with our filtered products
        filteredProducts = filteredProducts.filter(product => 
          searchResults.some(searchProduct => searchProduct.id === product.id)
        );
      } else {
        // For short search terms, do a simple filter
        const searchLower = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower)
        );
      }
    }
    
    return filteredProducts;
  };
  
  // Get product details for the product being viewed
  const viewedProduct = viewProductId ? PRODUCTS.find(p => p.id === viewProductId) : null;
  
  // Check if a product is already selected
  const isProductSelected = (productId: string) => {
    return selectedProducts.some(item => item.productId === productId);
  };
  
  // Add a new product to the selected products list
  const addProduct = () => {
    if (!newProduct.productId || newProduct.quantity <= 0) {
      setToastMessage('Please select a product and specify a valid quantity');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    // Check if product is already selected
    if (isProductSelected(newProduct.productId)) {
      setToastMessage('This product is already in your list. Edit it instead.');
      setToastType('warning');
      setShowToast(true);
      return;
    }
    
    // Get the product to check min order quantity
    const product = getProductById(newProduct.productId);
    if (product && newProduct.quantity < product.minOrderQuantity) {
      setToastMessage(`Minimum order quantity for ${product.name} is ${product.minOrderQuantity} ${product.unitOfMeasure}`);
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    // If a specific plant is selected, assign it as the source for this product
    let sourcePlantId = undefined;
    if (selectedPlantId) {
      sourcePlantId = selectedPlantId;
    } else if (selectedPlantIds.length > 0) {
      // If multiple plants are selected, find the best one for this product
      const availablePlants = selectedPlantIds
        .map(id => PLANTS.find(p => p.id === id))
        .filter(Boolean) as Plant[];
      
      // Find a plant that has this product available
      const plantWithProduct = availablePlants.find(plant => 
        plant.availableProducts.includes(newProduct.productId)
      );
      
      if (plantWithProduct) {
        sourcePlantId = plantWithProduct.id;
      }
    }
    
    // Add the product
    setSelectedProducts(prev => [
      ...prev, 
      { 
        productId: newProduct.productId,
        quantity: newProduct.quantity,
        sourcePlantId, 
        specialInstructions: newProduct.specialInstructions || undefined
      }
    ]);
    
    // Reset form
    setNewProduct({ productId: '', quantity: 0, specialInstructions: '' });
    setViewProductId(null);
    
    // Show success message
    setToastMessage('Product added to your quote');
    setToastType('success');
    setShowToast(true);
  };
  
  // Update an existing product in the selected products list
  const updateProductQuantity = (index: number, quantity: number) => {
    // Get the product to check min order quantity
    const productId = selectedProducts[index].productId;
    const product = getProductById(productId);
    
    if (product && quantity < product.minOrderQuantity) {
      setToastMessage(`Minimum order quantity for ${product.name} is ${product.minOrderQuantity} ${product.unitOfMeasure}`);
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = quantity;
    setSelectedProducts(updatedProducts);
  };
  
  // Remove a product from the selected products list
  const removeProduct = (index: number) => {
    setSelectedProducts(prev => prev.filter((_, i) => i !== index));
    
    setToastMessage('Product removed from your quote');
    setToastType('info');
    setShowToast(true);
  };
  
  // Validate form before submission
  const validateForm = () => {
    const newErrors: {
      products?: string;
    } = {};
    
    if (selectedProducts.length === 0) {
      newErrors.products = 'Please select at least one product';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToastMessage('Please fix the form errors before continuing');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    // Ensure all product IDs are using the proper format
    const formattedProducts = selectedProducts.map(item => ({
      ...item,
      productId: typeof item.productId === 'string' ? item.productId : `prod-${String(item.productId).padStart(3, '0')}`
    }));
    
    // Update the quote request with form values
    updateQuoteRequest({
      selectedPlantId: selectedPlantId || undefined,
      selectedPlantIds: selectedPlantIds.length > 0 ? selectedPlantIds : undefined,
      products: formattedProducts,
      requestsSamples,
      requestsConsultation,
      needsInstallation,
    });
    
    // Update step and navigate to next page
    setCurrentStep(4);
    router.push('/prototype-11/quote-request/delivery');
  };

  // Handle back button
  const handleBack = () => {
    setCurrentStep(2);
    router.push('/prototype-11/quote-request/sector-info');
  };

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Materials Selection</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Select the materials you need for your project. You can optionally select a specific plant if you have a preference.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Plant Selection */}
          <div>
            <h3 className="text-lg font-medium mb-4">Plant Selection (Optional)</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Selecting a plant will filter materials based on availability. Leave blank to see all available materials.
            </p>
            
            {/* Plant selection UI */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-medium">Selected Plants</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    From over 100 plants in our network
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMultiSelectMode(false);
                      setShowPlantModal(true);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    {selectedPlantId ? 'Change Primary Plant' : 'Select Primary Plant'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMultiSelectMode(true);
                      setShowPlantModal(true);
                    }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    {selectedPlantIds.length > 0 ? `Manage Multiple Plants (${selectedPlantIds.length})` : 'Select Multiple Plants'}
                  </button>
                </div>
              </div>
              
              {selectedPlantId ? (
                // Display selected plant information
                (() => {
                  const plant = PLANTS.find(p => p.id === selectedPlantId);
                  if (!plant) return null;
                  
                  return (
                    <div className="border border-primary bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-primary">{plant.name}</h5>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{plant.location}</p>
                          
                          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Materials: </span>
                              <span className="font-medium">{plant.availableProducts.length}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Distance: </span>
                              <span className="font-medium">{plant.distance.toFixed(1)} miles</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Hours: </span>
                              <span className="font-medium">{plant.operatingHours}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Capacity: </span>
                              <span className="font-medium">{plant.capacity} tons/day</span>
                            </div>
                          </div>
                          
                          {plant.specialCapabilities && plant.specialCapabilities.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium mb-1">Special Capabilities:</p>
                              <div className="flex flex-wrap gap-1">
                                {plant.specialCapabilities.map((capability, index) => (
                                  <span 
                                    key={index}
                                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-0.5 rounded"
                                  >
                                    {capability}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end">
                          {plant.certifications && plant.certifications.length > 0 && (
                            <div className="mb-2">
                              {plant.certifications.map((cert, index) => (
                                <div 
                                  key={index} 
                                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-0.5 rounded mt-1"
                                >
                                  {cert}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <button
                            type="button"
                            onClick={() => setSelectedPlantId('')}
                            className="text-red-500 hover:text-red-600 text-sm mt-2"
                          >
                            Clear Selection
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                // No plant selected
                <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <div className="text-gray-500 dark:text-gray-400 mb-4">
                    No plant selected. Materials will be sourced from the most optimal plant based on availability and location.
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPlantModal(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Select a Plant
                  </button>
                </div>
              )}
            </div>
            
            {/* Additional Plants Display */}
            {selectedPlantIds.length > 0 && (
              <div className="mt-4">
                <h5 className="font-medium mb-3">Additional Selected Plants ({selectedPlantIds.length})</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPlantIds.map(plantId => {
                    const plant = PLANTS.find(p => p.id === plantId);
                    if (!plant) return null;
                    
                    return (
                      <div key={plant.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h6 className="font-medium text-sm">{plant.name}</h6>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{plant.location}</p>
                            <p className="text-xs mt-1">
                              <span className="text-gray-500 dark:text-gray-400">Distance: </span>
                              <span className="font-medium">{plant.distance.toFixed(1)} miles</span>
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedPlantIds(selectedPlantIds.filter(id => id !== plant.id))}
                            className="text-red-500 hover:text-red-600 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Plant Selection Modal */}
            {showPlantModal && (
              <PlantSelectionModal
                onSelect={(plant) => {
                  setSelectedPlantId(plant.id);
                  setShowPlantModal(false);
                }}
                onMultiSelect={(plants) => {
                  setSelectedPlantIds(plants.map(p => p.id));
                  setShowPlantModal(false);
                }}
                onClose={() => setShowPlantModal(false)}
                currentPlantId={selectedPlantId}
                selectedPlantIds={selectedPlantIds}
                multiSelect={isMultiSelectMode}
              />
            )}
          </div>
          
          {/* Materials Selection */}
          <div>
            <h3 className="text-lg font-medium mb-4">Materials</h3>
            {errors.products && (
              <p className="text-red-500 text-sm mb-2">{errors.products}</p>
            )}
            
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="productType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product Type
                </label>
                <select
                  id="productType"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value as 'all' | 'base' | 'composite')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Products</option>
                  <option value="base">Standard Materials</option>
                  <option value="composite">Custom Mix Blends</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Filter by Category
                </label>
                <select
                  id="categoryFilter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {productCategories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Search Materials
                </label>
                <input
                  id="searchTerm"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or description"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            {/* Product Type Information */}
            {productType === 'composite' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4 text-sm">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">Custom Mix Blends</p>
                    <p className="text-blue-700 dark:text-blue-300 mt-1">
                      These are custom-formulated mixtures of base materials optimized for specific applications. 
                      You can further customize the proportions when ordering.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {productType === 'base' && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4 text-sm">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">Standard Materials</p>
                    <p className="text-green-700 dark:text-green-300 mt-1">
                      These are individual raw materials that can be ordered as-is. 
                      For custom blends or mixes, check out our Custom Mix Blends option.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Product Listing */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 dark:bg-gray-800 font-medium text-sm">
                <div className="col-span-8 md:col-span-4">Product</div>
                <div className="hidden md:block md:col-span-3">Description</div>
                <div className="col-span-2">Unit Price</div>
                <div className="col-span-2 md:col-span-1">Min. Order</div>
                <div className="hidden md:block md:col-span-2">Actions</div>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
                {getFilteredProducts().map(product => (
                  <div key={product.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="col-span-8 md:col-span-4">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {product.category} | {product.unitOfMeasure}
                      </div>
                    </div>
                    
                    <div className="hidden md:block md:col-span-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {product.description}
                    </div>
                    
                    <div className="col-span-2 text-sm">
                      {formatPrice(product.basePrice)}/{product.unitOfMeasure}
                    </div>
                    
                    <div className="col-span-2 md:col-span-1 text-sm">
                      {product.minOrderQuantity} {product.unitOfMeasure}
                    </div>
                    
                    <div className="hidden md:flex md:col-span-2 md:space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setViewProductId(product.id);
                          setNewProduct({
                            productId: product.id,
                            quantity: product.minOrderQuantity,
                            specialInstructions: ''
                          });
                        }}
                        className="text-primary hover:text-blue-600 text-sm"
                      >
                        {isProductSelected(product.id) ? 'Already Added' : 'Add to Quote'}
                      </button>
                    </div>
                  </div>
                ))}
                
                {getFilteredProducts().length === 0 && (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No products found matching your criteria
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Details & Add Form */}
            {viewProductId && viewedProduct && (
              <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-medium">{viewedProduct.name}</h4>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Category: {viewedProduct.category} | Unit: {viewedProduct.unitOfMeasure} | Unit Price: {formatPrice(viewedProduct.basePrice)}/{viewedProduct.unitOfMeasure}
                    </div>
                  </div>
                  {isCompositeProduct(viewedProduct) && (
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded">
                      Custom Mix Blend
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">{viewedProduct.description}</p>
                
                {/* Component breakdown for composite products */}
                {isCompositeProduct(viewedProduct) && (
                  <div className="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-medium mb-2 text-sm">Blend Components</h5>
                    
                    <div className="space-y-3">
                      {viewedProduct.components.map((component, index) => {
                        const baseProduct = getBaseProductById(component.baseProductId);
                        if (!baseProduct) return null;
                        
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-sm">{baseProduct.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {baseProduct.category}
                              </div>
                            </div>
                            
                            <div className="flex-1 text-right">
                              <div className="text-sm">
                                {component.proportion}% of mix
                                {component.isOptional && (
                                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex justify-end mt-3">
                      <button
                        type="button"
                        className="text-sm text-primary hover:text-blue-600"
                        onClick={() => {
                          // In a full implementation, this would open a customization modal
                          alert("In a complete implementation, this would open a modal to adjust component proportions.");
                        }}
                      >
                        Customize Mix Proportions
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Product properties */}
                {(!isCompositeProduct(viewedProduct) && viewedProduct.properties) && (
                  <div className="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-medium mb-2 text-sm">Product Properties</h5>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(viewedProduct.properties).map(([key, value], index) => (
                        <div key={index} className="flex justify-between">
                          <span className="capitalize text-gray-600 dark:text-gray-400">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="font-medium">{value.toString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Mix properties for composite products */}
                {isCompositeProduct(viewedProduct) && viewedProduct.mixProperties && (
                  <div className="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-medium mb-2 text-sm">Mix Properties</h5>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(viewedProduct.mixProperties).map(([key, value], index) => (
                        <div key={index} className="flex justify-between">
                          <span className="capitalize text-gray-600 dark:text-gray-400">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="font-medium">{value.toString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quantity ({viewedProduct.unitOfMeasure})
                    </label>
                    <input
                      id="productQuantity"
                      type="number"
                      min={viewedProduct.minOrderQuantity || 1}
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({...newProduct, quantity: Number(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Minimum order: {viewedProduct.minOrderQuantity} {viewedProduct.unitOfMeasure}
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      id="specialInstructions"
                      value={newProduct.specialInstructions}
                      onChange={(e) => setNewProduct({...newProduct, specialInstructions: e.target.value})}
                      rows={2}
                      placeholder="Any special requirements for this material?"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setViewProductId(null);
                      setNewProduct({ productId: '', quantity: 0, specialInstructions: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="button"
                    onClick={addProduct}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add to Quote
                  </button>
                </div>
              </div>
            )}
            
            {/* Selected Products */}
            {selectedProducts.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-4">Selected Materials</h4>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 dark:bg-gray-800 font-medium text-sm">
                    <div className="col-span-4">Product</div>
                    <div className="col-span-2">Unit Price</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2">Total</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {selectedProducts.map((item, index) => {
                      const product = getProductById(item.productId);
                      if (!product) return null;
                      
                      return (
                        <div key={index} className="grid grid-cols-12 gap-4 p-4">
                          <div className="col-span-4">
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {product.category} | {product.unitOfMeasure}
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
                          </div>
                          
                          <div className="col-span-2 text-sm">
                            {formatPrice(product.basePrice)}/{product.unitOfMeasure}
                          </div>
                          
                          <div className="col-span-2">
                            <input
                              type="number"
                              min={product.minOrderQuantity}
                              value={item.quantity}
                              onChange={(e) => updateProductQuantity(index, Number(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                            />
                          </div>
                          
                          <div className="col-span-2 text-sm font-medium">
                            {formatPrice(product.basePrice * item.quantity)}
                          </div>
                          
                          <div className="col-span-2 flex flex-col items-start space-y-1">
                            <button
                              type="button"
                              onClick={() => removeProduct(index)}
                              className="text-red-500 hover:text-red-600 text-sm"
                            >
                              Remove
                            </button>
                            
                            {(selectedPlantId || selectedPlantIds.length > 0) && !item.sourcePlantId && (
                              <button
                                type="button"
                                onClick={() => {
                                  // Open a modal to assign a plant (simplified here)
                                  const plants = [selectedPlantId, ...selectedPlantIds].filter(Boolean);
                                  const plantId = plants[0];
                                  if (plantId) {
                                    const updatedProducts = [...selectedProducts];
                                    updatedProducts[index] = {...updatedProducts[index], sourcePlantId: plantId};
                                    setSelectedProducts(updatedProducts);
                                    
                                    setToastMessage('Source plant assigned');
                                    setToastType('success');
                                    setShowToast(true);
                                  }
                                }}
                                className="text-blue-500 hover:text-blue-600 text-xs"
                              >
                                Assign Plant
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Additional Services */}
          <div>
            <h3 className="text-lg font-medium mb-4">Additional Services</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="requestsSamples"
                  type="checkbox"
                  checked={requestsSamples}
                  onChange={(e) => setRequestsSamples(e.target.checked)}
                  className="h-5 w-5 text-primary focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="requestsSamples" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Request material samples before final order
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="requestsConsultation"
                  type="checkbox"
                  checked={requestsConsultation}
                  onChange={(e) => setRequestsConsultation(e.target.checked)}
                  className="h-5 w-5 text-primary focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="requestsConsultation" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Request consultation with a material specialist
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="needsInstallation"
                  type="checkbox"
                  checked={needsInstallation}
                  onChange={(e) => setNeedsInstallation(e.target.checked)}
                  className="h-5 w-5 text-primary focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="needsInstallation" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Need installation or application services
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <button
            type="submit"
            className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center"
          >
            Next: Delivery Information
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
      
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