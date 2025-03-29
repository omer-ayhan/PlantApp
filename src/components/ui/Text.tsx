import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';

import theme from '@app/constants/theme';
import fonts from '@app/constants/fonts';

interface TextProps extends RNTextProps {
  variant?: TypographyVariantNames;
  fontFamily?: FontFamily;
  weight?: FontWeight;
  color?: ThemeColorsTypes;
  children: React.ReactNode;
}

const StyledText = ({
  variant = 'body1',
  fontFamily = 'rubik',
  weight,
  color = 'dark',
  style,
  children,
  ...rest
}: TextProps) => {
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
  const colorStyle = {
    color: theme.colors[color],
  };

  return (
    <RNText style={[variantStyle, weightStyle, colorStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default StyledText;
