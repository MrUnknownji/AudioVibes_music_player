import React, {createContext, useState} from 'react';
import {addTrack, setupPlayer} from '../../service';
import {getAll} from 'react-native-get-music-files';
import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  useTrackPlayerEvents,
  Capability,
} from 'react-native-track-player';

export const MusicContext = createContext({});

const MusicProvider = ({children}) => {
  const [allSongs, setAllSongs] = useState([]);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [activeTrack, setActiveTrack] = useState({});
  const [activeTrackIndex, setActiveTrackIndex] = useState();
  const [shuffleModeIcon, setShuffleModeIcon] = useState('repeat');
  const [repeatMode, setRepeatMode] = useState();

  
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    if (event.type === Event.PlaybackActiveTrackChanged) {
      setCurrentActiveTrack();
    }
  });

  const shuffleIconHandler = async () => {
    const mode = await TrackPlayer.getRepeatMode();
    if (mode === RepeatMode.Off) {
      setShuffleModeIcon('repeat-off');
    } else if (mode === RepeatMode.Track) {
      setShuffleModeIcon('repeat-once');
    } else {
      setShuffleModeIcon('repeat');
    }
    setRepeatMode(mode);
  };

  const shuffleButtonPressHandler = async () => {
    if (repeatMode === RepeatMode.Off) {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
    } else if (repeatMode === RepeatMode.Track) {
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    } else {
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
    }
    shuffleIconHandler();
  };

  const setCurrentActiveTrack = async () => {
    const track = await TrackPlayer.getActiveTrack();
    setActiveTrack(track);
    setCurrentActiveTrackIndex();
  };

  const setCurrentActiveTrackIndex = async () => {
    const trackIndex = await TrackPlayer.getActiveTrackIndex();
    setActiveTrackIndex(trackIndex);
  };

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  }

  const fetchMusic = async () => {
    try {
      setAllSongs(await getAll({}));
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };

  //next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
  };
  //previous button handler
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
  };

  //toggle playback
  const togglePlayback = async playbackState => {
    if (activeTrack !== null) {
      if (
        playbackState.state === State.Paused ||
        playbackState.state === State.Ready ||
        playbackState.state === State.Stopped
      ) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const skipToTrack = async index => {
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
  };

  const formatDuration = durationInMillis => {
    const totalSeconds = Math.floor(durationInMillis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return hours > 0
      ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
          2,
          '0',
        )}:${String(seconds).padStart(2, '0')}`
      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
          2,
          '0',
        )}`;
  };

  const formatSeconds = totalSeconds => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return hours > 0
      ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
          2,
          '0',
        )}:${String(seconds).padStart(2, '0')}`
      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
          2,
          '0',
        )}`;
  };

  return (
    <MusicContext.Provider
      value={{
        allSongs,
        isPlayerReady,
        setup,
        fetchMusic,
        togglePlayback,
        skipToNext,
        skipToPrevious,
        formatSeconds,
        formatDuration,
        activeTrack,
        activeTrackIndex,
        setCurrentActiveTrack,
        shuffleButtonPressHandler,
        shuffleModeIcon,
        skipToTrack,
      }}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;
