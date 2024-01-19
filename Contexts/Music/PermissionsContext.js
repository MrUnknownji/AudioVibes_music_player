import React, {createContext, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

export const PermissionsContext = createContext({});

const PermissionsProvider = ({children}) => {
  const [storagePermission, setStoragePermission] = useState(null);
  const [notificationPermission, setNotificationPermission] = useState();

  const validStoragePermissionFunction = () => {
    Platform.Version >= 33
      ? requestStoragePermission()
      : requestExternalStoragePermission();
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        {
          title: 'App Storage Permission',
          message: 'App needs access to your storage to play audio files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      granted === PermissionsAndroid.RESULTS.GRANTED
        ? setStoragePermission(true)
        : setStoragePermission(false);
    } catch (err) {
      console.warn(err);
    }
  };

  const requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'External Storage Permission',
          message: 'App needs access to your storage to play audio files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      granted === PermissionsAndroid.RESULTS.GRANTED
        ? setStoragePermission(true)
        : setStoragePermission(false);
      granted === PermissionsAndroid.RESULTS.GRANTED &&
        console.log('Android Version: ', Platform.Version);
    } catch (err) {
      console.warn(err);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'External Storage Permission',
          message: 'App needs access to your storage to play audio files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      granted === PermissionsAndroid.RESULTS.GRANTED
        ? setNotificationPermission(true)
        : setNotificationPermission(false);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <PermissionsContext.Provider
      value={{
        storagePermission,
        notificationPermission,
        validStoragePermissionFunction,
        requestNotificationPermission,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsProvider;
