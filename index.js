// Storage Web Service for Render
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Store for data (in-memory storage)
let storedData = null;

// GET endpoint to retrieve stored data
app.get('/', (req, res) => {
  if (storedData === null) {
    res.status(404).json({ message: 'No data has been stored yet' });
  } else {
    // Return the stored data and clear it
    const data = storedData;
    storedData = null;
    res.json(data);
  }
});

// POST endpoint to store data
app.post('/', (req, res) => {
  // Store whatever was sent
  storedData = req.body;
  res.json({
    message: 'Data stored successfully',
    timestamp: new Date().toISOString()
  });
});

// Status endpoint
app.get('/status', (req, res) => {
  res.json({
    message: 'Service is running',
    dataStored: storedData !== null,
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Storage service listening on port ${port}`);
});
