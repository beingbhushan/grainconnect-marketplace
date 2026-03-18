import React, { useState } from 'react';
import { Wheat, Users, MapPin, ShoppingCart, Plus, Filter, Star, Truck } from 'lucide-react';
import HomePage from './components/HomePage';
import FarmerDashboard from './components/FarmerDashboard';
import CustomerMarketplace from './components/CustomerMarketplace';
import { Product, User } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'farmer' | 'customer'>('home');
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Basmati Rice',
      type: 'Rice',
      price: 85,
      quantity: 500,
      unit: 'kg',
      location: 'Nashik, Maharashtra',
      farmerId: 'farmer1',
      farmerName: 'Rajesh Patil',
      image: 'https://images.pexels.com/photos/33406/rice-white-rice-grain-food.jpg?auto=compress&cs=tinysrgb&w=800',
      description: 'High-quality basmati rice directly from farm. Aged for perfect aroma and taste.',
      organic: true,
      rating: 4.8,
      deliveryAreas: ['Mumbai', 'Pune']
    },
    {
      id: '2',
      name: 'Golden Wheat',
      type: 'Wheat',
      price: 32,
      quantity: 1000,
      unit: 'kg',
      location: 'Solapur, Maharashtra',
      farmerId: 'farmer2',
      farmerName: 'Priya Sharma',
      image: 'https://images.pexels.com/photos/1586985/pexels-photo-1586985.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Fresh wheat harvest with high protein content. Perfect for making rotis and bread.',
      organic: false,
      rating: 4.6,
      deliveryAreas: ['Mumbai', 'Pune']
    },
    {
      id: '3',
      name: 'Organic Jowar',
      type: 'Millet',
      price: 45,
      quantity: 200,
      unit: 'kg',
      location: 'Ahmednagar, Maharashtra',
      farmerId: 'farmer3',
      farmerName: 'Amit Deshmukh',
      image: 'https://images.pexels.com/photos/7456013/pexels-photo-7456013.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Nutritious organic jowar, rich in fiber and minerals. Gluten-free and healthy.',
      organic: true,
      rating: 4.9,
      deliveryAreas: ['Mumbai', 'Pune']
    },
    {
      id: '4',
      name: 'Yellow Maize',
      type: 'Maize',
      price: 28,
      quantity: 800,
      unit: 'kg',
      location: 'Kolhapur, Maharashtra',
      farmerId: 'farmer4',
      farmerName: 'Suresh Jadhav',
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Fresh yellow maize corn, perfect for animal feed and food processing.',
      organic: false,
      rating: 4.4,
      deliveryAreas: ['Mumbai', 'Pune']
    },
    {
      id: '5',
      name: 'Pearl Barley',
      type: 'Barley',
      price: 55,
      quantity: 300,
      unit: 'kg',
      location: 'Satara, Maharashtra',
      farmerId: 'farmer5',
      farmerName: 'Meera Kulkarni',
      image: 'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Premium pearl barley, excellent for soups, stews, and healthy cooking.',
      organic: true,
      rating: 4.7,
      deliveryAreas: ['Mumbai', 'Pune']
    },
    {
      id: '6',
      name: 'Rolled Oats',
      type: 'Oats',
      price: 75,
      quantity: 150,
      unit: 'kg',
      location: 'Pune, Maharashtra',
      farmerId: 'farmer6',
      farmerName: 'Kiran Bhosale',
      image: 'https://images.pexels.com/photos/216951/pexels-photo-216951.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Healthy rolled oats, perfect for breakfast and baking. Rich in fiber and protein.',
      organic: true,
      rating: 4.8,
      deliveryAreas: ['Mumbai', 'Pune']
    },
    {
      id: '7',
      name: 'Red Quinoa',
      type: 'Quinoa',
      price: 320,
      quantity: 50,
      unit: 'kg',
      location: 'Nashik, Maharashtra',
      farmerId: 'farmer7',
      farmerName: 'Anita Pawar',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Premium red quinoa, superfood with complete protein profile. Gluten-free and nutritious.',
      organic: true,
      rating: 4.9,
      deliveryAreas: ['Mumbai', 'Pune']
    },
    {
      id: '8',
      name: 'White Sorghum',
      type: 'Sorghum',
      price: 42,
      quantity: 400,
      unit: 'kg',
      location: 'Aurangabad, Maharashtra',
      farmerId: 'farmer8',
      farmerName: 'Ganesh Patil',
      image: 'https://images.pexels.com/photos/7456013/pexels-photo-7456013.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Traditional white sorghum grain, drought-resistant crop with excellent nutritional value.',
      organic: false,
      rating: 4.5,
      deliveryAreas: ['Mumbai', 'Pune']
    },
    {
      id: '9',
      name: 'Brown Rice',
      type: 'Rice',
      price: 65,
      quantity: 600,
      unit: 'kg',
      location: 'Ratnagiri, Maharashtra',
      farmerId: 'farmer9',
      farmerName: 'Sunita Sawant',
      image: 'https://images.pexels.com/photos/33406/rice-white-rice-grain-food.jpg?auto=compress&cs=tinysrgb&w=800',
      description: 'Healthy brown rice with bran intact. Rich in fiber, vitamins, and minerals.',
      organic: true,
      rating: 4.6,
      deliveryAreas: ['Mumbai', 'Pune']
    },
    {
      id: '10',
      name: 'Finger Millet (Ragi)',
      type: 'Millet',
      price: 58,
      quantity: 250,
      unit: 'kg',
      location: 'Sangli, Maharashtra',
      farmerId: 'farmer10',
      farmerName: 'Ramesh Shinde',
      image: 'https://images.pexels.com/photos/7456013/pexels-photo-7456013.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Nutritious finger millet (ragi), excellent source of calcium and iron. Perfect for healthy diet.',
      organic: true,
      rating: 4.8,
      deliveryAreas: ['Mumbai', 'Pune']
    }
  ]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'home' && (
        <HomePage onNavigate={setCurrentView} />
      )}
      {currentView === 'farmer' && (
        <FarmerDashboard 
          products={products} 
          onAddProduct={addProduct}
          onBack={() => setCurrentView('home')}
        />
      )}
      {currentView === 'customer' && (
        <CustomerMarketplace 
          products={products}
          onBack={() => setCurrentView('home')}
        />
      )}
    </div>
  );
}

export default App;