const mongoose = require('mongoose');
const { Schema } = mongoose;

const seatSchema = new Schema({
    showtimeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Showtime' },
    seats: [
        {
            row: { type: String, required: true },
            seats: [
                {
                    id: { type: String, required: true },
                    isAvailable: { type: Boolean, required: true }
                }
            ]
        }
    ]
}, { collection: 'seats' });

// Check if the model already exists before defining it again
const Seat = mongoose.models.Seat || mongoose.model('Seat', seatSchema);

module.exports = Seat;
