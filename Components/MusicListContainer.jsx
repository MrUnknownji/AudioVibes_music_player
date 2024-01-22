import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import ListItemStyle from './ListItemStyle';
import {MusicContext} from '../Contexts/Music/MusicContext';

const MusicListContainer = ({navigation}) => {
  const {allSongs} = useContext(MusicContext);
  return (
    <FlatList
      data={allSongs}
      keyExtractor={item => item.url}
      renderItem={({item, index}) => {
        return (
          <ListItemStyle index={index} item={item} navigation={navigation} />
        );
      }}
      style={{width: '100%', marginBottom: 70}}
    />
  );
};

export default MusicListContainer;
