import React from 'react';
import {View, StyleSheet, Platform, Pressable} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {moderateScale, scale} from 'react-native-size-matters';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import Icon from '@app/components/Icon';
import colors from '@app/lib/colors';
import theme from '@app/constants/theme';
import ROUTES from '@app/constants/routes';

import StyledText from './StyledText';
import Ripple from './Animations/Ripple';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const SCAN_ANIMATION_CONFIG = {
  stiffness: 200,
  damping: 15,
  mass: 0.8,
};

const ScanButton = ({onPress}: {onPress: () => void}) => {
  const scale = useSharedValue(1);
  const pressableAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(1.1, SCAN_ANIMATION_CONFIG);
  };

  const handleRelease = () => {
    scale.value = withSpring(1, SCAN_ANIMATION_CONFIG);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handleRelease}
      style={[styles.scanButtonContainer, pressableAnimatedStyle]}>
      <Ripple style={styles.scanButton} rippleColor={theme.colors.primary}>
        <Icon name="scan-alternative" size={24} color={theme.colors.white} />
      </Ripple>
    </AnimatedPressable>
  );
};

const TabBarButton = ({
  isFocused,
  onPress,
  label,
  icon,
}: {
  isFocused?: boolean;
  onPress: () => void;
  label: string;
  icon: IconNames;
}) => {
  const color = isFocused ? theme.colors.primary : theme.colors.gray;

  return (
    <Ripple
      style={styles.tabBarItem}
      rippleDuration={400}
      rippleColor={
        isFocused
          ? colors.hexToRgba(theme.colors.primary, 0.8)
          : colors.hexToRgba(theme.colors.gray, 0.8)
      }>
      <Pressable onPress={onPress} style={styles.tabItem}>
        <Icon name={icon} size={24} color={color} />
        <StyledText
          style={styles.tabBarItemLabel}
          size={scale(10)}
          weight="regular"
          color={isFocused ? theme.colors.primary : theme.colors.gray_500}>
          {label}
        </StyledText>
      </Pressable>
    </Ripple>
  );
};

const TabBar = ({state, navigation}: BottomTabBarProps) => {
  const currentRoute = state.routes[state.index].name;
  return (
    <View style={styles.container}>
      <TabBarButton
        isFocused={currentRoute === ROUTES.HOME}
        onPress={() => navigation.navigate(ROUTES.HOME)}
        label="Home"
        icon="stack"
      />
      <TabBarButton
        isFocused={currentRoute === ROUTES.DIAGNOSE}
        onPress={() => navigation.navigate(ROUTES.DIAGNOSE)}
        label="Diagnose"
        icon="health"
      />
      <ScanButton onPress={() => navigation.navigate(ROUTES.SCAN)} />
      <TabBarButton
        isFocused={currentRoute === ROUTES.MY_GARDEN}
        onPress={() => navigation.navigate(ROUTES.MY_GARDEN)}
        label="My Garden"
        icon="plant"
      />
      <TabBarButton
        isFocused={currentRoute === ROUTES.PROFILE}
        onPress={() => navigation.navigate(ROUTES.PROFILE)}
        label="Profile"
        icon="person"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{translateX: scale(-26)}, {translateY: scale(-14)}],
    width: moderateScale(54),
    height: moderateScale(54),
    borderRadius: 120,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    outlineWidth: scale(4),
    outlineColor: colors.hexToRgba(theme.colors.primary, 0.6),
    zIndex: 100,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  scanButtonContainer: {
    position: 'relative',
    width: moderateScale(54),
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tabBarItem: {flex: 1},
  tabBarItemLabel: {marginTop: scale(5)},
});

export default TabBar;
