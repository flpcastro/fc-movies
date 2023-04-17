import AsyncStorage from "@react-native-async-storage/async-storage";

import { FavoriteMovieDTO } from "./favorite-movie-dto";
import { FAVORITE_MOVIE_COLLECTION } from "../storage-config";

export async function GetAllMovies() {
  try {
    const storage = await AsyncStorage.getItem(FAVORITE_MOVIE_COLLECTION);
    const movies: FavoriteMovieDTO[] = storage ? JSON.parse(storage) : [];
    return movies;
  } catch (error) {
    throw error;
  }
}