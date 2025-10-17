import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    type: {
      type: String,
      enum: ["transport", "food", "guide", "ticket", "other"],
      default: "other",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
