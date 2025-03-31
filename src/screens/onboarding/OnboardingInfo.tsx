import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import AnimatedTransition from '@app/components/UI/Animations/AnimatedTransition';
import StyledButton from '@app/components/UI/StyledButton';
import StyledText from '@app/components/UI/StyledText';
import useAppNavigation from '@app/hooks/useAppNavigation';
import colors from '@app/lib/colors';
import ROUTES from '@app/constants/routes';
import theme from '@app/constants/theme';
import sizes from '@app/constants/sizes';
import {CDN_URL} from '@env';

const DOTS_ARRAY = Array.from({length: 3}, (_, index) => index);

const FirstStepContent = () => (
  <>
    <StyledText variant="h1" weight="medium" style={styles.title}>
      Take a photo to{' '}
      <StyledText variant="h1" weight="extraBold">
        identify
      </StyledText>
      {`\n`}the plant!
    </StyledText>
    <Image
      source={{uri: `${CDN_URL}/onboarding/brush.png`}}
      style={[styles.brushImage, styles.firstStepBrushImage]}
    />
  </>
);
const SecondStepContent = () => (
  <>
    <StyledText variant="h1" weight="medium" style={styles.title}>
      Get plant{' '}
      <StyledText variant="h1" weight="extraBold">
        care guides
      </StyledText>
      {`\n`}
    </StyledText>
    <Image
      source={{uri: `${CDN_URL}/onboarding/brush.png`}}
      style={[styles.brushImage, styles.secondStepBrushImage]}
    />
  </>
);
const FirstStepImages = () => (
  <FastImage
    source={{
      uri: `${CDN_URL}/onboarding/info_img_1.png`,
    }}
    resizeMode={FastImage.resizeMode.cover}
    style={styles.image}
  />
);
const SecondStepImages = () => (
  <>
    <FastImage
      source={{
        uri: `${CDN_URL}/onboarding/info_artwork.png`,
      }}
      resizeMode={FastImage.resizeMode.contain}
      style={styles.artworkImage}
    />
    <FastImage
      source={{
        uri: `${CDN_URL}/onboarding/info_iphone.png`,
      }}
      resizeMode={FastImage.resizeMode.contain}
      style={styles.iphoneImage}
    />
  </>
);

const OnboardingDot = ({
  index,
  currentStep,
}: {
  index: number;
  currentStep: SharedValue<number>;
}) => {
  const isActive = useDerivedValue(() => {
    return currentStep.value === index;
  });

  const dotAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(isActive.value ? 1.67 : 1, {
            duration: 250,
          }),
        },
      ],
      opacity: withTiming(isActive.value ? 1 : 0.25, {
        duration: 250,
      }),
    };
  });

  return <Animated.View style={[styles.dot, dotAnimStyle]} />;
};

const OnboardingInfo = () => {
  const navigation = useAppNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const animationProgress = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const activeStep = useSharedValue(0);

  const buttonAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: buttonScale.value}],
    };
  });

  const handleContinuePress = () => {
    if (animationProgress.value !== 0) {
      return;
    }

    buttonScale.value = withTiming(0.95, {duration: 100}, () => {
      buttonScale.value = withTiming(1, {duration: 100});
    });

    if (currentStep === 1) {
      return navigation.navigate(ROUTES.PAYWALL);
    }
    const nextStep = currentStep === 0 ? 1 : 0;

    activeStep.value = withTiming(nextStep, {
      duration: 300,
    });

    setCurrentStep(nextStep);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeAreaContainer}>
      <View style={styles.contentContainer}>
        <AnimatedTransition
          isActive={currentStep === 0}
          enteringChild={<FirstStepContent />}
          exitingChild={<SecondStepContent />}
          transitionType="fadeBottomToTop"
          delay={{entering: 500, exiting: 0}}
        />
      </View>
      <AnimatedTransition
        style={styles.imageContainer}
        isActive={currentStep === 0}
        enteringChild={<FirstStepImages />}
        exitingChild={<SecondStepImages />}
        transitionType="fadeBottomToTop"
        delay={{entering: 250, exiting: 0}}
      />

      <View style={styles.buttonContainer}>
        <Animated.View style={buttonAnimStyle}>
          <StyledButton onPress={handleContinuePress} title="Continue" />
        </Animated.View>

        <View style={styles.dotsContainer}>
          {DOTS_ARRAY.map((_, index) => (
            <OnboardingDot
              key={`dot-${index}`}
              index={index}
              currentStep={activeStep}
            />
          ))}
        </View>
      </View>

      <AnimatedTransition
        style={styles.infoBackground}
        isActive={currentStep === 0}
        enteringChild={
          <FastImage
            source={{
              uri: `${CDN_URL}/onboarding/onboarding_info_bg.jpg`,
            }}
            style={styles.infoBackground}
          />
        }
        exitingChild={
          <FastImage
            source={{
              uri: `${CDN_URL}/onboarding/info_leaves.jpg`,
            }}
            style={styles.infoBackground}
          />
        }
        transitionType="fadeTopToBottom"
      />
      <AnimatedTransition
        isActive={currentStep === 1}
        enteringChild={
          <LinearGradient
            colors={[
              colors.hexToRgba(theme.colors.white, 0),
              theme.colors.white,
            ]}
            style={styles.infoOverlay}
          />
        }
        exitingChild={null}
        transitionType="fade"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  contentContainer: {
    position: 'relative',
    height: 100,
  },
  buttonContainer: {
    position: 'relative',
    paddingHorizontal: 24,
    marginBottom: 8,
    flex: 0,
    justifyContent: 'flex-end',
    zIndex: 2,
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
  brushImage: {
    position: 'absolute',
    width: scale(150),
    height: 12,
    top: moderateScale(24 + 20),
  },
  firstStepBrushImage: {
    right: moderateScale(24),
  },
  secondStepBrushImage: {
    right: moderateScale(24 * 3),
  },
  artworkImage: {
    position: 'absolute',
    top: -35,
    right: 0,
    bottom: 0,
    width: 167,
    height: 167,
    zIndex: 1,
  },
  iphoneImage: {
    width: scale(245),
    height: verticalScale(530),
    marginTop: moderateScale(90),
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
    borderRadius: 50,
    backgroundColor: theme.colors.dark,
  },
  infoBackground: {
    width: sizes.windowWidth,
    height: sizes.windowHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -2,
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    width: sizes.windowWidth,
    height: sizes.windowHeight * 0.4,
    zIndex: 0,
  },
});

export default OnboardingInfo;
