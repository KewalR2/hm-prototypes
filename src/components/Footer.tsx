import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Heavy Materials</h3>
            <p className="text-gray-400">Industrial solutions for heavy-duty applications</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/prototype-1" className="text-gray-400 hover:text-white transition-colors">Prototype 1</Link></li>
              <li><Link href="/prototype-2" className="text-gray-400 hover:text-white transition-colors">Prototype 2</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Industrial Parkway</li>
              <li>Manufacturing City, MC 12345</li>
              <li>info@heavymaterials.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4">Stay updated with our latest products and services</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-900"
              />
              <button className="bg-primary hover:bg-blue-600 px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Heavy Materials. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}