const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    datetime: { type: Date, required: true },
    availableSeats: { 
        type: [[String]], // Array of arrays for seat layout
        required: true 
    },
    price: { type: Number, required: true }, // Add price field
    // Other fields as necessary
});

module.exports = mongoose.model('Showtimes', showtimeSchema);
