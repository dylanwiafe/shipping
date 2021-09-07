import express from "express";
import mongoose from "mongoose";
//bookings routers
import "dotenv/config";
import bookingRouter from "./src/routes/bookings";
const app = express();

app.listen(8081, () => {
  console.log("the app is listening");
});

const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri)
  .then((res) => {
    console.log("you have connected to the database");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(
    "a connection with your mongodb atlas database has been established"
  );
});

app.use(express.json());
app.use("/bookings/", bookingRouter);

export default app;
