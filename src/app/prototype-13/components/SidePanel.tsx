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
  
  // Get materials supplied by a plant
  const getMaterialsForPlant = (plantSelection: PlantSelection): string => {
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
                  <div><span className="font-medium dark:text-white">Type:</span> <span className="dark:text-gray-200">{quoteRequest.project.projectType}</span></div>
                  {quoteRequest.project.summary && (
                    <div className="mt-1">
                      <span className="font-medium dark:text-white">Summary:</span>
                      <div className="mt-1 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-600 p-2 rounded">{quoteRequest.project.summary}</div>
                    </div>
                  )}
                  <div className="mt-1"><span className="font-medium dark:text-white">Description:</span></div>
                  <div className="mt-1 text-gray-700 dark:text-gray-300">{quoteRequest.project.description}</div>
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
                    <ul className="divide-y dark:divide-gray-600">
                      {quoteRequest.materials.map((material, index) => (
                        <li key={`mat-${material.materialId}-${index}`} className="py-2 first:pt-0 last:pb-0 border border-gray-100 dark:border-gray-600 rounded-md px-2 mb-2">
                          <div className="font-medium dark:text-white text-sm bg-gray-50 dark:bg-gray-600 -mx-2 px-2 py-1 rounded-t-md">
                            {formatMaterialName(material.materialId)}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 mt-1 flex justify-between">
                            <span>{material.quantity}</span>
                            <span>{getMaterialUnit(material.materialId)}</span>
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-right">
                            ID: {material.materialId}
                          </div>
                        </li>
                      ))}
                    </ul>
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
              {quoteRequest.deliveryInfo ? (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm">
                  <div><span className="font-medium dark:text-white">Location:</span> <span className="dark:text-gray-200">{quoteRequest.deliveryInfo.location.address}</span></div>
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
                  <ul className="divide-y dark:divide-gray-600">
                    {quoteRequest.plantSelections.map((selection, index) => (
                      <li key={index} className="py-2 first:pt-0 last:pb-0">
                        <div className="font-medium dark:text-white">
                          {formatPlantName(selection.plantId)}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          Supplying materials: {getMaterialsForPlant(selection)}
                        </div>
                      </li>
                    ))}
                  </ul>
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
                  <ul className="divide-y dark:divide-gray-600">
                    {quoteRequest.costBreakdown.materialCosts.map((cost, index) => (
                      <li key={index} className="py-2 first:pt-0 last:pb-0 flex justify-between">
                        <div>
                          <span className="font-medium dark:text-white">{cost.name || formatMaterialName(cost.materialId)}</span>
                          <div className="text-gray-500 dark:text-gray-400">
                            {cost.quantity} × ${cost.unitCost.toFixed(2)}
                          </div>
                        </div>
                        <div className="font-medium dark:text-white">
                          ${cost.totalCost.toFixed(2)}
                        </div>
                      </li>
                    ))}
                  </ul>
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
              {quoteRequest.costBreakdown?.transportationCosts && quoteRequest.costBreakdown.transportationCosts.length > 0 ? (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm">
                  <ul className="divide-y dark:divide-gray-600">
                    {quoteRequest.costBreakdown.transportationCosts.map((cost, index) => (
                      <li key={index} className="py-2 first:pt-0 last:pb-0 flex justify-between">
                        <div>
                          <span className="font-medium dark:text-white">{cost.plantName || formatPlantName(cost.plantId)}</span>
                          <div className="text-gray-500 dark:text-gray-400">
                            {cost.distance} miles
                          </div>
                        </div>
                        <div className="font-medium dark:text-white">
                          ${cost.cost.toFixed(2)}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t dark:border-gray-600 flex justify-between font-medium dark:text-white">
                    <span>Transportation Subtotal:</span>
                    <span>
                      ${quoteRequest.costBreakdown.transportationCosts
                        .reduce((sum, cost) => sum + cost.cost, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm text-gray-500 dark:text-gray-400 italic">
                  No transportation costs calculated yet
                </div>
              )}
            </div>
            
            {/* Other Costs */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Other Costs</h3>
              <div className="bg-white dark:bg-gray-700 rounded-md p-3 text-sm">
                <div className="flex justify-between py-1 dark:text-gray-300">
                  <span>Toll Fees:</span>
                  <span>${quoteRequest.costBreakdown?.tollCosts?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between py-1 dark:text-gray-300">
                  <span>Additional Fees:</span>
                  <span>${quoteRequest.costBreakdown?.additionalFees?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>
            
            {/* Total Cost */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Total</h3>
              <div className="bg-white dark:bg-gray-700 rounded-md p-3">
                <div className="flex justify-between font-bold dark:text-white">
                  <span>Total Cost:</span>
                  <span className="text-lg">
                    ${quoteRequest.costBreakdown?.totalCost?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) || '0.00'}
                  </span>
                </div>
                
                {quoteRequest.exceedsBudget && quoteRequest.deliveryInfo?.budget !== undefined && (
                  <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-400 text-sm">
                    <div className="font-medium">Budget Warning</div>
                    <div>
                      The total cost exceeds your budget of ${quoteRequest.deliveryInfo.budget.toLocaleString()} 
                      by ${(quoteRequest.costBreakdown?.totalCost - quoteRequest.deliveryInfo.budget).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}.
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