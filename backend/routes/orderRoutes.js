
const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const User = require("../models/User");

const router = express.Router();

// Verify customer authentication
const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ")
      ? header.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({
        message: "Please sign in to place an order.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Customer account not found.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired login. Please sign in again.",
    });
  }
};

// Create a BMW order
router.post("/", requireAuth, async (req, res) => {
  try {
    const { carName, color, wheel } = req.body;

    if (
      typeof carName !== "string" ||
      typeof color !== "string" ||
      typeof wheel !== "string" ||
      !carName.trim() ||
      !color.trim() ||
      !wheel.trim()
    ) {
      return res.status(400).json({
        message: "Please select a car, color, and wheels.",
      });
    }

    const order = await Order.create({
      customer: req.user._id,
      carName: carName.trim(),
      color: color.trim(),
      wheel: wheel.trim(),
      price: "Price pending confirmation",
    });

    res.status(201).json({
      message: "BMW order request submitted successfully!",
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      message: "Unable to create order.",
    });
  }
});

// View the signed-in customer's orders
router.get("/my", requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({
      message: "Unable to load orders.",
    });
  }
});

module.exports = router;
