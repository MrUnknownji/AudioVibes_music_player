import {
  Appearance,
  Dimensions,
  StatusBar,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {Appbar, Card, Icon, SegmentedButtons, Text, useTheme} from 'react-native-paper';
import React, {useEffect, useContext} from 'react';
import {ThemeContext} from '../Contexts/Theme/ThemeContext';
import {PermissionsContext} from '../Contexts/Music/PermissionsContext';

// const Main = () => {
//   // const [coloredThemeValue, setColoredThemeValue] = useState('');
//   const {theme, updateTheme} = useContext(ThemeContext);
//   const {
//     storagePermission,
//     notificationPermission,
//     validStoragePermissionFunction,
//     requestNotificationPermission,
//   } = useContext(PermissionsContext);

//   useEffect(() => {
//     validStoragePermissionFunction();
//     requestNotificationPermission();
//   }, []);

//   return (
//     <View style={{gap: 25, padding: 25}}>
//       {/* Light/Dark Theme */}
//       <Card style={{padding: 20}}>
//         <Text style={{marginBottom: 7}} variant="titleLarge">
//           Theme
//         </Text>
//         <SegmentedButtons
//           value={theme}
//           onValueChange={value => {
//             updateTheme(value);
//           }}
//           buttons={[
//             {
//               value: 'Light',
//               label: 'Light',
//             },
//             {
//               value: 'Dark',
//               label: 'Dark',
//             },
//             {value: Appearance.getColorScheme(), label: 'Device'},
//           ]}
//         />
//       </Card>

//       {/* <Card style={{padding: 20, overflow: 'hidden'}}>
//         <Text variant="titleLarge">Colours</Text>
//         <SegmentedButtons
//           value={coloredThemeValue}
//           onValueChange={setColoredThemeValue}
//           buttons={[
//             {
//               value: 'Device',
//               label: 'Device',
//             },
//             {
//               value: 'Green',
//               label: 'Greeen',
//             },
//             {value: 'Orange', label: 'Orange'},
//             {value: 'Blue', label: 'Blue'},
//             {value: 'Aqua', label: 'Aqua'},
//           ]}
//         />
//       </Card> */}

//       {/* Permissions  */}
//       <Card style={{padding: 20, justifyContent: 'center'}}>
//         <Text variant="titleLarge" style={{margin: 7}}>
//           Permissions
//         </Text>
//         <PermissionListItem
//           PermissionName={'File Access'}
//           accessGranted={storagePermission}
//           requestPermission={validStoragePermissionFunction}
//         />
//         <PermissionListItem
//           PermissionName={'Notification Access'}
//           accessGranted={notificationPermission}
//           requestPermission={requestNotificationPermission}
//         />
//       </Card>
//     </View>
//   );
// };

// const PermissionListItem = ({
//   PermissionName,
//   accessGranted,
//   requestPermission,
// }) => {
//   return (
//     <Card style={{marginVertical: 7, overflow: 'hidden'}}>
//       <TouchableNativeFeedback
//         children={
//           <View
//             style={{
//               padding: 15,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}>
//             <Text>{PermissionName}</Text>
//             {accessGranted ? (
//               <Icon size={25} color="green" source="check-circle" />
//             ) : (
//               <Icon size={25} color="red" source="close-circle" />
//             )}
//           </View>
//         }
//         onPress={requestPermission}
//       />
//     </Card>
//   );
// };

// const SettingsScreen = ({navigation}) => {
//   const {width, height} = Dimensions.get('screen');
//   return (
//     <Card style={{height: height, paddingTop: StatusBar.currentHeight, backgroundColor:useTheme().colors.background}}>
//       <Appbar
//         mode={'center-aligned'}
//         elevated
//         style={{width: width, position: 'fixed', top: 0}}>
//         <Appbar.BackAction
//           onPress={() => {
//             navigation.navigate('Home');
//           }}
//         />
//         <Appbar.Content title="Settings" />
//       </Appbar>
//       <Main navigation={navigation} />
//     </Card>
//   );
// };

// export default SettingsScreen;

const SettingsSheet = () => {
  const {theme, updateTheme} = useContext(ThemeContext);
  const {
    storagePermission,
    notificationPermission,
    validStoragePermissionFunction,
    requestNotificationPermission,
  } = useContext(PermissionsContext);

  useEffect(() => {
    validStoragePermissionFunction();
    requestNotificationPermission();
  }, []);

  return (
    <View style={{height: 470, gap: 15}}>
      <Text variant={'headlineMedium'} style={{textAlign: 'center'}}>
        Settings
      </Text>
      {/* Light/Dark Theme */}
      <Card style={{padding: 20}}>
        <Text style={{marginBottom: 7}} variant="titleLarge">
          Theme
        </Text>
        <SegmentedButtons
          value={theme}
          onValueChange={value => {
            updateTheme(value);
          }}
          buttons={[
            {
              value: 'Light',
              label: 'Light',
            },
            {
              value: 'Dark',
              label: 'Dark',
            },
            {value: Appearance.getColorScheme(), label: 'Device'},
          ]}
        />
      </Card>

      {/* Permissions  */}
      <Card style={{padding: 20, justifyContent: 'center'}}>
        <Text variant="titleLarge" style={{margin: 7}}>
          Permissions
        </Text>
        <PermissionListItem
          PermissionName={'File Access'}
          accessGranted={storagePermission}
          requestPermission={validStoragePermissionFunction}
        />
        <PermissionListItem
          PermissionName={'Notification Access'}
          accessGranted={notificationPermission}
          requestPermission={requestNotificationPermission}
        />
      </Card>
    </View>
  );
};

const PermissionListItem = ({
  PermissionName,
  accessGranted,
  requestPermission,
}) => {
  return (
    <Card style={{marginVertical: 7, overflow: 'hidden'}}>
      <TouchableNativeFeedback
        children={
          <View
            style={{
              padding: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>{PermissionName}</Text>
            {accessGranted ? (
              <Icon size={25} color="green" source="check-circle" />
            ) : (
              <Icon size={25} color="red" source="close-circle" />
            )}
          </View>
        }
        onPress={requestPermission}
      />
    </Card>
  );
};

export default SettingsSheet; 