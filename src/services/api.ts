import axios from "axios";

import { MOVIE_DB_API_KEY } from "@env";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: MOVIE_DB_API_KEY,
    language: "pt-BR",
    include_adult: false,
  }
})

