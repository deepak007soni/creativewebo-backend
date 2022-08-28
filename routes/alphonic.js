const express = require("express");
const Alphon = require("../model/alphonicModel");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    let body = req.body; // POST and PUT
    // mongoose schema
    await validator.numbervalidationCheck(body.price);
    let doc = await product.save(); // main function to call and save the obj
    res.json(doc);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    let userData = req.body;
    let Alp = new Alphon();

    Alp.name = userData.name;
    Alp.email = userData.email;
    Alp.date = userData.date;
    Alp.image = userData.image;
    Alp.isActive = true;

    let doc = await Alp.save();

    return res.status(200).json({
      message: "data created successfully",
      data: doc,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let data = await Alphon.findOne({
      _id: req.params.id,
    });
    if (data)
      return res.status(200).json({
        message: "data successfully fetched",
        data: data,
      });
    else
      return res.status(400).json({
        message: "Not Found",
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
});
router.get("/list/getAll", async (req, res) => {
  try {
    let data = await Alphon.find({});

    if (data) {
      return res.status(200).json({
        message: "data successfully fetched",
        data: data,
      });
    } else
      return res.status(400).json({
        message: "Not Found",
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
});
router.get("/delete/:id", async (req, res) => {
  try {
    let data = await Alphon.find({});

    if (data) {
      let data = await Alphon.deleteOne({
        _id: req.params.id,
      });

      return res.status(200).json({
        message: "data successfully fetched",
        data: data,
      });
    } else
      return res.status(400).json({
        message: "Not Found",
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
});
router.post("/update/:id", async (req, res) => {
  try {
    let userData = req.body;
    let data = await Alphon.find({});

    if (data) {
      let data = await Alphon.updateOne(
        {
          _id: req.params.id,
        },
        {
          $set: {
            name: userData.name,
            email: userData.email,
          },
        },
        { upsert: true }
      );

      return res.status(200).json({
        message: "data successfully fetched",
        data: data,
      });
    } else
      return res.status(400).json({
        message: "Not Found",
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
});



module.exports = router;
