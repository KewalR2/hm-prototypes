'use client';

import { useState, useEffect } from 'react';
import { PLANTS } from '../mockData';
import { Plant } from '../types';

interface PlantSelectionModalProps {
  onSelect: (plant: Plant) => void;
  onMultiSelect?: (plants: Plant[]) => void;
  onClose: () => void;
  currentPlantId?: string;
  selectedPlantIds?: string[];
  multiSelect?: boolean;
}

export default function PlantSelectionModal({
  onSelect,
  onMultiSelect,
  onClose,
  currentPlantId,
  selectedPlantIds = [],
  multiSelect = false
}: PlantSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(PLANTS);
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedPlants, setSelectedPlants] = useState<Plant[]>(
    selectedPlantIds.map(id => PLANTS.find(p => p.id === id)).filter(Boolean) as Plant[]
  );
  
  // Get unique states from plants
  const states = ['all', ...Array.from(new Set(PLANTS.map(plant => {
    const addressParts = plant.location.split(', ');
    return addressParts[addressParts.length - 1]; // Get the state from the address
  }))).sort()];
  
  // Filter plants based on search and selected state
  useEffect(() => {
    let filtered = [...PLANTS];
    
    // Filter by state if not showing all states
    if (selectedState !== 'all') {
      filtered = filtered.filter(plant => {
        const addressParts = plant.location.split(', ');
        const state = addressParts[addressParts.length - 1];
        return state === selectedState;
      });
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(plant => 
        plant.name.toLowerCase().includes(searchLower) ||
        plant.location.toLowerCase().includes(searchLower) ||
        (plant.specialCapabilities && plant.specialCapabilities.some(cap => 
          cap.toLowerCase().includes(searchLower)
        ))
      );
    }
    
    // Sort plants by distance
    filtered.sort((a, b) => a.distance - b.distance);
    
    setFilteredPlants(filtered);
  }, [searchTerm, selectedState]);
  
  // Toggle plant selection for multi-select mode
  const togglePlantSelection = (plant: Plant) => {
    if (selectedPlants.some(p => p.id === plant.id)) {
      // Remove if already selected
      setSelectedPlants(selectedPlants.filter(p => p.id !== plant.id));
    } else {
      // Add if not already selected
      setSelectedPlants([...selectedPlants, plant]);
    }
  };

  // Check if a plant is currently selected
  const isPlantSelected = (plantId: string) => {
    return multiSelect
      ? selectedPlants.some(p => p.id === plantId)
      : currentPlantId === plantId;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {multiSelect ? 'Select Multiple Plants' : 'Select Plant'}
            {multiSelect && selectedPlants.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({selectedPlants.length} selected)
              </span>
            )}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="plantSearch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search Plants
              </label>
              <input
                id="plantSearch"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, location, or capability"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="stateFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by State
              </label>
              <select
                id="stateFilter"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {states.map(state => (
                  <option key={state} value={state}>
                    {state === 'all' ? 'All States' : state}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredPlants.length} of {PLANTS.length} plants
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlants.map(plant => (
              <div
                key={plant.id}
                onClick={() => multiSelect ? togglePlantSelection(plant) : onSelect(plant)}
                className={`p-4 border ${
                  isPlantSelected(plant.id)
                    ? 'border-primary bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                } rounded-lg cursor-pointer hover:border-primary transition-colors`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{plant.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{plant.location}</p>
                    
                    <div className="mt-2 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Products:</span> 
                        <span className="ml-1 font-medium">{plant.availableProducts.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Operating Hours:</span> 
                        <span className="ml-1 font-medium">{plant.operatingHours}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Daily Capacity:</span> 
                        <span className="ml-1 font-medium">{plant.capacity} tons</span>
                      </div>
                    </div>
                    
                    {plant.specialCapabilities && plant.specialCapabilities.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {plant.specialCapabilities.slice(0, 2).map((capability, index) => (
                          <span 
                            key={index}
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-0.5 rounded"
                          >
                            {capability}
                          </span>
                        ))}
                        {plant.specialCapabilities.length > 2 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 self-end">
                            +{plant.specialCapabilities.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {plant.distance.toFixed(1)} miles
                    </div>
                    
                    {plant.certifications && plant.certifications.length > 0 && (
                      <div className="mt-1">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-0.5 rounded">
                          {plant.certifications.length} Certifications
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPlants.length === 0 && (
              <div className="col-span-2 p-8 text-center text-gray-500 dark:text-gray-400">
                No plants found matching your criteria. Try adjusting your search or filters.
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          
          {multiSelect ? (
            <button
              onClick={() => {
                if (onMultiSelect && selectedPlants.length > 0) {
                  onMultiSelect(selectedPlants);
                }
                onClose();
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Confirm Selection ({selectedPlants.length})
            </button>
          ) : (
            <button
              onClick={() => {
                // If there's a currently selected plant, find and select it again
                if (currentPlantId) {
                  const current = PLANTS.find(p => p.id === currentPlantId);
                  if (current) {
                    onSelect(current);
                  }
                }
                onClose();
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Confirm Selection
            </button>
          )}
        </div>
      </div>
    </div>
  );
}