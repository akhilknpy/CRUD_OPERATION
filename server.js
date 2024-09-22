const express = require('express');
const app = express();
const hospitalRoutes = require('./routes/hospitals'); // Import your router
const PORT = 3000;

// Middleware to parse JSON data in the request body
app.use(express.json());

// Use the hospital router for any routes that start with /hospitals
app.use('/hospitals', hospitalRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
