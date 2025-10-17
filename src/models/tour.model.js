import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  day: Number,
  activities: [String],
});

const tourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    destination: { type: String, required: true },
    duration: String,
    pricePerPerson: { type: Number, required: true },
    itinerary: [itinerarySchema],
    images: [String],
    includedServices: [String],
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
