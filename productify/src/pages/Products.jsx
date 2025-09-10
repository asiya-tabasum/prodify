
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./Loading";
import axios from "axios";
import "@/pages/styles/Products.css";

export default function ProductListings({ admin, searchQuery = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        console.log("products", response.data);
        setProducts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p._id !== id));
  };

 
  const displayedProducts =
    searchQuery.trim() === ""
      ? products
      : products.filter(
          (product) =>
            product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Error Loading Products</h2>
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="product-listings">
      <div className="product-container">
        <header className="listings-header">
          <h1>Our Products</h1>
          <p>Discover amazing products at great prices</p>
        </header>

        <div className="product-grid">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((p) => (
              <ProductCard key={p._id} product={p} admin={admin} onDelete={handleDelete}/>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
