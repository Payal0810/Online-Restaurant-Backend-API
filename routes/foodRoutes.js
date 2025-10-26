const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  placeOrderController,
  orderSatusController,
} = require("../controllers/foodController");
const { deleteProfileController } = require("../controllers/userController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// routes

// create food
router.post("/create", authMiddleware, createFoodController);

// get all food
router.get("/getAll", getAllFoodController);

// get food by id
router.get("/get/:id", getSingleFoodController);

// get food by restaurant
router.get("/get/restaurant/:id", getFoodByRestaurantController);

// update food
router.put("/update/:id", authMiddleware, updateFoodController);

// delete food
router.delete("/delete/:id", authMiddleware, deleteProfileController);

// place order
router.post("/placeorder", authMiddleware, placeOrderController);

// order status
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderSatusController
);

module.exports = router;
