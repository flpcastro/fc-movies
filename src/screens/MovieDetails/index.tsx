import { useEffect, useState } from "react";
import { Alert, Share, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { HeartStraight, Star } from "phosphor-react-native";
import { Header } from "@components/Header";

import { AddFavoriteMovies } from "@storage/favoriteMovies/add-favorite-movies";
import { api } from "@services/api";

import { AppError } from "@utils/app-error";

import { 
  BackIcon, 
  Container, 
  Genre, 
  InfoContainer, 
  InfoContent, 
  InfoTitle, 
  Infos, 
  Main, 
  MovieGenres, 
  MovieRating,
  MovieTitle, 
  OverviewText, 
  Poster, 
  RateAndFavoriteContainer, 
  RatingText, 
  ShareIcon, 
  TitleContent 
} from "./styles"


type Genre = {
  name: string;
}

type Movie = {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  budget: number;
  homepage: string;
  genres: Genre[];
}

export function MovieDetails({ movieDetailsRef }: any) {
  const movieIdState = useSelector((state: any) => state?.movieIdState);
  const [movie, setMovie] = useState<Movie>();

  const navigation = useNavigation();

  const releaseDate: string = movie?.release_date!;
  const newReleaseDate = new Date(releaseDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  const overview = movie?.overview.length! > 0 ? movie?.overview : 'O Filme não possui overview!';

  function handleGoBack() {
    navigation.navigate('home');
  }

  async function fetchMovie() {
    const response = await api.get(`/movie/${movieIdState?.newId}`);
    setMovie(response.data);
  }

  async function handleAddFavoriteMovie(value: any) {
    try {  
      await AddFavoriteMovies(value);
      Alert.alert("Filme adicionado com sucesso!")
    } catch (error) {
      if(error instanceof AppError) {
        return new AppError(error.message);
      } else {
        console.log(error);
      }
    }
  }

  async function handleShareMovie() {
    await Share.share({
      message: movie!.title,
      url: movie!.homepage,
    });
  }

  useEffect(() => {
    fetchMovie();
  }, [movieIdState])


  return (
    <Main ref={movieDetailsRef}>
      <View style={{padding: 20}}>
        <Header />
        <TouchableOpacity 
          onPress={handleGoBack} 
          style={{marginTop: 10}}
        >
          <BackIcon />
        </TouchableOpacity>
      </View>

      <Container>
        <Poster 
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
          }}
        />

        <TitleContent>
          <MovieTitle>
            {movie?.title}
          </MovieTitle>
          
          <RateAndFavoriteContainer>
            <MovieRating>
              <Star 
                size={28} 
                color="#EFB52E" 
              />

              <RatingText>
                {movie?.vote_average.toFixed(1)}
              </RatingText>
            </MovieRating>

            <TouchableOpacity 
              onPress={handleShareMovie}
            >
              <ShareIcon />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleAddFavoriteMovie(movie)}
            >
              <HeartStraight 
                size={28} 
                color="#AA2834" 
              />
            </TouchableOpacity>
          </RateAndFavoriteContainer>
        </TitleContent>

        <MovieGenres>
          {movie?.genres?.map((genre, index) => (
            <Genre 
              key={index}
            >
              {genre.name}
            </Genre>
          ))}
        </MovieGenres>

        <OverviewText>
          {overview}
        </OverviewText>

        <Infos>
          <InfoContainer>
            <InfoTitle>
              Duration
            </InfoTitle>

            <InfoContent>
              {movie?.runtime} minutos
            </InfoContent>
          </InfoContainer>

          <InfoContainer>
            <InfoTitle>
              Release Date
            </InfoTitle>

            <InfoContent>
              {newReleaseDate}
            </InfoContent>
          </InfoContainer>

          <InfoContainer>
            <InfoTitle>
              Budget
            </InfoTitle>

            <InfoContent>
              ${movie?.budget.toLocaleString("en-US")}
            </InfoContent>
          </InfoContainer>
        </Infos>
      </Container>
    </Main>
  )
}