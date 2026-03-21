import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, MapPin, Star, Package, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import GoogleTranslate from './GoogleTranslate';

interface FarmerDashboardProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateProduct: (product: Product) => void;
  onBack: () => void;
  farmer: any;
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
  onUpdateProduct,
  onBack,
  farmer
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const getInitialFormData = () => ({
    name: '',
    type: '',
    price: '',
    quantity: '',
    unit: 'kg',
    location: '',
    farmerName: farmer.name,
    farmerId: farmer.id,
    image: '',
    description: '',
    organic: false,
    rating: 4.5,
    deliveryAreas: ['Mumbai', 'Pune']
  });

  const [formData, setFormData] = useState(getInitialFormData());

  const grainTypes = ['Rice', 'Wheat', 'Millet', 'Maize', 'Barley', 'Oats', 'Quinoa', 'Sorghum'];
  const units = ['kg', 'quintal', 'ton'];

  // ✅ FILTER farmer-wise
  const myProducts = products.filter(p => p.farmerId === farmer.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      image:
        formData.image ||
        'https://images.pexels.com/photos/33406/rice-white-rice-grain-food.jpg'
    };

    if (editingProduct) {
      onUpdateProduct({ ...editingProduct, ...productData });
    } else {
      onAddProduct(productData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      price: product.price.toString(),
      quantity: product.quantity.toString()
    });
    setShowAddForm(true);
  };

  const totalValue = myProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const totalQuantity = myProducts.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="flex items-center space-x-2 text-gray-600">
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl font-semibold">Farmer Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">
              👨‍🌾 {farmer.name}
            </span>

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
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl">
          <p>Total Products</p>
          <h2 className="text-2xl font-bold">{myProducts.length}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl">
          <p>Total Quantity</p>
          <h2 className="text-2xl font-bold">{totalQuantity}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl">
          <p>Total Value</p>
          <h2 className="text-2xl font-bold">₹{totalValue}</h2>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4">
        {myProducts.length === 0 ? (
          <div className="text-center py-10">
            <p>No products yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {myProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-xl">
                <img src={product.image} className="h-40 w-full object-cover rounded" />

                <h3 className="font-bold mt-2">{product.name}</h3>

                <p>₹{product.price}/{product.unit}</p>
                <p>{product.quantity} available</p>

                <div className="flex justify-between mt-3">
                  <button onClick={() => handleEdit(product)}>
                    <Edit2 />
                  </button>

                  <button onClick={() => onDeleteProduct(product.id)}>
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl mb-4">
              {editingProduct ? 'Edit' : 'Add'} Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border p-2"
              />

              <input
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border p-2"
              />

              <input
                placeholder="Quantity"
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

              <div className="flex gap-3">
                <button type="submit" className="bg-green-600 text-white px-4 py-2">
                  Save
                </button>

                <button type="button" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
