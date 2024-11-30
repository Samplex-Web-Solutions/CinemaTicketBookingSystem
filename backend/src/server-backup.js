// server.js
const express = require('express');
const connectDB = require('./db'); // Ensure this path is correct
const dotenv = require('dotenv');

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import the routes
const movieRoutes = require('./routes/movieRoutes');

// Use the routes
app.use('/api/movies', movieRoutes); // Prefix added

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Cinema Ticket Booking API is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
