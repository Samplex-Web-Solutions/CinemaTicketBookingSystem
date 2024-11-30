const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  overview: String,
  posterPath: String,
  releaseDate: Date,
  runtime: Number,
  genres: [String],
  voteAverage: Number
});

module.exports = mongoose.model('Movie', movieSchema);