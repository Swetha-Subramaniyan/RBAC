// Define an asynchronous function to handle a request and send a response
const welcomeMessage = async (req, res) => {
  try {
    // If the request is successful, send a status 200 response with a JSON message
    res.status(200).json({ message: "Welcome, Admin" });
  } catch (err) {
    // Log any error that occurs to the console for debugging purposes
    console.error(err);
    // Return a status 500 response with an error message in case of a failure
    return res.status(500).json({ error: "Failed to login as an Admin" });
  }
};

// Export the welcomeMessage function so it can be used in other parts of the application
module.exports = { welcomeMessage };
