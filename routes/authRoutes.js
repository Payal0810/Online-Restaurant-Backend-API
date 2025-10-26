const express = require("express");
const {
  registercontroller,
  loginController,
} = require("../controllers/authControllers");

const router = express.Router();

// routes

// register
router.post("/register", registercontroller);

// login
router.post("/login", loginController);

module.exports = router;
