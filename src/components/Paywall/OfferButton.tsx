import type {ReactNode} from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import StyledText from '@app/components/ui/StyledText';
import colors from '@app/lib/colors';
import theme from '@app/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type OfferButtonProps = {
  title: string;
  description: ReactNode;
  badgeText?: string;
  isSelected: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const OfferButton = ({
  title,
  description,
  badgeText,
  isSelected,
  onPress,
  style,
}: OfferButtonProps) => {
  const pressableStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: isSelected
        ? 'transparent'
        : colors.hexToRgba(theme.colors.white, 0.05),
      borderColor: withTiming(
        isSelected
          ? theme.colors.primary
          : colors.hexToRgba(theme.colors.white, 0.3),
        {
          duration: 200,
        },
      ),
    };
  });
  const linearGradientStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isSelected ? 1 : 0, {duration: 150}),
    };
  });
  const checkMarkColor = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isSelected
          ? theme.colors.primary
          : colors.hexToRgba(theme.colors.white, 0.08),
        {
          duration: 250,
        },
      ),
    };
  });
  const checkmarkStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isSelected ? 1 : 0, {duration: 150}),
    };
  });

  return (
    <AnimatedPressable
      style={[styles.container, pressableStyle, style]}
      onPress={onPress}>
      {badgeText && (
        <View style={styles.badgeContainer}>
          <StyledText variant="caption" weight="medium" color="white">
            {badgeText}
          </StyledText>
        </View>
      )}

      <Animated.View style={[styles.checkMarkContainer, checkMarkColor]}>
        <Animated.View style={[styles.checkmark, checkmarkStyle]} />
      </Animated.View>
      <View>
        <StyledText color="white" weight="medium">
          {title}
        </StyledText>
        {description}
      </View>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, linearGradientStyle]}>
        <LinearGradient
          colors={[
            colors.hexToRgba(theme.colors.primary, 0),
            colors.hexToRgba(theme.colors.primary, 0.2),
          ]}
          style={[
            StyleSheet.absoluteFillObject,
            styles.linearGradient,
            linearGradientStyle,
          ]}
          start={{x: 0.6, y: 0}}
          end={{x: 1, y: 1}}
        />
      </Animated.View>
    </AnimatedPressable>
  );
};

export default OfferButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.hexToRgba(theme.colors.white, 0.3),
    marginBottom: scale(16),
    overflow: 'hidden',
  },
  badgeContainer: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    top: -1,
    right: -1,
    paddingRight: scale(9),
    paddingLeft: scale(12),
    paddingVertical: scale(4),
    borderBottomLeftRadius: 20,
    zIndex: 10,
  },
  checkMarkContainer: {
    position: 'relative',
    width: 24,
    height: 24,
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
  },
  checkmark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -4}, {translateY: -4}],
    width: 8,
    height: 8,
    backgroundColor: theme.colors.white,
    borderRadius: 50,
  },
  linearGradient: {
    zIndex: -1,
  },
});
