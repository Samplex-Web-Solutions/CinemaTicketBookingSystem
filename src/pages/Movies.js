import React from 'react'
import MovieList from '../components/MovieList/MovieList'
import './pages css/Home.css'

const Movies = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Now Showing</h2>
      <MovieList />
    </div>
  )
}

export default Movies
