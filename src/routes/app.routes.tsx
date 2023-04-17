import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { MovieDetails } from "@screens/MovieDetails";
import { Home } from "@screens/Home";
import { Favorites } from "@screens/Favorites";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name="home"
        component={Home}
      />

      <Screen 
        name="movieDetails"
        component={MovieDetails}
      />

      <Screen 
        name="favoriteMovies"
        component={Favorites}
      />
    </Navigator>
  )
}