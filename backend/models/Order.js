
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    wheel: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },

    
paymentStatus: {
  type: String,
  enum: ["Unpaid", "Paid"],
  default: "Unpaid",
},

salesStatus: {
  type: String,
  enum: ["Not Sold", "Sold"],
  default: "Not Sold",
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
