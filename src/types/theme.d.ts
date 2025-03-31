import theme from '@app/constants/theme';

declare global {
  type ThemeColorsTypes = keyof typeof theme.colors;
}
