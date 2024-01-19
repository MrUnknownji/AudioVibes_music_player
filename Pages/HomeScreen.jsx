import MusicListContainer from '../Components/MusicListContainer';
import BottomBar from '../Components/BottomBar';
import {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Easing,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {ActivityIndicator, Button, useTheme} from 'react-native-paper';
import {MusicContext} from '../Contexts/Music/MusicContext';
import {PermissionsContext} from '../Contexts/Music/PermissionsContext';
import BottomSheet from 'react-native-simple-bottom-sheet';
import SettingsSheet from './SettingsScreen';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import TopBar from '../Components/TopBar';
import {AnimatePresence, MotiView} from 'moti';
import {ThemeContext} from '../Contexts/Theme/ThemeContext';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

StatusBar.setTranslucent(true);

const HomeScreen = ({navigation}) => {
  const {isPlayerReady} = useContext(MusicContext);
  const [panelClosed, setPanelClosed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const {theme} = useContext(ThemeContext);
  const [storagePermissionGranted, setIsGranted] = useState();
  const {storagePermission, validStoragePermissionFunction} =
    useContext(PermissionsContext);

  const panelRef = useRef(null);
  const themeColors = useTheme().colors;

  const bottomSheetProps = {
    animation: Easing.elastic(),
    animationDuration: 500,
    isOpen: false,
    sliderMaxHeight: SCREEN_HEIGHT,
    sliderMinHeight: -20,
    style: {zIndex: 5},
    wrapperStyle: {
      marginBottom: 20,
      marginHorizontal: 10,
      borderRadius: 30,
      backgroundColor: themeColors.background,
    },
    lineStyle: {
      width: 50,
      height: 6,
      borderRadius: 4,
    },
  };

  const settingsButtonHandler = () => {
    panelRef.current.togglePanel();
    // panelState();
  };

  const panelState = () => {
    LayoutAnimation.spring();
    setPanelClosed(!panelRef.current.state.isPanelOpened);
  };

  useEffect(() => {
    setNavColors();
    setIsLoading(true);
    validStoragePermissionFunction();
    setTimeout(() => {
      setIsLoading(false);
      setIsGranted(storagePermission);
    }, 1000);
  }, []);

  useEffect(() => {
    setNavColors();
  }, [theme]);
  const setNavColors = () => {
    StatusBar.setBackgroundColor(themeColors.elevation.level2);
    SystemNavigationBar.setNavigationColor(
      themeColors.background,
      undefined,
      'navigation',
    );
  };

  return (
    <MotiView
      style={[styles.screenContainer, {backgroundColor: themeColors.surface}]}
      from={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{type: 'timing', duration: 500}}>
      <View style={styles.screenSubContainer}>
        <TopBar settingsButtonHandler={settingsButtonHandler} />

        {isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : storagePermissionGranted === false ? (
          <Button
            icon="music"
            mode="contained"
            onPress={validStoragePermissionFunction}>
            Give Permission
          </Button>
        ) : (
          <MusicListContainer navigation={navigation} />
        )}
        {!isLoading && isPlayerReady ? (
          // <View
          //   style={[
          //     styles.bottomBarContainer,
          //     {bottom: panelClosed ? 30 : -100, opacity: panelClosed ? 1 : 0},
          //   ]}>
          <AnimatePresence>
            {panelClosed && (
              <MotiView
                style={[
                  styles.bottomBarContainer,
                  {
                    bottom: 30,
                    opacity: 1,
                  },
                ]}
                animateInitialState={true}
                exit={{
                  bottom: -100,
                  opacity: 0,
                }}>
                <BottomBar navigation={navigation} />
              </MotiView>
            )}
          </AnimatePresence>
        ) : (
          // </View>
          ''
        )}
        <BottomSheet
          {...bottomSheetProps}
          children={<SettingsSheet />}
          ref={ref => (panelRef.current = ref)}
          onClose={panelState}
          onOpen={panelState}
        />
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
    height: SCREEN_HEIGHT,
  },
  screenSubContainer: {alignItems: 'center', height: '100%'},
  bottomBarContainer: {
    position: 'fixed',
    width: '95%',
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
});

export default HomeScreen;
