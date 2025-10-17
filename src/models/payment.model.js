import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer", "cash"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },
    transactionId: String,
    paidAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
