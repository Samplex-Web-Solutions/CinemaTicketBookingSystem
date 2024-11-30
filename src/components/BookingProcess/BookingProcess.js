import React, { useState } from "react";
import ShowtimeList from "../ShowtimeList/ShowtimeList";
import SeatMap from "../SeatMap/SeatMap";
import BookingSummary from "../BookingSummary/BookingSummary";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle } from "lucide-react";
import { initializePayment } from "../PaymentInterface/PaymentInterface"; // Correct the path if necessary

export default function BookingProcess({
  movieId,
  movieTitle,
  onBookingComplete,
}) {
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const price = 4000; // Price per seat (can be dynamic from DB)
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState(null);
  const [confirmationDetails, setConfirmationDetails] = useState(null);
  const userEmail = "apostlesamuelking@gmail.com"; // Replace with dynamic user email

  const handleShowtimeSelect = (showtimeId) => {
    setSelectedShowtime(showtimeId);
    setSelectedSeats([]);
    setConfirmationDetails(null);
  };c

  const handleBookingConfirm = async () => {
    if (selectedShowtime && selectedSeats.length > 0) {
      const totalPrice = calculateTotalPrice(price); // Calculate total price based on selected seats

      try {
        const response = await fetch("http://localhost:5000/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            showtimeId: selectedShowtime,
            selectedSeats,
            email: userEmail,  // Send email to backend
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setConfirmationDetails({
          message: "Your booking was successful!",
          showtime: selectedShowtime,
          seats: selectedSeats,
        });

        // Proceed to payment
        initializePayment(
          totalPrice,
          userEmail,
          `ref_${Math.floor(Math.random() * 1000000000)}`
        );
      } catch (error) {
        console.error("Error confirming booking:", error);
        setError("Failed to complete booking. Please try again.");
      }
    } else {
      alert("Please select a showtime and at least one seat.");
    }
  };

  // Calculate total price based on selected seats
  const calculateTotalPrice = (pricePerSeat) => {
    return selectedSeats.length * pricePerSeat;
  };

  return (
    <Card className="card">
      <CardHeader className="card-header">
        <CardTitle>Book Your Tickets</CardTitle>
      </CardHeader>
      <CardContent className="card-content">
        {error && (
          <div className="alert-error">
            <AlertCircle className="h-5 w-5 mr-2" />
            <div>
              <strong className="font-semibold">Error:</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {confirmationDetails && (
          <div className="alert-success">
            <strong className="font-semibold">Booking Confirmed!</strong>
            <p>{confirmationDetails.message}</p>
            <p>
              <strong>Showtime ID:</strong> {confirmationDetails.showtime}
            </p>
            <p>
              <strong>Seats:</strong> {confirmationDetails.seats.join(", ")}
            </p>
          </div>
        )}

        {!selectedShowtime ? (
          <ShowtimeList
            movieId={movieId}
            onSelectShowtime={handleShowtimeSelect}
          />
        ) : (
          <>
            <SeatMap
              showtimeId={selectedShowtime}
              onSelectSeats={setSelectedSeats}
            />

            <BookingSummary
              movieTitle={movieTitle}
              showtime={selectedShowtime}
              selectedSeats={selectedSeats}
              totalPrice={calculateTotalPrice(price)}
              onConfirm={handleBookingConfirm}
              email={userEmail} // Send email to backend
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
