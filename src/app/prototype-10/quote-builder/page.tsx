'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
// Project data structure
type MaterialItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
};
type ProjectData = {
  projectName: string;
  projectAddress: string;
  projectType: string;
  projectSize: string;
  timeframe: string;
  materials: MaterialItem[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequirements: string;
};
export default function QuoteBuilder() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'guided' | 'form'>('guided');
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(6);
  const [projectData, setProjectData] = useState<ProjectData>({
    projectName: '',
    projectAddress: '',
    projectType: '',
    projectSize: '',
    timeframe: '',
    materials: [],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    specialRequirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<null | {total: number, quoteId: string}>(null);
  const [animationDirection, setAnimationDirection] = useState('forward');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const formRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Material options
  const materialOptions = [
    { id: 'concrete', name: 'Concrete', unit: 'cubic yards', price: 115 },
    { id: 'gravel', name: 'Gravel', unit: 'tons', price: 45 },
    { id: 'sand', name: 'Sand', unit: 'tons', price: 38 },
    { id: 'limestone', name: 'Limestone', unit: 'tons', price: 55 },
    { id: 'asphalt', name: 'Asphalt', unit: 'tons', price: 85 },
    { id: 'mulch', name: 'Mulch', unit: 'cubic yards', price: 40 },
    { id: 'topsoil', name: 'Topsoil', unit: 'cubic yards', price: 35 },
    { id: 'fill-dirt', name: 'Fill Dirt', unit: 'cubic yards', price: 25 },
  ];
  // Project type options
  const projectTypes = [
    'Residential Construction',
    'Commercial Construction',
    'Road/Highway',
    'Landscaping',
    'Industrial',
    'Municipal/Public Works',
    'Other'
  ];
  // Timeframe options
  const timeframeOptions = [
    'As soon as possible',
    'Within 1 week',
    'Within 2 weeks',
    'Within 1 month',
    'More than 1 month',
    'Flexible'
  ];
  // Animation variants
  const pageVariants = {
    initial: (direction: string) => ({
      x: direction === 'forward' ? '100%' : '-100%',
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction: string) => ({
      x: direction === 'forward' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };
  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };
  // Auto-focus on input when step changes in guided mode
  useEffect(() => {
    if (viewMode === 'guided' && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [currentStep, viewMode]);
  // Scroll to top of form in form mode
  useEffect(() => {
    if (viewMode === 'form' && formRef.current) {
      formRef.current.scrollTop = 0;
    }
  }, [viewMode]);
  // Load from session storage on initial render
  useEffect(() => {
    const savedData = sessionStorage.getItem('projectData');
    if (savedData) {
      try {
        setProjectData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved project data');
      }
    }
  }, []);
  // Save to session storage when data changes
  useEffect(() => {
    sessionStorage.setItem('projectData', JSON.stringify(projectData));
  }, [projectData]);
  // Validation function
  const validateStep = (step: number): boolean => {
    let newErrors: {[key: string]: string} = {};
    let isValid = true;
    switch (step) {
      case 1:
        if (!projectData.projectName.trim()) {
          newErrors.projectName = 'Project name is required';
          isValid = false;
        }
        break;
      case 2:
        if (!projectData.projectAddress.trim()) {
          newErrors.projectAddress = 'Project address is required';
          isValid = false;
        }
        break;
      case 3:
        if (!projectData.projectType) {
          newErrors.projectType = 'Project type is required';
          isValid = false;
        }
        break;
      case 4:
        if (projectData.materials.length === 0) {
          newErrors.materials = 'Please select at least one material';
          isValid = false;
        }
        break;
      case 5:
        if (!projectData.timeframe) {
          newErrors.timeframe = 'Timeframe is required';
          isValid = false;
        }
        break;
      case 6:
        if (!projectData.contactName.trim()) {
          newErrors.contactName = 'Contact name is required';
          isValid = false;
        }
        if (!projectData.contactEmail.trim()) {
          newErrors.contactEmail = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(projectData.contactEmail)) {
          newErrors.contactEmail = 'Please enter a valid email address';
          isValid = false;
        }
        if (!projectData.contactPhone.trim()) {
          newErrors.contactPhone = 'Phone number is required';
          isValid = false;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return isValid;
  };
  // Form validation for full form mode
  const validateForm = (): boolean => {
    let newErrors: {[key: string]: string} = {};
    let isValid = true;
    if (!projectData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
      isValid = false;
    }
    if (!projectData.projectAddress.trim()) {
      newErrors.projectAddress = 'Project address is required';
      isValid = false;
    }
    if (!projectData.projectType) {
      newErrors.projectType = 'Project type is required';
      isValid = false;
    }
    if (projectData.materials.length === 0) {
      newErrors.materials = 'Please select at least one material';
      isValid = false;
    }
    if (!projectData.timeframe) {
      newErrors.timeframe = 'Timeframe is required';
      isValid = false;
    }
    if (!projectData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
      isValid = false;
    }
    if (!projectData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(projectData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
      isValid = false;
    }
    if (!projectData.contactPhone.trim()) {
      newErrors.contactPhone = 'Phone number is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  // Navigation functions
  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setAnimationDirection('forward');
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setAnimationDirection('backward');
      setCurrentStep(currentStep - 1);
    }
  };
  const handleSkip = () => {
    setAnimationDirection('forward');
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  // Material functions
  const handleAddMaterial = (material: typeof materialOptions[0]) => {
    const existingMaterial = projectData.materials.find(m => m.id === material.id);
    if (existingMaterial) {
      setProjectData({
        ...projectData,
        materials: projectData.materials.map(m => 
          m.id === material.id ? {...m, quantity: m.quantity + 1} : m
        )
      });
    } else {
      setProjectData({
        ...projectData,
        materials: [
          ...projectData.materials,
          {
            ...material,
            quantity: 1
          }
        ]
      });
    }
    // Clear any material-related errors
    if (errors.materials) {
      setErrors({
        ...errors,
        materials: ''
      });
    }
  };
  const handleRemoveMaterial = (materialId: string) => {
    setProjectData({
      ...projectData,
      materials: projectData.materials.filter(m => m.id !== materialId)
    });
  };
  const handleUpdateQuantity = (materialId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveMaterial(materialId);
      return;
    }
    setProjectData({
      ...projectData,
      materials: projectData.materials.map(m => 
        m.id === materialId ? {...m, quantity} : m
      )
    });
  };
  // Form submission
  const handleSubmit = () => {
    // In form mode, validate the entire form
    if (viewMode === 'form' && !validateForm()) {
      // Scroll to the first error
      const firstErrorElement = document.querySelector('.error-message');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setLoading(true);
    // Calculate quote total
    const total = projectData.materials.reduce(
      (sum, material) => sum + (material.price * material.quantity), 
      0
    );
    // Generate random quote ID
    const quoteId = 'QT-' + Math.floor(100000 + Math.random() * 900000);
    // Simulate API call with timeout
    setTimeout(() => {
      setQuote({ total, quoteId });
      setLoading(false);
      // Save quote to session storage
      sessionStorage.setItem('latestQuote', JSON.stringify({ 
        ...projectData, 
        quoteId,
        total,
        date: new Date().toISOString(),
        status: 'Pending Approval'
      }));
    }, 1500);
  };
  // Input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value
    });
    // Clear any errors for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  // Toggle between guided and form mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'guided' ? 'form' : 'guided');
  };
  // Render guided step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            className="w-full"
            key="step1"
            custom={animationDirection}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <h2 className="text-2xl font-bold mb-6">What's the name of your project?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Give your project a name that will help you and your team identify it easily.
            </p>
            <div className="mb-6">
              <input
                ref={inputRef}
                type="text"
                name="projectName"
                value={projectData.projectName}
                onChange={handleInputChange}
                placeholder="My Construction Project"
                className={`w-full px-5 py-4 text-lg rounded-lg border-2 ${errors.projectName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:text-white`}
              />
              {errors.projectName && (
                <p className="mt-2 text-red-500 error-message">{errors.projectName}</p>
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              Examples: "Downtown Office Renovation", "Highway 95 Expansion", "Main Street Sidewalk Project"
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            className="w-full"
            key="step2"
            custom={animationDirection}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <h2 className="text-2xl font-bold mb-6">Where is the project located?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This helps us determine delivery logistics, costs, and available suppliers in your area.
            </p>
            <div className="mb-6">
              <textarea
                name="projectAddress"
                value={projectData.projectAddress}
                onChange={handleInputChange}
                placeholder="123 Construction Ave, City, State, ZIP"
                className={`w-full px-5 py-4 text-lg rounded-lg border-2 ${errors.projectAddress ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all min-h-[100px] dark:bg-gray-800 dark:text-white`}
              />
              {errors.projectAddress && (
                <p className="mt-2 text-red-500 error-message">{errors.projectAddress}</p>
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              Include a specific site address or coordinates for the project location.
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            className="w-full"
            key="step3"
            custom={animationDirection}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <h2 className="text-2xl font-bold mb-6">What type of project is this?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This helps us understand your specific material requirements and recommend appropriate options.
            </p>
            {errors.projectType && (
              <p className="mb-4 text-red-500 error-message">{errors.projectType}</p>
            )}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {projectTypes.map((type) => (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setProjectData({...projectData, projectType: type});
                    if (errors.projectType) {
                      setErrors({...errors, projectType: ''});
                    }
                  }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    projectData.projectType === type 
                      ? 'border-primary bg-blue-50 dark:bg-blue-900/30' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 border-2 flex items-center justify-center ${
                      projectData.projectType === type 
                        ? 'border-primary' 
                        : 'border-gray-400'
                    }`}>
                      {projectData.projectType === type && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className={projectData.projectType === type ? 'font-medium' : ''}>{type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            {projectData.projectType === 'Other' && (
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Please specify:</label>
                <input
                  type="text"
                  name="projectSize"
                  value={projectData.projectSize}
                  onChange={handleInputChange}
                  placeholder="Describe your project type"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:bg-gray-800 dark:text-white"
                />
              </div>
            )}
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            className="w-full"
            key="step4"
            custom={animationDirection}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <h2 className="text-2xl font-bold mb-6">What materials do you need?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Select all the materials you need for your project and specify quantities.
            </p>
            {errors.materials && (
              <p className="mb-4 text-red-500 error-message">{errors.materials}</p>
            )}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {materialOptions.map((material) => {
                const isSelected = projectData.materials.some(m => m.id === material.id);
                return (
                  <motion.div
                    key={material.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => isSelected ? null : handleAddMaterial(material)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-primary bg-blue-50 dark:bg-blue-900/30' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-md mr-3 border-2 flex items-center justify-center ${
                          isSelected 
                            ? 'border-primary bg-primary' 
                            : 'border-gray-400'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={isSelected ? 'font-medium' : ''}>{material.name}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">${material.price}/{material.unit}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {projectData.materials.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold mb-4 text-lg">Selected Materials</h3>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  {projectData.materials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div>
                        <span className="font-medium">{material.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(${material.price}/{material.unit})</span>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleUpdateQuantity(material.id, material.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="mx-3 min-w-[40px] text-center">{material.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(material.id, material.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleRemoveMaterial(material.id)}
                          className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <span className="font-medium">Estimated Total:</span>
                    <span className="font-bold">${projectData.materials.reduce((sum, material) => sum + (material.price * material.quantity), 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            className="w-full"
            key="step5"
            custom={animationDirection}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <h2 className="text-2xl font-bold mb-6">When do you need the materials?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This helps us plan for your delivery needs and ensure timely availability of materials.
            </p>
            {errors.timeframe && (
              <p className="mb-4 text-red-500 error-message">{errors.timeframe}</p>
            )}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {timeframeOptions.map((option) => (
                <motion.div
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setProjectData({...projectData, timeframe: option});
                    if (errors.timeframe) {
                      setErrors({...errors, timeframe: ''});
                    }
                  }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    projectData.timeframe === option 
                      ? 'border-primary bg-blue-50 dark:bg-blue-900/30' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 border-2 flex items-center justify-center ${
                      projectData.timeframe === option 
                        ? 'border-primary' 
                        : 'border-gray-400'
                    }`}>
                      {projectData.timeframe === option && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className={projectData.timeframe === option ? 'font-medium' : ''}>{option}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">Any special delivery instructions?</label>
              <textarea
                name="specialRequirements"
                value={projectData.specialRequirements}
                onChange={handleInputChange}
                placeholder="Equipment access restrictions, delivery hours, specific unloading requirements, etc."
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all min-h-[100px] dark:bg-gray-800 dark:text-white"
              />
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            className="w-full"
            key="step6"
            custom={animationDirection}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <h2 className="text-2xl font-bold mb-6">Who should we contact about this quote?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please provide contact details for quote confirmation and delivery coordination.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Full Name</label>
                <input
                  ref={inputRef}
                  type="text"
                  name="contactName"
                  value={projectData.contactName}
                  onChange={handleInputChange}
                  placeholder="John Smith"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${errors.contactName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:text-white`}
                />
                {errors.contactName && (
                  <p className="mt-2 text-red-500 error-message">{errors.contactName}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={projectData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${errors.contactEmail ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:text-white`}
                />
                {errors.contactEmail && (
                  <p className="mt-2 text-red-500 error-message">{errors.contactEmail}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={projectData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${errors.contactPhone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:text-white`}
                />
                {errors.contactPhone && (
                  <p className="mt-2 text-red-500 error-message">{errors.contactPhone}</p>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              We'll send quote confirmation to this email address and may call to verify details if needed.
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };
  // If quote is generated, show confirmation screen
  if (quote) {
    return (
        <main className="container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center">
                <div className="rounded-full bg-white p-3 mr-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Quote Generated Successfully!</h2>
                  <p>Your quote request has been submitted and is ready for review.</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Quote Details</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Quote ID:</span>
                    <span className="font-mono font-medium">{quote.quoteId}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Project:</span>
                    <span>{projectData.projectName}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                    <span className="font-bold">Total Amount:</span>
                    <span className="font-bold text-xl">${quote.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-2">What's Next?</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>We'll review your quote and contact you within 1 business day.</li>
                  <li>Once you approve the quote, we'll prepare your order for delivery.</li>
                  <li>You can track your order status and manage your quote using the tracking page.</li>
                </ol>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => router.push('/prototype-10/track-order')}
                  className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Track My Order
                </motion.button>
                <motion.button
                  onClick={() => router.push('/prototype-10')}
                  className="border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary font-bold py-3 px-6 rounded-lg text-center transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Return to Home
                </motion.button>
              </div>
            </div>
          </motion.div>
        </main>
    );
  }
  // Form-based view mode
  if (viewMode === 'form') {
    return (
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Header and Mode Toggle */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Request a Quote</h1>
              <button
                onClick={toggleViewMode}
                className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Switch to Guided Mode
              </button>
            </div>
            {/* Form Container */}
            <motion.div 
              ref={formRef}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 overflow-y-auto max-h-[70vh]"
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="text-gray-600 dark:text-gray-300 mb-8">
                Fill out the form below to request a detailed quote for your project. All fields marked with * are required.
              </div>
              {/* Project Information Section */}
              <motion.div variants={formItemVariants} className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Project Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Project Name*
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={projectData.projectName}
                      onChange={handleInputChange}
                      placeholder="My Construction Project"
                      className={`w-full px-4 py-3 rounded-lg border-2 ${errors.projectName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:text-white`}
                    />
                    {errors.projectName && (
                      <p className="mt-2 text-red-500 error-message">{errors.projectName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Project Type*
                    </label>
                    <select
                      name="projectType"
                      value={projectData.projectType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${errors.projectType ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:text-white`}
                    >
                      <option value="">Select a project type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="mt-2 text-red-500 error-message">{errors.projectType}</p>
                    )}
                  </div>
                </div>
                {projectData.projectType === 'Other' && (
                  <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium">
                      Please specify:
                    </label>
                    <input
                      type="text"
                      name="projectSize"
                      value={projectData.projectSize}
                      onChange={handleInputChange}
                      placeholder="Describe your project type"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium">
                    Project Address*
                  </label>
                  <textarea
                    name="projectAddress"
                    value={projectData.projectAddress}
                    onChange={handleInputChange}
                    placeholder="123 Construction Ave, City, State, ZIP"
                    className={`w-full px-4 py-3 rounded-lg border-2 ${errors.projectAddress ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all min-h-[80px] dark:bg-gray-800 dark:text-white`}
                  />
                  {errors.projectAddress && (
                    <p className="mt-2 text-red-500 error-message">{errors.projectAddress}</p>
                  )}
                </div>
              </motion.div>
              {/* Materials Section */}
              <motion.div variants={formItemVariants} className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Materials Needed*</h2>
                {errors.materials && (
                  <p className="mb-4 text-red-500 error-message">{errors.materials}</p>
                )}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {materialOptions.map((material) => {
                    const isSelected = projectData.materials.some(m => m.id === material.id);
                    return (
                      <motion.div
                        key={material.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => isSelected ? null : handleAddMaterial(material)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-primary bg-blue-50 dark:bg-blue-900/30' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-md mr-3 border-2 flex items-center justify-center ${
                              isSelected 
                                ? 'border-primary bg-primary' 
                                : 'border-gray-400'
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={isSelected ? 'font-medium' : ''}>{material.name}</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">${material.price}/{material.unit}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                {projectData.materials.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-4 text-md">Selected Materials</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      {projectData.materials.map((material) => (
                        <div key={material.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                          <div>
                            <span className="font-medium">{material.name}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(${material.price}/{material.unit})</span>
                          </div>
                          <div className="flex items-center">
                            <button
                              onClick={() => handleUpdateQuantity(material.id, material.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="mx-3 min-w-[40px] text-center">{material.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(material.id, material.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleRemoveMaterial(material.id)}
                              className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                        <span className="font-medium">Estimated Total:</span>
                        <span className="font-bold">${projectData.materials.reduce((sum, material) => sum + (material.price * material.quantity), 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
              {/* Delivery Information */}
              <motion.div variants={formItemVariants} className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Delivery Information</h2>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Timeframe*
                  </label>
                  <select
                    name="timeframe"
                    value={projectData.timeframe}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${errors.timeframe ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:text-white`}
                  >
                    <option value="">Select when you need materials</option>
                    {timeframeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.timeframe && (
                    <p className="mt-2 text-red-500 error-message">{errors.timeframe}</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium">
                    Special Delivery Instructions
                  </label>
                  <textarea
                    name="specialRequirements"
                    value={projectData.specialRequirements}
                    onChange={handleInputChange}
                    placeholder="Equipment access restrictions, delivery hours, specific unloading requirements, etc."
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all min-h-[80px] dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </motion.div>
              {/* Contact Information */}
              <motion.div variants={formItemVariants} className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={projectData.contactName}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      className={`w-full px-4 py-3 rounded-lg border-2 ${errors.contactName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:text-white`}
                    />
                    {errors.contactName && (
                      <p className="mt-2 text-red-500 error-message">{errors.contactName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={projectData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className={`w-full px-4 py-3 rounded-lg border-2 ${errors.contactPhone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:text-white`}
                    />
                    {errors.contactPhone && (
                      <p className="mt-2 text-red-500 error-message">{errors.contactPhone}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={projectData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-lg border-2 ${errors.contactEmail ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:text-white`}
                  />
                  {errors.contactEmail && (
                    <p className="mt-2 text-red-500 error-message">{errors.contactEmail}</p>
                  )}
                </div>
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                By submitting this form, you agree to our Terms of Service and Privacy Policy.
              </div>
            </motion.div>
            {/* Form Submission */}
            <div className="flex justify-center">
              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                className={`px-8 py-4 rounded-lg font-bold text-lg ${
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
                    Processing...
                  </div>
                ) : 'Submit Quote Request'}
              </motion.button>
            </div>
          </div>
        </main>
    );
  }
  // Guided mode (default)
  return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header and Mode Toggle */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Request a Quote</h1>
            <button
              onClick={toggleViewMode}
              className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Switch to Form View
            </button>
          </div>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-2 px-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Start</span>
              <span>Complete</span>
            </div>
          </div>
          {/* Question Card */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait" custom={animationDirection}>
              {renderStepContent()}
            </AnimatePresence>
          </motion.div>
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <motion.button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1 
                  ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
              }`}
              whileHover={currentStep !== 1 ? { scale: 1.02 } : undefined}
              whileTap={currentStep !== 1 ? { scale: 0.98 } : undefined}
            >
              Back
            </motion.button>
            <div className="flex space-x-3">
              {currentStep < totalSteps && (
                <motion.button
                  onClick={handleSkip}
                  className="px-6 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Skip
                </motion.button>
              )}
              <motion.button
                onClick={handleNext}
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
                    Processing...
                  </div>
                ) : currentStep < totalSteps ? 'Continue' : 'Submit Quote Request'}
              </motion.button>
            </div>
          </div>
        </div>
      </main>
  );
}