const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');
require("dotenv").config();

const app = express();
const routes= require("./routes/routes")
app.use(express.json());
app.use(cors())
app.use("/api",routes)

app.get("/", (req, res) => {
  res.send("Hello from Backend 🚀");
});
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
