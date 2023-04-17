import { AnyAction, Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { movieId } from "@features/movieId";

import { Container, MovieImage } from "./styles"


type MovieCardProps = {
  movie: any;
  movieId?: any;
  onPress: () => void; 
}

function MovieCard({ movie, movieId, onPress }: MovieCardProps) {
  const { id, poster_path } = movie?.item;

  return (
    <Container onPress={() => 
    (
      onPress(), 
      movieId(id)
    )}>
      <MovieImage 
        source={{
          uri: `https://image.tmdb.org/t/p/w300/${poster_path}`
        }}
      />
    </Container>
  )
}

const mapStateToProps = (state: { movieIdState: { movieIdReducer: any } }) => ({
  newId: state.movieIdState.movieIdReducer,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => 
  bindActionCreators({ movieId }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);