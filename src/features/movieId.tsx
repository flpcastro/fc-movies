import { legacy_createStore as createStore } from "redux";
import { combineReducers } from "redux";

const updateMovie = 'NEW_MOVIE_ID';

export const movieId = (newMovieId: any) => {
  return {
    type: updateMovie,
    movieId: newMovieId,
  };
};

const initialState = {
  newId: 0,
};

export function movieIdReducer(
  state = initialState, 
  action: 
  { 
    type: any; 
    movieId: any 
  }
  ) {
  switch(action.type) {
    case updateMovie:
      return {
        ...state,
        newId: action.movieId,
      };
    default:
      return state;
  }
};

export const Reducers = combineReducers({
  movieIdState: movieIdReducer,
});

export const Store = createStore(Reducers);