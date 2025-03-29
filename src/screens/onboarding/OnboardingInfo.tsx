import React, {useState, useEffect, ReactNode} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ViewStyle,
} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolation,
  runOnJS,
  useAnimatedReaction,
  SharedValue,
} from 'react-native-reanimated';

import useAppNavigation from '@app/hooks/useAppNavigation';
import ROUTES from '@app/constants/routes';
import {CDN_URL} from '@env';
import StyledText from '@app/components/ui/Text';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '@app/constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import AnimatedTransition from '@app/components/ui/AnimatedTransition';
import AnimatedContentSwitcher from '@app/components/ui/AnimatedContentSwitcher';

const OnboardingInfo = () => {
  const navigation = useAppNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const animationProgress = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  // Track when animation gets to the halfway point to update displayed content
  useAnimatedReaction(
    () => animationProgress.value >= 0.5,
    (isHalfway, previous) => {
      if (isHalfway && !previous) {
        runOnJS(setCurrentStep)(nextStep);
      }
    },
    [nextStep],
  );

  const buttonAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: buttonScale.value}],
    };
  });

  const handleContinuePress = () => {
    // Prevent multiple presses during animation
    if (animationProgress.value !== 0) {
      return;
    }

    // Button press animation
    buttonScale.value = withTiming(0.95, {duration: 100}, () => {
      buttonScale.value = withTiming(1, {duration: 100});
    });

    // Set the next step first before starting animation
    setNextStep(currentStep === 0 ? 1 : 0);

    // Content transition animation
    animationProgress.value = withTiming(1, {duration: 800}, () => {
      // Reset animation value after completion
      animationProgress.value = 0;
    });
  };

  // Content for first step
  const firstStepContent = (
    <>
      <StyledText variant="h1" weight="medium" style={styles.title}>
        Take a photo to{' '}
        <StyledText variant="h1" weight="extraBold">
          identify
        </StyledText>
        {`\n`}the plant!
      </StyledText>
      <Image
        source={require('@app/assets/brush.png')}
        style={{
          width: scale(150),
          height: 12,
          position: 'absolute',
          top: moderateScale(24 + 20),
          right: moderateScale(24),
        }}
      />
    </>
  );

  // Content for second step
  const secondStepContent = (
    <>
      <StyledText variant="h1" weight="medium" style={styles.title}>
        Get plant{' '}
        <StyledText variant="h1" weight="extraBold">
          care guides
        </StyledText>
        {`\n`}
      </StyledText>
      <Image
        source={require('@app/assets/brush.png')}
        style={{
          width: scale(150),
          height: 12,
          position: 'absolute',
          top: moderateScale(24 + 20),
          right: moderateScale(24 * 3),
        }}
      />
    </>
  );

  // First step images
  const firstStepImages = (
    <View style={styles.imageContainer}>
      <Image
        source={require('@app/assets/info_img_1.png')}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );

  // Second step images
  const secondStepImages = (
    <View style={styles.imageContainer}>
      <Image
        source={require('@app/assets/info_artwork.png')}
        resizeMode="contain"
        style={{
          position: 'absolute',
          top: -35,
          right: 0,
          bottom: 0,
          width: 167,
          height: 167,
          zIndex: 1,
        }}
      />
      <Image
        source={require('@app/assets/info_iphone.png')} // Replace with second step image
        resizeMode="contain"
        style={[
          {
            width: scale(245),
            height: verticalScale(530),
          },
          {marginTop: moderateScale(85)},
        ]}
      />
    </View>
  );

  // Get current and next content based on steps
  const getCurrentContent = () =>
    currentStep === 0 ? firstStepContent : secondStepContent;
  const getNextContent = () =>
    nextStep === 0 ? firstStepContent : secondStepContent;

  // Get current and next images based on steps
  const getCurrentImage = () =>
    currentStep === 0 ? firstStepImages : secondStepImages;
  const getNextImage = () =>
    nextStep === 0 ? firstStepImages : secondStepImages;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeAreaContainer}>
      {/* <View
        style={{
          position: 'relative',
          height: 100,
        }}> */}
      {/* Content switcher */}
      <AnimatedContentSwitcher
        style={{
          position: 'relative',
          height: 100,
        }}
        currentContent={getCurrentContent()}
        nextContent={getNextContent()}
        animationProgress={animationProgress}
        transitionType="fadeBottomToTop"
      />
      {/* </View> */}

      {/* <View style={styles.imageContainer}> */}
      {/* Image switcher */}
      <AnimatedContentSwitcher
        style={styles.imageContainer}
        currentContent={getCurrentImage()}
        nextContent={getNextImage()}
        animationProgress={animationProgress}
        transitionType="fadeTopToBottom"
      />
      {/* </View> */}

      <View
        style={{
          position: 'relative',
          paddingHorizontal: 24,
          marginBottom: 8,
          flex: 0,
          justifyContent: 'flex-end',
          zIndex: 2,
        }}>
        <Animated.View style={buttonAnimStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleContinuePress}
            activeOpacity={0.9}>
            <StyledText
              variant="body2"
              fontFamily="sfPro"
              weight="bold"
              color="white">
              Continue
            </StyledText>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.dotsContainer}>
          <View
            style={[styles.dot, currentStep === 0 ? styles.activeDot : null]}
          />
          <View
            style={[styles.dot, currentStep === 1 ? styles.activeDot : null]}
          />
        </View>
      </View>
      <Image
        source={{
          uri: `${CDN_URL}/onboarding/onboarding_info_bg.jpg`,
        }}
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          },
          styles.infoBackground,
        ]}
      />
      <AnimatedContentSwitcher
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
        currentContent={
          currentStep === 1 ? (
            <Image
              source={require('@app/assets/info_leaves.jpg')}
              style={styles.infoBackground}
            />
          ) : null
        }
        nextContent={
          nextStep === 1 ? (
            <Image
              source={require('@app/assets/info_leaves.jpg')}
              style={styles.infoBackground}
            />
          ) : null
        }
        animationProgress={animationProgress}
        transitionType="fade"
      />

      <LinearGradient
        colors={['rgba(255,255,255,0)', '#fff']}
        style={styles.infoOverlay}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  title: {
    marginHorizontal: 24,
    marginTop: 12,
  },
  imageContainer: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  artworkImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 167,
    height: 167,
    zIndex: 1,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    zIndex: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 12,
    gap: 8,
    zIndex: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: Dimensions.get('window').width,
    backgroundColor: theme.colors.dark,
    opacity: 0.25,
  },
  activeDot: {
    opacity: 1,
    width: 10,
    height: 10,
  },
  infoBackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.4,
    zIndex: 0,
  },
});

export default OnboardingInfo;
