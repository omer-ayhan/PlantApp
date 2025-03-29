type FontVariantType = {
  [key in FontFamily]: {
    [key in FontWeight]: string;
  };
};

const fonts: FontVariantType = {
  rubik: {
    light: 'Rubik-Light',
    regular: 'Rubik-Regular',
    medium: 'Rubik-Medium',
    semibold: 'Rubik-SemiBold',
    bold: 'Rubik-Bold',
    extraBold: 'Rubik-ExtraBold',
  },
  sfPro: {
    light: 'SFProText-Light',
    regular: 'SFProText-Regular',
    medium: 'SFProText-Medium',
    semibold: 'SFProText-Semibold',
    bold: 'SFProText-Bold',
    extraBold: 'SFProText-Bold',
  },
};

export default fonts;
