import { useEffect, useRef, useState } from "react";
import { Container, Content, FlatListContainer, NoResultText } from "./styles";
import { FlatList } from "react-native";
import { api} from "@services/api";
import { Loading } from "@components/Loading";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import  MovieCard  from "@components/MovieCard";
import { GenreCard } from "@components/GenreCard";
import { useNavigation } from "@react-navigation/native";

interface Movie {
  id: number;
  overview: string;
  poster_path: string;
  title: string;
}

interface Genre {
  name: string;
  id: number;
}

export function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noResult, setNoResult] = useState(false);
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
      console.log(error);
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
      setNoResult(true);
      setIsLoading(false);
      setSearchResultMovies([]);
    } else {
      setSearchResultMovies(response.data.results)
      setNoResult(false);
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

  const movieData = search.length > 2 ? searchResultMovies : movies;

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

        {noResult && (
          <NoResultText>
            Nenhum filme encontrado para "{search}"
          </NoResultText>
        )}

        <FlatListContainer>
          <FlatList
            horizontal
            data={genres}
            keyExtractor={item => item.id.toString()}
            renderItem={(item) => (
              <GenreCard 
                data={item.item}
                onPress={() => {}}
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
          />
          {isLoading && <Loading />}
        </FlatListContainer>
      </Content>
    </Container>
  )
}