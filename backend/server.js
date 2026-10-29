
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8"]);


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);




// BMW EXECUTIVE STUDIO API
app.get("/", (req, res) => {
  res.send("BMW EXECUTIVE STUDIO Backend is Running!");
});

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("BMW MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed:", error.message);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`BMW Backend running on port ${PORT}`);
});
