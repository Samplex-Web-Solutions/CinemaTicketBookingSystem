import React from 'react'
import { useParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm/BookingForm'

const Booking = () => {
  const { movieId } = useParams()

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Book Tickets</h2>
      <BookingForm movieId={movieId} />
    </div>
  )
}

export default Booking