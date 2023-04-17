import { Container, GenreName } from "./styles";

type Genre = {
  name: string;
}

type Props = {
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