const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const router = require("./router/register&login");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/account", router);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
  })
  .catch((err) => console.log(err));
