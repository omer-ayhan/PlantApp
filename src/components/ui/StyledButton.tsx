import React from 'react';
import {
  StyleSheet,
  Pressable,
  PressableProps,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';

import theme from '@app/constants/theme';

import StyledText from './StyledText';
import Ripple from './Ripple';

type StyledButtonVariant = 'default' | 'outline' | 'disabled';

interface StyledButtonProps extends PressableProps {
  variant?: StyledButtonVariant;
  fontFamily?: FontFamily;
  weight?: FontWeight;
  textVariant?: TypographyVariantNames;
  loading?: boolean;
  title?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const StyledButton = ({
  variant = 'default',
  fontFamily = 'sfPro',
  weight = 'bold',
  textVariant = 'body1',
  loading = false,
  style,
  children,
  disabled,
  title,
  ...rest
}: StyledButtonProps) => {
  const isDisabled = disabled || variant === 'disabled' || loading;

  const getBackgroundColor = () => {
    if (isDisabled) return theme.colors.gray;
    if (variant === 'outline') return 'transparent';
    return theme.colors.primary;
  };
  const getBorderColor = () => {
    if (isDisabled) return theme.colors.gray;
    if (variant === 'outline') return theme.colors.primary;
    return 'transparent';
  };
  const getTextColor = () => {
    if (isDisabled) return theme.colors.white;
    if (variant === 'outline') return theme.colors.primary;
    return theme.colors.white;
  };

  const buttonStyle = {
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
    borderWidth: variant === 'outline' ? 1 : 0,
  };

  return (
    <Ripple
      style={[styles.ripple, style]}
      rippleColor={
        variant === 'outline' ? theme.colors.primary + '20' : undefined
      }>
      <Pressable
        style={[styles.button, buttonStyle]}
        disabled={isDisabled}
        {...rest}>
        {loading ? (
          <ActivityIndicator
            color={
              variant === 'outline' ? theme.colors.primary : theme.colors.white
            }
            size="small"
          />
        ) : !!title ? (
          <StyledText
            variant={textVariant}
            fontFamily={fontFamily}
            weight={weight}
            color={getTextColor() as ThemeColorsTypes}>
            {title}
          </StyledText>
        ) : (
          children
        )}
      </Pressable>
    </Ripple>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  ripple: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
