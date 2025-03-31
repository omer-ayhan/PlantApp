import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  LayoutChangeEvent,
  DimensionValue,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  cancelAnimation,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

import colors from '@app/lib/colors';

interface ShimmeringProps {
  colors?: Array<string>;
  gradientStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: string;
  borderRadius?: number;
  duration?: number;
}

const SHIMMER_COLOR = 'rgb(234, 234, 234)';
const DEFAULT_COLORS = [
  SHIMMER_COLOR,
  colors.hexToRgba('#fff', 0.4),
  SHIMMER_COLOR,
];

const ShimmerLoader: React.FC<ShimmeringProps> = ({
  colors = DEFAULT_COLORS,
  backgroundColor = SHIMMER_COLOR,
  gradientStyle,
  wrapperStyle,
  width = 80,
  height = 80,
  borderRadius = 12,
  duration = 750,
}) => {
  const [viewWidth, setViewWidth] = useState(-1);
  const translateX = useSharedValue(-1000);

  useEffect(() => {
    if (viewWidth <= 0) return;

    translateX.value = -viewWidth;
    translateX.value = withRepeat(
      withDelay(
        1200,
        withTiming(viewWidth, {
          duration,
        }),
      ),
      -1,
      false,
    );

    return () => {
      cancelAnimation(translateX);
    };
  }, [viewWidth, translateX, duration]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    setViewWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
        },
        styles.wrapper,
        wrapperStyle,
      ]}>
      <View
        style={[styles.container, {backgroundColor}]}
        onLayout={handleLayout}>
        <Animated.View style={[styles.shimmer, animatedStyles, gradientStyle]}>
          <LinearGradient
            colors={colors}
            start={{x: 0.3, y: 0.2}}
            end={{x: 0.8, y: 0.5}}
            style={styles.shimmer}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  wrapper: {
    overflow: 'hidden',
  },
  shimmer: {
    flex: 1,
  },
});

export default ShimmerLoader;
