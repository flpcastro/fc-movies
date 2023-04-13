import { TouchableOpacity } from "react-native";
import { Container, Icons, Logo  } from "./styles";
import { Bookmarks, SignIn } from "phosphor-react-native";

export function Header() {
  return (
    <Container>
      <TouchableOpacity>
        <Logo>fC.movies</Logo>
      </TouchableOpacity>

      <Icons>
        <Bookmarks 
          size={28}
          color="#00875F"
        />
        <SignIn 
          size={28} 
          color="#00875F"
        />
      </Icons>
    </Container>
  )
}