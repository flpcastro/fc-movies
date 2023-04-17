import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Loading } from "@components/Loading";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import  MovieCard  from "@components/MovieCard";
import { GenreCard } from "@components/GenreCard";

import { api } from "@services/api";

import { AppError } from "@utils/app-error";

import { Container, Content, FlatListContainer, MovieListEmptyText } from "./styles";

export interface Movie {
  id: number;
  overview: string;
  poster_path: string;
  title: string;
  genre_ids: any[];
}

interface Genre {
  name: string;
  id: number;
}

export function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [filteredMoviesPerGenre, setFilteredMoviesPerGenre] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);

  const navigation = useNavigation();

  const movieDetailsRef: any = useRef(null);

  function handleOpenDetails() {
    movieDetailsRef.current?.open();
    navigation.navigate('movieDetails')
  }

  async function fetchGenres() {
    const response = await api.get('/genre/movie/list');
    setGenres(response.data.genres);
  }

  async function handleFilterPerGenres(genre: any) {
    const filteredMovies: Movie[] = [];
    for(let i = 0; i < movies.length; i++) {
      if(movies[i].genre_ids.find(genreId => genreId === genre)) {
        const moviesFiltered = movies[i];
        filteredMovies.push(moviesFiltered);
      }
    }

    setTimeout(() => {
      setFilteredMoviesPerGenre(filteredMovies);
    }, 200);
  }


  async function fetchMovies() {
    try {
      setIsLoading(true);
      const response = await api.get('/movie/popular', {
        params: {
          page,
        }
      });
      setMovies([...movies, ...response.data.results]);
      setPage(page + 1);
    } catch (error) {
      if(error instanceof AppError) {
        return new AppError(error.message);
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function searchMovies(query: string) {
    setIsLoading(true);

    const response = await api.get('/search/movie', {
      params: {
        query,
      }
    });

    if(response.data.results.length === 0) {
      setIsLoading(false);
      setSearchResultMovies([]);
    } else {
      setSearchResultMovies(response.data.results)
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  function handleSearch(text: string) {
    setSearch(text);
    if(text.length > 2) {
      searchMovies(text);
    } else {
      setSearchResultMovies([]);
    }
  }

  const movieData = search.length > 2 ? searchResultMovies : filteredMoviesPerGenre.length > 0 ? filteredMoviesPerGenre : movies;
  
  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, [])

  return (
    <Container>
      <Content>
        <Header />

        <Input 
          placeholder="Search"
          value={search}
          onChangeText={handleSearch}
        />

        <FlatListContainer>
          <FlatList
            horizontal
            data={genres}
            keyExtractor={item => item.id.toString()}
            renderItem={(item) => (
              <GenreCard 
                data={item.item}
                onPress={() => handleFilterPerGenres(item.item.id)}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />

          <FlatList 
            data={movieData}
            numColumns={3}
            keyExtractor={item => item.id.toString()}
            renderItem={(item) => (
              <MovieCard 
                movie={item}
                onPress={handleOpenDetails}
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            onEndReached={() => fetchMovies()}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              isLoading ? 
              <Loading /> : (
              <MovieListEmptyText>
                Nenhum filme encontrado para "{search}"
              </MovieListEmptyText>
            )}
          />
          {isLoading && <Loading />}
        </FlatListContainer>
      </Content>
    </Container>
  )
}