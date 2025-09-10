

import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Upload, ImageIcon } from "lucide-react";
import "@/pages/styles/AddProductForm.css"
import axios from "axios";

const AddProductForm = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  })

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
    try{
        axios.post("http://localhost:5000/api/add-product",data,{
            headers:{"Content-Type":"multipart/form-data"}
        }).then(res=>{
            console.log("Product added",res.data);
            navigate("/home")
        })
    }catch(err){
        console.error("Error adding product",err);
        navigate("/home")
    }
  }

  return (
    <div className="form-overlay">
      <div className="form-content">
        <h2 className="form-title">Add New Product</h2>
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

export default AddProductForm
