const express = require('express');
const router = express.Router();
const db = require('../../index');  // Adjust path if needed

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Showtime = require('../models/showtime'); // Assuming your Showtime model is set up correctly
//const Seats = require('../models/seats');       // Import Seats model if you have it

// Route to get showtimes by movieId
router.get('/showtimes/:movieId', async (req, res) => {
    const { movieId } = req.params;

    try {
        const showtimes = await Showtime.find({ movieId });
        if (showtimes.length === 0) {
            return res.status(404).json({ message: "No showtimes available for this movie." });
        }
        res.json(showtimes);
    } catch (error) {
        console.error('Error fetching showtimes:', error);
        res.status(500).json({ message: 'Server error fetching showtimes' });
    }
});


// Routes For seat display

// Inline schema for seats
const seatSchema = new mongoose.Schema({
    showtimeId: { type: ObjectId, required: true },
    seats: [
        {
            row: String,
            seats: [
                {
                    id: String,
                    isAvailable: Boolean,
                },
            ],
        },
    ],
}, { collection: 'seats' }); // Use the seats collection

// Create a temporary Seats model using the schema above
const Seat = mongoose.model('Seat', seatSchema);

// Route to get available seats for a specific showtime
router.get('/seats/:showtimeId', async (req, res) => {
    const { showtimeId } = req.params;

    try {
        // Ensure the showtimeId is a valid ObjectId
        if (!ObjectId.isValid(showtimeId)) {
            return res.status(400).json({ message: 'Invalid showtime ID' });
        }

        // Fetch seats for the specified showtimeId
        const seatData = await Seat.findOne({ showtimeId: new ObjectId(showtimeId) });

        if (!seatData) {
            return res.status(404).json({ message: 'Seats not found for this showtime' });
        }

        res.json(seatData);
    } catch (error) {
        console.error('Error fetching seats:', error);
        res.status(500).json({ message: 'Error fetching seats', error: error.message });
    }
});

module.exports = router;
