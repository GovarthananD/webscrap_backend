const express = require("express");
const router = express.Router();
const productModule = require("./productSchema.js");
const { getData } = require("./webscrap.js");

router.post("/scrap", async (req, res) => {
  try {
    const data = await getData("mobiles");
    const insertedProducts = await productModule.insertMany(data);
    res.status(201).send({
      message: "product created successfully",
      products: insertedProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal server error " + e.message });
  }
});

router.get("/getProducts", async (req, res) => {
  try {
    await productModule
      .find()
      .then((data) => {
        res.status(200).send({
          message: "Product has been retrived successfully",
          data: data,
        });
      })
      .catch((error) => {
        res
          .status(400)
          .send({ message: "Error while retrieving products", error });
      });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal server error" + e.message });
  }
});

module.exports = router;
