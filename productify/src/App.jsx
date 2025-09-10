import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Title from "@/pages/Title";
import Header from "@/pages/Header";
import AddProductForm from "@/pages/AddProductForm";
import EditProductForm from "@/pages/EditProductForm"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/home" element={<Header />} />
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/edit-product/:id" element={<EditProductForm/>} />
      </Routes>
    </Router>
  )
}

export default App
