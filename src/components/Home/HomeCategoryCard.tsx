import {Pressable, StyleSheet} from 'react-native';

import {scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

import Ripple from '@app/components/ui/Animations/Ripple';
import StyledText from '@app/components/ui/StyledText';
import colors from '@app/lib/colors';
import theme from '@app/constants/theme';
import sizes from '@app/constants/sizes';

type HomeCategoryCardProps = {
  image: string;
  title: string;
  onPress?: () => void;
};

const HomeCategoryCard = ({image, title, onPress}: HomeCategoryCardProps) => {
  return (
    <Ripple style={styles.container}>
      <Pressable style={styles.pressable} onPress={onPress}>
        <StyledText style={styles.title} variant="subtitle1">
          {title}
        </StyledText>
        <FastImage
          source={{
            uri: image,
          }}
          resizeMode="contain"
          style={styles.image}
        />
      </Pressable>
    </Ripple>
  );
};

export default HomeCategoryCard;

const styles = StyleSheet.create({
  container: {
    width: sizes.windowWidth * 0.5 - (scale(24) + scale(6)),
    height: scale(150),
    marginBottom: scale(12),
    backgroundColor: theme.colors.white,
    borderWidth: 0.5,
    borderColor: colors.hexToRgba(theme.colors.gray_300, 0.1),
    borderRadius: scale(12),
    padding: scale(16),
    overflow: 'hidden',
  },
  pressable: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  title: {
    width: '80%',
  },
  image: {
    width: scale(160),
    height: scale(160),
    position: 'absolute',
    bottom: -22,
    right: -22,
    zIndex: -1,
  },
});
