import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { AuthRoutes } from "./auth.routes";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { COLORS } = useTheme();

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);


  useEffect(() => {
    const subscriber = auth(). onAuthStateChanged(setUser);
    return subscriber;
  }, [])
  return (
    <View style={{flex: 1, backgroundColor: COLORS.GRAY_600}}>
      <NavigationContainer>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}