import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Booking from './pages/Booking'
import MovieDetails from "./components/MovieDetails/MovieDetails"
import About from './pages/About'
import Footer from './components/Footer/Footer'
import './globals.css'
import ContactUs from './pages/ContactUs'

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/booking/:movieId" element={<Booking />} />
          <Route path='/about'element ={<About/>} />
          <Route path='/contact'element ={<ContactUs/>} />
          <Route path=''element ={<Footer/>} />
        </Routes>
      </div>
    </Router>
  )
}
