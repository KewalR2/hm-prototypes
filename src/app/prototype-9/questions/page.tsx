'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
// Types for project data
type MaterialSelection = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
};
type ProjectDetails = {
  projectName: string;
  projectAddress: string;
  projectType: string;
  projectSize: string;
  timeframe: string;
  materials: MaterialSelection[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequirements: string;
};
// Component for the question-driven material quote flow
export default function QuestionFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(7);
  const [projectData, setProjectData] = useState<ProjectDetails>({
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
  // Animation variants for transitions
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
  // Auto-focus on input when step changes
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [step]);
  // Save data to session storage
  useEffect(() => {
    if (step > 1) {
      sessionStorage.setItem('projectData', JSON.stringify(projectData));
    }
  }, [projectData, step]);
  // Load data from session storage
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
  const handleNext = () => {
    // Basic validation for each step
    if (step === 1 && !projectData.projectName) {
      alert('Please enter a project name to continue.');
      return;
    }
    if (step === 2 && !projectData.projectAddress) {
      alert('Please enter a project address to continue.');
      return;
    }
    if (step === 3 && !projectData.projectType) {
      alert('Please select a project type to continue.');
      return;
    }
    if (step === 4 && projectData.materials.length === 0) {
      alert('Please select at least one material to continue.');
      return;
    }
    if (step === 5 && !projectData.timeframe) {
      alert('Please select a timeframe to continue.');
      return;
    }
    if (step === 6 && (!projectData.contactName || !projectData.contactEmail || !projectData.contactPhone)) {
      alert('Please fill in all contact information to continue.');
      return;
    }
    setAnimationDirection('forward');
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  const handleBack = () => {
    if (step > 1) {
      setAnimationDirection('backward');
      setStep(step - 1);
    }
  };
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
  const handleSubmit = () => {
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
  // Render different question content based on current step
  const renderStepContent = () => {
    switch (step) {
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
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              This helps us identify and track your project.
            </p>
            <div className="mb-6">
              <input
                ref={inputRef}
                type="text"
                value={projectData.projectName}
                onChange={(e) => setProjectData({...projectData, projectName: e.target.value})}
                placeholder="My Construction Project"
                className="w-full px-5 py-4 text-lg rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:bg-gray-800 dark:text-white"
              />
            </div>
            <motion.div 
              className="text-sm text-gray-500 dark:text-gray-400 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Press Enter or click Next to continue
            </motion.div>
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
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              This helps us determine delivery logistics and costs.
            </p>
            <div className="mb-6">
              <textarea
                value={projectData.projectAddress}
                onChange={(e) => setProjectData({...projectData, projectAddress: e.target.value})}
                placeholder="123 Construction Ave, City, State, ZIP"
                className="w-full px-5 py-4 text-lg rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all min-h-[100px] dark:bg-gray-800 dark:text-white"
              />
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
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              This helps us understand your specific material requirements.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {projectTypes.map((type) => (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setProjectData({...projectData, projectType: type})}
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
                  value={projectData.projectSize}
                  onChange={(e) => setProjectData({...projectData, projectSize: e.target.value})}
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
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Select all the materials you need for your project.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
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
              <div className="mb-8">
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
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              This helps us plan for your delivery needs.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {timeframeOptions.map((option) => (
                <motion.div
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setProjectData({...projectData, timeframe: option})}
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
                value={projectData.specialRequirements}
                onChange={(e) => setProjectData({...projectData, specialRequirements: e.target.value})}
                placeholder="Equipment access restrictions, delivery hours, etc."
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
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We'll send the quote details to you right away.
            </p>
            <div className="space-y-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Full Name</label>
                <input
                  ref={inputRef}
                  type="text"
                  value={projectData.contactName}
                  onChange={(e) => setProjectData({...projectData, contactName: e.target.value})}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  value={projectData.contactEmail}
                  onChange={(e) => setProjectData({...projectData, contactEmail: e.target.value})}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={projectData.contactPhone}
                  onChange={(e) => setProjectData({...projectData, contactPhone: e.target.value})}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </motion.div>
        );
      case 7:
        return (
          <motion.div
            className="w-full"
            key="step7"
            custom={animationDirection}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <h2 className="text-2xl font-bold mb-6">Review Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Please verify all details before submitting your quote request.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-sm text-gray-500 dark:text-gray-400">PROJECT DETAILS</h3>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <h4 className="font-medium text-sm">Project Name</h4>
                      <p>{projectData.projectName}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Project Type</h4>
                      <p>{projectData.projectType}{projectData.projectSize ? ` - ${projectData.projectSize}` : ''}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-sm text-gray-500 dark:text-gray-400">LOCATION</h3>
                  <p className="mt-2 whitespace-pre-line">{projectData.projectAddress}</p>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-sm text-gray-500 dark:text-gray-400">DELIVERY TIMEFRAME</h3>
                  <p className="mt-2">{projectData.timeframe}</p>
                  {projectData.specialRequirements && (
                    <div className="mt-2">
                      <h4 className="font-medium text-sm">Special Instructions</h4>
                      <p className="text-gray-600 dark:text-gray-400">{projectData.specialRequirements}</p>
                    </div>
                  )}
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-sm text-gray-500 dark:text-gray-400">CONTACT INFORMATION</h3>
                  <div className="grid md:grid-cols-3 gap-4 mt-2">
                    <div>
                      <h4 className="font-medium text-sm">Name</h4>
                      <p>{projectData.contactName}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Email</h4>
                      <p>{projectData.contactEmail}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Phone</h4>
                      <p>{projectData.contactPhone}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-sm text-gray-500 dark:text-gray-400">MATERIALS</h3>
                  <div className="mt-3 space-y-2">
                    {projectData.materials.map((material) => (
                      <div key={material.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="font-medium">{material.name}</span>
                          <span className="ml-2 text-gray-500 dark:text-gray-400">x {material.quantity} {material.unit}</span>
                        </div>
                        <span>${(material.price * material.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <span className="font-bold">Estimated Total:</span>
                    <span className="font-bold text-xl">${projectData.materials.reduce((sum, material) => sum + (material.price * material.quantity), 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              By submitting this request, you agree to our Terms of Service and Privacy Policy.
              We'll respond to your quote request within 1 business day.
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };
  // If quote is generated, show success screen
  if (quote) {
    return (
        <main className="container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">
              <div className="flex items-center">
                <div className="rounded-full bg-white p-3 mr-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Quote Generated Successfully!</h2>
                  <p>Your quote request has been submitted.</p>
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
                  <li>You can track your order status using the tracking page.</li>
                </ol>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={() => router.push('/prototype-9/tracker')}
                  className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Track My Order
                </motion.button>
                <motion.button
                  onClick={() => router.push('/prototype-9')}
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
      </div>
    );
  }
  // Main question flow UI
  return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-2 px-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Start</span>
              <span>Review</span>
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
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                step === 1 
                  ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
              }`}
              whileHover={step !== 1 ? { scale: 1.02 } : undefined}
              whileTap={step !== 1 ? { scale: 0.98 } : undefined}
            >
              Back
            </motion.button>
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
              ) : step < totalSteps ? 'Next' : 'Submit Quote Request'}
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}