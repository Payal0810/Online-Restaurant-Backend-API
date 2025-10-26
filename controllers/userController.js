const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// get user info
const getuserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById(req.user).select("-password");
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // hide password
    user.password = undefined;

    // response
    res.status(200).send({
      success: true,
      message: "User get successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user API.",
    });
  }
};

// update user
const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById(req.user).select("-password");
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    // update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user API",
    });
  }
};

// update user password
const updatePasswordController = async (req, res) => {
  try {
    //  find user
    const user = await userModel.findById(req.user);

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old or new password.",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Password API.",
      error,
    });
  }
};

// reset password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields.",
      });
    }
    //  find user
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(500).send({
        success: true,
        message: "User not found or invalid answer.",
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Reset password successful!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in password reset api.",
      error,
    });
  }
};

// delete profile account
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Your account has been deleted.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete profile api",
      error,
    });
  }
};

module.exports = {
  getuserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
