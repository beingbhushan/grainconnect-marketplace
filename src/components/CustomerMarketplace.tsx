import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, ShoppingCart, Star, MapPin, Leaf, Package, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface CustomerMarketplaceProps {
  products: Product[];
  onBack: () => void;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const CustomerMarketplace: React.FC<CustomerMarketplaceProps> = ({ products, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // ✅ Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const grainTypes = [...new Set(products.map(p => p.type))];
  const locations = [...new Set(products.map(p => p.location))];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !selectedType || product.type === selectedType;
    const matchesLocation = !selectedLocation || product.location === selectedLocation;
    const matchesOrganic = !organicOnly || product.organic;

    return matchesSearch && matchesType && matchesLocation && matchesOrganic;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // ✅ Add to cart with stock check
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);

      if (existing) {
        if (existing.quantity >= product.quantity) return prevCart;
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // ✅ Update quantity safely
  const updateCartQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart =>
      prevCart
        .map(item => {
          if (item.product.id === productId) {
            if (newQuantity > item.product.quantity) return item;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(item => item.quantity > 0)
    );
  };

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">Grain Marketplace</h1>
            </div>

            <div className="flex items-center space-x-4">
              <GoogleTranslate />
              <button
                onClick={() => setShowCart(true)}
                className="relative bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

            <input
              placeholder="Search grains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="col-span-2 px-3 py-2 border rounded-lg"
            />

            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="px-3 py-2 border rounded-lg">
              <option value="">All Types</option>
              {grainTypes.map(type => <option key={type}>{type}</option>)}
            </select>

            <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="px-3 py-2 border rounded-lg">
              <option value="">All Locations</option>
              {locations.map(loc => <option key={loc}>{loc}</option>)}
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 border rounded-lg">
              <option value="name">Sort</option>
              <option value="price-low">Low Price</option>
              <option value="price-high">High Price</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('');
                setSelectedLocation('');
                setOrganicOnly(false);
              }}
              className="text-blue-600 text-sm"
            >
              Clear
            </button>

          </div>
        </div>

        {/* Products */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const isInCart = cart.some(i => i.product.id === product.id);

            return (
              <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border">
                <img src={product.image} className="h-40 w-full object-cover rounded-lg mb-3" />

                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.type}</p>

                <div className="text-green-600 font-bold mt-2">
                  ₹{product.price}/{product.unit}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  disabled={product.quantity === 0}
                  className={`w-full mt-3 py-2 rounded-lg ${
                    product.quantity === 0
                      ? 'bg-gray-400'
                      : 'bg-green-600 text-white'
                  }`}
                >
                  {product.quantity === 0
                    ? "Out of Stock"
                    : isInCart
                    ? "Add More"
                    : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl">

            <h2 className="text-xl font-semibold mb-4">Cart</h2>

            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between mb-3">
                <span>{item.product.name}</span>

                <div className="flex items-center gap-2">
                  <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}>
                    <Minus size={14} />
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 font-bold">
              Total: ₹{getTotalPrice()}
            </div>

            <button
              onClick={() => setShowCart(false)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerMarketplace;
