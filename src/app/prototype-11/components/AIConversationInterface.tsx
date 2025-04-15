'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuote } from './QuoteContext';
import { ProjectType, Sector, Product, BaseProduct } from '../types';
import ToastNotification from './ToastNotification';
import { extractProjectInfo, extractMaterialInfo, AI_QUESTIONS, PRODUCTS, BASE_PRODUCTS } from '../mockData';

const AIConversationInterface: React.FC = () => {
  const router = useRouter();
  const { 
    addAIMessage, 
    updateQuoteRequest, 
    setCurrentStep,
    setInputMode,
  } = useQuote();
  
  // UI state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [currentView, setCurrentView] = useState<'projectInput' | 'projectConfig' | 'materials' | 'delivery' | 'review'>('projectInput');
  
  // Project input states
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('new_construction');
  const [sector, setSector] = useState<Sector>('private');
  const [isGovernmentContract, setIsGovernmentContract] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [projectSize, setProjectSize] = useState('');
  const [duration, setDuration] = useState('');
  
  // Materials state
  const [customMaterials, setCustomMaterials] = useState<string>('');
  const [selectedMaterials, setSelectedMaterials] = useState<{
    id: string;
    name: string;
    quantity: number;
    unit: string;
    variations?: string[];
    isCustom?: boolean;
  }[]>([]);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    quantity: 1,
    unit: 'tons'
  });
  
  // Delivery information
  const [deliveryInfo, setDeliveryInfo] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryDate: '',
    specialInstructions: ''
  });
  
  // AI processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  
  // Refs
  const materialNameRef = useRef<HTMLInputElement>(null);
  
  // Form validation states
  const [projectErrors, setProjectErrors] = useState({
    name: false,
    description: false,
  });
  
  const [deliveryErrors, setDeliveryErrors] = useState({
    street: false,
    city: false,
    state: false,
    zipCode: false,
    deliveryDate: false,
  });
  
  // Get material suggestions based on project type
  useEffect(() => {
    // Get default materials when project type changes
    const getDefaultMaterials = () => {
      let defaultMaterials: {id: string; name: string; quantity: number; unit: string; variations?: string[]}[] = [];
      
      switch (projectType) {
        case 'new_construction':
          defaultMaterials = [
            { id: '1', name: 'Ready-Mix Concrete', quantity: 20, unit: 'cubic yards', variations: ['3000 PSI', '3500 PSI', '4000 PSI'] },
            { id: '2', name: 'Structural Steel', quantity: 5, unit: 'tons', variations: ['I-Beams', 'Angle Iron', 'Steel Plate'] },
            { id: '3', name: 'Construction Lumber', quantity: 1000, unit: 'board feet', variations: ['2x4', '2x6', '4x4'] },
          ];
          break;
          
        case 'renovation':
          defaultMaterials = [
            { id: '4', name: 'Drywall', quantity: 50, unit: 'sheets', variations: ['1/2 inch', '5/8 inch'] },
            { id: '5', name: 'Lumber', quantity: 500, unit: 'board feet', variations: ['Framing', 'Finish'] },
            { id: '6', name: 'Paint', quantity: 15, unit: 'gallons', variations: ['Interior', 'Exterior', 'Primer'] },
          ];
          break;
          
        case 'infrastructure':
          defaultMaterials = [
            { id: '7', name: 'Asphalt', quantity: 100, unit: 'tons', variations: ['Hot Mix', 'Cold Mix', 'Recycled'] },
            { id: '8', name: 'Concrete', quantity: 50, unit: 'cubic yards', variations: ['DOT Approved', 'Fiber Reinforced'] },
            { id: '9', name: 'Aggregate Base', quantity: 200, unit: 'tons', variations: ['3/4 inch', 'Recycled'] },
          ];
          break;
          
        case 'landscaping':
          defaultMaterials = [
            { id: '10', name: 'Topsoil', quantity: 30, unit: 'cubic yards', variations: ['Screened', 'Organic'] },
            { id: '11', name: 'Mulch', quantity: 25, unit: 'cubic yards', variations: ['Hardwood', 'Cedar', 'Dyed'] },
            { id: '12', name: 'Decorative Stone', quantity: 15, unit: 'tons', variations: ['River Rock', 'Pea Gravel', 'Flagstone'] },
          ];
          break;
          
        default:
          defaultMaterials = [
            { id: '1', name: 'Ready-Mix Concrete', quantity: 20, unit: 'cubic yards', variations: ['3000 PSI', '3500 PSI', '4000 PSI'] },
          ];
      }
      
      setSelectedMaterials(defaultMaterials);
    };
    
    getDefaultMaterials();
  }, [projectType]);
  
  // Process project information with AI
  const processWithAI = () => {
    if (!projectName || !projectDescription) {
      setProjectErrors({
        name: !projectName,
        description: !projectDescription,
      });
      return;
    }
    
    setIsProcessing(true);
    // Simulate AI processing progress
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 200);
    
    // Add user message to context for future reference
    addAIMessage({
      role: 'user',
      content: `Project Name: ${projectName}\nDescription: ${projectDescription}\nType: ${projectType}\nSector: ${sector}`
    });
    
    // Generate AI insights based on project details
    setTimeout(() => {
      clearInterval(interval);
      setProcessingProgress(100);
      
      // Generate insights
      const insights = generateInsights();
      setAiInsights(insights);
      
      // Process any materials mentioned in description
      const extractedMaterials = extractMaterialsFromDescription(projectDescription);
      if (extractedMaterials.length > 0) {
        setCustomMaterials(extractedMaterials.join(', '));
      }
      
      // Move to materials selection view after 1.5s
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentView('materials');
        setToastMessage("Analysis complete! Here are your recommended materials.");
        setToastType('success');
        setShowToast(true);
      }, 1500);
    }, 3000);
  };
  
  // Generate insights based on project info
  const generateInsights = (): string[] => {
    const insights: string[] = [];
    
    // Project type insights
    if (projectType === 'new_construction') {
      insights.push("Foundation materials are critical for new construction - ensure adequate concrete strength for your foundation.");
      if (projectDescription.toLowerCase().includes('commercial') || sector === 'commercial') {
        insights.push("Commercial construction requires higher grade materials for durability and code compliance.");
      }
    } else if (projectType === 'renovation') {
      insights.push("Renovation projects often require specialized finishing materials and precise measurements.");
      if (projectDescription.toLowerCase().includes('historic') || projectDescription.toLowerCase().includes('old')) {
        insights.push("Historic renovations may need specialty materials that match existing structures.");
      }
    } else if (projectType === 'infrastructure') {
      insights.push("Infrastructure projects require weather-resistant materials with extended durability.");
      insights.push("DOT-approved materials are typically required for public infrastructure projects.");
    } else if (projectType === 'landscaping') {
      insights.push("Consider soil quality and drainage needs when selecting landscaping materials.");
      if (projectDescription.toLowerCase().includes('water') || projectDescription.toLowerCase().includes('pond')) {
        insights.push("Water features require specialized materials for proper water containment and filtration.");
      }
    }
    
    // Scale insights
    if (projectDescription.toLowerCase().includes('large') || projectSize.toLowerCase().includes('large')) {
      insights.push("Bulk material pricing is available for large-scale projects, potentially reducing your costs.");
    }
    
    // Timing insights
    const currentMonth = new Date().getMonth();
    if (currentMonth >= 11 || currentMonth <= 1) { // Winter
      insights.push("Winter construction requires special considerations for temperature-sensitive materials.");
    } else if (currentMonth >= 5 && currentMonth <= 8) { // Summer
      insights.push("Summer construction allows for optimal curing conditions for concrete and mortar.");
    }
    
    // Project-specific insights from description
    if (projectDescription.toLowerCase().includes('budget') || projectDescription.toLowerCase().includes('cost')) {
      insights.push("Consider alternative materials to balance quality and cost for budget-conscious projects.");
    }
    
    return insights.slice(0, 4); // Limit to 4 insights
  };
  
  // Extract materials from project description
  const extractMaterialsFromDescription = (description: string): string[] => {
    const materialKeywords = [
      'concrete', 'lumber', 'steel', 'rebar', 'insulation', 'drywall', 'tile', 
      'paint', 'brick', 'block', 'asphalt', 'gravel', 'sand', 'topsoil', 'mulch',
      'stone', 'pavers', 'glass', 'metal', 'pipe', 'wood', 'cement'
    ];
    
    const foundMaterials: string[] = [];
    const lowerDesc = description.toLowerCase();
    
    materialKeywords.forEach(material => {
      if (lowerDesc.includes(material) && !foundMaterials.includes(material)) {
        foundMaterials.push(material.charAt(0).toUpperCase() + material.slice(1));
      }
    });
    
    return foundMaterials;
  };
  
  // Add a new material to the selection
  const addNewMaterial = () => {
    if (!newMaterial.name.trim()) {
      if (materialNameRef.current) {
        materialNameRef.current.focus();
      }
      return;
    }
    
    const nextId = `custom-${Date.now()}`;
    
    setSelectedMaterials(prev => [
      ...prev,
      {
        id: nextId,
        name: newMaterial.name,
        quantity: newMaterial.quantity || 1,
        unit: newMaterial.unit || 'tons',
        isCustom: true,
      }
    ]);
    
    // Reset the input
    setNewMaterial({
      name: '',
      quantity: 1,
      unit: 'tons'
    });
    
    if (materialNameRef.current) {
      materialNameRef.current.focus();
    }
  };
  
  // Remove a material from the selection
  const removeMaterial = (id: string) => {
    setSelectedMaterials(prev => prev.filter(material => material.id !== id));
  };
  
  // Update material quantity
  const updateMaterialQuantity = (id: string, quantity: number) => {
    setSelectedMaterials(prev => 
      prev.map(material => 
        material.id === id 
          ? { ...material, quantity } 
          : material
      )
    );
  };
  
  // Update material unit
  const updateMaterialUnit = (id: string, unit: string) => {
    setSelectedMaterials(prev => 
      prev.map(material => 
        material.id === id 
          ? { ...material, unit } 
          : material
      )
    );
  };
  
  // Process materials from custom materials input
  const processCustomMaterials = () => {
    if (customMaterials.trim()) {
      const materials = customMaterials
        .split(',')
        .map(mat => mat.trim())
        .filter(Boolean);
      
      // Add each material
      materials.forEach(material => {
        if (!selectedMaterials.some(m => m.name.toLowerCase() === material.toLowerCase())) {
          const nextId = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
          setSelectedMaterials(prev => [
            ...prev,
            {
              id: nextId,
              name: material.charAt(0).toUpperCase() + material.slice(1).toLowerCase(),
              quantity: 1,
              unit: 'tons',
              isCustom: true,
            }
          ]);
        }
      });
      
      setCustomMaterials('');
    }
  };
  
  // Handle delivery validation
  const validateDelivery = () => {
    const errors = {
      street: !deliveryInfo.street,
      city: !deliveryInfo.city,
      state: !deliveryInfo.state,
      zipCode: !deliveryInfo.zipCode,
      deliveryDate: !deliveryInfo.deliveryDate,
    };
    
    setDeliveryErrors(errors);
    
    return !Object.values(errors).some(Boolean);
  };
  
  // Submit the full quote
  const submitQuote = () => {
    // Format product IDs to ensure they have the correct format for the mockData module
    const formattedProducts = selectedMaterials.map(m => {
      // Convert numeric IDs (like "1") to string format "prod-001"
      let productId = m.id;
      if (/^\d+$/.test(productId)) {
        productId = `prod-${productId.padStart(3, '0')}`;
      }
      
      return {
        productId,
        name: m.name,
        quantity: m.quantity,
        unit: m.unit,
        specialInstructions: ""
      };
    });
    
    // Add debug logs to see the product data
    console.log("Original selected materials:", selectedMaterials);
    console.log("Formatted products:", formattedProducts);
    
    // Update quote request with all collected information
    const quoteData = {
      projectName,
      projectDescription,
      projectType,
      sector,
      inputMode: 'ai_conversation',
      isGovernmentContract,
      requiresPermits: projectType === 'infrastructure' || sector === 'government',
      deliveryAddress: {
        street: deliveryInfo.street,
        city: deliveryInfo.city,
        state: deliveryInfo.state,
        zipCode: deliveryInfo.zipCode,
        specialInstructions: deliveryInfo.specialInstructions
      },
      desiredDeliveryDate: deliveryInfo.deliveryDate ? new Date(deliveryInfo.deliveryDate) : undefined,
      customer: {
        name: "",
        email: "",
        phone: ""
      },
      products: formattedProducts,
      aiInsights: aiInsights
    };
    
    console.log("Submitting quote data:", quoteData);
    updateQuoteRequest(quoteData);
    
    // Show success message
    setToastMessage("Quote submitted successfully!");
    setToastType('success');
    setShowToast(true);
    
    // Navigate to materials page
    setTimeout(() => {
      setCurrentStep(3);
      router.push('/prototype-11/quote-request/materials');
    }, 1500);
  };
  
  // Switch to manual form mode
  const switchToManualMode = () => {
    setToastMessage("Switching to manual form entry mode");
    setToastType('info');
    setShowToast(true);
    
    setTimeout(() => {
      setInputMode('manual_form');
      setCurrentStep(1);
      router.push('/prototype-11/quote-request/project-info');
    }, 1000);
  };
  
  // Render project input form
  const renderProjectInput = () => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Tell us about your project</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Name*
          </label>
          <input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
              if (e.target.value) setProjectErrors(prev => ({ ...prev, name: false }));
            }}
            className={`w-full p-3 border ${projectErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
            placeholder="e.g. Downtown Office Renovation"
          />
          {projectErrors.name && (
            <p className="mt-1 text-sm text-red-500">Project name is required</p>
          )}
        </div>
        
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Type
          </label>
          <select
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as ProjectType)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="new_construction">New Construction</option>
            <option value="renovation">Renovation</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="landscaping">Landscaping</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sector" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sector
            </label>
            <select
              id="sector"
              value={sector}
              onChange={(e) => {
                setSector(e.target.value as Sector);
                setIsGovernmentContract(e.target.value === 'government');
              }}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="private">Private</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="public">Public</option>
              <option value="government">Government</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="projectSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Size (optional)
            </label>
            <input
              id="projectSize"
              type="text"
              value={projectSize}
              onChange={(e) => setProjectSize(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="e.g. 2,500 sq ft"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date (optional)
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duration (optional)
            </label>
            <input
              id="duration"
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="e.g. 6 months"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Description*
          </label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => {
              setProjectDescription(e.target.value);
              if (e.target.value) setProjectErrors(prev => ({ ...prev, description: false }));
            }}
            rows={5}
            className={`w-full p-3 border ${projectErrors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
            placeholder="Describe your project in detail. Include information about the project scope, timeline, special requirements, and any specific materials you need."
          ></textarea>
          {projectErrors.description && (
            <p className="mt-1 text-sm text-red-500">Project description is required</p>
          )}
        </div>
        
        <div className="flex justify-end">
          {isProcessing ? (
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Analyzing your project...
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {processingProgress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our AI is analyzing your project to recommend the best materials...
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={processWithAI}
              className="px-6 py-2.5 bg-primary text-white hover:bg-blue-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Analyze with AI
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
  // Render materials selection view
  const renderMaterialsSelection = () => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Materials Selection</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentView('projectInput')}
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setCurrentView('delivery')}
            className="px-4 py-2 text-sm bg-primary text-white hover:bg-blue-600 rounded transition-colors"
            disabled={selectedMaterials.length === 0}
          >
            Continue
          </button>
        </div>
      </div>
      
      {/* Project summary and AI insights */}
      <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg mb-1">{projectName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {projectType.replace('_', ' ')} • {sector} • {projectSize && `${projectSize} • `}
              {startDate && `Starts ${new Date(startDate).toLocaleDateString()}`}
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
            AI Analyzed
          </div>
        </div>
        
        {aiInsights.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AI Insights:</h4>
            <ul className="space-y-1">
              {aiInsights.map((insight, index) => (
                <li key={index} className="flex items-start text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Materials list */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recommended Materials</h3>
          
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentView('projectInput')}
              className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Edit Project
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {selectedMaterials.map((material) => (
            <div 
              key={material.id} 
              className={`border ${material.isCustom ? 'border-green-200 dark:border-green-900' : 'border-gray-200 dark:border-gray-700'} rounded-lg p-4`}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">{material.name}</span>
                  {material.isCustom && (
                    <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                      Custom
                    </span>
                  )}
                  {!material.isCustom && (
                    <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                      AI Recommended
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeMaterial(material.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove material"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={material.quantity}
                    onChange={(e) => updateMaterialQuantity(material.id, parseInt(e.target.value) || 1)}
                    className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Unit
                  </label>
                  <select
                    value={material.unit}
                    onChange={(e) => updateMaterialUnit(material.id, e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="tons">Tons</option>
                    <option value="cubic yards">Cubic Yards</option>
                    <option value="square feet">Square Feet</option>
                    <option value="linear feet">Linear Feet</option>
                    <option value="sheets">Sheets</option>
                    <option value="pieces">Pieces</option>
                    <option value="gallons">Gallons</option>
                    <option value="board feet">Board Feet</option>
                  </select>
                </div>
                {material.variations && (
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Variations
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {material.variations.map((variation, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded"
                        >
                          {variation}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add new material */}
      <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-md font-medium mb-3">Add Additional Materials</h3>
        
        <div className="mb-4">
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Quick Add (comma separated)
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={customMaterials}
              onChange={(e) => setCustomMaterials(e.target.value)}
              placeholder="E.g. Granite, Sand, Gravel"
              className="flex-grow p-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={processCustomMaterials}
              disabled={!customMaterials.trim()}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 disabled:opacity-50 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Material Name
            </label>
            <input
              ref={materialNameRef}
              type="text"
              value={newMaterial.name}
              onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
              placeholder="Enter material name"
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={newMaterial.quantity}
              onChange={(e) => setNewMaterial({...newMaterial, quantity: parseInt(e.target.value) || 1})}
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Unit
            </label>
            <select
              value={newMaterial.unit}
              onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="tons">Tons</option>
              <option value="cubic yards">Cubic Yards</option>
              <option value="square feet">Square Feet</option>
              <option value="linear feet">Linear Feet</option>
              <option value="sheets">Sheets</option>
              <option value="pieces">Pieces</option>
              <option value="gallons">Gallons</option>
              <option value="board feet">Board Feet</option>
            </select>
          </div>
        </div>
        
        <div className="mt-3 flex justify-end">
          <button
            onClick={addNewMaterial}
            disabled={!newMaterial.name.trim()}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            Add Material
          </button>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentView('projectInput')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Back
        </button>
        
        <button
          onClick={() => setCurrentView('delivery')}
          className="px-6 py-2 bg-primary text-white hover:bg-blue-600 rounded transition-colors flex items-center"
          disabled={selectedMaterials.length === 0}
        >
          Continue to Delivery
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
  
  // Render delivery information form
  const renderDeliveryInfo = () => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Delivery Information</h2>
        
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
            {selectedMaterials.length} Materials
          </div>
          
          <div className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
            {projectType.replace('_', ' ')}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Street Address*
              </label>
              <input
                type="text"
                value={deliveryInfo.street}
                onChange={(e) => {
                  setDeliveryInfo(prev => ({ ...prev, street: e.target.value }));
                  if (e.target.value) setDeliveryErrors(prev => ({ ...prev, street: false }));
                }}
                className={`w-full p-3 border ${deliveryErrors.street ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
                placeholder="123 Construction Ave"
              />
              {deliveryErrors.street && (
                <p className="mt-1 text-sm text-red-500">Street address is required</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City*
                </label>
                <input
                  type="text"
                  value={deliveryInfo.city}
                  onChange={(e) => {
                    setDeliveryInfo(prev => ({ ...prev, city: e.target.value }));
                    if (e.target.value) setDeliveryErrors(prev => ({ ...prev, city: false }));
                  }}
                  className={`w-full p-3 border ${deliveryErrors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
                  placeholder="Philadelphia"
                />
                {deliveryErrors.city && (
                  <p className="mt-1 text-sm text-red-500">City is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  State*
                </label>
                <input
                  type="text"
                  value={deliveryInfo.state}
                  onChange={(e) => {
                    setDeliveryInfo(prev => ({ ...prev, state: e.target.value }));
                    if (e.target.value) setDeliveryErrors(prev => ({ ...prev, state: false }));
                  }}
                  className={`w-full p-3 border ${deliveryErrors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
                  placeholder="PA"
                />
                {deliveryErrors.state && (
                  <p className="mt-1 text-sm text-red-500">State is required</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ZIP Code*
              </label>
              <input
                type="text"
                value={deliveryInfo.zipCode}
                onChange={(e) => {
                  setDeliveryInfo(prev => ({ ...prev, zipCode: e.target.value }));
                  if (e.target.value) setDeliveryErrors(prev => ({ ...prev, zipCode: false }));
                }}
                className={`w-full p-3 border ${deliveryErrors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
                placeholder="19103"
              />
              {deliveryErrors.zipCode && (
                <p className="mt-1 text-sm text-red-500">ZIP code is required</p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Delivery Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Desired Delivery Date*
              </label>
              <input
                type="date"
                value={deliveryInfo.deliveryDate}
                onChange={(e) => {
                  setDeliveryInfo(prev => ({ ...prev, deliveryDate: e.target.value }));
                  if (e.target.value) setDeliveryErrors(prev => ({ ...prev, deliveryDate: false }));
                }}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full p-3 border ${deliveryErrors.deliveryDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
              />
              {deliveryErrors.deliveryDate && (
                <p className="mt-1 text-sm text-red-500">Delivery date is required</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Special Instructions
              </label>
              <textarea
                value={deliveryInfo.specialInstructions}
                onChange={(e) => setDeliveryInfo(prev => ({ ...prev, specialInstructions: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white min-h-[100px]"
                placeholder="Access information, delivery hours, contact person, etc."
              ></textarea>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Weather analysis will be performed for your delivery date to help optimize delivery timing.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">Materials Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {selectedMaterials.map((material, index) => (
            <div key={index} className="text-sm p-3 bg-white dark:bg-gray-700 rounded shadow-sm">
              <p className="font-medium">{material.name}</p>
              <p className="text-gray-500 dark:text-gray-400">
                {material.quantity} {material.unit}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentView('materials')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Materials
        </button>
        
        <button
          onClick={() => {
            if (validateDelivery()) {
              setCurrentView('review');
            }
          }}
          className="px-6 py-2 bg-primary text-white hover:bg-blue-600 rounded transition-colors"
        >
          Review Quote
        </button>
      </div>
    </div>
  );
  
  // Render review page
  const renderReview = () => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Review Your Quote Request</h2>
      
      <div className="space-y-6">
        {/* Project info */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium">Project Information</h3>
            <button
              onClick={() => setCurrentView('projectInput')}
              className="text-primary hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Project Name</p>
              <p className="font-medium">{projectName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Project Type</p>
              <p className="font-medium">{projectType.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sector</p>
              <p className="font-medium">{sector}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Project Size</p>
              <p className="font-medium">{projectSize || 'Not specified'}</p>
            </div>
            {(startDate || duration) && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Timeline</p>
                <p className="font-medium">
                  {startDate && `Starts ${new Date(startDate).toLocaleDateString()}`}
                  {startDate && duration && ' • '}
                  {duration && `Duration: ${duration}`}
                </p>
              </div>
            )}
            <div className="col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
              <p className="whitespace-pre-wrap">{projectDescription}</p>
            </div>
          </div>
        </div>
        
        {/* Materials info */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium">Materials</h3>
            <button
              onClick={() => setCurrentView('materials')}
              className="text-primary hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {selectedMaterials.map((material, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="font-medium text-gray-900 dark:text-white">{material.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {material.quantity} {material.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Delivery info */}
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium">Delivery Information</h3>
            <button
              onClick={() => setCurrentView('delivery')}
              className="text-primary hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Delivery Address</p>
              <p className="font-medium">{deliveryInfo.street}</p>
              <p className="font-medium">{deliveryInfo.city}, {deliveryInfo.state} {deliveryInfo.zipCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Delivery Date</p>
              <p className="font-medium">{new Date(deliveryInfo.deliveryDate).toLocaleDateString()}</p>
            </div>
            {deliveryInfo.specialInstructions && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Special Instructions</p>
                <p className="whitespace-pre-wrap">{deliveryInfo.specialInstructions}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* AI Insights */}
        {aiInsights.length > 0 && (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="text-md font-medium text-blue-900 dark:text-blue-100 mb-2">AI Insights</h3>
            <ul className="space-y-1">
              {aiInsights.map((insight, index) => (
                <li key={index} className="text-sm text-blue-800 dark:text-blue-200 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => setCurrentView('delivery')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Back
          </button>
          
          <button
            onClick={submitQuote}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
          >
            Submit Quote Request
          </button>
        </div>
      </div>
    </div>
  );
  
  // Main render method
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Heavy Materials AI Advisor</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              {currentView === 'projectInput' && <span>Step 1: Project Details</span>}
              {currentView === 'materials' && <span>Step 2: Materials Selection</span>}
              {currentView === 'delivery' && <span>Step 3: Delivery Information</span>}
              {currentView === 'review' && <span>Step 4: Review and Submit</span>}
            </div>
          </div>
        </div>
        <button 
          onClick={switchToManualMode}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded transition-colors"
        >
          Switch to Manual Form
        </button>
      </div>
      
      <div className="flex-grow bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-y-auto p-4">
        {currentView === 'projectInput' && renderProjectInput()}
        {currentView === 'materials' && renderMaterialsSelection()}
        {currentView === 'delivery' && renderDeliveryInfo()}
        {currentView === 'review' && renderReview()}
      </div>
      
      {/* Progress indicator */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-3 px-4">
        <div className="flex justify-between items-center mb-1 text-xs text-gray-500 dark:text-gray-400">
          <span>Project</span>
          <span>Materials</span>
          <span>Delivery</span>
          <span>Review</span>
        </div>
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="absolute h-2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ 
              width: 
                currentView === 'projectInput' ? '25%' : 
                currentView === 'materials' ? '50%' : 
                currentView === 'delivery' ? '75%' : '100%' 
            }}
          ></div>
        </div>
      </div>
      
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
};

export default AIConversationInterface;