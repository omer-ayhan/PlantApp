/**
 * Converts a hex color code to RGBA format
 * @param hex - Hex color code (can be 3 or 6 digits with optional # prefix)
 * @param alpha @default 1 - Opacity value between 0 and 1 to set the transparency of the color
 * @returns RGBA color string
 */
const hexToRgba = (hex: string, alpha: number = 1): string => {
  const cleanHex = hex.replace('#', '');

  let r: number, g: number, b: number;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    r = 0;
    g = 0;
    b = 0;
    console.warn('Invalid hex color format. Using black instead.');
  }

  const validAlpha = Math.max(0, Math.min(1, alpha));

  return `rgba(${r}, ${g}, ${b}, ${validAlpha})`;
};

export default {hexToRgba};
