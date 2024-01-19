import React from 'react'
import { View } from 'react-native';
import { Chip } from "react-native-paper";

const ListStyleSelectionChips = () => {
  const [selectedText, setSelectedText] = React.useState("All");
  return (
    <View
      style={{
        margin: 10,
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Chip
        compact
        onPress={() => {
          setSelectedText("All");
        }}
        icon={selectedText === "All" ? "check" : ""}
      >
        All
      </Chip>
      <Chip
        compact
        onPress={() => {
          setSelectedText("Album");
        }}
        icon={selectedText === "Album" ? "check" : ""}
      >
        Album
      </Chip>
      <Chip
        compact
        onPress={() => {
          setSelectedText("Artist");
        }}
        icon={selectedText === "Artist" ? "check" : ""}
      >
        Artist
      </Chip>
      <Chip
        compact
        onPress={() => {
          setSelectedText("Favorite");
        }}
        icon={selectedText === "Favorite" ? "check" : ""}
      >
        Favorite
      </Chip>
    </View>
  );
}

export default ListStyleSelectionChips