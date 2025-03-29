import {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

// Animation types
type AnimationType =
  | 'fadeBottomToTop'
  | 'fadeTopToBottom'
  | 'fadeLeftToRight'
  | 'fadeRightToLeft'
  | 'fade';

// Props for the AnimatedTransition component
type AnimatedTransitionProps = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  animationProgress: SharedValue<number>;
  transitionType?: AnimationType;
  isActive: boolean;
};

// Reusable component for animated transitions
const AnimatedTransition = ({
  children,
  animationProgress,
  transitionType = 'fadeBottomToTop',
  isActive,
  style,
}: AnimatedTransitionProps) => {
  // Animation for bottom to top
  const bottomToTopStyle = useAnimatedStyle(() => {
    return {
      opacity: isActive
        ? interpolate(
            animationProgress.value,
            [0, 0.5],
            [1, 0],
            Extrapolation.CLAMP,
          )
        : interpolate(
            animationProgress.value,
            [0.5, 1],
            [0, 1],
            Extrapolation.CLAMP,
          ),
      transform: [
        {
          translateY: isActive
            ? interpolate(
                animationProgress.value,
                [0, 0.5],
                [0, -20],
                Extrapolation.CLAMP,
              )
            : interpolate(
                animationProgress.value,
                [0.5, 1],
                [20, 0],
                Extrapolation.CLAMP,
              ),
        },
      ],
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  // Animation for top to bottom
  const topToBottomStyle = useAnimatedStyle(() => {
    return {
      opacity: isActive
        ? interpolate(
            animationProgress.value,
            [0, 0.5],
            [1, 0],
            Extrapolation.CLAMP,
          )
        : interpolate(
            animationProgress.value,
            [0.5, 1],
            [0, 1],
            Extrapolation.CLAMP,
          ),
      transform: [
        {
          translateY: isActive
            ? interpolate(
                animationProgress.value,
                [0, 0.5],
                [0, 20],
                Extrapolation.CLAMP,
              )
            : interpolate(
                animationProgress.value,
                [0.5, 1],
                [-20, 0],
                Extrapolation.CLAMP,
              ),
        },
      ],
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  // Animation for left to right
  const leftToRightStyle = useAnimatedStyle(() => {
    return {
      opacity: isActive
        ? interpolate(
            animationProgress.value,
            [0, 0.5],
            [1, 0],
            Extrapolation.CLAMP,
          )
        : interpolate(
            animationProgress.value,
            [0.5, 1],
            [0, 1],
            Extrapolation.CLAMP,
          ),
      transform: [
        {
          translateX: isActive
            ? interpolate(
                animationProgress.value,
                [0, 0.5],
                [0, 20],
                Extrapolation.CLAMP,
              )
            : interpolate(
                animationProgress.value,
                [0.5, 1],
                [-20, 0],
                Extrapolation.CLAMP,
              ),
        },
      ],
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  // Animation for right to left
  const rightToLeftStyle = useAnimatedStyle(() => {
    return {
      opacity: isActive
        ? interpolate(
            animationProgress.value,
            [0, 0.5],
            [1, 0],
            Extrapolation.CLAMP,
          )
        : interpolate(
            animationProgress.value,
            [0.5, 1],
            [0, 1],
            Extrapolation.CLAMP,
          ),
      transform: [
        {
          translateX: isActive
            ? interpolate(
                animationProgress.value,
                [0, 0.5],
                [0, -20],
                Extrapolation.CLAMP,
              )
            : interpolate(
                animationProgress.value,
                [0.5, 1],
                [20, 0],
                Extrapolation.CLAMP,
              ),
        },
      ],
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  // Simple fade animation
  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: isActive
        ? interpolate(
            animationProgress.value,
            [0, 0.5],
            [1, 0],
            Extrapolation.CLAMP,
          )
        : interpolate(
            animationProgress.value,
            [0.5, 1],
            [0, 1],
            Extrapolation.CLAMP,
          ),
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  // Select the appropriate animation style based on transition type
  const getAnimationStyle = () => {
    switch (transitionType) {
      case 'fadeBottomToTop':
        return bottomToTopStyle;
      case 'fadeTopToBottom':
        return topToBottomStyle;
      case 'fadeLeftToRight':
        return leftToRightStyle;
      case 'fadeRightToLeft':
        return rightToLeftStyle;
      case 'fade':
        return fadeStyle;
      default:
        return bottomToTopStyle;
    }
  };

  return (
    <Animated.View style={[getAnimationStyle(), style]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedTransition;
