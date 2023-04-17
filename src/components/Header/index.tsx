import { TouchableOpacity } from "react-native";

import { HeartStraight, SignIn } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

import { Container, Icons, Logo  } from "./styles";
import { useTheme } from "styled-components";


export function Header() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();

  function handleOpenFavoriteMovies() {
    setTimeout(() => navigation.navigate('favoriteMovies'), 500)
  }

  function handleGoHome() {
    navigation.navigate('home')
  }

  function handleOpenSignOut() {
    auth().signOut()
  }

  return (
    <Container>
      <TouchableOpacity 
        onPress={handleGoHome}
      >
        <Logo>
          fC.movies
        </Logo>
      </TouchableOpacity>


      <Icons>
        <TouchableOpacity 
          onPress={handleOpenFavoriteMovies}
        >
          <HeartStraight 
            size={28}
            color={COLORS.GREEN_500}
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={handleOpenSignOut}
        >
          <SignIn 
            size={28} 
            color={COLORS.GREEN_500}
          />
        </TouchableOpacity>
      </Icons>
    </Container>
  )
}