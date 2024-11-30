// // controllers/PaymentController.js
// const nodemailer = require('nodemailer');

// const sendReceiptEmail = async (userDetails, bookingDetails) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail', // You can choose your preferred service
//         auth: {
//             user: 'your-email@gmail.com', // Your email
//             pass: 'your-email-password',  // Your email password or app password
//         },
//     });

//     const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: userDetails.email,
//         subject: `Booking Receipt for ${bookingDetails.movie}`,
//         text: `
//             Thank you for booking tickets! Here's your receipt:

//             Movie: ${bookingDetails.movie}
//             Showtime: ${bookingDetails.showtime}
//             Selected Seats: ${bookingDetails.selectedSeats.join(', ')}
//             Total Price: $${bookingDetails.totalPrice}

//             If you have any questions, feel free to contact us!
//         `,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Receipt email sent successfully');
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

// module.exports = { sendReceiptEmail };
