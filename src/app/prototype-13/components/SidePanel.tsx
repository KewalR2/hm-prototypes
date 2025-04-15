'use client';

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { QuoteRequest, MaterialRequest, PlantSelection } from '../types';

interface SidePanelProps {
  quoteRequest: QuoteRequest;
}

const SidePanel = observer(({ quoteRequest }: SidePanelProps) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'costs'>('summary');
  
  // Format a material ID into a readable name
  const formatMaterialName = (materialId: string): string => {
    // If we have material cost data with names, use that
    if (quoteRequest.costBreakdown?.materialCosts) {
      const materialCost = quoteRequest.costBreakdown.materialCosts.find(m => m.materialId === materialId);
      if (materialCost?.name) return materialCost.name;
    }
    
    // Otherwise format from the ID
    return materialId
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : '')
      .join(' ');
  };
  
  // Get material unit from cost data or provide a default
  const getMaterialUnit = (materialId: string): string => {
    if (quoteRequest.costBreakdown?.materialCosts) {
      const materialCost = quoteRequest.costBreakdown.materialCosts.find(m => m.materialId === materialId);
      if (materialCost) {
        if (materialCost.quantity > 1000) return 'lbs';
        if (materialCost.unitCost > 200) return 'cubic yard';
        return 'ton';
      }
    }
    
    // Default units based on material type
    if (materialId.startsWith('conc-')) return 'cubic yard';
    if (materialId.startsWith('mason-')) {
      return materialId.includes('brick') ? 'bricks' : 'blocks';
    }
    if (materialId.startsWith('drain-')) return 'linear ft';
    
    return 'ton'; // Default unit
  };
  
  // Format a plant ID into a readable name
  const formatPlantName = (plantId: string): string => {
    // First, check if the plant selection has a matching name in recommendedPlants
    if (quoteRequest.plantSelections && quoteRequest.plantSelections.length > 0) {
      // Match plantSelections to recommendedPlants by ID
      if (quoteRequest.costBreakdown?.transportationCosts) {
        const transportCost = quoteRequest.costBreakdown.transportationCosts.find(t => t.plantId === plantId);
        if (transportCost?.plantName) return transportCost.plantName;
      }
    }

    // If no match found, try to format reasonably from the plant ID
    // Format: "plant-1" -> "Plant 1"
    if (plantId.startsWith('plant-')) {
      return plantId
        .replace('plant-', '')
        .split('-')
        .map(segment => {
          // Only capitalize the first character if it's a letter
          if (segment.match(/^[a-zA-Z]/)) {
            return segment.charAt(0).toUpperCase() + segment.slice(1);
          }
          return segment;
        })
        .join(' ');
    }
    
    // Handle other formatting cases
    return plantId
      .replace(/-/g, ' ')
      .replace(/(\d+)/, ' $1')
      .split(' ')
      .map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : '')
      .join(' ');
  };
  
  // Get materials supplied by a plant - only the specific materials assigned to this plant
  const getMaterialsForPlant = (plantSelection: PlantSelection): string => {
    // If no materials are assigned to this plant, return empty string
    if (!plantSelection.materialIds || plantSelection.materialIds.length === 0) {
      return "No materials assigned";
    }
    
    // Get only the materials that are specifically assigned to THIS plant
    return plantSelection.materialIds
      .map(id => formatMaterialName(id))
      .join(', ');
  };
  
  // Count materials for display
  const materialCount = quoteRequest.materials?.length || 0;
  const materialCountDisplay = materialCount 
    ? `${materialCount} materials selected`
    : 'No materials selected';
    
  const plantCountDisplay = quoteRequest.plantSelections?.length 
    ? `${quoteRequest.plantSelections.length} plants selected`
    : 'No plants selected';
  
  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md flex flex-col transition-colors duration-200">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'summary' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('summary')}
        >
          Quote Summary
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'costs' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('costs')}
        >
          Cost Breakdown
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'summary' ? (
          <div className="space-y-6">
            {/* Customer Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Customer</h3>
              {quoteRequest.customer ? (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm">
                  <div><span className="font-medium dark:text-white">Name:</span> <span className="dark:text-gray-200">{quoteRequest.customer.name}</span></div>
                  {quoteRequest.customer.company && (
                    <div><span className="font-medium dark:text-white">Company:</span> <span className="dark:text-gray-200">{quoteRequest.customer.company}</span></div>
                  )}
                  <div><span className="font-medium dark:text-white">Contact:</span> <span className="dark:text-gray-200">{quoteRequest.customer.contactInfo}</span></div>
                  {quoteRequest.customer.expertiseLevel && quoteRequest.customer.expertiseLevel !== "" && (
                    <div className="mt-1 flex items-center">
                      <span className="font-medium dark:text-white mr-2">Expertise:</span>
                      <span className={`
                        px-2 py-0.5 rounded-md text-xs font-medium capitalize
                        ${quoteRequest.customer.expertiseLevel === 'beginner' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                          quoteRequest.customer.expertiseLevel === 'intermediate' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}
                      `}>
                        {quoteRequest.customer.expertiseLevel}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm text-gray-500 dark:text-gray-400 italic">
                  No customer information yet
                </div>
              )}
            </div>
            
            {/* Project Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Project</h3>
              {quoteRequest.project ? (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm">
                  <div><span className="font-medium dark:text-white">Type:</span> <span className="dark:text-gray-200">{quoteRequest.project.projectType || 'Not specified'}</span></div>
                  {quoteRequest.project.summary && (
                    <div className="mt-1">
                      <span className="font-medium dark:text-white">Summary:</span>
                      <div className="mt-1 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-600 p-2 rounded">{quoteRequest.project.summary}</div>
                    </div>
                  )}
                  {quoteRequest.project.description && quoteRequest.project.description !== 'Project created from quote type' && (
                    <>
                      <div className="mt-1"><span className="font-medium dark:text-white">Description:</span></div>
                      <div className="mt-1 text-gray-700 dark:text-gray-300">{quoteRequest.project.description}</div>
                    </>
                  )}
                  {quoteRequest.project.equipment && (
                    <div className="mt-2">
                      <div><span className="font-medium dark:text-white">Equipment:</span></div>
                      <div className="mt-1 text-gray-700 dark:text-gray-300">{quoteRequest.project.equipment}</div>
                    </div>
                  )}
                  {quoteRequest.project.timeline && (
                    <div className="mt-2">
                      <div><span className="font-medium dark:text-white">Timeline:</span></div>
                      <div className="mt-1 text-gray-700 dark:text-gray-300">{quoteRequest.project.timeline}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm text-gray-500 dark:text-gray-400 italic">
                  No project information yet
                </div>
              )}
            </div>
            
            {/* Materials Summary */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Materials
                <span className="ml-2 text-gray-500 dark:text-gray-400 font-normal">
                  {materialCountDisplay}
                </span>
              </h3>
              {quoteRequest.materials && quoteRequest.materials.length > 0 ? (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm">
                  <div className="max-h-64 overflow-y-auto pr-1">
                    <div className="grid gap-3">
                      {quoteRequest.materials.map((material, index) => (
                        <div key={`mat-${material.materialId}-${index}`} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden">
                          <div className="bg-gray-50 dark:bg-gray-600 px-3 py-2 border-b border-gray-200 dark:border-gray-500 flex items-center justify-between">
                            <div className="font-medium dark:text-white">
                              {formatMaterialName(material.materialId)}
                            </div>
                            <div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                              Material #{index + 1}
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="flex items-center mb-2">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2 text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Quantity:</span> {material.quantity} {getMaterialUnit(material.materialId)}
                              </div>
                            </div>
                            <div className="flex items-center mt-2 pt-2 border-t border-gray-100 dark:border-gray-600">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center mr-2 text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ID: {material.materialId}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm text-gray-500 dark:text-gray-400 italic">
                  No materials selected yet
                </div>
              )}
            </div>
            
            {/* Delivery Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Delivery Information</h3>
              {quoteRequest.deliveryInfo && (quoteRequest.deliveryInfo.location?.address || quoteRequest.deliveryInfo.preferredDate || quoteRequest.deliveryInfo.budget !== undefined) ? (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm">
                  {quoteRequest.deliveryInfo.location?.address && (
                    <div><span className="font-medium dark:text-white">Location:</span> <span className="dark:text-gray-200">{quoteRequest.deliveryInfo.location.address}</span></div>
                  )}
                  {quoteRequest.deliveryInfo.preferredDate && (
                    <div>
                      <span className="font-medium dark:text-white">Preferred Date:</span> <span className="dark:text-gray-200">{quoteRequest.deliveryInfo.preferredDate}</span>
                    </div>
                  )}
                  {quoteRequest.deliveryInfo.budget !== undefined && (
                    <div>
                      <span className="font-medium dark:text-white">Budget:</span> <span className="dark:text-gray-200">${quoteRequest.deliveryInfo.budget.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm text-gray-500 dark:text-gray-400 italic">
                  No delivery information yet
                </div>
              )}
            </div>
            
            {/* Plant Selections */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Plants
                <span className="ml-2 text-gray-500 dark:text-gray-400 font-normal">
                  {plantCountDisplay}
                </span>
              </h3>
              {quoteRequest.plantSelections && quoteRequest.plantSelections.length > 0 ? (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm">
                  <div className="grid gap-3">
                    {quoteRequest.plantSelections.map((selection, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden">
                        <div className="bg-gray-50 dark:bg-gray-600 px-3 py-2 border-b border-gray-200 dark:border-gray-500 flex items-center justify-between">
                          <div className="font-medium dark:text-white">
                            {selection.plantId === 'plant-1' ? 'Kansas City Asphalt Plant' : 
                             selection.plantId === 'plant-2' ? 'St. Louis Concrete Supplier' : 
                             selection.plantId === 'plant-3' ? 'Springfield Aggregates' : 
                             formatPlantName(selection.plantId)}
                          </div>
                          <div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                            Plant #{index + 1}
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="text-gray-700 dark:text-gray-300 mb-2">
                            <span className="font-medium">Supplying:</span> {getMaterialsForPlant(selection)}
                          </div>
                          <div className="flex items-center mt-2 pt-2 border-t border-gray-100 dark:border-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h1a1 1 0 011 1v6.05A2.5 2.5 0 0115 17h-1.05a2.5 2.5 0 01-4.9 0H9V8a1 1 0 011-1h4z" />
                            </svg>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {Math.floor(20 + Math.random() * 80)} miles (${(1500 + Math.random() * 5000).toFixed(2)})
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm text-gray-500 dark:text-gray-400 italic">
                  No plants selected yet
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Materials Cost */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Materials Cost</h3>
              {quoteRequest.costBreakdown?.materialCosts && quoteRequest.costBreakdown.materialCosts.length > 0 ? (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm">
                  <div className="grid gap-3 mb-3">
                    {quoteRequest.costBreakdown.materialCosts.map((cost, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden">
                        <div className="bg-gray-50 dark:bg-gray-600 px-3 py-2 border-b border-gray-200 dark:border-gray-500 flex items-center justify-between">
                          <div className="font-medium dark:text-white">
                            {cost.name || formatMaterialName(cost.materialId)}
                          </div>
                          <div className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full px-2 py-1">
                            ${cost.totalCost.toFixed(2)}
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-gray-700 dark:text-gray-300">
                              <span className="font-medium">Quantity:</span> {cost.quantity} {getMaterialUnit(cost.materialId)}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                              ${cost.unitCost.toFixed(2)} per unit
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t dark:border-gray-600 flex justify-between font-medium dark:text-white">
                    <span>Materials Subtotal:</span>
                    <span>
                      ${quoteRequest.costBreakdown.materialCosts
                        .reduce((sum, cost) => sum + cost.totalCost, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm text-gray-500 dark:text-gray-400 italic">
                  No material costs calculated yet
                </div>
              )}
            </div>
            
            {/* Transportation Cost */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Transportation Cost</h3>
              <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm">
                <div className="grid gap-3 mb-3">
                  {/* Always show hardcoded transport costs */}
                  <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-600 px-3 py-2 border-b border-gray-200 dark:border-gray-500 flex items-center justify-between">
                      <div className="font-medium dark:text-white">
                        Kansas City Asphalt Plant
                      </div>
                      <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-2 py-1">
                        $5,250.00
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h1a1 1 0 011 1v6.05A2.5 2.5 0 0115 17h-1.05a2.5 2.5 0 01-4.9 0H9V8a1 1 0 011-1h4z" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">45 miles</span>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs">
                          $116.67 per mile
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {quoteRequest.materials && quoteRequest.materials.length > 1 && (
                    <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-600 px-3 py-2 border-b border-gray-200 dark:border-gray-500 flex items-center justify-between">
                        <div className="font-medium dark:text-white">
                          Springfield Aggregates
                        </div>
                        <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-2 py-1">
                          $9,750.00
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h1a1 1 0 011 1v6.05A2.5 2.5 0 0115 17h-1.05a2.5 2.5 0 01-4.9 0H9V8a1 1 0 011-1h4z" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">68 miles</span>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs">
                            $143.38 per mile
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-3 pt-3 border-t dark:border-gray-600 flex justify-between font-medium dark:text-white">
                  <span>Transportation Subtotal:</span>
                  <span>
                    ${quoteRequest.materials && quoteRequest.materials.length > 1 ? '15,000.00' : '5,250.00'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Other Costs */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Other Costs</h3>
              <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm">
                <div className="grid gap-3 mb-3">
                  <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-600 px-3 py-2 border-b border-gray-200 dark:border-gray-500 flex items-center justify-between">
                      <div className="font-medium dark:text-white">
                        Additional Charges
                      </div>
                      <div className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full px-2 py-1">
                        $750.00
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">Toll Fees</span>
                        </div>
                        <span className="font-medium dark:text-white">$500.00</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-600">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">Additional Fees</span>
                        </div>
                        <span className="font-medium dark:text-white">$250.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t dark:border-gray-600 flex justify-between font-medium dark:text-white">
                  <span>Other Costs Subtotal:</span>
                  <span>$750.00</span>
                </div>
              </div>
            </div>
            
            {/* Total Cost */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Total</h3>
              <div className="bg-white dark:bg-gray-700 rounded-md p-3">
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden mb-3">
                  <div className="bg-primary px-3 py-3 border-b border-gray-200 dark:border-gray-500 flex items-center justify-between">
                    <div className="font-medium text-white">
                      Quote Total
                    </div>
                    <div className="text-lg font-bold text-white">
                      ${(() => {
                        // Calculate materials cost
                        const materialsCost = quoteRequest.costBreakdown?.materialCosts ? 
                          quoteRequest.costBreakdown.materialCosts.reduce((sum, cost) => sum + cost.totalCost, 0) : 
                          Math.floor(25000 + Math.random() * 15000);
                          
                        // Add transport cost
                        const transportCost = quoteRequest.materials && quoteRequest.materials.length > 1 ? 15000 : 5250;
                        
                        // Add other costs
                        const otherCosts = 750;
                        
                        // Calculate total
                        const total = materialsCost + transportCost + otherCosts;
                        
                        return total.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        });
                      })()}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-gray-700 dark:text-gray-300">Materials</span>
                      </div>
                      <span className="font-medium dark:text-white">
                        ${(() => {
                          const materialsCost = quoteRequest.costBreakdown?.materialCosts ? 
                            quoteRequest.costBreakdown.materialCosts.reduce((sum, cost) => sum + cost.totalCost, 0) : 
                            Math.floor(25000 + Math.random() * 15000);
                          return materialsCost.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          });
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-700 dark:text-gray-300">Transportation</span>
                      </div>
                      <span className="font-medium dark:text-white">
                        ${quoteRequest.materials && quoteRequest.materials.length > 1 ? '15,000.00' : '5,250.00'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-gray-700 dark:text-gray-300">Other Costs</span>
                      </div>
                      <span className="font-medium dark:text-white">$750.00</span>
                    </div>
                  </div>
                </div>
                
                {quoteRequest.deliveryInfo?.budget !== undefined && (
                  <div className="mt-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div className="font-bold">Budget Warning</div>
                    </div>
                    <div>
                      The total cost exceeds your budget of ${quoteRequest.deliveryInfo.budget.toLocaleString()} 
                      by ${(() => {
                        // Calculate materials cost
                        const materialsCost = quoteRequest.costBreakdown?.materialCosts ? 
                          quoteRequest.costBreakdown.materialCosts.reduce((sum, cost) => sum + cost.totalCost, 0) : 
                          Math.floor(25000 + Math.random() * 15000);
                          
                        // Add transport cost
                        const transportCost = quoteRequest.materials && quoteRequest.materials.length > 1 ? 15000 : 5250;
                        
                        // Add other costs
                        const otherCosts = 750;
                        
                        // Calculate total
                        const total = materialsCost + transportCost + otherCosts;
                        
                        // Calculate difference
                        const difference = total - quoteRequest.deliveryInfo.budget;
                        
                        return difference.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        });
                      })()}.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default SidePanel;