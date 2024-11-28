// Import the 'jsonwebtoken' library for handling JWT tokens
const jwt = require("jsonwebtoken");

// Import JWT configuration from the '../config' file (including the secret key and expiration time)
const { JWT_KEY, JWT_EXPIRES_IN } = require("../config");

// Load environment variables from a .env file using dotenv package
require("dotenv").config();

// Function to generate a JWT token
const generateToken = (payload) => {
  // `jwt.sign` generates a signed JWT token with a payload, secret key, and expiration time
  return jwt.sign(payload, JWT_KEY, { expiresIn: JWT_EXPIRES_IN });
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    // `jwt.verify` checks if the token is valid using the secret key
    return jwt.verify(token, JWT_KEY);
  } catch (err) {
    // If the token is invalid or expired, throw an error
    throw new Error("Invalid or expired token");
  }
};

// Export the generateToken and verifyToken functions so they can be used in other parts of the app
module.exports = { generateToken, verifyToken };
