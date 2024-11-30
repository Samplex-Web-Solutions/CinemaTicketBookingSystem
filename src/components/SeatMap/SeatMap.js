import React, { useEffect, useState } from 'react';
import './SeatMap.css'; // Ensure your CSS file path is correct

export default function SeatMap({ showtimeId, onSelectSeats }) {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]); // Track selected seats
    const [error, setError] = useState(null);

    useEffect(() => {
        if (showtimeId) {
            fetchSeats(showtimeId);
        }
    }, [showtimeId]);

    const fetchSeats = async (showtimeId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/seats/${showtimeId}`);
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error fetching seats: ${response.status} - ${errorMessage}`);
            }
            const data = await response.json();
            setSeats(data.seats); // `data.seats` is an array of seat rows
        } catch (error) {
            console.error("Error fetching seats:", error.message);
            setError(error.message);
        }
    };

    // Handle seat selection
    const toggleSeatSelection = (rowId, seatId) => {
        const seatIdentifier = `${rowId}-${seatId}`;
        setSelectedSeats((prevSelectedSeats) =>
            prevSelectedSeats.includes(seatIdentifier)
                ? prevSelectedSeats.filter(seat => seat !== seatIdentifier) // Deselect if already selected
                : [...prevSelectedSeats, seatIdentifier] // Select new seat
        );
        onSelectSeats(selectedSeats); // Update parent with selected seats
    };

    return (
        <div>
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="seat-map">
                {seats.map((row) => (
                    <div key={row.row} className="seat-row">
                        <span className="row-label">{row.row}</span>
                        {row.seats.map((seat) => (
                            <button
                                key={seat.id}
                                className={`seat ${seat.isAvailable ? 'available' : 'unavailable'} ${
                                    selectedSeats.includes(`${row.row}-${seat.id}`) ? 'selected' : ''
                                }`}
                                disabled={!seat.isAvailable}
                                onClick={() => toggleSeatSelection(row.row, seat.id)}
                            >
                                {seat.id}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
