import TrackPlayer, {
  Event,
  RepeatMode,
  Capability,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';
import {getAll} from 'react-native-get-music-files';

const forwardIcon = require('./assets/icons/fast_forward_FILL1_wght400_GRAD0_opsz24.png');

const playerCapabilities = async () => {
  try {
    await TrackPlayer.updateOptions({
      forwardIcon: forwardIcon,
      playIcon: require('./assets/icons/play_arrow_FILL1_wght400_GRAD0_opsz24.png'),
      pauseIcon: require('./assets/icons/stop_FILL1_wght400_GRAD0_opsz24.png'),
      previousIcon: require('./assets/icons/skip_previous_FILL1_wght400_GRAD0_opsz24.png'),
      nextIcon: require('./assets/icons/skip_next_FILL1_wght400_GRAD0_opsz24.png'),
      rewindIcon: require('./assets/icons/fast_rewind_FILL1_wght400_GRAD0_opsz24.png'),
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.JumpForward,
        Capability.JumpBackward,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      android: {
        appKilledPlaybackBehavior: DefaultAudioServiceBehaviour,
      },
      forwardJumpInterval: 10,
      backwardJumpInterval: 10,
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const DefaultAudioServiceBehaviour =
  AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification;

export async function setupPlayer() {
  try {
    await TrackPlayer.getActiveTrackIndex();
    await playerCapabilities();
    return true;
  } catch (err) {
    await TrackPlayer.setupPlayer({autoHandleInterruptions: true});
    await playerCapabilities();
    return true;
  }
}

export async function addTrack() {
  const songsDATA = await getAll({});
  await TrackPlayer.add(songsDATA);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, () => {
    TrackPlayer.getProgress();
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async event => {
    TrackPlayer.seekBy(event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async event => {
    TrackPlayer.seekBy(-event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, async event => {
    console.log('Event.RemoteDuck', event);
  });
}
