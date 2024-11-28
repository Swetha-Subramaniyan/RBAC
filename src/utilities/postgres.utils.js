// Import the Pool constructor from the 'pg' (PostgreSQL) module to manage database connections
const { Pool } = require("pg");

// Import database connection configuration from the '../config' file
const { PSQL_PWD, PSQL_USER, PSQL_DB, PSQL_HOST, PSQl_PORT } = require("../config");

// Create a new Pool instance for connecting to the PostgreSQL database
const conn = new Pool({
  host: PSQL_HOST,           // Database host (e.g., localhost or a remote server)
  port: PSQl_PORT,           // Port to connect to the database (usually 5432 for PostgreSQL)
  database: PSQL_DB,         // Database name to connect to
  user: PSQL_USER,           // Database username
  password: "1234",          // Database password (it’s recommended to avoid hardcoding sensitive data like passwords)
});

// Export the `query` method and `connect` method to be used in other parts of the application
module.exports = {
  // `query`: Executes SQL queries, accepting the query text and parameters
  query: (text, params) => conn.query(text, params), 

  // `connect`: Establishes a connection to the PostgreSQL database (returns a promise or a connection object)
  connect: () => conn.connect(),
};
