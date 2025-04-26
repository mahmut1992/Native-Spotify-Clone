import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../components/Loader';

import {ArtistContext} from '../context/ArtistContext';
import {AlbumContext} from '../context/AlbumContext';
import AlbumCard from '../components/AlbumCard';
import {useNavigation} from '@react-navigation/native';
import ArtistCard from '../components/ArtistCard';
import Error from '../components/Error';
import {SCREENS} from '../utils/helpers';
import {FlashCircle, Star} from 'iconsax-react-native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const {artists, artLoading, artError} = useContext(ArtistContext);
  const {albums, loading, error} = useContext(AlbumContext);

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <ScrollView
          style={{marginTop: 50}}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.navigate(SCREENS.PROFILE)}
              style={styles.headerContent}>
              <Image
                source={require('../assets/images/profile.jpeg')}
                style={styles.headerImage}
              />
              <Text style={styles.headerText}>Udemig</Text>
            </Pressable>

            <FlashCircle size="24" color="white" />
          </View>

          <View style={styles.tabButtons}>
            <Pressable
              onPress={() => navigation.navigate(SCREENS.SONGS)}
              style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Music</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(SCREENS.SONGS)}
              style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Podcast & Shows</Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={() => navigation.navigate(SCREENS.SONGS)}
              style={styles.likedSongs}>
              <LinearGradient colors={['#33006F', '#FFFFFF']}>
                <Pressable
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Star name="heart" color="white" size={24} />
                </Pressable>
              </LinearGradient>
              <Text style={styles.likedSongsText}>Songs</Text>
            </Pressable>

            <Pressable style={styles.likedSongs}>
              <LinearGradient colors={['#33006F', '#FFFFFF']}>
                <Pressable
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Star name="heart" color="white" size={24} />
                </Pressable>
              </LinearGradient>
              <Text style={styles.likedSongsText}>Rock & Roll</Text>
            </Pressable>

            <Pressable style={styles.likedSongs}>
              <LinearGradient colors={['#33006F', '#FFFFFF']}>
                <Pressable
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Star name="heart" color="white" size={24} />
                </Pressable>
              </LinearGradient>
              <Text style={styles.likedSongsText}>Caz</Text>
            </Pressable>

            <Text style={styles.sectionTitle}>Your Top Artist</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {artists?.map((artist, index) => (
                <ArtistCard key={index} artist={artist} />
              ))}
            </ScrollView>

            <View style={{height: 10}} />

            <Text style={styles.sectionTitle}>Popüler Albums</Text>
            <ScrollView horizontal>
              {albums?.map((album, index) => (
                <AlbumCard key={index} album={album} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerImage: {
    width: 40,
    height: 40,

    borderRadius: 20,
    resizeMode: 'cover',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
  },
  tabButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 5,
    marginHorizontal: 12,
  },
  tabButton: {
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 30,
  },
  tabButtonText: {
    color: 'white',
    fontSize: 15,
  },
  likedSongs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 4,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#202020',
  },
  likedSongsText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
