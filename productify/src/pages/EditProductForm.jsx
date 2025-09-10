

import { useState,useEffect } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Upload, ImageIcon } from "lucide-react";
import "@/pages/styles/AddProductForm.css"
import axios from "axios";

const EditProductForm = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const {id} = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  })

  
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
     
      axios.put(`http://localhost:5000/api/edit-product/${id}`)
        .then(res => {
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

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data=new FormData();
    Object.keys(formData).forEach((key)=>{
        data.append(key,formData[key])
    })
    if (!formData.image && location.state?.product?.imageUrl) {
    data.append("existingImage", location.state.product.imageUrl);
  }
    try{
        axios.put(`http://localhost:5000/api/edit-product/${id}`,data,{
            headers:{"Content-Type":"multipart/form-data"}
        }).then(res=>{
            console.log("Product edited",res.data);
            navigate("/home")
        })
    }catch(err){
        console.error("Error editing product",err);
        navigate("/home")
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="form-title">Edit Product</h2>
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
                onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                onChange={handleChange}
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
                  onChange={handleChange}
                />
                <div className="file-input-display">
                  <ImageIcon className="file-icon" size={20} />
                  <span className="file-text">
                    {formData.image ? formData.image.name : "Choose image file or drag and drop"}
                  </span>
                  <Upload className="upload-icon" size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={()=>navigate("/home")}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductForm
