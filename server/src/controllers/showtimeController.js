// const Showtime = require('../models/showtime');

// exports.getAllShowtimes = async (req, res) => {
//   try {
//     const showtimes = await Showtime.find().populate('movie');
//     res.json(showtimes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getShowtimesByMovie = async (req, res) => {
//   try {
//     const { movieId } = req.params;
//     const { date } = req.query;
    
//     let query = { movie: movieId };
//     if (date) {
//       const startDate = new Date(date);
//       const endDate = new Date(date);
//       endDate.setDate(endDate.getDate() + 1);
//       query.datetime = { $gte: startDate, $lt: endDate };
//     }
    
//     const showtimes = await Showtime.find(query).populate('movie');
//     res.json(showtimes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createShowtime = async (req, res) => {
//   try {
//     const showtime = new Showtime(req.body);
//     await showtime.save();
//     res.status(201).json(showtime);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.updateShowtime = async (req, res) => {
//   try {
//     const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!showtime) {
//       return res.status(404).json({ message: 'Showtime not found' });
//     }
//     res.json(showtime);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.deleteShowtime = async (req, res) => {
//   try {
//     const showtime = await Showtime.findByIdAndDelete(req.params.id);
//     if (!showtime) {
//       return res.status(404).json({ message: 'Showtime not found' });
//     }
//     res.json({ message: 'Showtime deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };