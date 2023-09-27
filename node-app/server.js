const express = require('express');
const app = express();
const port = process.env.PORT; // You can change the port number as needed

// Define a route for handling GET requests
app.get('/', (req, res) => {
  res.send('Hello, World! sachin gupta'+ process.env.PORT); // Send a simple response
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port-sachin ${port}`);
});