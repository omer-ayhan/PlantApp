import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  AnimatableValue,
} from 'react-native-reanimated';

// Animation types
type AnimationType =
  | 'fadeBottomToTop'
  | 'fadeTopToBottom'
  | 'fadeLeftToRight'
  | 'fadeRightToLeft'
  | 'fade';

// Props for the AnimatedContentSwitcher component
type AnimatedContentSwitcherProps = {
  style?: StyleProp<ViewStyle>;
  currentContent: ReactNode;
  nextContent: ReactNode;
  animationProgress: SharedValue<number>;
  transitionType?: AnimationType;
};

/**
 * AnimatedContentSwitcher - A component that smoothly transitions between content states
 *
 * This component keeps both current and next content rendered but changes their visibility/position
 * based on animation progress, preventing the flicker that occurs when conditionally rendering
 * components during a transition.
 */
const AnimatedContentSwitcher = ({
  currentContent,
  nextContent,
  animationProgress,
  transitionType = 'fadeBottomToTop',
  style,
}: AnimatedContentSwitcherProps) => {
  // Animation style for current content
  const currentContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationProgress.value,
      [0, 0.5],
      [1, 0],
      Extrapolation.CLAMP,
    );

    let transform = [];

    // Add appropriate transform based on animation type
    switch (transitionType) {
      case 'fadeBottomToTop':
        transform.push({
          translateY: interpolate(
            animationProgress.value,
            [0, 0.5],
            [0, -20],
            Extrapolation.CLAMP,
          ),
        });
        break;
      case 'fadeTopToBottom':
        transform.push({
          translateY: interpolate(
            animationProgress.value,
            [0, 0.5],
            [0, 20],
            Extrapolation.CLAMP,
          ),
        });
        break;
      case 'fadeLeftToRight':
        transform.push({
          translateX: interpolate(
            animationProgress.value,
            [0, 0.5],
            [0, 20],
            Extrapolation.CLAMP,
          ),
        });
        break;
      case 'fadeRightToLeft':
        transform.push({
          translateX: interpolate(
            animationProgress.value,
            [0, 0.5],
            [0, -20],
            Extrapolation.CLAMP,
          ),
        });
        break;
      default:
        break;
    }

    return {
      opacity,
      transform,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    } as const;
  });

  // Animation style for next content
  const nextContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationProgress.value,
      [0.5, 1],
      [0, 1],
      Extrapolation.CLAMP,
    );

    let transform = [];

    // Add appropriate transform based on animation type
    switch (transitionType) {
      case 'fadeBottomToTop':
        transform.push({
          translateY: interpolate(
            animationProgress.value,
            [0.5, 1],
            [20, 0],
            Extrapolation.CLAMP,
          ),
        });
        break;
      case 'fadeTopToBottom':
        transform.push({
          translateY: interpolate(
            animationProgress.value,
            [0.5, 1],
            [-20, 0],
            Extrapolation.CLAMP,
          ),
        });
        break;
      case 'fadeLeftToRight':
        transform.push({
          translateX: interpolate(
            animationProgress.value,
            [0.5, 1],
            [-20, 0],
            Extrapolation.CLAMP,
          ),
        });
        break;
      case 'fadeRightToLeft':
        transform.push({
          translateX: interpolate(
            animationProgress.value,
            [0.5, 1],
            [20, 0],
            Extrapolation.CLAMP,
          ),
        });
        break;
      default:
        break;
    }

    return {
      opacity,
      transform,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    } as const;
  });

  return (
    <Animated.View style={style}>
      <Animated.View style={currentContentStyle}>
        {currentContent}
      </Animated.View>
      <Animated.View style={nextContentStyle}>{nextContent}</Animated.View>
    </Animated.View>
  );
};

export default AnimatedContentSwitcher;
