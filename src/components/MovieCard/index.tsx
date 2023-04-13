import { AnyAction, Dispatch, bindActionCreators } from "redux";
import { Container, MovieImage } from "./styles"

import { movieId } from "../../store/actions/movieId";
import { connect } from "react-redux";

interface MovieCardProps {
  movie: any;
  movieId?: any;
  onPress: () => void; 
}

function MovieCard({ movie, movieId, onPress }: MovieCardProps) {
  const { id, poster_path } = movie?.item;

  return (
    <Container onPress={() => (onPress(), movieId(id))}>
      <MovieImage 
        source={{
          uri: `https://image.tmdb.org/t/p/w300/${poster_path}`
        }}
      />
    </Container>
  )
}

const mapStateToProps = (store: { movieIdState: { movieIdReducer: any } }) => ({
  newId: store.movieIdState.movieIdReducer,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => 
  bindActionCreators({ movieId }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);