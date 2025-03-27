import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {CommonActions} from '@react-navigation/native';

import useAppNavigation from '@app/hooks/useAppNavigation';
import ROUTES from '@app/constants/routes';

const Paywall = () => {
  const navigation = useAppNavigation();

  const handleSubscribePress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: ROUTES.MAIN_TABS}],
      }),
    );
  };

  const handleContinuePress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: ROUTES.MAIN_TABS}],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Paywall Screen</Text>
      <TouchableOpacity
        style={styles.subscribeButton}
        onPress={handleSubscribePress}>
        <Text style={styles.buttonText}>Subscribe Now</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinuePress}>
        <Text style={styles.continueText}>Continue with limited access</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  subscribeButton: {
    backgroundColor: '#28AF6E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  continueText: {
    color: '#28AF6E',
    fontSize: 14,
  },
});

export default Paywall;
