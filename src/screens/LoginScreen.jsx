import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Facebook, Google, Mobile, Spotify} from 'iconsax-react-native';

const LoginScreen = ({navigation}) => {
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView>
        <View style={{height: 80}} />
        <View style={{alignItems: 'center'}}>
          <Spotify size="80" color="white" />
        </View>
        <Text style={styles.loginTitle}>Millions of Songs Free on Spotify</Text>
        <View style={{height: 80}} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Main')}
          style={styles.loginButton}>
          <Text style={styles.buttonText}>Sign In With Spotify!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Google size="24" color="white" />
          <Text style={[styles.buttonText, {color: 'white', marginRight: 20}]}>
            Continue With Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Facebook size="24" color="white" />
          <Text style={[styles.buttonText, {color: 'white', marginRight: 20}]}>
            Continue With Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Mobile size="24" color="white" />
          <Text style={[styles.buttonText, {color: 'white', marginRight: 20}]}>
            Continue With Phone Number
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 35,
  },
  loginButton: {
    backgroundColor: '#1AD35B',
    padding: 10,
    marginHorizontal: 'auto',
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#131624',
    padding: 10,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    borderColor: '#C0C0C0',
    width: 300,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 0.8,
    marginVertical: 10,
  },
});
