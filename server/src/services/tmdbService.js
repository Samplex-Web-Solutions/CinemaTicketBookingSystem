const { MovieDb } = require('moviedb-promise')

const tmdb = new MovieDb('e55c664a851becfcb5e583f174db283c')

const tmdbService = {
  getNowPlaying: async (page = 1) => {
    try {
      const response = await tmdb.movieNowPlaying({ page })
      console.log('API Response:', JSON.stringify(response, null, 2))
      return response.results
    } catch (error) {
      console.error('Error fetching now playing movies:', error.message)
      throw error
    }
  },

  searchMovies: async (query, page = 1) => {
    try {
      const response = await tmdb.searchMovie({ query, page })
      return response.results
    } catch (error) {
      console.error('Error searching movies:', error.message)
      throw error
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const response = await tmdb.movieInfo({ id: movieId })
      return response
    } catch (error) {
      console.error('Error fetching movie details:', error.message)
      throw error
    }
  }
}

// Test function
async function testTmdbService() {
  try {
    console.log('Fetching Now Playing Movies...')
    const nowPlaying = await tmdbService.getNowPlaying()
    console.log('Now Playing Movies:', nowPlaying.length)
    if (nowPlaying.length > 0) {
      console.log('First movie:', JSON.stringify(nowPlaying[0], null, 2))
    } else {
      console.log('No movies returned')
    }

    console.log('\nSearching for "Avengers"...')
    const searchResults = await tmdbService.searchMovies('Avengers')
    console.log('Search Results:', searchResults.length)
    if (searchResults.length > 0) {
      console.log('First result:', JSON.stringify(searchResults[0], null, 2))
    } else {
      console.log('No search results returned')
    }

    console.log('\nFetching Movie Details for ID 24428 (The Avengers)...')
    const movieDetails = await tmdbService.getMovieDetails(24428)
    console.log('Movie Details:', JSON.stringify(movieDetails, null, 2))
  } catch (error) {
    console.error('Error in testTmdbService:', error.message)
  }
}

testTmdbService()