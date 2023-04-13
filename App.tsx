import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'react-native';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import theme from '@theme/index';

import { Routes } from '@routes/index';
import { Loading } from '@components/Loading';
import { Provider } from 'react-redux';
import { Store } from './src/store/storeConfig';


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        { fontsLoaded ? <Routes /> : <Loading />}
      </ThemeProvider>
    </Provider>
  )
}

