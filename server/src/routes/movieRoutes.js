// movieRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../models/Movie'); // Adjust the path as necessary

// Route to get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find(); // Fetch all movies from the database
        res.json(movies); // Send the movies as a response
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Route to get a specific movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ success: false, message: 'Invalid movie ID' });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/now-showing', async (req, res) => {
    try {
        const nowShowingMovies = await Movie.find({}); // You can add a filter if needed, e.g., based on the release date or status
        res.json(nowShowingMovies);
    } catch (error) {
        console.error('Error fetching now showing movies:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;