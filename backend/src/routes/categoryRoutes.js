// routes/categoryRoutes.js
import express from "express";
import Category from "../models/categoryModel.js";
import Tool from "../models/toolmodel.js";
 

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
   try {
    const categories = await Tool.distinct("category");
    console.log("Distinct Categories:", categories);
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
