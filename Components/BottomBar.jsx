import React, {useContext, useEffect} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Card, Text, useTheme} from 'react-native-paper';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {MusicContext} from '../Contexts/Music/MusicContext';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomBar = ({navigation}) => {
  const {
    activeTrack,
    togglePlayback,
    skipToNext,
    skipToPrevious,
    setCurrentActiveTrack,
  } = useContext(MusicContext);

  const playbackState = usePlaybackState();
  const themeColors = useTheme().colors;

  const buttonProps = {
    compact: 'compact',
    style: [
      styles.buttonStyle,
      {
        backgroundColor: themeColors.primaryContainer,
      },
    ],
  };

  useEffect(() => {
    setCurrentActiveTrack();
  }, []);

  return (
    <View
      style={[
        styles.bottomBarContainer,
        {
          backgroundColor: themeColors.elevation.level3,
        },
      ]}>
      <View style={styles.bottomBarSubContainer}>
        <Image
          style={styles.imageStyle}
          src={
            activeTrack.cover
              ? activeTrack.cover
              : 'https://lh3.googleusercontent.com/ogw/ANLem4bziuT8nSBxviSGVpilr2o4Nb7jHrTW0qUpDMrGmQ=s64-c-mo'
          }
        />

        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('MusicScreen', {activeTrack: activeTrack})
          }>
          <View style={styles.musicInfoContainer}>
            <Text lineBreakMode="tail" numberOfLines={1} variant="titleMedium">
              {activeTrack.title ? activeTrack.title : 'Song'}
            </Text>
            <Text lineBreakMode="tail" numberOfLines={1} variant="labelLarge">
              {activeTrack.artist ? activeTrack.artist : 'Artist'}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.buttonsContainer}>
          <Button
            {...buttonProps}
            children={<Icon size={20} name="play-skip-back" />}
            onPress={skipToPrevious}
          />

          <Button
            {...buttonProps}
            children={
              <Icon
                size={20}
                name={playbackState.state === State.Playing ? 'square' : 'play'}
              />
            }
            onPress={() => togglePlayback(playbackState)}></Button>

          <Button
            {...buttonProps}
            children={<Icon size={20} name="play-skip-forward" />}
            onPress={skipToNext}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    zIndex: 1,
    height: 70,
    borderRadius: 50,
    // position:'fixed',
    justifyContent: 'center',
    // bottom:40
  },
  bottomBarSubContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {width: 50, height: 50, borderRadius: 50},
  musicInfoContainer: {
    flexDirection: 'column',
    alignItems: 'start',
    width: 128,
    paddingHorizontal: 7,
  },
  buttonsContainer: {flexDirection: 'row', alignItems: 'center'},
  buttonStyle: {
    padding: 3,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default BottomBar;
