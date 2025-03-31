import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';

import StyledText from '@app/components/UI/StyledText';
import AnimatedTransition from '@app/components/UI/Animations/AnimatedTransition';
import StyledButton from '@app/components/UI/StyledButton';
import useAppNavigation from '@app/hooks/useAppNavigation';
import ROUTES from '@app/constants/routes';
import sizes from '@app/constants/sizes';
import {CDN_URL} from '@env';

const OnboardingWelcome = () => {
  const navigation = useAppNavigation();

  const handleNextPress = () => {
    navigation.navigate(ROUTES.ONBOARDING_INFO);
  };

  return (
    <ImageBackground
      source={{
        uri: `${CDN_URL}/onboarding/onboarding_welcome_bg.jpg`,
      }}
      style={styles.container}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeAreaContainer}>
        <AnimatedTransition
          style={styles.textContainer}
          isActive={true}
          enteringChild={
            <>
              <StyledText variant="title" weight="regular">
                Welcome to{' '}
                <StyledText variant="title" weight="bold">
                  PlantApp
                </StyledText>
              </StyledText>
              <StyledText variant="body1" color="dark" style={styles.text}>
                Identify more than 3000+ plants and {`\n`}88% accuracy.
              </StyledText>
            </>
          }
          exitingChild={null}
          delay={{entering: 500, exiting: 0}}
        />
        <AnimatedTransition
          style={styles.imageContainer}
          isActive={true}
          enteringChild={
            <FastImage
              source={{
                uri: `${CDN_URL}/onboarding/welcome_plant.png`,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.image}
            />
          }
          exitingChild={null}
          transitionType="fadeBottomToTop"
          delay={{entering: 250, exiting: 0}}
        />

        <View style={styles.buttonContainer}>
          <StyledButton onPress={handleNextPress} title="Get Started" />
          <StyledText
            variant="caption"
            color="green_dark"
            weight="regular"
            style={[styles.bottomText, styles.bottomTextWrapper]}>
            By tapping next, you are agreeing to PlantID {`\n`}{' '}
            <StyledText
              variant="caption"
              color="green_dark"
              weight="regular"
              style={[styles.bottomText, styles.bottomTextLink]}>
              Terms of Use
            </StyledText>{' '}
            &{' '}
            <StyledText
              variant="caption"
              color="green_dark"
              weight="regular"
              style={[styles.bottomText, styles.bottomTextLink]}>
              Privacy Policy
            </StyledText>
            .
          </StyledText>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  text: {
    marginTop: 8,
    opacity: 0.7,
  },
  textContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 24,
    width: sizes.windowWidth,
    height: '100%',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    marginBottom: 8,
    flex: 0,
    justifyContent: 'flex-end',
  },
  bottomTextWrapper: {
    textAlign: 'center',
    marginTop: 17,
  },
  bottomText: {
    fontSize: 11,
    lineHeight: 16,
  },
  bottomTextLink: {
    textDecorationLine: 'underline',
  },
});

export default OnboardingWelcome;
