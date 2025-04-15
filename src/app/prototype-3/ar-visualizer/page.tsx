'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Material options
const materials = [
  {
    id: 1,
    name: 'Crushed Limestone',
    description: 'Premium crushed limestone aggregate, ideal for driveways and base layers',
    image: '/limestone.jpg',
    price: '$38.50 per ton'
  },
  {
    id: 2,
    name: 'River Rock',
    description: 'Smooth, rounded river rock for decorative landscaping applications',
    image: '/river-rock.jpg',
    price: '$45.75 per ton'
  },
  {
    id: 3,
    name: 'Recycled Concrete',
    description: 'Environmentally friendly recycled concrete aggregate for sustainable projects',
    image: '/recycled-concrete.jpg',
    price: '$29.95 per ton'
  },
  {
    id: 4,
    name: 'Granite Gravel',
    description: 'Durable granite gravel for high-traffic areas and decorative use',
    image: '/granite-gravel.jpg',
    price: '$52.25 per ton'
  },
  {
    id: 5,
    name: 'Sand Mix',
    description: 'Fine-grade sand mix for concrete mixing and base applications',
    image: '/sand-mix.jpg',
    price: '$32.80 per ton'
  },
  {
    id: 6,
    name: 'Pea Gravel',
    description: 'Small, round pea gravel for pathways and decorative ground cover',
    image: '/pea-gravel.jpg',
    price: '$43.15 per ton'
  }
];

export default function ARVisualizer() {
  const [isScanning, setIsScanning] = useState(false);
  const [isScanComplete, setIsScanComplete] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quantity, setQuantity] = useState(10);
  const [cameraAccessGranted, setCameraAccessGranted] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Function to start the camera for "scanning"
  const startCamera = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraAccessGranted(true);
        setIsScanning(true);
        
        // Simulate a scanning process
        setTimeout(() => {
          setIsScanning(false);
          setIsScanComplete(true);
          
          // Stop the camera after "scanning"
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }, 5000);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
      setIsScanning(false);
    }
  };
  
  // Select a material
  const selectMaterial = (material) => {
    setSelectedMaterial(material);
    
    // Draw the selected material texture on the canvas (simulated)
    if (canvasRef.current && isScanComplete) {
      const context = canvasRef.current.getContext('2d');
      
      // Fill with a placeholder pattern
      context.fillStyle = '#f0f0f0';
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Draw a grid pattern with the material ID as a basic visualization
      const gridSize = 20;
      context.strokeStyle = '#999';
      
      for (let x = 0; x <= canvasRef.current.width; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvasRef.current.height);
        context.stroke();
      }
      
      for (let y = 0; y <= canvasRef.current.height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvasRef.current.width, y);
        context.stroke();
      }
      
      // Write the material name
      context.font = 'bold 24px Arial';
      context.fillStyle = '#333';
      context.textAlign = 'center';
      context.fillText(material.name, canvasRef.current.width / 2, 40);
      
      // Add a texture effect based on material ID
      const colors = ['#d9d0c1', '#c5c5c5', '#e1d8c3', '#b5b5b5', '#e6d7af', '#d2c8a8'];
      context.fillStyle = colors[material.id - 1] || '#cccccc';
      
      for (let x = 0; x < canvasRef.current.width; x += gridSize) {
        for (let y = 0; y < canvasRef.current.height; y += gridSize) {
          if ((x + y) % (material.id * 5) === 0) {
            context.fillRect(x, y, gridSize, gridSize);
          }
        }
      }
    }
  };
  
  // Request a quote
  const requestQuote = () => {
    if (selectedMaterial) {
      // Store selected data in session storage
      const quoteData = {
        material: selectedMaterial,
        quantity: quantity,
        scannedArea: '450 sq ft (simulated)',
        estimatedCost: `$${(parseFloat(selectedMaterial.price.replace('$', '').split(' ')[0]) * quantity).toFixed(2)}`
      };
      
      sessionStorage.setItem('arQuoteData', JSON.stringify(quoteData));
      
      // Redirect to quote confirmation (would implement this in a real app)
      alert('Quote request submitted! In a real implementation, you would be redirected to a confirmation page.');
    }
  };
  
  // Set up canvas dimensions on component mount
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 350;
      canvasRef.current.height = 350;
      
      // Draw initial blank canvas
      const context = canvasRef.current.getContext('2d');
      context.fillStyle = '#f0f0f0';
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Draw text prompt
      context.font = '16px Arial';
      context.fillStyle = '#999';
      context.textAlign = 'center';
      context.fillText('Scan your area to begin', canvasRef.current.width / 2, canvasRef.current.height / 2);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="prototype-3" />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/prototype-3" className="text-primary hover:underline inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Prototype 3
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-6 text-center">AR Material Visualizer</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column: Visualization area */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Project Visualization</h2>
              
              {/* Camera view */}
              <div className="relative mb-4">
                {isScanning && (
                  <>
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="w-full h-[350px] bg-black rounded-lg"
                    ></video>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-3 bg-primary bg-opacity-80 rounded-lg text-white">
                        <svg className="animate-spin h-6 w-6 mr-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Scanning area...
                      </div>
                    </div>
                  </>
                )}
                
                {!isScanning && (
                  <canvas 
                    ref={canvasRef} 
                    className="w-full h-[350px] bg-gray-100 dark:bg-gray-800 rounded-lg"
                  ></canvas>
                )}
              </div>
              
              {/* Camera controls */}
              <div className="flex justify-center mb-4">
                {!isScanComplete && (
                  <button
                    onClick={startCamera}
                    disabled={isScanning}
                    className={`px-4 py-2 rounded-lg ${
                      isScanning 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-primary text-white hover:bg-blue-600'
                    }`}
                  >
                    {isScanning ? 'Scanning...' : 'Scan Project Area'}
                  </button>
                )}
                
                {isScanComplete && !selectedMaterial && (
                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Scan complete! Select a material from the catalog to visualize →
                  </p>
                )}
              </div>
              
              {error && (
                <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded-md mb-4 text-sm">
                  {error}
                </div>
              )}
              
              {/* Selected material details */}
              {isScanComplete && selectedMaterial && (
                <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold">{selectedMaterial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {selectedMaterial.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-primary">{selectedMaterial.price}</span>
                    
                    <div className="flex items-center">
                      <label className="text-sm mr-2">Quantity (tons):</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="100"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-16 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-center"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button 
                      onClick={requestQuote}
                      className="w-full bg-primary hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right column: Material selection */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Material Catalog</h2>
              
              <div className="grid grid-cols-2 gap-3">
                {materials.map(material => (
                  <div 
                    key={material.id}
                    onClick={() => isScanComplete ? selectMaterial(material) : null}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      isScanComplete 
                        ? 'hover:shadow-md hover:border-primary' 
                        : 'opacity-60 cursor-not-allowed'
                    } ${
                      selectedMaterial?.id === material.id 
                        ? 'border-primary shadow-md' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="h-24 bg-gray-200 dark:bg-gray-800 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Material Texture
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm">{material.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{material.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {!isScanComplete && (
                <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
                  Complete site scanning to enable material selection
                </p>
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
              This is a simplified prototype of an AR visualization tool. In a fully implemented version, you would see 
              realistic 3D renderings of materials placed in your actual environment through the camera. The scanning 
              process would create a detailed spatial map of your project site for accurate material placement and quantity estimation.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}