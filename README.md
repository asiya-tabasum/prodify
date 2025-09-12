# Prodify

[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-yellow)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)

**Demo video**: https://1drv.ms/v/c/159D7BDBBDD69B89/Ef6V6Kaeq65OjsW6M_NZFxIBleKtjH-h5OY-K1FPyl1_tg

**Prodify** is a **Product Management Application** that allows users to **perform CRUD operations** on products. It is built using **React + Vite** for the frontend, **Node.js + Express.js** for the backend, and **MongoDB** as the database. This application is designed for **e-commerce product management** and helps admin users easily add, edit, and delete products.

---

## **Features**

* User-friendly **Admin dashboard** to manage products.
* **Search functionality** for product categories.
* **CRUD operations**: Create, Read, Update, Delete products.
* **Admin access control** with password verification.
* Responsive UI with **flexible layout for desktop and mobile**.
* Built using modern **React + Vite** frontend and **Node.js + Express.js** backend.

---

## **Tech Stack**

**Frontend:**

* React
* Vite
* CSS (No frameworks)

**Backend:**

* Node.js
* Express.js
* MongoDB (Mongoose ORM)

**Other Tools:**

* VSCode / WebStorm
* Postman (for API testing)

---

## **Getting Started**

### **Frontend Setup**

```bash
cd productify
npm install
npm run dev
````

1. Create a `.env` file in the `productify` root with the following variable:

```env
VITE_API_URL=http://localhost:5000
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the frontend.

---

### **Backend Setup**

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend root with the following variables:

```env
MONGODB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

4. Start the server:

```bash
nodemon server.js
```

The backend runs on [http://localhost:5000](http://localhost:5000) by default.

---

## **Folder Structure**

```text
Prodify/
├── backend/
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── server.js      # Main backend server
│   └── .env           # Environment variables
├── productify/        # Frontend (Vite + React)
│   ├── src/
│   │   ├── pages/     # Header, Products, modals
│   │   ├── styles/    # CSS files
│   │   └── App.jsx
│   ├── .env           # Frontend API URL
│   └── index.html
├── .gitignore
└── README.md
```

---

## **Usage**

* Toggle Admin mode to access **Add/Edit/Delete** products.
* Use the search bar to filter products by category.
* Click on **Products** to navigate to the main product listing page.

---

## **Future Enhancements**

* Add **user authentication and roles** (Admin vs User).
* Implement **file/image uploads** for products using Cloudinary.
* Add **pagination and filters** for large product lists.
* Integrate **real-time notifications** for product updates.

---

## **License**

This project is **MIT Licensed**.

```
