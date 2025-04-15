'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
type Project = {
  type: string;
  location: string;
  size: string;
  timeline: string;
  budget: string;
  requirements: string[];
};
type Material = {
  id: string;
  name: string;
  description: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  selected: boolean;
};
type Plant = {
  id: string;
  name: string;
  location: string;
  distance: string;
  selected: boolean;
  rating: number;
};
type QuoteState = {
  currentStep: 'project-info' | 'materials' | 'delivery' | 'review';
  project: Project;
  materials: Material[];
  plants: Plant[];
  deliveryDate: string;
  deliveryTime: string;
  specialInstructions: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};
export default function QuotePage() {
  const router = useRouter();
  const [state, setState] = useState<QuoteState>({
    currentStep: 'project-info',
    project: {
      type: '',
      location: '',
      size: '',
      timeline: '',
      budget: '',
      requirements: []
    },
    materials: [],
    plants: [],
    deliveryDate: '',
    deliveryTime: '',
    specialInstructions: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });
  // Handle project type selection
  const handleProjectTypeChange = (type: string) => {
    setState(prev => ({
      ...prev,
      project: {
        ...prev.project,
        type
      }
    }));
  };
  // Handle input changes for project info
  const handleProjectInputChange = (field: keyof Project, value: string) => {
    setState(prev => ({
      ...prev,
      project: {
        ...prev.project,
        [field]: value
      }
    }));
  };
  // Add a requirement to the project
  const addRequirement = (requirement: string) => {
    if (!requirement) return;
    setState(prev => ({
      ...prev,
      project: {
        ...prev.project,
        requirements: [...prev.project.requirements, requirement]
      }
    }));
  };
  // Remove a requirement from the project
  const removeRequirement = (index: number) => {
    setState(prev => ({
      ...prev,
      project: {
        ...prev.project,
        requirements: prev.project.requirements.filter((_, i) => i !== index)
      }
    }));
  };
  // Submit project info and generate material recommendations
  const submitProjectInfo = () => {
    // Generate materials based on project type
    const materials = generateMaterials(state.project.type, state.project.size);
    const plants = generatePlants(state.project.location);
    setState(prev => ({
      ...prev,
      materials,
      plants,
      currentStep: 'materials'
    }));
  };
  // Generate materials based on project type and size
  const generateMaterials = (projectType: string, projectSize: string) => {
    let baseMaterials: Material[] = [];
    let sizeFactor = 1;
    // Apply size multiplier based on project size
    if (projectSize.includes('small')) {
      sizeFactor = 0.7;
    } else if (projectSize.includes('medium')) {
      sizeFactor = 1;
    } else if (projectSize.includes('large')) {
      sizeFactor = 1.5;
    } else {
      sizeFactor = 1; // Default for unknown sizes
    }
    // Generate materials based on project type
    if (projectType.toLowerCase().includes('driveway')) {
      baseMaterials = [
        {
          id: 'm1',
          name: 'Crushed Stone Base',
          description: 'Foundation layer for driveways',
          unit: 'ton',
          unitPrice: 28.50,
          quantity: Math.round(15 * sizeFactor),
          selected: true
        },
        {
          id: 'm2',
          name: 'Asphalt Mix',
          description: 'Residential grade asphalt for driveway surface',
          unit: 'ton',
          unitPrice: 85.75,
          quantity: Math.round(12 * sizeFactor),
          selected: true
        },
        {
          id: 'm3',
          name: 'Edge Restraints',
          description: 'Plastic edging to contain driveway materials',
          unit: 'ft',
          unitPrice: 3.25,
          quantity: Math.round(60 * sizeFactor),
          selected: false
        },
        {
          id: 'm4',
          name: 'Geotextile Fabric',
          description: 'Prevents mixing of base materials with soil',
          unit: 'sqft',
          unitPrice: 0.45,
          quantity: Math.round(400 * sizeFactor),
          selected: false
        }
      ];
    } else if (projectType.toLowerCase().includes('patio')) {
      baseMaterials = [
        {
          id: 'm1',
          name: 'Paver Base',
          description: 'Crushed stone base for patios',
          unit: 'ton',
          unitPrice: 32.50,
          quantity: Math.round(10 * sizeFactor),
          selected: true
        },
        {
          id: 'm2',
          name: 'Paver Sand',
          description: 'Fine sand for leveling pavers',
          unit: 'ton',
          unitPrice: 38.00,
          quantity: Math.round(3 * sizeFactor),
          selected: true
        },
        {
          id: 'm3',
          name: 'Concrete Pavers',
          description: 'Durable concrete pavers for patio surface',
          unit: 'sqft',
          unitPrice: 4.75,
          quantity: Math.round(200 * sizeFactor),
          selected: true
        },
        {
          id: 'm4',
          name: 'Polymeric Sand',
          description: 'Joint sand that hardens to lock pavers together',
          unit: 'bag',
          unitPrice: 29.95,
          quantity: Math.round(5 * sizeFactor),
          selected: false
        }
      ];
    } else if (projectType.toLowerCase().includes('road') || projectType.toLowerCase().includes('street')) {
      baseMaterials = [
        {
          id: 'm1',
          name: 'Road Base Aggregate',
          description: 'Heavy-duty base layer for road construction',
          unit: 'ton',
          unitPrice: 26.50,
          quantity: Math.round(50 * sizeFactor),
          selected: true
        },
        {
          id: 'm2',
          name: 'Binder Course Asphalt',
          description: 'Intermediate asphalt layer for strength',
          unit: 'ton',
          unitPrice: 95.00,
          quantity: Math.round(35 * sizeFactor),
          selected: true
        },
        {
          id: 'm3',
          name: 'Surface Course Asphalt',
          description: 'Top layer designed for traffic and weathering',
          unit: 'ton',
          unitPrice: 105.00,
          quantity: Math.round(25 * sizeFactor),
          selected: true
        },
        {
          id: 'm4',
          name: 'Drainage Pipe',
          description: 'HDPE pipe for roadside drainage',
          unit: 'ft',
          unitPrice: 12.75,
          quantity: Math.round(100 * sizeFactor),
          selected: false
        }
      ];
    } else if (projectType.toLowerCase().includes('foundation')) {
      baseMaterials = [
        {
          id: 'm1',
          name: 'Structural Fill',
          description: 'Compactible fill for foundation support',
          unit: 'ton',
          unitPrice: 24.50,
          quantity: Math.round(40 * sizeFactor),
          selected: true
        },
        {
          id: 'm2',
          name: 'Concrete Mix - 5000 PSI',
          description: 'High-strength concrete for foundations',
          unit: 'yard³',
          unitPrice: 135.00,
          quantity: Math.round(20 * sizeFactor),
          selected: true
        },
        {
          id: 'm3',
          name: 'Rebar #5',
          description: 'Steel reinforcement bars for concrete',
          unit: 'piece',
          unitPrice: 18.75,
          quantity: Math.round(40 * sizeFactor),
          selected: true
        },
        {
          id: 'm4',
          name: 'Vapor Barrier',
          description: 'Plastic sheeting to prevent moisture intrusion',
          unit: 'sqft',
          unitPrice: 0.35,
          quantity: Math.round(600 * sizeFactor),
          selected: false
        }
      ];
    } else if (projectType.toLowerCase().includes('parking')) {
      baseMaterials = [
        {
          id: 'm1',
          name: 'Aggregate Base',
          description: 'Base layer for parking lot',
          unit: 'ton',
          unitPrice: 28.00,
          quantity: Math.round(45 * sizeFactor),
          selected: true
        },
        {
          id: 'm2',
          name: 'Commercial Asphalt',
          description: 'Asphalt mix designed for parking lots',
          unit: 'ton',
          unitPrice: 88.50,
          quantity: Math.round(30 * sizeFactor),
          selected: true
        },
        {
          id: 'm3',
          name: 'Line Paint',
          description: 'Traffic paint for parking spaces and markings',
          unit: 'gallon',
          unitPrice: 45.00,
          quantity: Math.round(8 * sizeFactor),
          selected: true
        },
        {
          id: 'm4',
          name: 'Wheel Stops',
          description: 'Concrete parking blocks',
          unit: 'piece',
          unitPrice: 35.75,
          quantity: Math.round(15 * sizeFactor),
          selected: false
        }
      ];
    } else {
      // Default/generic materials
      baseMaterials = [
        {
          id: 'm1',
          name: 'Crushed Stone',
          description: 'Multi-purpose base material',
          unit: 'ton',
          unitPrice: 28.50,
          quantity: Math.round(20 * sizeFactor),
          selected: true
        },
        {
          id: 'm2',
          name: 'Fill Sand',
          description: 'General purpose sand for construction',
          unit: 'ton',
          unitPrice: 22.00,
          quantity: Math.round(10 * sizeFactor),
          selected: true
        },
        {
          id: 'm3',
          name: 'Concrete Mix',
          description: 'General purpose concrete',
          unit: 'yard³',
          unitPrice: 120.00,
          quantity: Math.round(5 * sizeFactor),
          selected: false
        }
      ];
    }
    // Add some adaptive materials based on requirements
    const additionalMaterials: Material[] = [];
    state.project.requirements.forEach(req => {
      if (req.toLowerCase().includes('drain') || req.toLowerCase().includes('water')) {
        additionalMaterials.push({
          id: `additional-${additionalMaterials.length + 1}`,
          name: 'Drainage Gravel',
          description: 'Clean stone specifically for drainage applications',
          unit: 'ton',
          unitPrice: 32.50,
          quantity: Math.round(8 * sizeFactor),
          selected: true
        });
      }
      if (req.toLowerCase().includes('eco') || req.toLowerCase().includes('environment') || req.toLowerCase().includes('green')) {
        additionalMaterials.push({
          id: `additional-${additionalMaterials.length + 1}`,
          name: 'Recycled Aggregate',
          description: 'Environmentally friendly recycled material',
          unit: 'ton',
          unitPrice: 24.00,
          quantity: Math.round(12 * sizeFactor),
          selected: true
        });
      }
      if (req.toLowerCase().includes('color') || req.toLowerCase().includes('decorative') || req.toLowerCase().includes('aesthetic')) {
        additionalMaterials.push({
          id: `additional-${additionalMaterials.length + 1}`,
          name: 'Colored Aggregate',
          description: 'Decorative colored stone for visual enhancement',
          unit: 'ton',
          unitPrice: 48.75,
          quantity: Math.round(5 * sizeFactor),
          selected: true
        });
      }
    });
    return [...baseMaterials, ...additionalMaterials];
  };
  // Generate plants based on project location
  const generatePlants = (location: string) => {
    const locationLower = location.toLowerCase();
    let plants: Plant[] = [];
    if (locationLower.includes('new york') || locationLower.includes('ny')) {
      plants = [
        { id: 'p1', name: 'NYC Materials Supply', location: 'Queens, NY', distance: '8.4 miles', rating: 4.7, selected: true },
        { id: 'p2', name: 'Metropolitan Concrete', location: 'Brooklyn, NY', distance: '12.1 miles', rating: 4.2, selected: false },
        { id: 'p3', name: 'Empire State Materials', location: 'Yonkers, NY', distance: '15.8 miles', rating: 4.8, selected: false },
      ];
    } else if (locationLower.includes('los angeles') || locationLower.includes('la') || locationLower.includes('california')) {
      plants = [
        { id: 'p1', name: 'LA Construction Supply', location: 'Burbank, CA', distance: '7.3 miles', rating: 4.5, selected: true },
        { id: 'p2', name: 'Pacific Coast Materials', location: 'Long Beach, CA', distance: '13.6 miles', rating: 4.6, selected: false },
        { id: 'p3', name: 'SoCal Aggregates', location: 'Glendale, CA', distance: '9.2 miles', rating: 4.3, selected: false },
      ];
    } else if (locationLower.includes('chicago') || locationLower.includes('il') || locationLower.includes('illinois')) {
      plants = [
        { id: 'p1', name: 'Windy City Materials', location: 'Chicago, IL', distance: '5.9 miles', rating: 4.4, selected: true },
        { id: 'p2', name: 'Midwest Concrete', location: 'Evanston, IL', distance: '11.3 miles', rating: 4.7, selected: false },
        { id: 'p3', name: 'Illinois Aggregates', location: 'Joliet, IL', distance: '18.7 miles', rating: 4.5, selected: false },
      ];
    } else if (locationLower.includes('dallas') || locationLower.includes('tx') || locationLower.includes('texas')) {
      plants = [
        { id: 'p1', name: 'Lone Star Materials', location: 'Dallas, TX', distance: '6.2 miles', rating: 4.6, selected: true },
        { id: 'p2', name: 'Texas Construction Supply', location: 'Fort Worth, TX', distance: '15.8 miles', rating: 4.3, selected: false },
        { id: 'p3', name: 'DFW Aggregates', location: 'Plano, TX', distance: '10.4 miles', rating: 4.5, selected: false },
      ];
    } else {
      // Default plants if location isn't recognized
      plants = [
        { id: 'p1', name: 'Regional Materials Supply', location: 'Near your location', distance: '7.2 miles', rating: 4.6, selected: true },
        { id: 'p2', name: 'Standard Construction Supply', location: 'Near your location', distance: '9.8 miles', rating: 4.4, selected: false },
        { id: 'p3', name: 'Local Materials Co.', location: 'Near your location', distance: '12.5 miles', rating: 4.3, selected: false },
      ];
    }
    return plants;
  };
  // Toggle material selection
  const toggleMaterial = (id: string) => {
    setState(prev => ({
      ...prev,
      materials: prev.materials.map(material => 
        material.id === id ? { ...material, selected: !material.selected } : material
      )
    }));
  };
  // Update material quantity
  const updateMaterialQuantity = (id: string, quantity: number) => {
    setState(prev => ({
      ...prev,
      materials: prev.materials.map(material => 
        material.id === id ? { ...material, quantity } : material
      )
    }));
  };
  // Select a plant
  const selectPlant = (id: string) => {
    setState(prev => ({
      ...prev,
      plants: prev.plants.map(plant => 
        ({ ...plant, selected: plant.id === id })
      )
    }));
  };
  // Save materials and plants, proceed to delivery
  const saveSelectionsProceedToDelivery = () => {
    setState(prev => ({
      ...prev,
      currentStep: 'delivery'
    }));
  };
  // Handle input changes for delivery and contact info
  const handleInputChange = (field: keyof Omit<QuoteState, 'currentStep' | 'project' | 'materials' | 'plants'>, value: string) => {
    setState(prev => ({
      ...prev,
      [field]: value
    }));
  };
  // Save delivery info and proceed to review
  const saveDeliveryProceedToReview = () => {
    setState(prev => ({
      ...prev,
      currentStep: 'review'
    }));
  };
  // Submit final quote
  const submitQuote = () => {
    // Save the quote data to session storage
    sessionStorage.setItem('aiQuoteData', JSON.stringify({
      project: state.project,
      materials: state.materials.filter(m => m.selected),
      selectedPlant: state.plants.find(p => p.selected),
      deliveryDate: state.deliveryDate,
      deliveryTime: state.deliveryTime,
      specialInstructions: state.specialInstructions,
      contactInfo: {
        name: state.contactName,
        email: state.contactEmail,
        phone: state.contactPhone
      }
    }));
    // Navigate to confirmation page
    router.push('/prototype-12/confirmation');
  };
  // Calculate total price
  const calculateTotal = () => {
    return state.materials
      .filter(m => m.selected)
      .reduce((total, material) => {
        return total + (material.quantity * material.unitPrice);
      }, 0);
  };
  return (
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">Intelligent Adaptive Quoting</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Our system adapts to your project needs in real-time</p>
        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex justify-between mb-2">
            <div className="text-sm font-medium">
              <span className={state.currentStep === 'project-info' ? 'text-primary font-bold' : ''}>Project Information</span>
            </div>
            <div className="text-sm font-medium">
              <span className={state.currentStep === 'materials' ? 'text-primary font-bold' : ''}>Materials & Plants</span>
            </div>
            <div className="text-sm font-medium">
              <span className={state.currentStep === 'delivery' ? 'text-primary font-bold' : ''}>Delivery & Contact</span>
            </div>
            <div className="text-sm font-medium">
              <span className={state.currentStep === 'review' ? 'text-primary font-bold' : ''}>Review & Submit</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full transition-all" style={{
              width: state.currentStep === 'project-info' ? '25%' : 
                    state.currentStep === 'materials' ? '50%' :
                    state.currentStep === 'delivery' ? '75%' : '100%'
            }}></div>
          </div>
        </div>
        {/* Project Information Step */}
        {state.currentStep === 'project-info' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold">Tell us about your project</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Our system will adapt materials and recommendations based on your specific project</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What type of project are you working on?</label>
                <div className="grid md:grid-cols-3 gap-4">
                  {['Driveway', 'Patio', 'Road/Street', 'Parking Lot', 'Foundation', 'Other'].map(type => (
                    <div 
                      key={type}
                      onClick={() => handleProjectTypeChange(type)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${state.project.type === type ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-primary'}`}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Location</label>
                  <input 
                    type="text" 
                    value={state.project.location}
                    onChange={(e) => handleProjectInputChange('location', e.target.value)}
                    placeholder="City, State or Zip Code"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Size</label>
                  <select
                    value={state.project.size}
                    onChange={(e) => handleProjectInputChange('size', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select project size</option>
                    <option value="small">Small (e.g., residential driveway, small patio)</option>
                    <option value="medium">Medium (e.g., large driveway, commercial entrance)</option>
                    <option value="large">Large (e.g., parking lot, road section)</option>
                    <option value="custom">Custom - Will provide dimensions</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Timeline</label>
                  <select
                    value={state.project.timeline}
                    onChange={(e) => handleProjectInputChange('timeline', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select timeline</option>
                    <option value="urgent">Urgent - ASAP</option>
                    <option value="soon">Within 2 weeks</option>
                    <option value="planned">Within 1-2 months</option>
                    <option value="future">More than 2 months away</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget Range</label>
                  <select
                    value={state.project.budget}
                    onChange={(e) => handleProjectInputChange('budget', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select budget range</option>
                    <option value="economy">Economy - Basic materials, cost-focused</option>
                    <option value="standard">Standard - Balance of cost and quality</option>
                    <option value="premium">Premium - Higher quality materials</option>
                    <option value="custom">Custom - Will discuss specifics</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Special Requirements or Considerations</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="e.g., drainage needs, eco-friendly materials, color preferences"
                    className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value) {
                        addRequirement(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="e.g., drainage needs, eco-friendly materials, color preferences"]') as HTMLInputElement;
                      if (input && input.value) {
                        addRequirement(input.value);
                        input.value = '';
                      }
                    }}
                    className="p-3 bg-primary text-white rounded-r-lg hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {state.project.requirements.map((req, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full flex items-center">
                      <span>{req}</span>
                      <button 
                        onClick={() => removeRequirement(index)}
                        className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button 
                onClick={submitProjectInfo}
                disabled={!state.project.type || !state.project.location || !state.project.size}
                className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Generate Material Recommendations
              </button>
            </div>
          </div>
        )}
        {/* Materials and Plants Step */}
        {state.currentStep === 'materials' && (
          <div className="space-y-6">
            {/* Materials Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold">AI-Generated Material Recommendations</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Based on your {state.project.type} project in {state.project.location}, we recommend the following materials
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {state.materials.map((material) => (
                    <div 
                      key={material.id} 
                      className={`border rounded-lg p-4 transition-all ${material.selected ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          checked={material.selected} 
                          onChange={() => toggleMaterial(material.id)} 
                          className="mt-1 mr-4" 
                        />
                        <div className="flex-grow">
                          <div className="flex flex-wrap justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">{material.name}</h3>
                              <p className="text-gray-600 dark:text-gray-400 mt-1">{material.description}</p>
                            </div>
                            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                              <div>
                                <label className="block text-sm text-gray-600 dark:text-gray-400">Quantity</label>
                                <input 
                                  type="number" 
                                  min="1"
                                  value={material.quantity} 
                                  onChange={(e) => updateMaterialQuantity(material.id, parseInt(e.target.value) || 0)} 
                                  className="w-20 p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white" 
                                  disabled={!material.selected}
                                />
                                <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{material.unit}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-semibold">${(material.quantity * material.unitPrice).toFixed(2)}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  ${material.unitPrice.toFixed(2)} per {material.unit}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Plants Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold">Nearby Supply Plants</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Plants close to your location in {state.project.location} that can supply your materials
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {state.plants.map((plant) => (
                    <div 
                      key={plant.id} 
                      onClick={() => selectPlant(plant.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${plant.selected ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${plant.selected ? 'border-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                            {plant.selected && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{plant.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {plant.location} • {plant.distance} away
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(plant.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{plant.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="text-xl font-bold">
                  Total: ${calculateTotal().toFixed(2)}
                </div>
                <button 
                  onClick={saveSelectionsProceedToDelivery}
                  disabled={!state.materials.some(m => m.selected) || !state.plants.some(p => p.selected)}
                  className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Continue to Delivery
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Delivery and Contact Step */}
        {state.currentStep === 'delivery' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold">Delivery Information</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  When and how would you like your materials delivered?
                </p>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Date</label>
                    <input 
                      type="date" 
                      value={state.deliveryDate}
                      onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Time</label>
                    <select
                      value={state.deliveryTime}
                      onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select preferred time</option>
                      <option value="Morning (8am-12pm)">Morning (8am-12pm)</option>
                      <option value="Afternoon (12pm-4pm)">Afternoon (12pm-4pm)</option>
                      <option value="Evening (4pm-7pm)">Evening (4pm-7pm)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Special Instructions</label>
                  <textarea
                    value={state.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    rows={3}
                    placeholder="Access information, placement requirements, etc."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Your contact details for this quote
                </p>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input 
                      type="text" 
                      value={state.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      placeholder="Full name"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={state.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      placeholder="email@example.com"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    value={state.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="(123) 456-7890"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button 
                  onClick={saveDeliveryProceedToReview}
                  disabled={!state.deliveryDate || !state.contactName || !state.contactEmail || !state.contactPhone}
                  className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Review Quote
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Review Step */}
        {state.currentStep === 'review' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold">Quote Summary</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Review your quote before submission
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Project Details</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Project Type:</span>
                          <span className="ml-2 font-medium">{state.project.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Location:</span>
                          <span className="ml-2 font-medium">{state.project.location}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Size:</span>
                          <span className="ml-2 font-medium">{state.project.size}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Timeline:</span>
                          <span className="ml-2 font-medium">{state.project.timeline}</span>
                        </div>
                      </div>
                      {state.project.requirements.length > 0 && (
                        <div className="mt-3">
                          <span className="text-gray-600 dark:text-gray-400">Special Requirements:</span>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {state.project.requirements.map((req, index) => (
                              <div key={index} className="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                                {req}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Materials</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Material</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Unit Price</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {state.materials.filter(m => m.selected).map(material => (
                            <tr key={material.id}>
                              <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">{material.name}</td>
                              <td className="py-3 px-4 whitespace-nowrap text-sm">{material.quantity} {material.unit}</td>
                              <td className="py-3 px-4 whitespace-nowrap text-sm">${material.unitPrice.toFixed(2)}</td>
                              <td className="py-3 px-4 whitespace-nowrap text-sm">${(material.quantity * material.unitPrice).toFixed(2)}</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-100 dark:bg-gray-800">
                            <td colSpan={3} className="py-3 px-4 text-right font-medium">Total:</td>
                            <td className="py-3 px-4 text-lg font-bold">${calculateTotal().toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Supplier</h3>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <p className="font-medium">{state.plants.find(p => p.selected)?.name}</p>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {state.plants.find(p => p.selected)?.location} • {state.plants.find(p => p.selected)?.distance} away
                        </p>
                        <div className="flex items-center mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => {
                              const selectedPlant = state.plants.find(p => p.selected);
                              return (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${selectedPlant && i < Math.floor(selectedPlant.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              );
                            })}
                            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                              {state.plants.find(p => p.selected)?.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Information</h3>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Date:</span>
                            <span className="ml-2 font-medium">{state.deliveryDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Time:</span>
                            <span className="ml-2 font-medium">{state.deliveryTime}</span>
                          </div>
                        </div>
                        {state.specialInstructions && (
                          <div className="mt-2">
                            <span className="text-gray-600 dark:text-gray-400">Special Instructions:</span>
                            <p className="mt-1 text-sm">{state.specialInstructions}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Information</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Name:</span>
                          <span className="ml-2 font-medium">{state.contactName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Email:</span>
                          <span className="ml-2 font-medium">{state.contactEmail}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                          <span className="ml-2 font-medium">{state.contactPhone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <button 
                  onClick={() => setState(prev => ({ ...prev, currentStep: 'delivery' }))}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  &larr; Back to Edit
                </button>
                <button 
                  onClick={submitQuote}
                  className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                >
                  Submit Quote Request
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
  );
}