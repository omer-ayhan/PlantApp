import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {CommonActions} from '@react-navigation/native';

import useAppNavigation from '@hooks/useAppNavigation';
import ROUTES from '@constants/routes';

const OnboardingInfo = () => {
  const navigation = useAppNavigation();

  const handleContinuePress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: ROUTES.PAYWALL}],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Onboarding Info Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleContinuePress}>
        <Text style={styles.buttonText}>Continue to Paywall</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#28AF6E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingInfo;
