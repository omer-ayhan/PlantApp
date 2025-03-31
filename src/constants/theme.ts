import fonts from './fonts';
import {scale} from 'react-native-size-matters';

type TypographyVariantType = {
  [key in TypographyVariantNames]?: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
};

const rubikTypography: TypographyVariantType = {
  title: {
    fontFamily: fonts.rubik.bold,
    fontSize: scale(28),
    lineHeight: 32,
  },
  h1: {
    fontFamily: fonts.rubik.bold,
    fontSize: scale(24),
    lineHeight: 32,
  },
  h2: {
    fontFamily: fonts.rubik.bold,
    fontSize: scale(20),
    lineHeight: 28,
  },
  h3: {
    fontFamily: fonts.rubik.medium,
    fontSize: scale(18),
    lineHeight: 26,
  },
  subtitle1: {
    fontFamily: fonts.rubik.medium,
    fontSize: scale(16),
    lineHeight: 24,
  },
  subtitle2: {
    fontFamily: fonts.rubik.medium,
    fontSize: scale(14),
    lineHeight: 22,
  },
  body1: {
    fontFamily: fonts.rubik.regular,
    fontSize: scale(16),
    lineHeight: 22,
  },
  body2: {
    fontFamily: fonts.rubik.regular,
    fontSize: scale(14),
    lineHeight: 22,
  },
  caption: {
    fontFamily: fonts.rubik.light,
    fontSize: scale(12),
    lineHeight: 18,
  },
};

const sfTypography: TypographyVariantType = {
  h1: {
    fontFamily: fonts.sfPro.bold,
    fontSize: scale(24),
    lineHeight: 32,
  },
  h2: {
    fontFamily: fonts.sfPro.bold,
    fontSize: scale(20),
    lineHeight: 28,
  },
  h3: {
    fontFamily: fonts.sfPro.semibold,
    fontSize: scale(18),
    lineHeight: 26,
  },
  subtitle1: {
    fontFamily: fonts.sfPro.semibold,
    fontSize: scale(16),
    lineHeight: 24,
  },
  subtitle2: {
    fontFamily: fonts.sfPro.medium,
    fontSize: scale(14),
    lineHeight: 22,
  },
  body1: {
    fontFamily: fonts.sfPro.regular,
    fontSize: scale(16),
    lineHeight: 24,
  },
  body2: {
    fontFamily: fonts.sfPro.regular,
    fontSize: scale(14),
    lineHeight: 22,
  },
  caption: {
    fontFamily: fonts.sfPro.light,
    fontSize: scale(12),
    lineHeight: 18,
  },
};

const colors = {
  primary: '#28AF6E',
  dark: '#13231B',
  dark_500: '#101E17',
  green_dark: '#597165B2',
  gray: '#BDBDBD',
  gray_100: '#FBFAFA',
  gray_200: '#ABABAB',
  gray_300: '#3C3C43',
  gray_500: '#979798',
  white: '#FFFFFF',
  black: '#000000',
  yellow: '#E5C990',
  yellow_900: '#24201A',
  shimmerColor: 'rgb(234, 234, 234)',
};

const theme = {
  rubikTypography,
  sfTypography,
  colors,
};

export default theme;
