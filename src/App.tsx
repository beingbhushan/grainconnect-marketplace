import React, { useState } from "react";
import HomePage from "./components/HomePage";
import FarmerDashboard from "./components/FarmerDashboard";
import FarmerLogin from "./components/FarmerLogin";
import { Product } from "./types";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "farmer">("home");
  const [farmer, setFarmer] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);


  // 🔹 Add product
  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  // 🔹 Login
  const handleLogin = (user: any) => {
    setFarmer(user);
  };

  // 🔹 Logout
  const handleLogout = () => {
    setFarmer(null);
  };

  return (
    <div>
      {currentPage === "home" && (
       <HomePage 
  onNavigate={(page) => {
    if (page === "farmer") {
      setShowLoginModal(true);
    } else {
      setCurrentPage(page);
    }
  }} 
/>

      )}

      {currentPage === "farmer" && (
        farmer ? (
          <FarmerDashboard
            products={products}
            onAddProduct={handleAddProduct}
            onBack={() => setCurrentPage("home")}
            farmer={farmer}
            onLogout={handleLogout}
          />
        ) : (
          <FarmerLogin onLogin={handleLogin} />
        )
      )}

      {showLoginModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md relative">

      {/* Close Button */}
      <button
        onClick={() => setShowLoginModal(false)}
        className="absolute top-2 right-2 text-gray-500"
      >
        ✕
      </button>

      <FarmerLogin 
        onLogin={(user) => {
          handleLogin(user);
          setShowLoginModal(false);
          setCurrentPage("farmer");
        }} 
      />
    </div>
  </div>
)}

    </div>
  );
}

export default App;
