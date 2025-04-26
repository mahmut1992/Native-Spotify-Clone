import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ArchiveAdd,
  ArrowCircleDown2,
  ArrowLeft,
  Play,
} from 'iconsax-react-native';

const SongInfoScreen = ({navigation, route}) => {
  const {album} = route.params || {};

  const {coverArt, name, year, artist} = album;

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.paddingView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size="28" color="white" />
          </TouchableOpacity>
          <View style={styles.imageView}>
            <Image source={{uri: coverArt}} style={styles.coverImage} />
          </View>
        </View>
        <Text style={styles.albumName}> {name} </Text>
        <View style={styles.artistView}>
          <Text style={styles.artistText}>{artist}</Text>
        </View>
        <Pressable style={styles.controlView}>
          <Pressable style={styles.downloadButton}>
            <ArrowCircleDown2 size="32" color="white" />
          </Pressable>
          <Pressable>
            <ArchiveAdd size="32" color="white" />
          </Pressable>
          <View style={styles.playButtonView}>
            <Pressable style={styles.playButton}>
              <Play size="32" color="#FF8A65" />
            </Pressable>
          </View>
        </Pressable>
        <View>
          <View style={styles.infoView}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Album : {name} </Text>
              <Text style={styles.infoText}>Artist : {artist} </Text>
              <Text style={styles.infoText}>Year : {year} </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 50,
  },
  paddingView: {
    padding: 10,
  },
  imageView: {
    flex: 1,
    alignItems: 'center',
  },
  coverImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  albumName: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  artistView: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  artistText: {
    color: '#909090',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controlView: {
    flexDirection: 'row',
    marginHorizontal: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  playButtonView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 12,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  infoContainer: {
    gap: 5,
  },
});
