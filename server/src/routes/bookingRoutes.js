const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Import mongoose
const { ObjectId } = require('mongodb');
const Seat = require('../models/SeatModel'); // Replace with the correct path

router.post('/bookings', async (req, res) => {
    const { showtimeId, selectedSeats } = req.body; // Use selectedSeats here

    // Check if `selectedSeats` is provided and is an array
    if (!selectedSeats || !Array.isArray(selectedSeats)) {
        return res.status(400).json({ message: "Selected seats must be provided and should be an array." });
    }

    try {
        const seatData = await Seat.findOne({ showtimeId: new mongoose.Types.ObjectId(showtimeId) });

        if (!seatData) {
            return res.status(404).json({ message: "Seats not found for this showtime." });
        }

        // Check seat availability and update as needed
        const unavailableSeats = [];
        seatData.seats.forEach((row) => {
            row.seats.forEach((seat) => {
                if (selectedSeats.includes(seat.id)) {
                    if (!seat.isAvailable) {
                        unavailableSeats.push(seat.id); // Collect unavailable seats
                    } else {
                        seat.isAvailable = false; // Mark seat as booked
                    }
                }
            });
        });

        if (unavailableSeats.length > 0) {
            return res.status(400).json({ message: `Seats ${unavailableSeats.join(', ')} are already booked.` });
        }

        await seatData.save();
        res.status(200).json({ message: "Booking confirmed!" });
    } catch (error) {
        console.error('Error confirming booking:', error.message);
        res.status(500).json({ message: "Error confirming booking", error: error.message });
    }
});

module.exports = router;
