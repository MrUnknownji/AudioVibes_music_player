import React from "react";
import { View, Platform, StatusBar } from "react-native";

const SafeAreaViewAndroid = ({ Component, ...rest }) => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
          <Component {...rest} />
    </View>
  );
};

export default SafeAreaViewAndroid;
