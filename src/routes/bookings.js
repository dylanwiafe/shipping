import express from "express";
const bookingRouter = express.Router();
import Booking from "../models/bookings.model";
addBooking = (req, res) => {
  // declare our booking object
  let newBooking = new Booking({
    booking_number: req.body.booking_number,
    container_number: req.body.container_number,
    carrier: req.body.carrier,
    rate: req.body.rate,
    customer_id: req.body.customer_id,
    author: req.body.author,
    cargo_type: req.body.cargo_type,
  });
  // do a find on our Data
  newBooking
    .save()
    .then(() => {
      res.json({ message: "a new booking has been added", newBooking });
    })
    .catch((err) => {
      res.status(400).json({ message: "the item could not be added" });
    });
  // return it in json format
};

bookingRouter.route("/").post(addBooking);
module.exports(bookingRouter);
