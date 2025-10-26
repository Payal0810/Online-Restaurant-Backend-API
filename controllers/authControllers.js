const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// register controller
const registercontroller = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    // validation
    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please fill al the fields.",
      });
    }

    // check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already registered. Please login.",
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error in Registration API.",
    });
  }
};

// login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    // check user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Succesful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registercontroller, loginController };
