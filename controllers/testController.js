const userController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "User route is working fine",
    });
  } catch (error) {
    console.log("Error in userController:", error);
  }
};

module.exports = { userController };
