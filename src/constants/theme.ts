import FONTS from './fonts';

const rubikTypography = {
  h1: {
    fontFamily: FONTS.RUBIK.BOLD,
    fontSize: 24,
    lineHeight: 32,
  },
  h2: {
    fontFamily: FONTS.RUBIK.BOLD,
    fontSize: 20,
    lineHeight: 28,
  },
  h3: {
    fontFamily: FONTS.RUBIK.MEDIUM,
    fontSize: 18,
    lineHeight: 26,
  },
  subtitle1: {
    fontFamily: FONTS.RUBIK.MEDIUM,
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle2: {
    fontFamily: FONTS.RUBIK.MEDIUM,
    fontSize: 14,
    lineHeight: 22,
  },
  body1: {
    fontFamily: FONTS.RUBIK.REGULAR,
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily: FONTS.RUBIK.REGULAR,
    fontSize: 14,
    lineHeight: 22,
  },
  caption: {
    fontFamily: FONTS.RUBIK.LIGHT,
    fontSize: 12,
    lineHeight: 18,
  },
};

const sfTypography = {
  h1: {
    fontFamily: FONTS.SF_PRO.BOLD,
    fontSize: 24,
    lineHeight: 32,
  },
  h2: {
    fontFamily: FONTS.SF_PRO.BOLD,
    fontSize: 20,
    lineHeight: 28,
  },
  h3: {
    fontFamily: FONTS.SF_PRO.SEMIBOLD,
    fontSize: 18,
    lineHeight: 26,
  },
  subtitle1: {
    fontFamily: FONTS.SF_PRO.SEMIBOLD,
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle2: {
    fontFamily: FONTS.SF_PRO.MEDIUM,
    fontSize: 14,
    lineHeight: 22,
  },
  body1: {
    fontFamily: FONTS.SF_PRO.MEDIUM,
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily: FONTS.SF_PRO.MEDIUM,
    fontSize: 14,
    lineHeight: 22,
  },
  caption: {
    fontFamily: FONTS.SF_PRO.MEDIUM,
    fontSize: 12,
    lineHeight: 18,
  },
};

const colors = {
  primary: '#28AF6E',
  dark: '#13231B',
  green_dark: '#597165B2',
  gray: '#BDBDBD',
};

const theme = {
  rubikTypography,
  sfTypography,
  colors,
};

export default theme;
