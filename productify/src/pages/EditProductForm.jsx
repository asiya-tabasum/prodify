import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Upload, ImageIcon } from "lucide-react";
import "@/pages/styles/AddProductForm.css";
import axios from "axios";
import NotificationModal from "@/pages/modals/NotificationModal";

const API_URL = import.meta.env.VITE_API_URL;

const EditProductForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  useEffect(() => {
    if (location.state?.product) {
      const product = location.state.product;
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: null, 
      });
    } else {
      axios.get(`${API_URL}/api/product/${id}`).then((res) => {
        const product = res.data;
        setFormData({
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          image: null,
        });
      });
    }
  }, [id, location.state]);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    if (!formData.name || !formData.price || !formData.category) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

   
    if (!formData.image && location.state?.product?.imageUrl) {
      data.append("existingImage", location.state.product.imageUrl);
    }

    try {
      const res = await axios.put(`${API_URL}/api/edit-product/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Product edited", res.data);

      setModalMessage("Product has been updated successfully!");
      setShowModal(true);
    } catch (err) {
      console.error("Error editing product", err);
      const message =
        err.response?.data?.message ||
        "Failed to edit product. Please try again.";
      setModalMessage(message);
      setShowModal(true);
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    if (modalMessage === "Product has been updated successfully!") {
      navigate("/home");
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-content">
        <h2 className="form-title">Edit Product</h2>

        {errorMessage && <div className="form-error">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleTextChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  Price *
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  className="form-input"
                  value={formData.price}
                  onChange={handleTextChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleTextChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="home">Home & Garden</option>
                  <option value="books">Books</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleTextChange}
                rows="3"
                placeholder="Enter product description..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Product Image
              </label>
              <div className="file-input-wrapper">
                <input
                  id="image"
                  type="file"
                  name="image"
                  className="file-input"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="file-input-display">
                  <ImageIcon className="file-icon" size={20} />
                  <span className="file-text">
                    {formData.image
                      ? formData.image.name
                      : location.state?.product?.imageUrl
                      ? "Current image will be kept"
                      : "Choose image file or drag and drop"}
                  </span>
                  <Upload className="upload-icon" size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Save Product
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <NotificationModal title={modalMessage} onConfirm={handleModalConfirm} />
      )}
    </div>
  );
};

export default EditProductForm;
