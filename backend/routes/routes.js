
const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { cloudinary, uploadToCloudinary } = require("../config/cloudinary");
const upload = require("../middleware/upload");

router.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    let imageData = null;
    if (req.file?.buffer) {
      imageData = await uploadToCloudinary(req.file.buffer, "products");
    }

    const product = new Product({
      ...req.body,
      imageUrl: imageData?.url || null,
      imagePublicId: imageData?.public_id || null,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});


router.delete("/delete-product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

   
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});


router.put("/edit-product/:id", upload.single("image"), async (req, res) => {
  try {
    console.log("req",req)
    const { name, price, category, description } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const updateData = { name, price, category, description };

    console.log("updated data",updateData)

    if (req.file?.buffer) {
      
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      
      const imageData = await uploadToCloudinary(req.file.buffer, "products");
      updateData.imageUrl = imageData.url;
      updateData.imagePublicId = imageData.public_id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    console.log("updated",updatedProduct)

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
