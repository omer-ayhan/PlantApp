import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';

import theme from '@app/constants/theme';
import fonts from '@app/constants/fonts';

type ColorProp = ThemeColorsTypes | (string & {});

interface StyledTextProps extends RNTextProps {
  variant?: TypographyVariantNames;
  fontFamily?: FontFamily;
  weight?: FontWeight;
  color?: ColorProp;
  size?: number;
  textAlign?: 'left' | 'right' | 'center';
  children: React.ReactNode;
}

const StyledText = ({
  variant = 'body1',
  fontFamily = 'rubik',
  weight,
  color = 'dark',
  size,
  style,
  textAlign = 'left',
  children,
  ...rest
}: StyledTextProps) => {
  const typographyTypes = {
    rubik: theme.rubikTypography,
    sfPro: theme.sfTypography,
  };
  const variantStyle = typographyTypes[fontFamily][variant];
  const weightStyle = weight
    ? {
        fontFamily: fonts[fontFamily][weight],
      }
    : {};
  const colorValue = Object.hasOwn(theme.colors, color)
    ? theme.colors[color as keyof typeof theme.colors]
    : color;
  const colorStyle = {
    color: colorValue,
  };
  const sizeStyle = size ? {fontSize: size, lineHeight: size * 1.1} : {};
  const textAlignStyle = textAlign ? {textAlign} : {};

  return (
    <RNText
      style={[
        variantStyle,
        weightStyle,
        colorStyle,
        sizeStyle,
        textAlignStyle,
        style,
      ]}
      {...rest}>
      {children}
    </RNText>
  );
};

export default StyledText;
