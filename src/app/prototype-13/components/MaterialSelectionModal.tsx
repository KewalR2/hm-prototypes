'use client';

import { useState, useEffect } from 'react';
import { Material } from '../types';

interface MaterialSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  materials: { id: string; name: string; quantity: number }[];
  allMaterials?: Material[];
  selectedMaterials: string[];
  onConfirm: (selected: string) => void;
}

export default function MaterialSelectionModal({
  isOpen,
  onClose,
  materials,
  allMaterials = [],
  selectedMaterials,
  onConfirm
}: MaterialSelectionModalProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize selected materials from props
  useEffect(() => {
    if (isOpen) {
      setSelected(selectedMaterials);
    }
  }, [isOpen, selectedMaterials]);

  // Handle checkbox change
  const handleMaterialToggle = (materialName: string) => {
    if (selected.includes(materialName)) {
      setSelected(selected.filter(m => m !== materialName));
    } else {
      setSelected([...selected, materialName]);
    }
  };

  // Handle confirm button click
  const handleConfirm = () => {
    onConfirm(selected.join(', '));
    onClose();
  };

  if (!isOpen) return null;

  // Get material unit based on context
  const getMaterialUnit = (material: { id: string; name: string; quantity: number }): string => {
    // Based on name or ID, infer a plausible unit
    const name = material.name.toLowerCase();
    const id = material.id.toLowerCase();
    
    if (name.includes('concrete') || id.includes('conc')) return 'cubic yard';
    if (name.includes('brick') || id.includes('brick')) return 'pcs';
    if (name.includes('pipe') || id.includes('pipe')) return 'linear ft';
    if (name.includes('block') || id.includes('block')) return 'pcs';
    if (name.includes('sand') || name.includes('soil') || id.includes('sand')) return 'cubic yard';
    if (name.includes('aggregate') || name.includes('gravel') || id.includes('agg')) return 'ton';
    if (name.includes('asphalt') || id.includes('asph')) return 'ton';
    if (name.includes('rebar') || name.includes('steel') || id.includes('rebar')) return 'ton';
    
    return 'unit';
  };

  // Group materials by category (if we can infer it)
  const categorizedMaterials = materials.reduce((acc, material) => {
    let category = 'General';
    
    // Try to infer category from ID or name
    const id = material.id.toLowerCase();
    const name = material.name.toLowerCase();
    
    if (id.startsWith('conc') || name.includes('concrete')) {
      category = 'Concrete';
    } else if (id.startsWith('agg') || name.includes('aggregate') || name.includes('gravel')) {
      category = 'Aggregates';
    } else if (id.startsWith('asph') || name.includes('asphalt')) {
      category = 'Asphalt';
    } else if (id.startsWith('struct') || name.includes('steel') || name.includes('rebar')) {
      category = 'Structural';
    } else if (id.startsWith('mason') || name.includes('brick') || name.includes('block')) {
      category = 'Masonry';
    } else if (id.startsWith('drain') || name.includes('pipe')) {
      category = 'Drainage';
    }
    
    if (!acc[category]) {
      acc[category] = [];
    }
    
    acc[category].push(material);
    return acc;
  }, {} as Record<string, typeof materials>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl max-h-[80vh] flex flex-col transition-all transform animate-fade-in-up">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Select Materials</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <input
            type="text"
            placeholder="Search materials..."
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Based on your project, we recommend the following materials. Please select the ones you want to include in your quote.
            </p>
            
            <div className="grid gap-3">
              {/* Materials by Category */}
              {Object.entries(categorizedMaterials).map(([category, categoryMaterials]) => {
                // Filter by search term if one is provided
                const filteredMaterials = searchTerm 
                  ? categoryMaterials.filter(m => 
                      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      m.id.toLowerCase().includes(searchTerm.toLowerCase()))
                  : categoryMaterials;
                
                if (filteredMaterials.length === 0) return null;
                
                return (
                  <div key={category} className="mb-4">
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">{category}</div>
                    <div className="grid gap-2">
                      {filteredMaterials.map((material) => (
                        <div 
                          key={material.id}
                          className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={`material-${material.id}`} 
                              checked={selected.includes(material.name)}
                              onChange={() => handleMaterialToggle(material.name)}
                              className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor={`material-${material.id}`} className="flex-1 cursor-pointer">
                              <div className="font-medium dark:text-white">{material.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {`Quantity: ${material.quantity} ${getMaterialUnit(material)}`}
                              </div>
                              <div className="text-xs text-gray-400">ID: {material.id}</div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* If no materials found, show a message */}
              {Object.values(categorizedMaterials).flat().filter(m => 
                !searchTerm || 
                m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                m.id.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 && (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No materials found matching your search.
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Selected: <span className="font-medium">{selected.length}</span> materials
          </div>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}