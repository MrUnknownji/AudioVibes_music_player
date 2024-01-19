import {StatusBar} from 'react-native';
import MusicScreen from './Pages/MusicScreen';
import HomeScreen from './Pages/HomeScreen';
import {useContext, useEffect} from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {ThemeContext} from './Contexts/Theme/ThemeContext';
import {MusicContext} from './Contexts/Music/MusicContext';
import {playerCapabilities} from './service';
import {PermissionsContext} from './Contexts/Music/PermissionsContext';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
StatusBar.setTranslucent(true);

export default function App() {
  const {setup, fetchMusic} = useContext(MusicContext);
  const {activeTrack} = useContext(PermissionsContext);
  const {theme} = useContext(ThemeContext);

  StatusBar.setBarStyle(
    theme.toLowerCase() === 'dark' ? 'light-content' : 'dark-content',
  );

  useEffect(() => {
    setup();
    fetchMusic();
    if (activeTrack !== null && activeTrack !== undefined) {
      playerCapabilities();
    }
  }, []);

  return (
    <PaperProvider
      theme={theme.toLowerCase() === 'dark' ? MD3DarkTheme : MD3LightTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Welcome', headerShown: false}}
          />
          <Stack.Screen
            name="MusicScreen"
            component={MusicScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
