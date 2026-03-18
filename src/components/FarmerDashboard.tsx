import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Eye, MapPin, Star, Package, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import GoogleTranslate from './GoogleTranslate';

interface FarmerDashboardProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void; // changes 
  onDeleteProduct: (id: string) => void;       // changes 
  onBack: () => void;
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onBack
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    quantity: '',
    unit: 'kg',
    location: '',
    farmerName: 'Rajesh Patil',
    farmerId: 'farmer1',
    image: '',
    description: '',
    organic: false,
    rating: 4.5,
    deliveryAreas: ['Mumbai', 'Pune']
  });

  const grainTypes = ['Rice', 'Wheat', 'Millet', 'Maize', 'Barley', 'Oats', 'Quinoa', 'Sorghum'];
  const units = ['kg', 'quintal', 'ton'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      image:
        formData.image ||
        'https://images.pexels.com/photos/33406/rice-white-rice-grain-food.jpg?auto=compress&cs=tinysrgb&w=800'
    };

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        ...productData
      });
    } else {
      onAddProduct(productData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      price: '',
      quantity: '',
      unit: 'kg',
      location: '',
      farmerName: 'Rajesh Patil',
      farmerId: 'farmer1',
      image: '',
      description: '',
      organic: false,
      rating: 4.5,
      deliveryAreas: ['Mumbai', 'Pune']
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      type: product.type,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      unit: product.unit,
      location: product.location,
      farmerName: product.farmerName,
      farmerId: product.farmerId,
      image: product.image,
      description: product.description,
      organic: product.organic,
      rating: product.rating,
      deliveryAreas: product.deliveryAreas
    });
    setShowAddForm(true);
  };

  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="flex items-center space-x-2 text-gray-600">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-xl font-semibold">Farmer Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <GoogleTranslate />
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </header>

      {/* STATS */}
      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Products</p>
          <h2 className="text-2xl font-bold">{products.length}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Quantity</p>
          <h2 className="text-2xl font-bold">{totalQuantity}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Inventory Value</p>
          <h2 className="text-2xl font-bold">₹{totalValue}</h2>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <img src={product.image} className="h-40 w-full object-cover rounded" />

            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p className="text-sm">{product.type}</p>

            <p className="text-green-600 font-bold">
              ₹{product.price}/{product.unit}
            </p>

            <p className="text-sm">{product.quantity} available</p>

            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 bg-blue-600 text-white p-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => onDeleteProduct(product.id)} // ✅ FIXED DELETE
                className="flex-1 bg-red-600 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-full max-w-lg space-y-4">
            <h2 className="text-lg font-bold">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h2>

            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border p-2"
            />

            <input
              placeholder="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border p-2"
            />

            <input
              placeholder="Quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full border p-2"
            />

            <input
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border p-2"
            />

            <div className="flex justify-end space-x-2">
              <button type="button" onClick={resetForm} className="border px-4 py-2">
                Cancel
              </button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
