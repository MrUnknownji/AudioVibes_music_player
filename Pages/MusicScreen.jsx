import {
  View,
  ToastAndroid,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import TrackPlayer, {
  State,
  useProgress,
  usePlaybackState,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {useContext, useEffect} from 'react';
import {MusicContext} from '../Contexts/Music/MusicContext';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {MotiImage, MotiView} from 'moti';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const MusicScreen = ({navigation}) => {
  const {isPlayerReady} = useContext(MusicContext);

  const {
    formatDuration,
    formatSeconds,
    activeTrack,
    togglePlayback,
    skipToNext,
    skipToPrevious,
    shuffleModeIcon,
    shuffleButtonPressHandler,
  } = useContext(MusicContext);

  const progress = useProgress();
  const playbackState = usePlaybackState();
  const themeColors = useTheme().colors;

  useEffect(() => {
    SystemNavigationBar.navigationHide(true);
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionStart', () => {
      SystemNavigationBar.navigationHide(true);
    });
    return unsubscribe;
  }, [navigation]);

  const buttonProps = {
    compact: 'compact',
    style: [
      styles.topBarButtonStyle,
      {backgroundColor: themeColors.onSecondary},
    ],
  };

  const buttonProps2 = {
    compact: 'compact',
    style: [
      styles.actionButtonsStyle,
      {backgroundColor: themeColors.onSecondary},
    ],
  };

  const sliderProps = {
    minimumValue: 0,
    thumbTintColor: themeColors.primary,
    minimumTrackTintColor: themeColors.primary,
    maximumTrackTintColor: themeColors.secondary,
    maximumValue: progress.duration,
    value: progress.position,
  };

  //fast forward button handler
  const fastForward = async () => {
    await TrackPlayer.seekBy(10);
  };
  //rewind button handler
  const rewind = async () => {
    await TrackPlayer.seekBy(-10);
  };

  return !isPlayerReady ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView>
      <MotiView
        style={[
          styles.fullViewStyle,
          {backgroundColor: themeColors.elevation.level2},
        ]}
        from={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{type: 'timing', duration: 500}}>
        <View style={styles.mainViewStyle}>
          {/* Top Bar Actions View */}
          <View style={styles.topBarContainer}>
            <IconButton
              size={28}
              icon={'chevron-down'}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
            <View style={styles.topBarButtonsContainer}>
              <Button
                {...buttonProps}
                children={<Icon size={22} name="document-text" />}
                onPress={() => {
                  ToastAndroid.show(
                    'This feature is not supported yet',
                    ToastAndroid.SHORT,
                  );
                }}
              />
              <Button
                {...buttonProps}
                children={
                  <MaterialCommunityIcons size={22} name={shuffleModeIcon} />
                }
                onPress={shuffleButtonPressHandler}
              />
              <Button
                {...buttonProps}
                children={<Icon size={22} name="ellipsis-vertical" />}
              />
            </View>
          </View>

          {/* Album Art Container */}
          <View style={styles.albumArtContainer}>
            <MotiImage
              src={
                activeTrack.cover
                  ? activeTrack.cover
                  : 'https://lh3.googleusercontent.com/ogw/ANLem4bziuT8nSBxviSGVpilr2o4Nb7jHrTW0qUpDMrGmQ=s64-c-mo'
              }
              style={styles.albumArtStyle}
              from={{opacity: 0.5, scale: 0.7, translateY: -70}}
              animate={{opacity: 1, scale: 1, translateY: 0}}
              transition={{type: 'timing', duration: 1000, loop: false}}
              animateInitialState={true}
            />
          </View>

          {/* Song Name and artist Name */}
          <View style={styles.musicInfoTextContainer}>
            <Text variant="titleLarge">{activeTrack.title}</Text>
            <Text variant="bodyMedium">{activeTrack.artist}</Text>
          </View>

          {/* Seek Bar and time */}
          <View style={styles.sliderContainer}>
            <Slider
              {...sliderProps}
              onValueChange={value => {
                TrackPlayer.seekTo(value);
              }}
            />

            <View style={styles.timeContainer}>
              <Text>{formatSeconds(progress.position)}</Text>
              <Text>{formatDuration(activeTrack.duration)}</Text>
            </View>
          </View>

          {/* Music Action buttons */}
          <View style={styles.musicActionButtonsContainer}>
            <Button
              {...buttonProps2}
              children={<Icon size={23} name="play-back" />}
              onPress={rewind}
            />
            <Button
              {...buttonProps2}
              children={<Icon size={23} name="play-skip-back" />}
              onPress={skipToPrevious}
            />
            <Button
              {...buttonProps2}
              children={
                <Icon
                  size={22}
                  name={
                    playbackState.state === State.Playing ? 'square' : 'play'
                  }
                />
              }
              onPress={() => togglePlayback(playbackState)}
            />
            <Button
              {...buttonProps2}
              children={<Icon size={23} name="play-skip-forward" />}
              onPress={skipToNext}
            />
            <Button
              {...buttonProps2}
              children={<Icon size={23} name="play-forward" />}
              onPress={fastForward}
            />
          </View>
        </View>
      </MotiView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullViewStyle: {
    // paddingTop: 40,
    height: SCREEN_HEIGHT,
  },
  mainViewStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  topBarContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
    width: '100%',
  },
  topBarButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 13,
  },
  topBarButtonStyle: {
    padding: 1,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  actionButtonsStyle: {
    padding: 0,
    width: 50,
    height: 50,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  albumArtContainer: {
    width: '100%',
    marginVertical: 40,
    alignItems: 'center',
  },
  albumArtStyle: {width: 300, height: 300, borderRadius: 24},
  musicInfoTextContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 25,
    gap: 5,
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    gap: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  musicActionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default MusicScreen;
