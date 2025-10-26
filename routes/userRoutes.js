const express = require("express");
const {
  getuserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// routes
// get user
router.get("/getuser", authMiddleware, getuserController);

// update profile
router.put("/updateUser", authMiddleware, updateUserController);

// update password
router.post("/updatePassword", authMiddleware, updatePasswordController);

// reset password
router.post("/resetPassword", authMiddleware, resetPasswordController);

// delete user
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;
