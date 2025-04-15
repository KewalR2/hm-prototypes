import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const products = [
  {
    id: 1,
    name: "Industrial Crusher",
    category: "Processing Equipment",
    description: "Heavy-duty crusher designed for primary crushing operations in quarries and mines.",
    price: "$75,000+",
    features: [
      "Processing capacity up to 500 tons per hour",
      "Hydraulic adjustment system",
      "Remote monitoring capabilities",
      "Low maintenance design"
    ]
  },
  {
    id: 2,
    name: "Mobile Screening Plant",
    category: "Processing Equipment",
    description: "Portable screening solution for efficient material separation and classification.",
    price: "$120,000+",
    features: [
      "Multiple deck configurations",
      "Self-contained power unit",
      "Quick setup and teardown",
      "Advanced control system"
    ]
  },
  {
    id: 3,
    name: "Aggregate Conveyor",
    category: "Material Handling",
    description: "High-capacity conveyor systems for transporting bulk materials across your operation.",
    price: "$35,000+",
    features: [
      "Customizable lengths and widths",
      "Heavy-duty belt construction",
      "Energy-efficient drive systems",
      "Weather-resistant design"
    ]
  },
  {
    id: 4,
    name: "Material Handler",
    category: "Heavy Equipment",
    description: "Versatile material handling equipment for loading, unloading and moving heavy materials.",
    price: "$180,000+",
    features: [
      "360-degree rotation",
      "Extended reach capabilities",
      "Advanced hydraulic system",
      "Ergonomic operator cabin"
    ]
  },
  {
    id: 5,
    name: "Industrial Shredder",
    category: "Processing Equipment",
    description: "Powerful shredding solution for size reduction and recycling applications.",
    price: "$65,000+",
    features: [
      "High torque drive system",
      "Customizable cutting tools",
      "Automated feed control",
      "Overload protection"
    ]
  },
  {
    id: 6,
    name: "Impact Crusher",
    category: "Processing Equipment",
    description: "Secondary crushing solution delivering superior product shape and gradation.",
    price: "$95,000+",
    features: [
      "High reduction ratio",
      "Adjustable impact parameters",
      "Modular design for easy maintenance",
      "Low operating costs"
    ]
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="products" />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Our Products</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Explore our range of high-quality equipment for heavy material processing, handling, and management. 
            Each product is designed for durability, efficiency, and superior performance in demanding environments.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">All Categories</button>
            <button className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors">Processing Equipment</button>
            <button className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors">Material Handling</button>
            <button className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors">Heavy Equipment</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-56 bg-gray-200 dark:bg-gray-800 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Product Image
                </div>
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                <p className="text-primary font-bold mb-4">{product.price}</p>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider">Key Features</h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between">
                  <button className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
                    Request Quote
                  </button>
                  <button className="text-primary hover:underline font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}