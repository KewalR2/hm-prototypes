'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Material data with categories
const materialCategories = [
  {
    id: 'aggregates',
    name: 'Aggregates',
    materials: [
      { id: 'crushed-limestone', name: 'Crushed Limestone', price: 38.50, unit: 'ton', color: '#d9d0c1' },
      { id: 'river-rock', name: 'River Rock', price: 45.75, unit: 'ton', color: '#c5c5c5' },
      { id: 'recycled-concrete', name: 'Recycled Concrete', price: 29.95, unit: 'ton', color: '#e0e0e0' },
      { id: 'granite-gravel', name: 'Granite Gravel', price: 52.25, unit: 'ton', color: '#b5b5b5' }
    ]
  },
  {
    id: 'sands',
    name: 'Sands',
    materials: [
      { id: 'mason-sand', name: 'Mason Sand', price: 36.25, unit: 'ton', color: '#e6d7af' },
      { id: 'concrete-sand', name: 'Concrete Sand', price: 32.80, unit: 'ton', color: '#d2c8a8' },
      { id: 'fill-sand', name: 'Fill Sand', price: 28.95, unit: 'ton', color: '#e1d8c3' }
    ]
  },
  {
    id: 'specialty',
    name: 'Specialty Materials',
    materials: [
      { id: 'topsoil', name: 'Premium Topsoil', price: 42.15, unit: 'yard', color: '#8B4513' },
      { id: 'mulch', name: 'Hardwood Mulch', price: 38.50, unit: 'yard', color: '#654321' },
      { id: 'riprap', name: 'Rip Rap Stone', price: 68.75, unit: 'ton', color: '#71797E' }
    ]
  }
];
// Project zone templates
const zoneTemplates = [
  { id: 'driveway', name: 'Driveway', defaultWidth: 12, defaultLength: 40, defaultDepth: 0.5, unit: 'ft' },
  { id: 'patio', name: 'Patio', defaultWidth: 15, defaultLength: 15, defaultDepth: 0.5, unit: 'ft' },
  { id: 'foundation', name: 'Foundation', defaultWidth: 40, defaultLength: 30, defaultDepth: 1, unit: 'ft' },
  { id: 'backfill', name: 'Backfill Area', defaultWidth: 10, defaultLength: 20, defaultDepth: 2, unit: 'ft' },
  { id: 'custom', name: 'Custom Zone', defaultWidth: 10, defaultLength: 10, defaultDepth: 1, unit: 'ft' }
];
export default function VisualBuilder() {
  const router = useRouter();
  const dragItemRef = useRef(null);
  const dragSourceRef = useRef(null);
  // State for project zones
  const [projectZones, setProjectZones] = useState([]);
  const [activeZoneId, setActiveZoneId] = useState(null);
  // State for showing zone form
  const [showZoneForm, setShowZoneForm] = useState(false);
  const [zoneTemplate, setZoneTemplate] = useState(zoneTemplates[0]);
  const [zoneFormData, setZoneFormData] = useState({
    name: '',
    width: 0,
    length: 0,
    depth: 0,
    materials: []
  });
  // State for active tab
  const [activeTab, setActiveTab] = useState('zones');
  // Calculate total quote
  const calculateTotalCost = () => {
    let total = 0;
    projectZones.forEach(zone => {
      zone.materials.forEach(material => {
        const materialData = findMaterialById(material.id);
        if (materialData) {
          // Convert cubic feet to tons (approximation) or yards based on material unit
          let quantity;
          if (materialData.unit === 'ton') {
            // Rough conversion from cubic feet to tons (varies by material density)
            quantity = (zone.width * zone.length * zone.depth) / 20; 
          } else {
            // Convert cubic feet to cubic yards
            quantity = (zone.width * zone.length * zone.depth) / 27;
          }
          quantity = quantity * material.coverage; // Apply coverage percentage
          total += materialData.price * quantity;
        }
      });
    });
    return total.toFixed(2);
  };
  // Find material by ID
  const findMaterialById = (materialId) => {
    for (const category of materialCategories) {
      const material = category.materials.find(m => m.id === materialId);
      if (material) return material;
    }
    return null;
  };
  // Handle adding a zone
  const handleAddZone = () => {
    setZoneFormData({
      name: `${zoneTemplate.name} ${projectZones.length + 1}`,
      width: zoneTemplate.defaultWidth,
      length: zoneTemplate.defaultLength,
      depth: zoneTemplate.defaultDepth,
      materials: []
    });
    setShowZoneForm(true);
  };
  // Handle saving a zone
  const handleSaveZone = () => {
    const newZone = {
      id: `zone-${Date.now()}`,
      name: zoneFormData.name,
      width: parseFloat(zoneFormData.width),
      length: parseFloat(zoneFormData.length),
      depth: parseFloat(zoneFormData.depth),
      unit: zoneTemplate.unit,
      materials: []
    };
    setProjectZones([...projectZones, newZone]);
    setShowZoneForm(false);
    setActiveZoneId(newZone.id);
    setActiveTab('materials');
  };
  // Handle canceling zone addition
  const handleCancelZone = () => {
    setShowZoneForm(false);
  };
  // Handle zone form input changes
  const handleZoneFormChange = (e) => {
    const { name, value } = e.target;
    setZoneFormData({ ...zoneFormData, [name]: value });
  };
  // Handle selecting a zone template
  const handleSelectZoneTemplate = (template) => {
    setZoneTemplate(template);
    setZoneFormData({
      name: `${template.name} ${projectZones.length + 1}`,
      width: template.defaultWidth,
      length: template.defaultLength,
      depth: template.defaultDepth,
      materials: []
    });
  };
  // Handle clicking on a zone
  const handleZoneClick = (zoneId) => {
    setActiveZoneId(zoneId);
    setActiveTab('materials');
  };
  // Handle drag start
  const handleDragStart = (e, materialId, isFromZone, zoneId) => {
    dragItemRef.current = materialId;
    dragSourceRef.current = isFromZone ? `zone-${zoneId}` : 'catalog';
    // For visual feedback during drag
    if (e.target.classList) {
      setTimeout(() => {
        e.target.classList.add('opacity-50');
      }, 0);
    }
  };
  // Handle drag end
  const handleDragEnd = (e) => {
    dragItemRef.current = null;
    dragSourceRef.current = null;
    // Reset visual feedback
    if (e.target.classList) {
      e.target.classList.remove('opacity-50');
    }
  };
  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  // Handle drop on a zone
  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    if (!dragItemRef.current) return;
    // Get the material being dragged
    const materialId = dragItemRef.current;
    const materialData = findMaterialById(materialId);
    if (!materialData) return;
    // Update the zone with the new material
    setProjectZones(zones => 
      zones.map(zone => {
        if (zone.id === zoneId) {
          // Check if material already exists in zone
          const existingMaterialIndex = zone.materials.findIndex(m => m.id === materialId);
          if (existingMaterialIndex >= 0) {
            // If from catalog, just increase coverage
            if (dragSourceRef.current === 'catalog') {
              const updatedMaterials = [...zone.materials];
              updatedMaterials[existingMaterialIndex].coverage = Math.min(1, updatedMaterials[existingMaterialIndex].coverage + 0.25);
              return { ...zone, materials: updatedMaterials };
            } 
            // If from another zone, just ignore (for simplicity)
            return zone;
          } else {
            // Add new material to zone
            return {
              ...zone,
              materials: [...zone.materials, { id: materialId, coverage: 0.25 }]
            };
          }
        }
        return zone;
      })
    );
    setActiveZoneId(zoneId);
  };
  // Handle removing a material from a zone
  const handleRemoveMaterial = (zoneId, materialId) => {
    setProjectZones(zones => 
      zones.map(zone => {
        if (zone.id === zoneId) {
          return {
            ...zone,
            materials: zone.materials.filter(m => m.id !== materialId)
          };
        }
        return zone;
      })
    );
  };
  // Handle adjusting material coverage in a zone
  const handleAdjustCoverage = (zoneId, materialId, newCoverage) => {
    setProjectZones(zones => 
      zones.map(zone => {
        if (zone.id === zoneId) {
          return {
            ...zone,
            materials: zone.materials.map(m => 
              m.id === materialId ? { ...m, coverage: parseFloat(newCoverage) } : m
            )
          };
        }
        return zone;
      })
    );
  };
  // Handle removing a zone
  const handleRemoveZone = (zoneId) => {
    setProjectZones(zones => zones.filter(zone => zone.id !== zoneId));
    if (activeZoneId === zoneId) {
      setActiveZoneId(null);
      setActiveTab('zones');
    }
  };
  // Handle submitting the quote
  const handleSubmitQuote = () => {
    // Store the project data in session storage
    const quoteData = {
      projectZones,
      totalCost: calculateTotalCost(),
      date: new Date().toISOString()
    };
    sessionStorage.setItem('visualBuilderQuote', JSON.stringify(quoteData));
    // Navigate to a success page or show confirmation
    alert('Quote request submitted! In a real implementation, you would be redirected to a confirmation page.');
  };
  // Find the active zone
  const activeZone = projectZones.find(zone => zone.id === activeZoneId);
  // Calculate area and volume of a zone
  const calculateZoneVolume = (zone) => {
    const areaFt = zone.width * zone.length;
    const volumeFt = areaFt * zone.depth;
    const volumeYd = volumeFt / 27; // Convert to cubic yards
    return {
      areaFt: areaFt.toFixed(1),
      volumeFt: volumeFt.toFixed(1),
      volumeYd: volumeYd.toFixed(1)
    };
  };
  return (
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/prototype-4" className="text-primary hover:underline inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Prototype 4
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Project Builder</h1>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button 
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'zones' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('zones')}
            >
              Project Zones
            </button>
            <button 
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'materials' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('materials')}
              disabled={!activeZoneId}
            >
              Materials
            </button>
            <button 
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'summary' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('summary')}
            >
              Quote Summary
            </button>
          </div>
          {/* Tab Content */}
          <div className="p-6">
            {/* Zones Tab */}
            {activeTab === 'zones' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Project Zones</h2>
                  <button 
                    onClick={handleAddZone}
                    className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Add Zone
                  </button>
                </div>
                {/* Zone Form */}
                {showZoneForm && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                    <h3 className="font-medium mb-4">Add New Zone</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      {zoneTemplates.map(template => (
                        <div 
                          key={template.id}
                          onClick={() => handleSelectZoneTemplate(template)}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                            zoneTemplate.id === template.id 
                              ? 'border-primary bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20' 
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                          }`}
                        >
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {template.defaultWidth} × {template.defaultLength} × {template.defaultDepth} {template.unit}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Zone Name</label>
                        <input 
                          type="text"
                          name="name"
                          value={zoneFormData.name}
                          onChange={handleZoneFormChange}
                          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-sm font-medium mb-1">Width ({zoneTemplate.unit})</label>
                          <input 
                            type="number"
                            name="width"
                            value={zoneFormData.width}
                            onChange={handleZoneFormChange}
                            min="0"
                            step="0.1"
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Length ({zoneTemplate.unit})</label>
                          <input 
                            type="number"
                            name="length"
                            value={zoneFormData.length}
                            onChange={handleZoneFormChange}
                            min="0"
                            step="0.1"
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Depth ({zoneTemplate.unit})</label>
                          <input 
                            type="number"
                            name="depth"
                            value={zoneFormData.depth}
                            onChange={handleZoneFormChange}
                            min="0"
                            step="0.1"
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      Area: {(zoneFormData.width * zoneFormData.length).toFixed(1)} sq {zoneTemplate.unit} | 
                      Volume: {(zoneFormData.width * zoneFormData.length * zoneFormData.depth).toFixed(1)} cubic {zoneTemplate.unit}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={handleCancelZone}
                        className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveZone}
                        className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Add Zone
                      </button>
                    </div>
                  </div>
                )}
                {/* Zone List */}
                {projectZones.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {projectZones.map(zone => {
                      const volume = calculateZoneVolume(zone);
                      return (
                        <div 
                          key={zone.id}
                          onClick={() => handleZoneClick(zone.id)}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            activeZoneId === zone.id 
                              ? 'border-primary shadow-sm' 
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex justify-between">
                            <h3 className="font-medium">{zone.name}</h3>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveZone(zone.id);
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {zone.materials.map(material => {
                              const materialData = findMaterialById(material.id);
                              return materialData ? (
                                <span 
                                  key={material.id}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800"
                                  style={{ backgroundColor: `${materialData.color}20` }} // 20 is for opacity
                                >
                                  <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: materialData.color }}></span>
                                  {materialData.name}
                                </span>
                              ) : null;
                            })}
                            {zone.materials.length === 0 && (
                              <span className="text-sm text-gray-500 dark:text-gray-400 italic">No materials assigned</span>
                            )}
                          </div>
                          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                            Dimensions: {zone.width} × {zone.length} × {zone.depth} {zone.unit}
                          </div>
                          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Area: {volume.areaFt} sq ft | Volume: {volume.volumeYd} cubic yards
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No zones added yet. Start by adding a project zone.</p>
                    <button 
                      onClick={handleAddZone}
                      className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Add First Zone
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Materials Tab */}
            {activeTab === 'materials' && (
              <div>
                {activeZone ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">
                        Materials for {activeZone.name}
                      </h2>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Dimensions:</span> {activeZone.width} × {activeZone.length} × {activeZone.depth} {activeZone.unit}
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Material Categories */}
                      <div>
                        <h3 className="font-medium mb-3">Material Catalog</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Drag materials and drop them onto the zone to add them to your project.
                        </p>
                        <div className="space-y-6">
                          {materialCategories.map(category => (
                            <div key={category.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 font-medium">
                                {category.name}
                              </div>
                              <div className="p-3 grid grid-cols-2 gap-2">
                                {category.materials.map(material => (
                                  <div 
                                    key={material.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, material.id, false)}
                                    onDragEnd={handleDragEnd}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 cursor-move hover:border-blue-300 transition-colors"
                                  >
                                    <div 
                                      className="mb-2 w-full h-6 rounded"
                                      style={{ backgroundColor: material.color }}
                                    ></div>
                                    <div className="font-medium text-sm">{material.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      ${material.price.toFixed(2)} per {material.unit}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Active Zone */}
                      <div>
                        <h3 className="font-medium mb-3">Zone Materials</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Adjust coverage percentages or remove materials using the controls below.
                        </p>
                        <div 
                          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 min-h-[300px]"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, activeZone.id)}
                        >
                          <div className="text-center text-gray-500 dark:text-gray-400 mb-4">
                            <h4 className="font-medium text-lg">{activeZone.name}</h4>
                            <p className="text-sm">
                              {calculateZoneVolume(activeZone).volumeYd} cubic yards total volume
                            </p>
                          </div>
                          {activeZone.materials.length > 0 ? (
                            <div className="space-y-3">
                              {activeZone.materials.map(material => {
                                const materialData = findMaterialById(material.id);
                                if (!materialData) return null;
                                const volume = calculateZoneVolume(activeZone);
                                let quantity;
                                if (materialData.unit === 'ton') {
                                  // Rough conversion from cubic feet to tons
                                  quantity = (parseFloat(volume.volumeFt) * material.coverage) / 20;
                                } else {
                                  // Convert cubic feet to cubic yards
                                  quantity = parseFloat(volume.volumeYd) * material.coverage;
                                }
                                const cost = materialData.price * quantity;
                                return (
                                  <div 
                                    key={material.id}
                                    className="border rounded-lg p-3 bg-white dark:bg-gray-900"
                                    style={{ borderColor: materialData.color }}
                                  >
                                    <div className="flex justify-between items-center">
                                      <div className="font-medium flex items-center">
                                        <span 
                                          className="inline-block w-3 h-3 rounded-full mr-2"
                                          style={{ backgroundColor: materialData.color }}
                                        ></span>
                                        {materialData.name}
                                      </div>
                                      <button 
                                        onClick={() => handleRemoveMaterial(activeZone.id, material.id)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                      </button>
                                    </div>
                                    <div className="mt-2">
                                      <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                                        Coverage: {(material.coverage * 100)}%
                                      </label>
                                      <input 
                                        type="range"
                                        min="0.1"
                                        max="1"
                                        step="0.05"
                                        value={material.coverage}
                                        onChange={(e) => handleAdjustCoverage(activeZone.id, material.id, e.target.value)}
                                        className="w-full"
                                      />
                                    </div>
                                    <div className="mt-2 text-sm grid grid-cols-2 gap-2">
                                      <div className="text-gray-500 dark:text-gray-400">
                                        Quantity: {quantity.toFixed(1)} {materialData.unit}s
                                      </div>
                                      <div className="text-right font-medium">
                                        ${cost.toFixed(2)}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-32 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                              <p className="text-gray-500 dark:text-gray-400 text-center">
                                Drag materials here<br />from the catalog
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Please select a zone first or create a new one.</p>
                    <button 
                      onClick={() => setActiveTab('zones')}
                      className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Go to Zones
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Summary Tab */}
            {activeTab === 'summary' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Quote Summary</h2>
                {projectZones.length > 0 ? (
                  <>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium">Zone</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Materials</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
                            <th className="px-4 py-3 text-right text-sm font-medium">Price</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {projectZones.map(zone => {
                            const volume = calculateZoneVolume(zone);
                            return zone.materials.map((material, idx) => {
                              const materialData = findMaterialById(material.id);
                              if (!materialData) return null;
                              let quantity;
                              if (materialData.unit === 'ton') {
                                // Rough conversion from cubic feet to tons
                                quantity = (parseFloat(volume.volumeFt) * material.coverage) / 20;
                              } else {
                                // Convert cubic feet to cubic yards
                                quantity = parseFloat(volume.volumeYd) * material.coverage;
                              }
                              const cost = materialData.price * quantity;
                              return (
                                <tr key={`${zone.id}-${material.id}`} className="bg-white dark:bg-gray-900">
                                  <td className="px-4 py-3 text-sm">
                                    {idx === 0 ? zone.name : ''}
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    <div className="flex items-center">
                                      <span 
                                        className="inline-block w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: materialData.color }}
                                      ></span>
                                      {materialData.name}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    {quantity.toFixed(1)} {materialData.unit}s
                                  </td>
                                  <td className="px-4 py-3 text-sm text-right">
                                    ${cost.toFixed(2)}
                                  </td>
                                </tr>
                              );
                            });
                          })}
                        </tbody>
                        <tfoot className="bg-gray-50 dark:bg-gray-800 font-medium">
                          <tr>
                            <td colSpan="3" className="px-4 py-3 text-right">Total:</td>
                            <td className="px-4 py-3 text-right">${calculateTotalCost()}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
                      <h3 className="font-medium mb-2">Delivery & Contact Information</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        In a real implementation, you would enter delivery schedule and contact details here.
                      </p>
                      <div className="flex justify-end">
                        <button
                          onClick={handleSubmitQuote}
                          className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Submit Quote Request
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Your project is empty. Add zones and materials to get started.
                    </p>
                    <button 
                      onClick={() => setActiveTab('zones')}
                      className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Add Project Zones
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Info section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-6">
          <h3 className="font-medium mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Prototype Information
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            This is a simplified prototype of a visual project builder tool. In a full implementation, you would have 
            more zone templates, material options, and a more sophisticated drag-and-drop interface. You would also have 
            the ability to save projects, share them with team members, and integrate with calculation tools for more 
            accurate material estimation.
          </p>
        </div>
      </main>
    </div>
  );
}