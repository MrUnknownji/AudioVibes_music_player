import {MotiText, MotiView} from 'moti';
import React, { useContext } from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Text, useTheme} from 'react-native-paper';
import { ThemeContext } from '../Contexts/Theme/ThemeContext';

const TopBar = ({ settingsButtonHandler }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Appbar
      mode={'center-aligned'}
      elevated
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        position: 'fixed',
        top: 0,
      }}>
      <View style={styles.headingContainer}>
        <MotiText
          style={[useTheme().fonts.headlineMedium,{color:theme.toLowerCase()==='dark'?'white':'black'}]}
          from={{opacity: 0.7}}
          animate={{opacity: 1}}
          transition={{type: 'timing', duration: 1000, loop: true}}>
          AudioVibes
        </MotiText>
      </View>
      <Appbar.Action
        style={{alignSelf: 'flex-end'}}
        icon={'cog'}
        onPress={() => {
          settingsButtonHandler();
        }}
      />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopBar;
