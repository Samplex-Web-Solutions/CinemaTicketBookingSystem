const Movie = require('../models/showtime'); // Assuming you have a Movie model

// Fetch the price of a movie by its ID
const getMoviePrice = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie.price; // Return the price of the movie
  } catch (error) {
    console.error('Error fetching movie price:', error);
    throw error;
  }
};

module.exports = { getMoviePrice };
