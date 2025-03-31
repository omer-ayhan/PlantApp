import React from 'react';
import {View, StyleSheet} from 'react-native';

import {moderateScale, scale} from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

import StyledText from '@app/components/UI/StyledText';

const WorkInProgress = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@app/assets/lottie/construction.json')}
        style={styles.lottie}
        autoPlay
        loop
      />
      <StyledText variant="h2" textAlign="center" weight="medium">
        We are working on this page, please check back soon 🚧
      </StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  lottie: {width: scale(250), height: scale(250)},
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkInProgress;
