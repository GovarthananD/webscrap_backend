const express = require("express");
require("dotenv").config();
const db = require("./DB");
const { getData } = require("./webscrap");
const cors = require("cors");

const userRoute = require("./userRoute");

const app = express();
app.use(express.json());
app.use(cors());

db();

app.use(userRoute);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
