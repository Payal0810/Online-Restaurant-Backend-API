const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // get token
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "No token provided.",
      });
    }
    const token = authHeader.split(" ")[1];

    // Use promisified version or synchronous verify
    try {
      console.log("JWT_SECRET:", process.env.JWT_SECRET);
      console.log("Token:", token);
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      console.log("Decoded:", decoded);
      req.user = decoded.id;
      next();
    } catch (err) {
      console.log("JWT verification error:", err.message);
      return res.status(401).send({
        success: false,
        message: "Un-authorized user.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Auth middleware",
      error,
    });
  }
};
