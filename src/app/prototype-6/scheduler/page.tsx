'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Define project phase type
type ProjectPhase = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  materials: MaterialNeed[];
};

// Define material need type
type MaterialNeed = {
  id: string;
  materialId: string;
  quantity: number;
  unit: string;
  deliveryDate?: string;
  supplier?: string;
  status?: 'scheduled' | 'pending' | 'delivered';
};

// Define material type
type Material = {
  id: string;
  name: string;
  category: string;
  unit: string;
  leadTime: number; // in days
  availability: 'high' | 'medium' | 'low';
  price: number;
};

// Define supplier type
type Supplier = {
  id: string;
  name: string;
  reliability: number; // 1-5 rating
  materialIds: string[];
};

// Sample materials data
const MATERIALS: Material[] = [
  { id: 'mat1', name: 'Concrete Mix', category: 'Concrete', unit: 'cubic yard', leadTime: 2, availability: 'high', price: 125 },
  { id: 'mat2', name: 'Rebar #4', category: 'Steel', unit: 'ton', leadTime: 5, availability: 'medium', price: 980 },
  { id: 'mat3', name: 'Lumber 2x4', category: 'Wood', unit: 'board feet', leadTime: 3, availability: 'medium', price: 4.5 },
  { id: 'mat4', name: 'Gravel 3/4"', category: 'Aggregate', unit: 'ton', leadTime: 1, availability: 'high', price: 38 },
  { id: 'mat5', name: 'Sand', category: 'Aggregate', unit: 'ton', leadTime: 1, availability: 'high', price: 42 },
  { id: 'mat6', name: 'Cement', category: 'Binding', unit: 'bag', leadTime: 3, availability: 'high', price: 12 },
  { id: 'mat7', name: 'Steel Beams', category: 'Steel', unit: 'ton', leadTime: 14, availability: 'low', price: 1200 },
  { id: 'mat8', name: 'Roofing Shingles', category: 'Roofing', unit: 'square', leadTime: 7, availability: 'medium', price: 75 },
];

// Sample suppliers data
const SUPPLIERS: Supplier[] = [
  { id: 'sup1', name: 'BuildRight Materials', reliability: 4.5, materialIds: ['mat1', 'mat4', 'mat5', 'mat6'] },
  { id: 'sup2', name: 'Steel Dynamics', reliability: 4.2, materialIds: ['mat2', 'mat7'] },
  { id: 'sup3', name: 'Lumber Solutions', reliability: 3.8, materialIds: ['mat3'] },
  { id: 'sup4', name: 'Complete Supply Co.', reliability: 4.0, materialIds: ['mat1', 'mat2', 'mat3', 'mat4', 'mat5', 'mat6', 'mat8'] },
  { id: 'sup5', name: 'RoofPro Supplies', reliability: 4.7, materialIds: ['mat8'] },
];

export default function MaterialsScheduler() {
  const router = useRouter();
  
  // State for project details
  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectStart, setProjectStart] = useState('');
  const [projectEnd, setProjectEnd] = useState('');
  
  // State for phases
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [currentPhase, setCurrentPhase] = useState<ProjectPhase | null>(null);
  const [showPhaseModal, setShowPhaseModal] = useState(false);
  
  // State for materials being added to a phase
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [materialQuantity, setMaterialQuantity] = useState(0);
  
  // State for scheduler view
  const [currentView, setCurrentView] = useState<'setup' | 'scheduler' | 'review' | 'optimized' | 'quote'>('setup');
  const [optimized, setOptimized] = useState(false);
  
  // State for loading effect
  const [isLoading, setIsLoading] = useState(false);
  
  // Generate a unique ID
  const generateId = () => `id-${Math.random().toString(36).substr(2, 9)}`;
  
  // Add a new phase
  const addPhase = () => {
    if (!currentPhase) return;
    
    const newPhase = {
      ...currentPhase,
      id: generateId(),
    };
    
    setPhases([...phases, newPhase]);
    setShowPhaseModal(false);
    setCurrentPhase(null);
  };
  
  // Remove a phase
  const removePhase = (phaseId: string) => {
    setPhases(phases.filter((phase) => phase.id !== phaseId));
  };
  
  // Add material to current phase
  const addMaterialToPhase = () => {
    if (!currentPhase || !selectedMaterial || materialQuantity <= 0) return;
    
    const material = MATERIALS.find(m => m.id === selectedMaterial);
    if (!material) return;
    
    const newMaterial: MaterialNeed = {
      id: generateId(),
      materialId: material.id,
      quantity: materialQuantity,
      unit: material.unit,
      status: 'pending',
    };
    
    setCurrentPhase({
      ...currentPhase,
      materials: [...(currentPhase.materials || []), newMaterial],
    });
    
    setSelectedMaterial('');
    setMaterialQuantity(0);
  };
  
  // Remove material from current phase
  const removeMaterialFromPhase = (materialId: string) => {
    if (!currentPhase) return;
    
    setCurrentPhase({
      ...currentPhase,
      materials: currentPhase.materials.filter(m => m.id !== materialId),
    });
  };
  
  // Initialize a new phase
  const initNewPhase = () => {
    setCurrentPhase({
      id: '',
      name: '',
      startDate: '',
      endDate: '',
      materials: [],
    });
    setShowPhaseModal(true);
  };
  
  // Edit an existing phase
  const editPhase = (phaseId: string) => {
    const phase = phases.find(p => p.id === phaseId);
    if (!phase) return;
    
    setCurrentPhase(phase);
    setShowPhaseModal(true);
  };
  
  // Save changes to an existing phase
  const updatePhase = () => {
    if (!currentPhase) return;
    
    const updatedPhases = phases.map(phase => 
      phase.id === currentPhase.id ? currentPhase : phase
    );
    
    setPhases(updatedPhases);
    setShowPhaseModal(false);
    setCurrentPhase(null);
  };
  
  // Move to scheduler view
  const proceedToScheduler = () => {
    if (!projectName || !projectLocation || !projectStart || !projectEnd || phases.length === 0) {
      alert('Please fill out all project details and add at least one phase');
      return;
    }
    
    setCurrentView('scheduler');
    saveToSessionStorage();
  };
  
  // Move to review view
  const proceedToReview = () => {
    setCurrentView('review');
    saveToSessionStorage();
  };
  
  // Run optimization algorithm (simplified for demo)
  const optimizeSchedule = () => {
    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      const optimizedPhases = phases.map(phase => {
        const updatedMaterials = phase.materials.map(material => {
          const materialDetails = MATERIALS.find(m => m.id === material.materialId);
          const phaseDuration = new Date(phase.endDate).getTime() - new Date(phase.startDate).getTime();
          const phaseMiddle = new Date(phase.startDate).getTime() + (phaseDuration / 2);
          
          // Calculate optimal delivery - lead time before needed in middle of phase
          const optimalDelivery = new Date(phaseMiddle - (materialDetails?.leadTime || 0) * 24 * 60 * 60 * 1000);
          
          // Find best supplier based on reliability and availability
          const availableSuppliers = SUPPLIERS.filter(s => s.materialIds.includes(material.materialId));
          const bestSupplier = availableSuppliers.sort((a, b) => b.reliability - a.reliability)[0];
          
          return {
            ...material,
            deliveryDate: optimalDelivery.toISOString().split('T')[0],
            supplier: bestSupplier?.name || 'Unknown',
            status: 'scheduled',
          };
        });
        
        return {
          ...phase,
          materials: updatedMaterials,
        };
      });
      
      setPhases(optimizedPhases);
      setOptimized(true);
      setCurrentView('optimized');
      setIsLoading(false);
      saveToSessionStorage();
    }, 1500);
  };
  
  // Generate quote
  const generateQuote = () => {
    setCurrentView('quote');
    saveToSessionStorage();
  };
  
  // Save data to session storage
  const saveToSessionStorage = () => {
    const schedulerData = {
      projectName,
      projectLocation,
      projectStart,
      projectEnd,
      phases,
      optimized,
    };
    
    sessionStorage.setItem('schedulerData', JSON.stringify(schedulerData));
  };
  
  // Load data from session storage
  useEffect(() => {
    const savedData = sessionStorage.getItem('schedulerData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setProjectName(data.projectName || '');
      setProjectLocation(data.projectLocation || '');
      setProjectStart(data.projectStart || '');
      setProjectEnd(data.projectEnd || '');
      setPhases(data.phases || []);
      setOptimized(data.optimized || false);
    }
  }, []);
  
  // Helper function to get material name by ID
  const getMaterialName = (materialId: string) => {
    const material = MATERIALS.find(m => m.id === materialId);
    return material ? material.name : 'Unknown Material';
  };
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate total cost for a material need
  const calculateMaterialCost = (material: MaterialNeed) => {
    const materialInfo = MATERIALS.find(m => m.id === material.materialId);
    return materialInfo ? materialInfo.price * material.quantity : 0;
  };
  
  // Calculate total project cost
  const calculateTotalCost = () => {
    let total = 0;
    phases.forEach(phase => {
      phase.materials.forEach(material => {
        total += calculateMaterialCost(material);
      });
    });
    return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };
  
  // Determine delivery status color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-500';
      case 'pending': return 'text-yellow-500';
      case 'delivered': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };
  
  // Completion percentage
  const completionPercentage = () => {
    if (currentView === 'setup') return 25;
    if (currentView === 'scheduler') return 50;
    if (currentView === 'review') return 75;
    if (currentView === 'optimized') return 90;
    if (currentView === 'quote') return 100;
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="prototype-6" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-2 bg-primary rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${completionPercentage()}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Project Setup</span>
            <span>Material Scheduling</span>
            <span>Review</span>
            <span>Quote</span>
          </div>
        </div>
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg font-semibold">Optimizing your schedule...</p>
              <p className="text-gray-600 dark:text-gray-300">This may take a moment as we analyze your project needs.</p>
            </div>
          </div>
        )}
        
        {/* Project Setup View */}
        {currentView === 'setup' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Project Setup</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-800"
                  placeholder="Enter project name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Location
                </label>
                <input
                  type="text"
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-800"
                  placeholder="Enter project location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={projectStart}
                  onChange={(e) => setProjectStart(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={projectEnd}
                  onChange={(e) => setProjectEnd(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-800"
                />
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-4">Project Phases</h3>
            
            {phases.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6">
                <p className="text-gray-500 dark:text-gray-400 mb-4">No phases added yet. Add project phases to continue.</p>
                <button
                  onClick={initNewPhase}
                  className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Add First Phase
                </button>
              </div>
            ) : (
              <div className="mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phase Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timeline</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Materials</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {phases.map((phase) => (
                        <tr key={phase.id}>
                          <td className="px-4 py-3 whitespace-nowrap">{phase.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                          </td>
                          <td className="px-4 py-3">
                            {phase.materials.length === 0 ? (
                              <span className="text-yellow-500">No materials added</span>
                            ) : (
                              <span>{phase.materials.length} material(s)</span>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <button
                              onClick={() => editPhase(phase.id)}
                              className="text-blue-500 hover:text-blue-700 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removePhase(phase.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4">
                  <button
                    onClick={initNewPhase}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Add Another Phase
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                onClick={proceedToScheduler}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                disabled={phases.length === 0}
              >
                Continue to Scheduling
              </button>
            </div>
          </div>
        )}
        
        {/* Scheduler View */}
        {currentView === 'scheduler' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Materials Scheduling</h2>
              <div className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">{projectName}</span> • {formatDate(projectStart)} - {formatDate(projectEnd)}
              </div>
            </div>
            
            <div className="space-y-8">
              {phases.map((phase) => (
                <div key={phase.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">{phase.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                      </p>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700">
                        {phase.materials.length} material(s)
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-6 py-4">
                    {phase.materials.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-gray-500 dark:text-gray-400 mb-2">No materials scheduled for this phase.</p>
                        <button
                          onClick={() => editPhase(phase.id)}
                          className="text-primary hover:underline font-medium"
                        >
                          Add Materials
                        </button>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Material</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Supplier</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Delivery Date</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {phase.materials.map((material) => (
                              <tr key={material.id}>
                                <td className="px-4 py-3 whitespace-nowrap">{getMaterialName(material.materialId)}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{material.quantity} {material.unit}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{material.supplier || 'Not assigned'}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  {material.deliveryDate ? formatDate(material.deliveryDate) : 'Not scheduled'}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`${getStatusColor(material.status)} font-medium`}>
                                    {material.status || 'Pending'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentView('setup')}
                className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Back to Setup
              </button>
              <button
                onClick={proceedToReview}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Review Schedule
              </button>
            </div>
          </div>
        )}
        
        {/* Review View */}
        {currentView === 'review' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Review Your Schedule</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Project Overview</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Project</div>
                  <div className="font-semibold">{projectName}</div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</div>
                  <div className="font-semibold">{projectLocation}</div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Timeline</div>
                  <div className="font-semibold">{formatDate(projectStart)} - {formatDate(projectEnd)}</div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Phases</div>
                  <div className="font-semibold">{phases.length} phases</div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Current Schedule</h3>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <div className="text-yellow-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">Your schedule has not been optimized</p>
                    <p className="text-yellow-600 dark:text-yellow-300">Click the optimize button below to generate the most efficient delivery schedule.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {phases.map((phase) => (
                  <div key={phase.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
                      <h4 className="font-bold">{phase.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(phase.startDate)} - {formatDate(phase.endDate)}</p>
                    </div>
                    
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {phase.materials.map((material) => (
                        <div key={material.id} className="px-4 py-3 flex flex-wrap items-center justify-between">
                          <div className="w-full sm:w-auto mb-2 sm:mb-0">
                            <div className="font-medium">{getMaterialName(material.materialId)}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{material.quantity} {material.unit}</div>
                          </div>
                          
                          <div className="w-full sm:w-auto flex items-center space-x-4">
                            <div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Supplier</div>
                              <div>{material.supplier || 'Not assigned'}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Delivery</div>
                              <div>{material.deliveryDate ? formatDate(material.deliveryDate) : 'Not scheduled'}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                              <div className={getStatusColor(material.status)}>
                                {material.status || 'Pending'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentView('scheduler')}
                className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Back to Schedule
              </button>
              <button
                onClick={optimizeSchedule}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Optimize Schedule
              </button>
            </div>
          </div>
        )}
        
        {/* Optimized View */}
        {currentView === 'optimized' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Optimized Schedule</h2>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <div className="text-green-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Your schedule has been optimized!</p>
                  <p className="text-green-600 dark:text-green-300">We've analyzed your project needs and created the most efficient delivery schedule.</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Schedule at a Glance</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{phases.length}</div>
                  <div className="text-blue-800 dark:text-blue-200">Project Phases</div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {phases.reduce((total, phase) => total + phase.materials.length, 0)}
                  </div>
                  <div className="text-purple-800 dark:text-purple-200">Material Deliveries</div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{calculateTotalCost()}</div>
                  <div className="text-green-800 dark:text-green-200">Total Cost</div>
                </div>
              </div>
              
              <div className="space-y-6">
                {phases.map((phase) => (
                  <div key={phase.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
                      <h4 className="font-bold">{phase.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(phase.startDate)} - {formatDate(phase.endDate)}</p>
                    </div>
                    
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {phase.materials.map((material) => (
                        <div key={material.id} className="px-4 py-3 flex flex-wrap items-center justify-between">
                          <div className="w-full sm:w-auto mb-2 sm:mb-0">
                            <div className="font-medium">{getMaterialName(material.materialId)}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{material.quantity} {material.unit}</div>
                          </div>
                          
                          <div className="w-full sm:w-auto flex items-center space-x-4">
                            <div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Supplier</div>
                              <div>{material.supplier}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Delivery</div>
                              <div className="font-medium text-blue-600 dark:text-blue-400">
                                {formatDate(material.deliveryDate || '')}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                              <div className={getStatusColor(material.status)}>
                                {material.status}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentView('review')}
                className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Back to Review
              </button>
              <button
                onClick={generateQuote}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Generate Quote
              </button>
            </div>
          </div>
        )}
        
        {/* Quote View */}
        {currentView === 'quote' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Materials Quote</h2>
            
            <div className="mb-8 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-3xl font-bold mb-1">Heavy Materials</div>
                  <div className="text-gray-600 dark:text-gray-300">Your Material Scheduling Partner</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">Quote #Q{Math.floor(Math.random() * 10000)}</div>
                  <div className="text-gray-600 dark:text-gray-300">Date: {new Date().toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Project</div>
                  <div className="font-semibold mb-2">{projectName}</div>
                  <div className="text-gray-600 dark:text-gray-300">{projectLocation}</div>
                  <div className="text-gray-600 dark:text-gray-300">{formatDate(projectStart)} - {formatDate(projectEnd)}</div>
                </div>
                <div className="">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Prepared For</div>
                  <div className="font-semibold mb-2">Client Name</div>
                  <div className="text-gray-600 dark:text-gray-300">client@example.com</div>
                  <div className="text-gray-600 dark:text-gray-300">(555) 123-4567</div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Materials Summary</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Material</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Unit Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Delivery Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {phases.flatMap(phase => phase.materials.map(material => {
                        const materialInfo = MATERIALS.find(m => m.id === material.materialId);
                        return (
                          <tr key={material.id}>
                            <td className="px-4 py-3 whitespace-nowrap">{getMaterialName(material.materialId)}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{material.quantity} {material.unit}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              ${materialInfo?.price.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {formatDate(material.deliveryDate || '')}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              ${(materialInfo?.price || 0 * material.quantity).toFixed(2)}
                            </td>
                          </tr>
                        );
                      }))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-300 dark:border-gray-600">
                        <td colSpan={4} className="px-4 py-3 text-right font-bold">Total:</td>
                        <td className="px-4 py-3 font-bold">{calculateTotalCost()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Delivery Schedule</h3>
                
                <div className="space-y-4">
                  {phases.map((phase) => (
                    <div key={phase.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-bold">{phase.name}</h4>
                      <div className="mt-2 space-y-2">
                        {phase.materials.map((material) => (
                          <div key={material.id} className="flex justify-between">
                            <div>
                              {getMaterialName(material.materialId)} ({material.quantity} {material.unit})
                            </div>
                            <div className="font-medium">
                              {formatDate(material.deliveryDate || '')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-bold mb-4">Terms & Conditions</h3>
                
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>This quote is valid for 30 days from the date of issue.</li>
                  <li>Delivery dates are subject to material availability and may change.</li>
                  <li>Payment terms: 50% deposit upon acceptance, 50% upon delivery.</li>
                  <li>Shipping and handling charges may apply.</li>
                  <li>Returns or exchanges must be made within 7 days of delivery.</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => setCurrentView('optimized')}
                className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-2 px-6 rounded-lg transition-colors order-2 sm:order-1"
              >
                Back to Schedule
              </button>
              
              <div className="space-x-4 order-1 sm:order-2 mb-4 sm:mb-0">
                <button className="bg-gray-800 dark:bg-gray-200 hover:bg-gray-900 dark:hover:bg-white text-white dark:text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors">
                  Download PDF
                </button>
                <button className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Accept Quote
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Phase Modal */}
        {showPhaseModal && currentPhase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  {currentPhase.id ? 'Edit Phase' : 'Add New Phase'}
                </h2>
                
                <div className="grid gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phase Name
                    </label>
                    <input
                      type="text"
                      value={currentPhase.name}
                      onChange={(e) => setCurrentPhase({ ...currentPhase, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-800"
                      placeholder="e.g. Foundation, Framing, Roofing, etc."
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={currentPhase.startDate}
                        onChange={(e) => setCurrentPhase({ ...currentPhase, startDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={currentPhase.endDate}
                        onChange={(e) => setCurrentPhase({ ...currentPhase, endDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-4">Materials</h3>
                  
                  {currentPhase.materials.length === 0 ? (
                    <div className="text-center py-6 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                      <p className="text-gray-500 dark:text-gray-400">No materials added yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Material</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {currentPhase.materials.map((material) => (
                            <tr key={material.id}>
                              <td className="px-4 py-3 whitespace-nowrap">{getMaterialName(material.materialId)}</td>
                              <td className="px-4 py-3 whitespace-nowrap">{material.quantity} {material.unit}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <button
                                  onClick={() => removeMaterialFromPhase(material.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Add Material</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                          Material Type
                        </label>
                        <select
                          value={selectedMaterial}
                          onChange={(e) => setSelectedMaterial(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-800"
                        >
                          <option value="">Select Material</option>
                          {MATERIALS.map((material) => (
                            <option key={material.id} value={material.id}>
                              {material.name} ({material.unit})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                          Quantity
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={materialQuantity || ''}
                          onChange={(e) => setMaterialQuantity(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-800"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={addMaterialToPhase}
                          disabled={!selectedMaterial || materialQuantity <= 0}
                          className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setShowPhaseModal(false);
                      setCurrentPhase(null);
                    }}
                    className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={currentPhase.id ? updatePhase : addPhase}
                    disabled={!currentPhase.name || !currentPhase.startDate || !currentPhase.endDate}
                    className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700"
                  >
                    {currentPhase.id ? 'Update Phase' : 'Add Phase'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}