const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Paystack = require('paystack-api');
const showtimeRoutes = require('./src/routes/showtimeRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const { v4: uuidv4 } = require('uuid');
const router = express.Router(); 

const priceroutes = require('../server/src/routes/priceroutes'); // Import movie routes


//Paystack Secret Key
const PAYSTACK_SECRET_KEY = 'sk_test_aad7dda2d572af2ec88e758c97572241f47bc47e'; // Replace with your Paystack secret key



const app = express();
const paystack = Paystack(PAYSTACK_SECRET_KEY); // Use your actual Paystack secret key

// Middleware to parse JSON requests
app.use(bodyParser.json());  // Ensure JSON payloads are parsed
app.use(cors()); // Enable CORS for all routes

app.use('/api', priceroutes); 


//Webhook endpoint to receive payment notifications from Paystack
app.post('/paystack-webhook', async (req, res) => {
  const sig = req.headers['x-paystack-signature'];
  const payload = JSON.stringify(req.body);

  // Verify the signature to ensure the request is from Paystack
  const isValidSignature = verifyPaystackSignature(payload, sig);

  if (!isValidSignature) {
    return res.status(400).send('Invalid signature');
  }

  // Handle the Paystack event
  const event = req.body;

  //Check the event type (e.g., payment.successful)
  if (event.event === 'charge.success') {
    const transaction = event.data;

    const paymentStatus = transaction.status;
    const amount = transaction.amount / 100; // Amount is sent in kobo, so we divide by 100 to get NGN
    const reference = transaction.reference;

    if (paymentStatus === 'success') {
      console.log(`Payment of NGN ${amount} was successful. Reference: ${reference}`);
    } else {
      console.log(`Payment failed or was declined. Reference: ${reference}`);
    }
  }
  res.status(200).send('Webhook received successfully');
});

// Helper function to verify Paystack's webhook signature
const verifyPaystackSignature = (payload, signature) => {
  const secret = PAYSTACK_SECRET_KEY;
  const hash = crypto.createHmac('sha512', secret).update(payload).digest('hex');
  return hash === signature;
};

//Connect to MongoDB directly using Mongoose
mongoose.connect('mongodb://localhost:27017/cinema-ticket-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Routes for Showtimes, Bookings, and Auth
app.use('/api', showtimeRoutes);  // Showtime routes
app.use('/api', bookingRoutes);   // Booking routes

// Route to initiate payment
app.post('/api/pay', async (req, res) => {
  const { amount, email } = req.body;

  try {
    const transaction = await paystack.transaction.initialize({
      amount: amount * 100, // Paystack expects amount in kobo (1 Naira = 100 Kobo)
      email: email, // Customer's email address
      currency: 'NGN', // Specify the currency (NGN for Naira)
    });

    res.json({
      message: 'Payment Initialized',
      data: transaction.data.authorization_url, // Redirect URL for Paystack payment page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing payment', error: error.message });
  }
});

// Booking confirmation email using Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'magicmoviescinema@gmail.com',  // Replace with your email
    pass: 'magicmoviescinema1@',   // Replace with your email password or app-specific password
  },
});


const sendBookingConfirmationEmail = async (userEmail, movieTitle, showtime, seats) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Replace with your email
    to: userEmail,
    subject: 'Booking Confirmation - Movie Ticket',
    text: `Dear User,

    Your booking for the movie "${movieTitle}" at showtime "${showtime}" is confirmed!

    Seats: ${seats.join(", ")}

    Thank you for booking with us!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Mock movie data (you would fetch this from a database)
const mockMovies = [
  { id: 1, title: 'Movie Title', price: 3000 },
  { id: 2, title: 'Another Movie', price: 2500 },
];

// Handle booking confirmation
app.post('/api/bookings', async (req, res) => {
  const { showtimeId, selectedSeats, email } = req.body;

  const movie = mockMovies.find(movie => movie.id === showtimeId);

  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  try {
    await sendBookingConfirmationEmail(email, movie.title, showtimeId, selectedSeats);
    return res.status(200).json({ message: 'Booking confirmed and email sent.' });
  } catch (error) {
    console.error('Error during booking process:', error);
    return res.status(500).json({ message: 'Failed to send confirmation email' });
  }
});


//send Mail on contact form 
app.use(express.json());

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // Set up your email transporter (using Nodemailer)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "magicmoviescinema@gmail.com", // your email
      pass: "gltn eomh vbbz zvcc",    // your email password or app password
    },
  });

  const mailOptions = {
    from: email,
    to: "magicmoviescinema@gmail.com", // The email where messages should be sent
    subject: `Message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      return res.status(500).json({ success: false, message: "Failed to send message" });
    }
    res.status(200).json({ success: true, message: "Message sent successfully" });
  });
});

//payment success router
router.post('/payment-success', async (req, res) => {
  const { userData, movie, showtime, selectedSeats, price } = req.body;

  const transactionId = uuidv4();
  const totalAmount = selectedSeats.length * price;

  // Send confirmation email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'magicmoviescinema@gmail.com',
      pass: 'magicmoviescinema1@',
    },
  });

  const mailOptions = {
    from: 'magicmoviescinema@gmail.com',
    to: userData.email,
    subject: 'Booking Confirmation',
    text: `Hello ${userData.name},\n\n
      Your booking has been confirmed!\n\n
      Movie: ${movie.title}\n
      Showtime: ${showtime.datetime}\n
      Location: ${showtime.location}\n\n
      Selected Seats: ${selectedSeats.join(', ')}\n\n
      Total Amount: $${totalAmount}\n\n
      Transaction ID: ${transactionId}\n\n
      Thank you for choosing our cinema!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, transactionId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});