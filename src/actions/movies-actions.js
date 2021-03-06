import axios from 'axios';
import {
  REQUEST_MOVIES,
  GET_MOVIE_FAILURE,
  GET_MOVIE_SUCCESS,
  UPDATE_FETCHING,
  UPDATE_MOVIE_DATA,
} from '../constants';

export const getMoviesInfo = (filmUrls) => {

  return dispatch => {

    dispatch(requestMovies());

    if (!filmUrls) {
      dispatch(getMovieFailure('No films found!'));
      return;
    }

    let promises = filmUrls.map((url) => {
      
      return axios.get(url)
      .then(response => {
        dispatch(updateMovieData(response.data))
        return response.data
      })
      .catch(error => {
        dispatch(getMovieFailure(error.message))
      })
    })
    
    Promise.all(promises).then(() => {dispatch(getMovieSuccess())})
  }
}

export const updateMovieData = (movie) => ({
  type: UPDATE_MOVIE_DATA,
  movie
});

export const updateFetching = (status) => ({
  type: UPDATE_FETCHING,
  isFetching: status
})

export const getMovieSuccess = () => ({
  type: GET_MOVIE_SUCCESS,
})

export const getMovieFailure = (error) => ({
  type: GET_MOVIE_FAILURE,
  error
})

export const requestMovies = () => ({
  type: REQUEST_MOVIES
})
