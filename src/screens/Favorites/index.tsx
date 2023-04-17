import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Loading } from "@components/Loading";
import MovieCard from "@components/MovieCard";
import { ListEmpty } from "@components/ListEmpty";

import { GetAllMovies } from "@storage/favoriteMovies/get-all-movies";
import { RemoveAllFavoriteMovies } from "@storage/favoriteMovies/remove-all-favorite-movies";

import { AppError } from "@utils/app-error";

import { 
  BackIcon, 
  Container, 
  Main, 
  Title, 
  TitleContainer, 
  TrashIcon 
} from "./styles";

type Movie = {
  id: number;
  overview: string;
  poster_path: string;
  title: string;
}


export function Favorites() {
  const movieDetailsRef: any = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const navigation = useNavigation();
  
  function handleGoBack() {
    navigation.goBack();
  }

  function handleOpenFavoriteMovie() {
    movieDetailsRef.current?.open();
    navigation.navigate('movieDetails')
  }

  function handleDeleteFavoriteMovies() {
    Alert.alert('Remover', 'Deseja remover seus filmes favoritos?', [
      { text: 'Não', style: 'cancel'},
      { text: 'Sim', onPress: () => clearStorage()}
    ])
  }

  async function getStorage() {
    try {
      setIsLoading(true);
      const data = await GetAllMovies();
      setFavoriteMovies(data);
      setIsLoading(false);
    } catch(error) {
      if(error instanceof AppError) {
        return new AppError(error.message);
      } else {
        console.log(error);
      }
    }
  }

  async function clearStorage() {
    try {
      await RemoveAllFavoriteMovies();
      navigation.navigate('home');
    } catch(error) {
      if(error instanceof AppError) {
        return new AppError(error.message);
      } else {
        console.log(error);
      }
      Alert.alert('Remover Filmes Favoritos', 'Não foi possível remover os filmes favoritos');
    }
  }

  useEffect(() => {
    getStorage();
  }, [])

  return (
    <Main>
      <Container>
        <Header />

        <TitleContainer>
          <TouchableOpacity 
            onPress={handleGoBack}
          >
            <BackIcon />
          </TouchableOpacity>

          <Title>Filmes Favoritos</Title>
          
          <TouchableOpacity 
            onPress={handleDeleteFavoriteMovies}
          >
            <TrashIcon />
          </TouchableOpacity>
        </TitleContainer>

        {isLoading ? <Loading /> :
          <>
            <FlatList
              numColumns={3}
              showsHorizontalScrollIndicator={false}
              data={favoriteMovies}
              keyExtractor={(item) => String(item.id)}
              renderItem={(item) => (
                <MovieCard 
                  movie={item}
                  onPress={() => handleOpenFavoriteMovie()}
                />
              )}
              ListEmptyComponent={() => (
                <ListEmpty 
                  message="Não há filmes favoritos"
                />
              )}
            />
          </>
        }
      </Container>
    </Main>
  )
}