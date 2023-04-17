import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/app-error";

import { FAVORITE_MOVIE_COLLECTION } from "../storage-config";

export async function RemoveAllFavoriteMovies() {
  try {
    await AsyncStorage.removeItem(FAVORITE_MOVIE_COLLECTION);
  } catch (error) {
    if(error instanceof AppError) {
      return new AppError(error.message);
    } else {
      console.log(error);
    }
  }
}