// BookingSummary.js
import React from "react";
import { initializePayment } from "../PaymentInterface/PaymentInterface"; // Adjust path to your module
import './BookingSummary.css'

export default function BookingSummary({
  movieTitle,
  showtime,
  selectedSeats,
  totalPrice,
  onConfirm,
  email,
}) {
  const handleProceedToPayment = () => {
    const paymentReference = `ref_${Math.floor(Math.random() * 1000000000)}`;
    initializePayment(totalPrice, email, paymentReference);
  };

  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>
      <p><strong>Movie:</strong> {movieTitle}</p>
      <p><strong>Showtime:</strong> {showtime}</p>
      <p><strong>Selected Seats:</strong> {selectedSeats.join(", ")}</p>
      <p><strong>Total Price:</strong> {totalPrice}</p>
      
      <button onClick={handleProceedToPayment}>Proceed to Payment</button>
    </div>
  );
}
