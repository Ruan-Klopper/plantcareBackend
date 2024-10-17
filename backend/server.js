const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// CORS setup for allowing requests from the frontend
app.use(
  cors({
    origin: "*",
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
