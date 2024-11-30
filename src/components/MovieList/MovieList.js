import React, { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import { Link } from "react-router-dom";
import './MovieList.css';
import Footer from "../Footer/Footer";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdbApi.get("/movie/now_playing");
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
   <div>
     <div className="movie-list-container">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
              <Link to={`/movies/${movie.id}`} className="movie-link">            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </Link>
        </div>
      ))}
      
    </div>
    <Footer />
   </div>
  );
};

export default MovieList;









// import React, { useEffect, useState } from "react";
// import tmdbApi from "../../api/tmdbApi";
// import { Link } from "react-router-dom";
// import './MovieList.css';

// const MovieList = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await tmdbApi.get("/movie/now_playing");
//         setMovies(response.data.results);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   return (
//     <div className="movie-list-container">
//       {movies.map((movie) => (
//         <div key={movie.id} className="movie-card">
//           <Link to={`/movies/${movie.id}`} className="movie-link">
//             <img
//               src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//               alt={movie.title}
//             />
//             <h3>{movie.title}</h3>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MovieList;
