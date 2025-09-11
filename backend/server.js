const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');
require("dotenv").config();

const app = express();
const productRoutes= require("./routes/routes")
const authRoutes=require("./routes/authRoutes")

app.use(express.json());
app.use(cors())
app.use("/api",productRoutes)
app.use("/api/auth",authRoutes)


app.get("/", (req, res) => {
  res.send("From Backend");
});
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
