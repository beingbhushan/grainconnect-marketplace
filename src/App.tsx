import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import FarmerDashboard from './components/FarmerDashboard';
import { Product } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'farmer' | 'customer'>('home');
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('products');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Fake login
  const handleFarmerLogin = () => {
    setUser({ id: 'farmer1', name: 'Rajesh Patil' });
    setView('farmer');
  };

  // ADD
  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };

    setProducts((prev) => [...prev, newProduct]);
  };

  // UPDATE
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // DELETE
  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // HOME
  if (view === 'home') {
    return (
      <HomePage
        onNavigate={(v) => {
          if (v === 'farmer') handleFarmerLogin();
          else setView(v);
        }}
      />
    );
  }

  // FARMER DASHBOARD
  if (view === 'farmer' && user) {
    return (
      <FarmerDashboard
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onBack={() => setView('home')}
      />
    );
  }

  // CUSTOMER (placeholder)
  if (view === 'customer') {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Customer side coming soon 🚧</h1>
        <button
          onClick={() => setView('home')}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return null;
};

export default App;
