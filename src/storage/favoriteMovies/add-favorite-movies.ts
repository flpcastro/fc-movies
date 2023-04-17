import AsyncStorage from "@react-native-async-storage/async-storage";

import { FavoriteMovieDTO } from "./favorite-movie-dto";
import { GetAllMovies } from "./get-all-movies";

import { FAVORITE_MOVIE_COLLECTION } from "../storage-config";

export async function AddFavoriteMovies(movie: FavoriteMovieDTO) {
  try {
    const storedMovies = await GetAllMovies();
    const storage = JSON.stringify([...storedMovies, movie]);
    await AsyncStorage.setItem(FAVORITE_MOVIE_COLLECTION, storage);
  } catch(error) {
    throw error;
  }
}