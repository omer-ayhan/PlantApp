import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import useAppNavigation from '@hooks/useAppNavigation';
import ROUTES from '@constants/routes';

const OnboardingWelcome = () => {
  const navigation = useAppNavigation();

  const handleNextPress = () => {
    navigation.navigate(ROUTES.ONBOARDING_INFO);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Onboarding Welcome Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleNextPress}>
        <Text style={styles.buttonText}>Next</Text>
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

export default OnboardingWelcome;
