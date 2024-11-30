import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle } from "lucide-react";

export default function ShowtimeList({ movieId, onSelectShowtime, onError = () => {} }) {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/showtimes/${movieId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch showtimes');
        }

        const data = await response.json();

        if (data.length === 0) {
          setError('No showtimes available for this movie.');
        } else {
          setShowtimes(data);
        }
      } catch (err) {
        setError('Error fetching showtimes');
        onError(err.message);  // Call the onError function
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, [movieId, onError]);

  if (loading) return <div className="loading">Loading showtimes...</div>;

  if (error) return (
    <div className="error-message">
      <AlertCircle className="h-5 w-5" />
      <div>
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  return (
    <Card className="card">
      <CardHeader className="card-header">
        <CardTitle>Available Showtimes</CardTitle>
      </CardHeader>
      <CardContent className="card-content">
        {showtimes.map((showtime) => (
          <Button
            key={showtime._id}
            onClick={() => onSelectShowtime(showtime._id)}
            className="showtime-button m-2"
          >
            <div>
              {new Date(showtime.datetime).toLocaleString()}
            </div>
            <div>
              Price: ₦{showtime.price} | Seats: {showtime.availableSeats.length} available
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

// PropTypes for type checking
ShowtimeList.propTypes = {
  movieId: PropTypes.string.isRequired,
  onSelectShowtime: PropTypes.func.isRequired,
  onError: PropTypes.func, // Optional
};
