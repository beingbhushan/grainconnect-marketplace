import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import FarmerDashboard from "./components/FarmerDashboard";
import FarmerLogin from "./components/FarmerLogin";
import { Product } from "./types";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "farmer">("home");
  const [farmer, setFarmer] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ✅ LOAD FROM LOCALSTORAGE
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const storedFarmer = localStorage.getItem("farmer");

    if (storedProducts) setProducts(JSON.parse(storedProducts));
    if (storedFarmer) setFarmer(JSON.parse(storedFarmer));
  }, []);

  // ✅ SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (farmer) {
      localStorage.setItem("farmer", JSON.stringify(farmer));
    } else {
      localStorage.removeItem("farmer");
    }
  }, [farmer]);

  // ✅ ADD PRODUCT
  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  // ✅ UPDATE PRODUCT
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // ✅ DELETE PRODUCT
  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ LOGIN
  const handleLogin = (user: any) => {
    setFarmer(user);
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    setFarmer(null);
    setCurrentPage("home");
  };

  return (
    <div>
      {/* HOME */}
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

      {/* FARMER DASHBOARD */}
      {currentPage === "farmer" && farmer && (
        <FarmerDashboard
          products={products}
          farmer={farmer}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onBack={() => setCurrentPage("home")}
        />
      )}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">

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
