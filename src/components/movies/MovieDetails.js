import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Cast from './Cast';
import MovieContext from '../../context/movie/movieContext';

import './MovieDetails.css';

const MovieDetails = () => {
  const movieContext = useContext(MovieContext);
  const { getMovieDetails, movieDetails, getMovieCasts, movieCasts } =
    movieContext;
  const {
    backdrop_path,
    original_title,
    tagline,
    vote_average,
    genres,
    release_date,
    overview,
    poster_path,
  } = movieDetails;

  //grab id from url
  const { id } = useParams();

  useEffect(() => {
    // console.log('useEffect ran');
    getMovieDetails(id);
    getMovieCasts(id);
  }, []);

  const movieBackdropUrl = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;

  // get year from release_year string
  const release_year = release_date?.split('-')[0];

  return (
    <section>
      <div
        className='container-lg my-3 moviePosterContainer'
        style={{
          backgroundImage: `url('${movieBackdropUrl}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className='row my-5 g-0 align-items-center  justify-content-around'>
          <div className='detailLeft col-lg-4 '>
            <img
              src={moviePosterUrl}
              className='rounded mx-auto d-block py-5'
              alt=''
              style={{ width: '300px' }}
            />
          </div>

          <div className='detailRight col-lg-6 text-light'>
            <h2 className='fw-bold'>
              {original_title}
              <span className='fw-normal h5 px-3'>{release_year}</span>
            </h2>

            <h4 className='fst-italic fw-light'>{tagline}</h4>
            <p className='voteAverage'>Score: {vote_average}</p>
            <p>Release Date: {release_date}</p>

            <p>
              Genres:{` `}
              {genres &&
                genres.map((genre) => (
                  <span className='badge pill bg-info mx-1' key={genre.id}>
                    {genre.name}
                  </span>
                ))}
            </p>
            <p>
              <br />
              <h3 className='fw-bold'>Overview:</h3>
              <p className='lh-sm'>{overview}</p>
            </p>
          </div>
        </div>
      </div>

      {/* cast list */}
      <div className='container-lg'>
        <h3 className='my-5'>{movieCasts.length < 1 ? '' : 'Top cast'}</h3>
        <div className='row my-5 g-0 align-items-center justify-content-around'>
          {movieCasts.map((castItem) => (
            <div className='col-sm-6 col-md-4 col-lg-2 '>
              <Cast castItem={castItem} key={id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
