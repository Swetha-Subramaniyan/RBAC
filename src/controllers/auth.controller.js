// Import bcrypt for password hashing
const bcrypt = require("bcrypt");
// Import database connection utility
const conn = require("../utilities/postgres.utils");
// Import token generation utility
const { generateToken } = require("../utilities/token.utils");

// Register function to handle user registration
const register = async (req, res) => {
  // Destructure required fields from the request body
  const { username, email, password, role } = req.body;

  try {
    // Hash the user's password with a salt of 10 rounds
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // SQL query to insert a new user into the database
    const query = `
      INSERT INTO users (username, email, password, role, created_at)
      VALUES ($1, $2, $3, $4, NOW()) RETURNING id, username, role;
    `;

    // Execute the query with parameterized inputs
    const result = await conn.query(query, [username, email, hashedPassword, role]);

    // Respond with the newly created user's ID, username, and role
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    // Log any errors that occur
    console.error(err);
    // Respond with a 500 status and error message in case of failure
    return res.status(500).json({ error: "Failed to register user" });
  }
};

// Login function to handle user authentication
const login = async (req, res) => {
  // Destructure required fields from the request body
  const { email, password } = req.body;

  try {
    // SQL query to find a user by their email
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await conn.query(query, [email]);

    // Check if no user is found
    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Get the user details from the query result
    const user = result.rows[0];

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, respond with an error
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token for the authenticated user
    const token = generateToken({ id: user.id, role: user.role });

    // Respond with the token and user details
    return res.status(200).json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    // Log any errors that occur
    console.error(err);
    // Respond with a 500 status and error message in case of failure
    return res.status(500).json({ error: "Login failed" });
  }
};

// Export the register and login functions
module.exports = { register, login };
