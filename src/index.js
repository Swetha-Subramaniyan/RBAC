// Load environment variables from the .env file
require("dotenv").config();

// Import the 'http' module, which is used to create an HTTP server
const http = require("http");

// Import the Express app (configured in 'app.js')
const app = require("./app");

// Import the PostgreSQL utility (for database connection or query handling)
const pool = require("./utilities/postgres.utils");

// Destructure the port value from the config (this is typically from a .env file or a config file)
const { PORT } = require("./config");

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Server listens on the provided PORT (from config or fallback to default) and starts the app
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
