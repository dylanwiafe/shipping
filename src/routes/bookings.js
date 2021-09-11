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

const updateInGate = (req, res) => {
  let id = req.params.id;
  // console.log(req.params);
  try {
    Booking.findByIdAndUpdate(
      id,
      { in_gate: req.body.in_gate },
      { new: true },
      () => {
        return res.json({ message: "your in gate status has been updated" });
      }
    );
  } catch (error) {
    return res
      .status(400)
      .json({ message: "the attempt to update the status has failed" + err });
  }
};

const deleteBooking = (req, res) => {
  let id = req.params.id;

  try {
    Booking.findByIdAndDelete(id, () => {
      return res.status(200).json({ message: "efnwbnfjebj" });
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "cannot find an object with the id" + error });
  }
};
bookingRouter.route("/").get(getAllBookings);
bookingRouter.route("/").post(addBooking);
bookingRouter.route("/:id").patch(updateInGate);
bookingRouter.route("/:id").delete(deleteBooking);

module.exports = bookingRouter;
