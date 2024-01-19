import React, {useCallback, useContext, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import ListItemStyle from './ListItemStyle';
import {MusicContext} from '../Contexts/Music/MusicContext';
// import {MotiView} from 'moti';

const MusicListContainer = ({navigation}) => {
  const {allSongs} = useContext(MusicContext);
  // const [currentItemIndex, setCurrentItemIndex] = useState(null);

  // const handleViewableItemsChanged = useCallback(({viewableItems}) => {
  //   if (viewableItems.length > 0) {
  //     const newIndex = viewableItems[0].index;
  //     setCurrentItemIndex(newIndex);
  //   }
  // }, []);

  // const getItemLayout = useCallback(
  //   (data, index) => ({
  //     index,
  //     length: 75,
  //     offset: index * 75 + 40,
  //   }),
  //   [],
  // );

  return (
    <FlatList
      data={allSongs}
      keyExtractor={item => item.url}
      // onViewableItemsChanged={viewAbleItems => {
      //   console.log(viewAbleItems.viewableItems);
      //   handleViewableItemsChanged(viewAbleItems);
      // }}
      renderItem={({item, index}) => {
        return (
          // <MotiView
          //   from={{scale: 0}}
          //   animate={{scale: currentItemIndex > index ? 0 : 1}}
          //   transition={{
          //     type: 'timing',
          //     duration: 100,
          //     useNativeDriver: false,
          //   }}>
          <ListItemStyle index={index} item={item} navigation={navigation} />
          // </MotiView>
        );
      }}
      // initialNumToRender={10}
      // getItemLayout={(data, index) => getItemLayout(data, index)}
      // removeClippedSubviews={true}
      style={{width: '100%', marginBottom: 50}}
    />
  );
};

export default MusicListContainer;
