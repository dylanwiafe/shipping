import express from "express";
const app = express();
import mongoose from "mongoose";
//bookings routers
import "dotenv/config";

app.listen(8081, () => {
  console.log("the app is listening");
});
const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
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
