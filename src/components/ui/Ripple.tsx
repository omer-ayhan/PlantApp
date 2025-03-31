import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import theme from '@app/constants/theme';

type RippleProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  rippleDuration?: number;
  rippleRadius?: number;
  rippleColor?: string;
};

const Ripple = ({
  children,
  style,
  rippleDuration = 300,
  rippleRadius,
  rippleColor = theme.colors.gray,
}: RippleProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0);
  const boxWidth = useSharedValue(0);
  const boxHeight = useSharedValue(0);
  const opacity = useSharedValue(0.3);
  const boxRef = useAnimatedRef<View>();

  const tap = Gesture.Tap()
    .onBegin(event => {
      opacity.value = 0.4;
      translateX.value = event.x;
      translateY.value = event.y;
      scale.value = 0;
      scale.value = withTiming(1, {duration: rippleDuration});
    })
    .onFinalize(() => {
      opacity.value = withTiming(0, {duration: rippleDuration});
    })
    .shouldCancelWhenOutside(false);

  const animatedCircle = useAnimatedStyle(() => {
    const boxLayout = measure(boxRef);
    if (boxLayout) {
      boxWidth.value = boxLayout.width;
      boxHeight.value = boxLayout.height;
    }
    const radius =
      rippleRadius || Math.sqrt(boxWidth.value ** 2 + boxHeight.value ** 2);
    const width = radius * 2;
    const height = radius * 2;

    return {
      width,
      height,
      borderRadius: radius,
      backgroundColor: rippleColor,
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: opacity.value,
      transform: [
        {translateX: translateX.value - radius},
        {translateY: translateY.value - radius},
        {scale: scale.value},
      ],
    };
  });

  return (
    <GestureDetector gesture={tap}>
      <View style={[styles.container, style]} ref={boxRef}>
        {children}
        <Animated.View style={animatedCircle} pointerEvents="none" />
      </View>
    </GestureDetector>
  );
};

export default Ripple;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
