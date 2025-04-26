import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {notFoundImage} from '../utils/constants';

const SongCard = ({item, handlePlay}) => {
  const imageUri =
    item?.images?.coverarthq || item?.images?.coverart || notFoundImage;
  return (
    <Pressable
      onPress={() => handlePlay(item)}
      style={{
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        marginLeft: 10,
      }}>
      <Image
        source={{uri: imageUri}}
        style={{height: 50, width: 50, borderRadius: 50}}
      />
      <View>
        <Text style={{color: 'white', fontSize: 18, marginLeft: 16}}>
          {item?.title || 'No Title'}
        </Text>
        <Text
          style={{color: 'gray', fontSize: 18, marginLeft: 16, marginTop: 5}}>
          {item?.subtitle || 'No Title'}
        </Text>
      </View>
    </Pressable>
  );
};

export default SongCard;

const styles = StyleSheet.create({});
