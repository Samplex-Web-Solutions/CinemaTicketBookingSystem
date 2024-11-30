import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingForm({ movie, showtime, selectedSeats, price }) {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Proceed to payment and simulate success
    const paymentSuccess = await proceedToPayment();
    if (paymentSuccess) {
      // Send booking info to backend to trigger email
      await sendBookingConfirmation(userData, movie, showtime, selectedSeats, price);
    } else {
      alert("Payment failed. Please try again.");
    }
  };

  const proceedToPayment = async () => {
    // Simulate successful payment. Implement Paystack or another payment gateway here.
    return true; 
  };

  const sendBookingConfirmation = async (userData, movie, showtime, selectedSeats, price) => {
    try {
      const response = await fetch("http://localhost:5000/api/payment-success", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData,
          movie,
          showtime,
          selectedSeats,
          price,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Payment successful. Check your email for confirmation!");
        navigate("/confirmation"); // Redirect to confirmation page
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an issue processing your payment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={userData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Your Phone Number"
        value={userData.phone}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email Address"
        value={userData.email}
        onChange={handleInputChange}
        required
      />
    </form>
  );
}


