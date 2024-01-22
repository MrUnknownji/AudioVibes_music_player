import React, {useContext, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {IconButton, Modal, useTheme} from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';
import {ThemeContext} from '../Contexts/Theme/ThemeContext';
import {MusicContext} from '../Contexts/Music/MusicContext';
import Animated, {FadeInDown} from 'react-native-reanimated';

const ListItemStyle = ({item, navigation, index}) => {
  const [expanded, setExpanded] = useState(false);
  const {theme} = useContext(ThemeContext);
  const {skipToTrack, activeTrackIndex} = useContext(MusicContext);

  const fontColor = theme.toLowerCase() === 'dark' ? 'white' : 'black';
  const currentThemeStyle = useTheme();

  const listItemOnPressHandler = () => {
    navigation.navigate('MusicScreen', {item: item});
    playSelectedSongHandler();
  };
  const deleteMenuButtonPressHandler = async () => {
    setExpanded(!expanded);
  };
  const playSelectedSongHandler = async () => {
    if (activeTrackIndex === index) {
    } else {
      skipToTrack(index);
    }
    await TrackPlayer.play();
  };

  return (
    <Animated.View
      style={[
        styles.touchableViewContainer,
        {backgroundColor: currentThemeStyle.colors.elevation.level2},
      ]}
      entering={FadeInDown.delay(200 * index)}>
      <TouchableNativeFeedback onPress={listItemOnPressHandler}>
        <View style={styles.listContainer}>
          <View style={styles.innerListContainer}>
            <Image
              style={styles.imageStyle}
              src={
                item.cover
                  ? item.cover
                  : 'https://lh3.googleusercontent.com/ogw/ANLem4bziuT8nSBxviSGVpilr2o4Nb7jHrTW0qUpDMrGmQ=s64-c-mo'
              }
            />
            <View style={{width: '80%'}}>
              <Text
                style={[
                  currentThemeStyle.fonts.titleMedium,
                  {color: fontColor},
                ]}
                lineBreakMode="tail"
                numberOfLines={1}>
                {item.title}
              </Text>
              <Text
                style={[currentThemeStyle.fonts.titleSmall, {color: fontColor}]}
                lineBreakMode="tail"
                numberOfLines={1}>
                {item.artist}
              </Text>
            </View>
          </View>
          <IconButton
            icon={expanded ? 'delete' : 'dots-vertical'}
            onPress={deleteMenuButtonPressHandler}
          />
        </View>
      </TouchableNativeFeedback>
      {expanded ? (
        <ModalForDelete
          deleteMenuButtonPressHandler={deleteMenuButtonPressHandler}
          index={index}
        />
      ) : (
        ''
      )}
    </Animated.View>
  );
};

export default ListItemStyle;

const ModalForDelete = ({index, deleteMenuButtonPressHandler}) => {
  const deleteButtonHandler = () => {
    console.log('Are you sure you want to delete');
  };
  return (
    <Modal visible style={styles.modalStyle}>
      <View style={styles.modalViewStyle}>
        <Text style={styles.modalTextStyle} variant="titleMedium">
          Delete this song ?
        </Text>
        <View style={styles.modalIconsContainerStyle}>
          <IconButton
            icon="delete"
            onPress={deleteButtonHandler}
            iconColor="red"
            style={styles.modalIconsStyle}
          />
          <IconButton
            icon="close"
            onPress={deleteMenuButtonPressHandler}
            iconColor="lightgreen"
            style={styles.modalIconsStyle}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  touchableViewContainer: {
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerListContainer: {
    width: '80%',
    paddingLeft: 12,
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12,
  },
  imageStyle: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  modalStyle: {
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  modalTextStyle: {width: '60%', color: 'white', paddingHorizontal: 10},
  modalIconsContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalIconsStyle: {backgroundColor: 'gray', width: 50},
});
