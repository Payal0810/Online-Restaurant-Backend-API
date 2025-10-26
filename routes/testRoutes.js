const express = require("express");
const { userController } = require("../controllers/testController");

// router object
const router = express.Router();

// routes
router.get("/test-user", userController);

// export
module.exports = router;
