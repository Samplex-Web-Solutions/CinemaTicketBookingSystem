// const express = require('express');
// // routes/payment.js (Node.js)
// const { sendReceiptEmail } = require('../controllers/PaymentController');
// const router = express.Router();



// router.post('/payment-success', async (req, res) => {
//     const { userData, movie, showtime, selectedSeats, price } = req.body;

//     // Simulate payment success
//     const paymentSuccess = true; // Here you can integrate with your payment gateway to verify the payment.

//     if (paymentSuccess) {
//         // Send the receipt email
//         await sendReceiptEmail(userData, {
//             movie: movie.title,
//             showtime,
//             selectedSeats,
//             totalPrice: price,
//         });
//         res.json({ success: true });
//     } else {
//         res.status(400).json({ success: false });
//     }
// });


// module.exports = router;