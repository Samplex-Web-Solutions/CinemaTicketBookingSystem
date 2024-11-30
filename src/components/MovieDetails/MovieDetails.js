import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';
import BookingProcess from '../BookingProcess/BookingProcess';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Clock, Calendar, Star, Film } from "lucide-react";
import './MovieDetails.css';
import Footer from '../Footer/Footer';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isBooking, setIsBooking] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await tmdbApi.get(`/movie/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleBookingComplete = (showtimeId, selectedSeats) => {
        console.log(`Booking completed for showtime ${showtimeId}, seats: ${selectedSeats.join(', ')}`);
        setIsBooking(false);
    };

    const handleSubmitUserData = () => {
        if (userData.name && userData.phone && userData.email) {
            setShowModal(false);
            setIsBooking(true); // Show seat selection process
        } else {
            alert('Please fill all fields.');
        }
    };

    if (!movie) return <p>Loading...</p>;

    return (
        <div className='dev'>
            <Card className="card w-full max-w-3xl mx-auto">
            <CardHeader className="card-header">
                <CardTitle className="card-title">{movie.title}</CardTitle>
                <CardDescription className="card-description">{movie.tagline}</CardDescription>
            </CardHeader>
            <CardContent className="card-content">
                <div className="image-container">
                    <img 
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'fallback-image-url.jpg'}
                        alt={movie.title}
                        className="movie-poster"
                    />
                </div>
                <div className="movie-details">
                    <p>{movie.overview}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="details-row">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Release Date: {new Date(movie.release_date).toLocaleDateString()}</span>
                        </div>
                        <div className="details-row">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Runtime: {movie.runtime} minutes</span>
                        </div>
                        <div className="details-row">
                            <Star className="mr-2 h-4 w-4" />
                            <span>Rating: {movie.vote_average.toFixed(1)}/10</span>
                        </div>
                        <div className="details-row">
                            <Film className="mr-2 h-4 w-4" />
                            <span>Genre: {movie.genres.map(g => g.name).join(', ')}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-center items-center p-4 bg-gray-100 rounded-b-lg">
                {!isBooking ? (
                    <Button className="button w-full" onClick={() => setShowModal(true)}>
                        Book Tickets
                    </Button>
                ) : (
                    <BookingProcess movieId={id} onBookingComplete={handleBookingComplete} />
                )}
            </CardFooter>

            {/* Modal Popup for User Data Form */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2><strong>Enter Your Information</strong></h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                        <div className="modal-actions">
                            <Button onClick={handleSubmitUserData}>continue Booking</Button>
                            <Button onClick={() => setShowModal(false)}>Cancel</Button>
                        </div>
                    </div>
                </div>
            )}
          
        </Card>
        <Footer />
        </div>
        
    );
};

export default MovieDetails;
