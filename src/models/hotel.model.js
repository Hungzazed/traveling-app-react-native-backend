import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    description: String,
    rating: { type: Number, default: 0, min: 0, max: 5 },
    pricePerNight: { type: Number, required: true },
    amenities: [String],
    images: [String],
    contactInfo: {
      phone: String,
      email: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
