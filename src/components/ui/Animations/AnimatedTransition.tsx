import {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import Animated, {
  AnimatedStyle,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';

type AnimationType =
  | 'fadeBottomToTop'
  | 'fadeTopToBottom'
  | 'fadeLeftToRight'
  | 'fadeRightToLeft'
  | 'fade';

type AnimatedTransitionProps = {
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  transitionType?: AnimationType;
  isActive: boolean;
  enteringChild: ReactNode;
  exitingChild: ReactNode;
  delay?: {
    entering: number;
    exiting: number;
  };
  duration?: {
    entering: number;
    exiting: number;
  };
};

const AnimatedTransition = ({
  transitionType = 'fadeBottomToTop',
  isActive,
  enteringChild,
  exitingChild,
  style,
  delay = {
    entering: 0,
    exiting: 0,
  },
  duration = {
    entering: 500,
    exiting: 500,
  },
}: AnimatedTransitionProps) => {
  const transitionTypeAnimations = {
    fadeBottomToTop: {
      entering: FadeInDown,
      exiting: FadeOutUp,
    },
    fadeTopToBottom: {
      entering: FadeInUp,
      exiting: FadeOutDown,
    },
    fadeLeftToRight: {
      entering: FadeInRight,
      exiting: FadeOutLeft,
    },
    fadeRightToLeft: {
      entering: FadeInLeft,
      exiting: FadeOutRight,
    },
    fade: {
      entering: FadeIn,
      exiting: FadeOut,
    },
  };
  const selectedAnimation = transitionTypeAnimations[transitionType];

  return isActive ? (
    <Animated.View
      style={style}
      key="enteringChild"
      entering={selectedAnimation.entering
        .duration(duration.entering)
        .delay(delay.entering)}
      exiting={selectedAnimation.exiting
        .duration(duration.exiting)
        .delay(delay.exiting)}
      layout={LinearTransition.duration(duration.entering).delay(
        delay.entering,
      )}>
      {enteringChild}
    </Animated.View>
  ) : (
    <Animated.View
      style={style}
      key="exitingChild"
      entering={selectedAnimation.entering
        .duration(duration.entering)
        .delay(delay.entering)}
      exiting={selectedAnimation.exiting
        .duration(duration.exiting)
        .delay(delay.exiting)}
      layout={LinearTransition.duration(duration.exiting).delay(delay.exiting)}>
      {exitingChild}
    </Animated.View>
  );
};

export default AnimatedTransition;
