import {Image, Pressable, StyleSheet, View} from 'react-native';

import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

import Ripple from '@app/components/ui/Animations/Ripple';
import StyledText from '@app/components/ui/StyledText';
import colors from '@app/lib/colors';
import theme from '@app/constants/theme';

type HomePlantCardProps = {
  image: string;
  title: string;
  onPress?: () => void;
};

const HomePlantCard = ({image, title, onPress}: HomePlantCardProps) => {
  return (
    <Ripple style={styles.plantQuestionCard}>
      <Pressable onPress={onPress}>
        <FastImage
          source={{uri: image}}
          resizeMode="cover"
          style={styles.plantQuestionImage}
        />
        <View style={styles.plantQuestionTextContainer}>
          <StyledText
            color={theme.colors.white}
            style={styles.plantQuestionText}
            numberOfLines={2}
            size={moderateScale(15)}
            weight="medium">
            {title}
          </StyledText>
          <Image
            source={{uri: image}}
            resizeMode="cover"
            style={[StyleSheet.absoluteFillObject, styles.bottomTextImage]}
            blurRadius={100}
          />
        </View>
      </Pressable>
    </Ripple>
  );
};

export default HomePlantCard;

const styles = StyleSheet.create({
  plantQuestionCard: {
    width: moderateScale(240),
    height: moderateVerticalScale(165),
    borderRadius: scale(12),
    marginRight: scale(12),
    overflow: 'hidden',
  },
  plantQuestionImage: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  plantQuestionTextContainer: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    borderTopWidth: 1.5,
    borderTopColor: colors.hexToRgba(theme.colors.white, 0.1),
  },
  plantQuestionText: {
    marginHorizontal: scale(12),
    lineHeight: scale(18),
  },
  bottomTextImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});
