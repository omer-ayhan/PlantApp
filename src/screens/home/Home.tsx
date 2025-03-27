import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {CommonActions} from '@react-navigation/native';

import useAppNavigation from '@hooks/useAppNavigation';
import ROUTES from '@constants/routes';

const Home = () => {
  const navigation = useAppNavigation();

  const handleScanPress = () => {
    navigation.navigate(ROUTES.SCAN);
  };

  const handleChatPress = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: ROUTES.CHAT,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleScanPress}>
          <Text style={styles.buttonText}>Go to Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleChatPress}>
          <Text style={styles.buttonText}>Go to Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonsContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#28AF6E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
