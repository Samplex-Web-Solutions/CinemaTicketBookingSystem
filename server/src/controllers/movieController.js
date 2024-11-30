const tmdbService = require('../services/tmdbService')
const Movie = require('../models/Movie')  // Assuming you have a Movie model

exports.getNowPlaying = async (req, res) => {
  try {
    const movies = await tmdbService.getNowPlaying()
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching now playing movies', error: error.message })
  }
}

exports.searchMovies = async (req, res) => {
  try {
    const { query } = req.query
    const movies = await tmdbService.searchMovies(query)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: 'Error searching movies', error: error.message })
  }
}

exports.getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params
    const movieDetails = await tmdbService.getMovieDetails(id)
    
    // Optionally, you can save the movie details to your database
    let movie = await Movie.findOne({ tmdbId: id })
    if (!movie) {
      movie = new Movie({
        tmdbId: movieDetails.id,
        title: movieDetails.title,
        overview: movieDetails.overview,
        posterPath: movieDetails.poster_path,
        releaseDate: movieDetails.release_date,
        runtime: movieDetails.runtime,
        genres: movieDetails.genres.map(genre => genre.name),
        voteAverage: movieDetails.vote_average
      })
      await movie.save()
    }

    res.json(movieDetails)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie details', error: error.message })
  }
}






// const tmdbService = require('../services/tmdbService')

// exports.getTrendingMovies = async (req, res) => {
//   try {
//     const movies = await tmdbService.getTrendingMovies()
//     res.json(movies)
//   } catch (error) {
//     console.error('Error fetching trending movies:', error)
//     res.status(500).json({ message: 'Error fetching trending movies' })
//   }
// }

// exports.getMovieDetails = async (req, res) => {
//   try {
//     const movieId = parseInt(req.params.movieId)
//     const movie = await tmdbService.getMovieDetails(movieId)
//     res.json(movie)
//   } catch (error) {
//     console.error('Error fetching movie details:', error)
//     res.status(500).json({ message: 'Error fetching movie details' })
//   }
// }

// exports.searchMovies = async (req, res) => {
//   try {
//     const query = req.params.query
//     const movies = await tmdbService.searchMovies(query)
//     res.json(movies)
//   } catch (error) {
//     console.error('Error searching movies:', error)
//     res.status(500).json({ message: 'Error searching movies' })
//   }
// }