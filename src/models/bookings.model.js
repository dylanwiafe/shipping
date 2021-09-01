import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    booking_number: { type: String, required: true },
    container_number: { type: String, required: false },
    carrier: { type: String, required: true },
    cargo_type: { type: String, required: true },
    rate: { type: Number, required: true },
    customer_id: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
