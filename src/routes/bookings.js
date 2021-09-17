import express from "express";
const bookingRouter = express.Router();
import Booking from "../models/bookings.model";
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.msc.com/track-a-shipment?agencyPath=mwi");
  await page.screenshot({ path: "screenshot.png" });
  const title = await page.title();
  const url = await page.url();

  console.log(title, url);

  try {
    await page
      .waitForSelector("input")
      .then(() => {
        console.log("succesfully found tag");
      })
      .catch((err) => {
        console.log(err);
      });

    await page
      .$eval("input", (el) => (el.innerText = "038CHI1780520"))
      .then(() => {
        page.mouse.click("1", 1, "");
        console.log(page.title());
      })
      .catch((err) => {
        console.log(err);
      });

    //await page.click(button)
    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();

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

const getOneBooking = (req, res) => {
  id = req.params.id;
  Booking.find()
    .then((booking) => {
      // if (id !== booking.id) {
      //   return res.status(400).json;
      // } else {
      // }
      return res.json(booking.id === id);
    })
    .catch((err) => {
      return res.json;
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
bookingRouter.route("/id").get(getOneBooking);
bookingRouter.route("/").post(addBooking);
bookingRouter.route("/:id").patch(updateInGate);
bookingRouter.route("/:id").delete(deleteBooking);

module.exports = bookingRouter;
