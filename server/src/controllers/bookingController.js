const Booking = require('../models/booking');
const Showtime = require('../models/showtime');

exports.createBooking = async (req, res) => {
  try {
    const { showtimeId, seats } = req.body;
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }
    
    const booking = new Booking({
      user: req.user._id,
      showtime: showtimeId,
      seats,
      totalAmount: seats.length * showtime.price
    });
    
    await booking.save();
    
    // Update available seats
    showtime.availableSeats = showtime.availableSeats.filter(seat => !seats.includes(seat));
    await showtime.save();
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('showtime');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('showtime');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    Object.assign(booking, req.body);
    await booking.save();
    
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    const showtime = await Showtime.findById(booking.showtime);
    showtime.availableSeats = [...showtime.availableSeats, ...booking.seats];
    await showtime.save();
    
    await booking.remove();
    
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};