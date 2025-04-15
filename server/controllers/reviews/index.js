import express from "express";
import postModel from "../../models/Posts/Posts.js";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    let reviews = await postModel.find({});
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let review = await postModel.findOne({ _id: userParams });
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.post("/create", async (req, res) => {
  try {
    let userData = req.body;
    await postModel.create(userData);
    res.status(200).json({ msg: "Review created 📖" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let userData = req.body;
    await postModel.updateOne({ _id: userParams }, { $set: userData });
    res.status(200).json({ msg: "Review updated." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    await postModel.deleteOne({ _id: userParams });
    res.status(200).json({ msg: "Review deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.delete("/deleteall/", async (req, res) => {
  try {
    await postModel.deleteMany({});
    res.status(200).json({ msg: "All Reviews deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

export default router;
