import mongoose, { isValidObjectId } from "mongoose";
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    booking_type: { type: String, required: true },
    booking_number: { type: String, required: true },
    carrier: { type: String, required: true },
    container_number: { type: String, required: false },
    rate: { type: Number, required: true },
    customer_id: { type: String, required: true },
    in_gate: { type: Boolean, required: true },
    port_of_origin: { type: String, required: true },
    port_of_destination: { type: String, required: false },
    author: { type: String, required: true },
    cars: [
      {
        id: { type: mongoose.ObjectId },
        make: String,
        year: Number,
        color: String,
        vin: String,
        title_status: Boolean,
      },
    ],
    items: [
      {
        type: { type: String },
        id: { type: mongoose.ObjectId },
      },
    ],
    documents: [
      {
        id: { type: mongoose.ObjectId },
        doc_type: String,
        status: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
