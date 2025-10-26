const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// dotenv configuration
dotenv.config();

// DB connection
connectDB();

// rest object
const app = express();

//  middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

// default route
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Restaurant Server!</h1>");
});

// port
const port = process.env.PORT || 8080;

// listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgGreen);
});
