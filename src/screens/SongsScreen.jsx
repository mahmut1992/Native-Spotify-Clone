import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  ArrowCircleDown,
  ArrowLeft,
  Backward10Seconds,
  Forward10Seconds,
  Heart,
  Pause,
  Play,
  SearchNormal,
} from 'iconsax-react-native';
import {SearchAPIOptions} from '../utils/apiOptions';
import axios from 'axios';
import {notFoundImage} from '../utils/constants';
import SongCard from '../components/SongCard';
import Modal from 'react-native-modal';
import TrackPlayer, {useProgress} from 'react-native-track-player';

const SongsScreen = ({navigation, route}) => {
  const [songLoading, setSongLoading] = useState(true);
  const [songError, setSongError] = useState(null);
  const [searchText, setSearchText] = useState('türk');
  const [songs, setSongs] = useState([]);
  const [searchQueryText, setSearchQueryText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toggleHeart, setToggleHeart] = useState(null);
  const progress = useProgress();

  const handleSearch = async () => {
    const options = SearchAPIOptions;

    options.params.term = searchText;
    try {
      const response = await axios.request(options);

      const formattedSongs = response.data.tracks.hits.map(song => song.track);
      setSongs(formattedSongs);
    } catch (error) {
      setSongError(error.message);
    } finally {
      setSongLoading(false);
    }
  };
  const inputChange = e => {
    setSearchQueryText(e.nativeEvent.text);
    handleSearch();
  };

  // track player setup
  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CABABILITY_PLAY,
          TrackPlayer.CABABILITY_PAUSE,
          TrackPlayer.CABABILITY_STOP,
          TrackPlayer.CABABILITY_SKIP_TO_NEXT,
          TrackPlayer.CABABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CABABILITY_SEEK_TO,
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlay = async track => {
    const trackData = {
      id: track.key,
      url: track.hub.actions.find(action => action.type == 'uri').uri,
      title: track.title,
      artist: track.subtitle,
      artwork: track.images.coverart,
    };
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    //toplam saniyeden geriye kalan
    const secs = Math.floor(seconds % 60);

    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };
  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    handleSearch();
    setupPlayer();
  }, []);

  return (
    <LinearGradient colors={['#040305', '#131624']} style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginHorizontal: 10}}>
          <ArrowLeft size="32" color="white" />
        </TouchableOpacity>
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 10,
          }}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              height: 40,
              backgroundColor: 'rgb(40,40,40)',
              borderRadius: 10,
              padding: 10,
              width: '70%',
              marginRight: 50,
            }}>
            <SearchNormal size="25" color="white" />
            <TextInput
              onSubmitEditing={inputChange}
              onChangeText={setSearchText}
              style={{width: '85%', color: 'white', fontWeight: '500'}}
              placeholder="Search"
              placeholderTextColor={'grey'}
            />
          </Pressable>
        </Pressable>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30}}>
        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
          {searchQueryText === '' ? 'Search Songs' : `${searchQueryText} Songs`}
        </Text>
      </View>
      <ScrollView style={{flex: 1, marginTop: 50}}>
        {songLoading ? (
          <ActivityIndicator
            size={'large'}
            color={'gray'}
            style={{marginTop: 130}}
          />
        ) : (
          <FlatList
            scrollEnabled={false}
            data={songs}
            keyExtractor={song => song.key}
            renderItem={({item}) => {
              return <SongCard handlePlay={handlePlay} item={item} />;
            }}
          />
        )}
        <Modal
          swipeDirection="up"
          onSwipeComplete={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          isVisible={modalVisible}>
          <LinearGradient
            colors={['#rgb(60,60,60)', 'rgb(0,0,0)']}
            style={{
              width: '100%',
              height: '100%',
              marginTop: 200,
              paddingHorizontal: 10,
              borderRadius: 30,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
                marginHorizontal: 20,
                paddingHorizontal: 10,
                marginRight: 50,
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{margin: 10}}>
                <ArrowCircleDown size="20" color="white" />
              </TouchableOpacity>
              <Text style={{fontSize: 25, color: 'white', marginRight: 10}}>
                Track Player
              </Text>
              <TouchableOpacity onPress={() => setToggleHeart(!toggleHeart)}>
                <Heart size="24" color={toggleHeart ? 'red' : 'white'} />
              </TouchableOpacity>
            </View>
            <View style={{padding: 10, marginTop: 20}}>
              <Image
                resizeMode="cover"
                style={{width: '93%', height: 325, borderRadius: 20}}
                source={{
                  uri:
                    selectedTrack?.images['coverarthq' || 'coverart'] ||
                    notFoundImage,
                }}
              />
            </View>
            <View style={{alignItems: 'center', marginVertical: 10}}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
                {selectedTrack?.title}{' '}
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 16,
                  marginTop: 5,
                  fontWeight: '600',
                }}>
                {selectedTrack?.subtitle}{' '}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 15,
                marginRight: 15,
              }}>
              <View
                style={{
                  width: '95%',
                  margintop: 10,
                  marginLeft: 7,
                  height: 3,
                  backgroundColor: 'gray',
                  borderRadius: 5,
                }}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${
                        (progress.position / progress.duration) * 100
                      }%`,
                    },
                  ]}></View>
                <View
                  style={{
                    position: 'absolute',
                    top: -3,
                    width: 10,
                    height: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    left: `${(progress.position / progress.duration) * 100}%`,
                  }}></View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text style={{color: 'white', fontSize: 15}}>
                  {formatTime(progress.position)}
                </Text>
                <Text style={{color: 'white', fontSize: 15}}>
                  {formatTime(progress.duration)}{' '}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 50,
                  margintop: 20,
                  paddingTop: 40,
                }}>
                <TouchableOpacity onPress={seekBackward}>
                  <Backward10Seconds size="32" color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayback}>
                  {isPlaying ? (
                    <Pause size="32" color="white" />
                  ) : (
                    <Play size="32" color="white" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={seekForward}>
                  <Forward10Seconds size="32" color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({
  progressBar: {
    height: '100%',
    backgroundColor: 'rgb(0,255,0)',
  },
});
