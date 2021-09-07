import express from "express";
const bookingRouter = express.Router();
import Booking from "../models/bookings.model";

let addBooking = (req, res) => {
  // declare our booking object
  const newBooking = new Booking({
    booking_type: req.body.booking_type,
    booking_number: req.body.booking_number,
    carrier: req.body.carrier,
    container_number: req.body.container_number,
    rate: req.body.rate,
    customer_id: req.body.customer_id,
    in_gate: req.body.in_gate,
    port_of_origin: req.body.port_of_origin,
    author: req.body.author,
    cars: req.body.cars,
    items: req.body.items,
    documents: req.body.documents,
  });
  // do a find on our Data
  console.log(newBooking);
  // console.log("rate: " + req.body.rate);
  newBooking
    .save()
    .then(() => {
      res.json({
        message: "a new booking has been added",
        booking: newBooking,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: "the item could not be added, " + err });
    });
  // return it in json format
};

const getAllBookings = (req, res) => {
  // console.log(res);

  Booking.find()
    .then((bookings) => {
      return res.json(bookings);
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: "bookings could not be retrieved" });
    });
};

bookingRouter.route("/").get(getAllBookings);
bookingRouter.route("/").post(addBooking);
module.exports = bookingRouter;
