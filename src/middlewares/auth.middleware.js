// Import the utility function for verifying JWT tokens
const { verifyToken } = require("../utilities/token.utils");

// Middleware function to authenticate a user based on a token
const authenticate = (req, res, next) => {
  // Retrieve the token from the Authorization header (format: "Bearer <token>")
  const token = req.headers.authorization?.split(" ")[1];
  
  // If no token is found, return a 401 Unauthorized response
  if (!token) return res.status(401).json({ error: "Access denied, no token provided" });

  try {
    // Verify the token and decode the user information
    const decoded = verifyToken(token);
    
    // Attach the decoded user information to the request object for later use
    req.user = decoded; 
    
    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return a 403 Forbidden response
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Middleware function to authorize a user based on their role
const authorize = (roles) => {
  return (req, res, next) => {
    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      // If the role is not authorized, return a 403 Forbidden response
      return res.status(403).json({ error: "Access denied, insufficient permissions" });
    }
    // If the role is authorized, call the next middleware or route handler
    next();
  };
};

// Export the authentication and authorization middleware functions
module.exports = { authenticate, authorize };
