import {Image, Pressable, StyleSheet, View} from 'react-native';

import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

import Ripple from '@app/components/UI/Ripple';
import StyledText from '@app/components/UI/StyledText';
import colors from '@app/lib/colors';
import theme from '@app/constants/theme';

type HomePlantCardProps = {
  image: string;
  title: string;
  onPress?: () => void;
};

const HomePlantCard = ({image, title, onPress}: HomePlantCardProps) => {
  return (
    <Ripple
      style={{
        width: moderateScale(240),
        height: moderateVerticalScale(165),
        borderRadius: scale(12),
        marginRight: scale(12),
        overflow: 'hidden',
      }}>
      <Pressable onPress={onPress}>
        <FastImage
          source={{uri: image}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        />
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderTopWidth: 1.5,
            borderTopColor: colors.hexToRgba(theme.colors.white, 0.1),
          }}>
          <StyledText
            color={theme.colors.white}
            style={{
              margin: scale(12),
              lineHeight: scale(18),
            }}
            numberOfLines={2}
            size={moderateScale(15)}
            weight="medium">
            {title}
          </StyledText>
          <Image
            source={{uri: image}}
            resizeMode="cover"
            style={[
              StyleSheet.absoluteFillObject,
              {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
              },
            ]}
            blurRadius={100}
          />
        </View>
      </Pressable>
    </Ripple>
  );
};

export default HomePlantCard;
