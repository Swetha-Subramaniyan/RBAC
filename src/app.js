// Import necessary libraries
const express = require("express");  // Express framework to create the server and handle routing
const dotenv = require("dotenv");  // dotenv package to manage environment variables
const authRoutes = require("./routes/auth.routes");  // Import authentication-related routes
const userRoutes = require("./routes/user.routes");  // Import user-related routes
const adminRoutes = require("./routes/admin.routes");  // Import admin-related routes

// Load environment variables from a .env file (e.g., for DB connection, server port)
dotenv.config();

// Initialize an Express application
const app = express();

// Middleware to parse incoming JSON data in request bodies
app.use(express.json());

// Set up the routes
app.use("/api", authRoutes);  // Authentication-related routes will be prefixed with '/api'
app.use("/admin", adminRoutes);  // Admin-related routes will be prefixed with '/admin'
app.use("/user", userRoutes);  // User-related routes will be prefixed with '/user'

// Define the port on which the server will listen (either from environment variable or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  // Log a message to confirm the server is running
});
