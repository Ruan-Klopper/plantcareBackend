const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const createError = require("http-errors"); // Added error handling
const logger = require("morgan"); // For logging requests

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(logger("dev")); // Log all requests

// CORS setup for allowing requests from any frontend (public API)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // If you want to allow all origins
    credentials: true,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

// Root route to indicate that the API is up and running
app.get("/", (req, res) => {
  res.send("API is up and running");
});

// API routes
const userRoutes = require("./Routes/UserRoutes");
app.use("/api/users", userRoutes);
const productRoutes = require("./Routes/ProductRoutes");
app.use("/api/products", productRoutes);
const cartRoutes = require("./Routes/cartRoutes");
app.use("/api/carts", cartRoutes);
const plantsRoutes = require("./Routes/PlantsRoutes");
app.use("/api/plants", plantsRoutes);
const appointmentRoutes = require("./Routes/AppointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
