// Define an asynchronous function to handle user welcome messages
const welcomeMessage = async (req, res) => {
  try {
    // Send a success response with a status code of 200
    // and a JSON object containing a welcome message
    res.status(200).json({ message: "Welcome, User" });
  } catch (err) {
    // Log the error to the console for debugging purposes
    console.error(err);

    // Send an error response with a status code of 500
    // and a JSON object containing an error message
    return res.status(500).json({ error: "Failed to login as a user" });
  }
};

// Export the welcomeMessage function so it can be used in other parts of the application
module.exports = { welcomeMessage };
