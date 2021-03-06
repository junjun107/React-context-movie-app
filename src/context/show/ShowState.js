import { useReducer } from 'react';
import ShowContext from './showContext';
import ShowReducer from './showReducer';
import axios from 'axios';
import {
  GET_SHOWS,
  GET_SHOWDETAILS,
  GET_SHOWCASTS,
  SET_LOADING,
  SEARCH_SHOWS,
  SET_ALERT,
  REMOVE_ALERT,
} from '../types';

const ShowState = (props) => {
  //initial state
  const initialState = {
    fetchedShows: [],
    showSearchResults: [],
    showDetails: {},
    showCasts: [],
    loading: false,
    alert: null,
  };

  //use useReducer
  const [state, dispatch] = useReducer(ShowReducer, initialState);

  //Set Loaing
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  //get popular shows
  const getPopularShows = async () => {
    setLoading();
    const resultOne = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    );
    const resultTwo = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=2`
    );
    const res = resultOne.data.results.concat(resultTwo.data.results);
    // const res = resultOne.data.results;
    // console.log(res);
    dispatch({ type: GET_SHOWS, payload: res });
  };

  //get a show details
  const getShowDetails = async (id) => {
    setLoading();
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    );
    // console.log(res.data);
    dispatch({ type: GET_SHOWDETAILS, payload: res.data });
  };

  //get show casts
  const getShowCasts = async (id) => {
    setLoading();
    const res = await axios.get(`
    https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US
    `);
    // console.log(res.data.cast);
    dispatch({ type: GET_SHOWCASTS, payload: res.data.cast });
  };

  //search tv show
  const searchShows = async (query) => {
    setLoading();
    const res = await axios.get(`
    https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&query=${query}&include_adult=false&page=1
    `);

    console.log(res.data.results);
    dispatch({ type: SEARCH_SHOWS, payload: res.data.results });
  };
  return (
    <ShowContext.Provider
      value={{
        fetchedShows: state.fetchedShows,
        showSearchResults: state.showSearchResults,
        showDetails: state.showDetails,
        showCasts: state.showCasts,
        loading: state.loading,
        alert: state.alert,
        getPopularShows,
        getShowDetails,
        getShowCasts,
        searchShows,
      }}
    >
      {props.children}
    </ShowContext.Provider>
  );
};

export default ShowState;
