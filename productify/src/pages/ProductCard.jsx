import { useState } from "react";
import {useNavigate} from "react-router-dom"
import "@/pages/styles/ProductCard.css";
import axios from 'axios';
import {Pencil, Trash2} from "lucide-react";
import ConfirmModal from "@/pages/modals/ConfirmModal";

export default function ProductCard({ product,onDelete,admin }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate=useNavigate();

  const confirmDelete = async() => {
   
      try {
        await axios.delete(`http://localhost:5000/api/delete-product/${product._id}`);
       
        onDelete(product._id);
        setShowDeleteModal(false);
        
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Error deleting product");
        setShowDeleteModal(false);
      }
    
  };

  const handleEdit = ()=>{
    console.log("in product card",product);
    navigate(`/edit-product/${product._id}`,{state:{product}})
  }

  const handleDelete=()=>{
    setShowDeleteModal(true)
  }
  const handleAddToCart= ()=>{
    console.log("product added to cart",product.name)
  }

  return (
    <div className="product-card">
      {admin && (
        <div className="admin-actions">
          <button  onClick={handleEdit}>
            <Pencil size={18} />
          </button>
          <button onClick={handleDelete}>
            <Trash2 size={18} />
          </button>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <ConfirmModal
          title={`Are you sure you want to delete?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      <div className="product-image-container">
        {!imageLoaded && !imageError && (
          <div className="image-placeholder">
            <div className="loading-shimmer"></div>
          </div>
        )}
        {imageError ? (
          <div className="image-error">
            <span>Image not available</span>
          </div>
        ) : (
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            className={`product-image ${imageLoaded ? "loaded" : ""}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
