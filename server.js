const express = require('express');
const app = express();
const PORT = 3000;

// Import hospital routes
const hospitalRoutes = require('./routes/hospitalRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use the hospital routes
app.use('/hospitals', hospitalRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
