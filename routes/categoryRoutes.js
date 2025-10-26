const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

// routes

// create category
router.post("/create", authMiddleware, createCategoryController);

// get all categories
router.get("/getAll", getAllCategoriesController);

// update category
router.put("/update/:id", authMiddleware, updateCategoryController);

// delete category
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
