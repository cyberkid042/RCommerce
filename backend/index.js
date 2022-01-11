require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const UserRoute = require("./routes/user");
const ProductRoute = require("./routes/product");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");
const AuthRoute = require("./routes/auth/auth");
const StripeRoute = require("./routes/stripe");

const app = express();
app.use(express.json());
app.use(cors());

//start DB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected successfully ");
  })
  .catch((error) => {
    console.log(error);
  });

//Routes
app.use("/api/user", UserRoute);
app.use("/api/product", ProductRoute);
app.use("/api/cart", CartRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/order", OrderRoute);
app.use("/api/pay", StripeRoute);

//start connection
const port = process.env.APP_PORT || 5000;

app.listen(port, () => {
  console.log("App started on port", port);
});
