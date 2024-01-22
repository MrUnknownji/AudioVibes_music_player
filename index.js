/**
 * @format
 */
import TrackPlayer from 'react-native-track-player';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {playbackService} from './service';
import ThemeProvider from './Contexts/Theme/ThemeContext';
import MusicProvider from './Contexts/Music/MusicContext';
import PermissionsProvider from './Contexts/Music/PermissionsContext';

const Main = () => {
  return (
    <ThemeProvider>
      <PermissionsProvider>
        <MusicProvider>
            <App />
        </MusicProvider>
      </PermissionsProvider>
    </ThemeProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => playbackService);
