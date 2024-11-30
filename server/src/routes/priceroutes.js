const express = require('express');
const router = express.Router();
const { getMoviePrice } = require('../models/price'); // Import controller

// Route to get price of a movie by its ID
router.get('/movie/:id/price', async (req, res) => {
  const movieId = req.params.id;
  try {
    const price = await getMoviePrice(movieId); // Fetch price from the controller
    res.json({ price }); // Send the price back as a response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie price' });
  }
});

module.exports = router;
