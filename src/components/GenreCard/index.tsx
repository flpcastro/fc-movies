import { Container, GenreName } from "./styles";

interface Genre {
  name: string;
}

interface Props {
  data: Genre;
  onPress?: () => void;
}

export function GenreCard({ data, ...rest}: Props) {
  return (
    <Container {...rest}>
      <GenreName>
        {data.name}
      </GenreName>
    </Container>
  )
}