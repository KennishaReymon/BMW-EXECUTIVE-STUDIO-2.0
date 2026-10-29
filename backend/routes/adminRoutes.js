
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Order = require("../models/Order");

const router = express.Router();

// Verify administrator authentication
const requireAdmin = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ")
      ? header.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({
        message: "Administrator login required.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Account not found.",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Administrator access only.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired session.",
    });
  }
};

// Get all customer orders
router.get("/orders", requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    console.error("Admin orders error:", error);
    res.status(500).json({
      message: "Unable to load customer orders.",
    });
  }
});

// Update order status
router.patch("/orders/:id/status", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.json({
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid order ID.",
      });
    }

    console.error("Update order error:", error);
    res.status(500).json({
      message: "Unable to update order.",
    });
  }
});


/* ADMIN — UPDATE PAYMENT & SALES STATUS */

router.patch("/orders/:id/tracking", requireAdmin, async (req, res) => {
  try {
    const { paymentStatus, salesStatus } = req.body;

    const updates = {};

    if (paymentStatus !== undefined) {
      if (!["Unpaid", "Paid"].includes(paymentStatus)) {
        return res.status(400).json({
          message: "Invalid payment status.",
        });
      }
      updates.paymentStatus = paymentStatus;
    }

    if (salesStatus !== undefined) {
      if (!["Not Sold", "Sold"].includes(salesStatus)) {
        return res.status(400).json({
          message: "Invalid sales status.",
        });
      }
      updates.salesStatus = salesStatus;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No tracking changes provided.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.json({
      message: "Tracking updated successfully.",
      order,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid order ID.",
      });
    }

    console.error("Tracking update error:", error);

    res.status(500).json({
      message: "Unable to update tracking.",
    });
  }
});




module.exports = router;
