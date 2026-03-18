import React from 'react';
import { Wheat, Users, MapPin, ShoppingCart, Star, Truck, Leaf, TrendingUp } from 'lucide-react';
import GoogleTranslate from './GoogleTranslate';

interface HomePageProps {
  onNavigate: (view: 'home' | 'farmer' | 'customer') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Wheat className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">GrainConnect</h1>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">How It Works</a>
                <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
              </nav>
              <GoogleTranslate />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <Wheat className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Farm to Table,
              <span className="text-green-600"> Directly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect farmers with customers in Mumbai and Pune. Get fresh, quality grains directly from the source at fair prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('farmer')}
                className="group bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>I'm a Farmer</span>
                </div>
              </button>
              <button
                onClick={() => onNavigate('customer')}
                className="group bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>I'm a Customer</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose GrainConnect?</h2>
            <p className="text-xl text-gray-600">Revolutionizing how grains move from farm to your table</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Leaf className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fresh & Organic</h3>
              <p className="text-gray-600">Direct from farm to ensure maximum freshness and quality</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fair Pricing</h3>
              <p className="text-gray-600">Competitive prices that benefit both farmers and customers</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Truck className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick delivery to Mumbai and Pune with real-time tracking</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Star className="h-8 w-8 text-orange-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">Rated products with verified farmer reviews and quality checks</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to connect farmers and customers</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Farmers */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-green-600 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">For Farmers</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">List Your Products</h4>
                    <p className="text-gray-600">Add your grain products with photos, prices, and descriptions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Receive Orders</h4>
                    <p className="text-gray-600">Get notified when customers place orders for your products</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Deliver & Earn</h4>
                    <p className="text-gray-600">Arrange delivery and receive payment directly</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Customers */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">For Customers</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Browse Products</h4>
                    <p className="text-gray-600">Explore fresh grains from verified farmers in your area</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Place Order</h4>
                    <p className="text-gray-600">Select quantity and place your order with secure payment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Receive Fresh Grains</h4>
                    <p className="text-gray-600">Get your order delivered fresh to your doorstep</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-green-100">Active Farmers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">2,000+</div>
              <div className="text-green-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-green-100">Orders Delivered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-green-100">Grain Varieties</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of farmers and customers already using GrainConnect</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('farmer')}
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Selling Your Grains
            </button>
            <button
              onClick={() => onNavigate('customer')}
              className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Browse Fresh Grains
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Wheat className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">GrainConnect</h3>
              </div>
              <p className="text-gray-400">Connecting farmers and customers for fresh, quality grains.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Service Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Pune</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GrainConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;