import { useReducer } from 'react';
import axios from 'axios';
import MovieContext from './movieContext';
import MovieReducer from './movieReducer';
import {
  GET_MOVIES,
  SET_LOADING,
  SEARCH_MOVIES,
  GET_MOVIEDETAILS,
  GET_MOVIECASTS,
} from '../types';

//initial state
const MovieState = (props) => {
  const initialState = {
    popularMovies: [],
    movieSearchResults: [],
    movieDetails: {},
    movieCasts: [],
    loading: false,
    alert: null,
  };

  const [state, dispatch] = useReducer(MovieReducer, initialState);

  //Set Loading
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  // get popular movies p1 & p2
  const getPopularMovies = async () => {
    setLoading();
    const resultOne = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    );
    const resultTwo = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=2`
    );
    const res = resultOne.data.results.concat(resultTwo.data.results);
    // const res = resultOne.data.results;
    // console.log(res);
    dispatch({
      type: GET_MOVIES,
      payload: res,
    });
  };

  // Search Movie with keyword
  const searchMovie = async (query) => {
    setLoading();
    const resultOne = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${query}&page=1`
    );
    const resultTwo = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${query}&page=2`
    );
    const res = resultOne.data.results.concat(resultTwo.data.results);
    console.log(res);
    dispatch({
      type: SEARCH_MOVIES,
      payload: res,
    });
  };
  //Get a Movie Details
  const getMovieDetails = async (id) => {
    setLoading();
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    );
    // console.log(res.data);
    dispatch({ type: GET_MOVIEDETAILS, payload: res.data });
  };

  //Get Movie Cast
  const getMovieCasts = async (id) => {
    setLoading();
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    );
    const castMembers = res.data.cast;
    const topFiveCasts = castMembers.slice(0, 6);
    // console.log(topFiveCasts);
    dispatch({
      type: GET_MOVIECASTS,
      payload: topFiveCasts,
    });
  };

  return (
    <MovieContext.Provider
      value={{
        popularMovies: state.popularMovies,
        movieSearchResults: state.movieSearchResults,
        movieDetails: state.movieDetails,
        movieCasts: state.movieCasts,
        loading: state.loading,
        alert: state.alert,
        getPopularMovies,
        searchMovie,
        getMovieDetails,
        getMovieCasts,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
export default MovieState;
