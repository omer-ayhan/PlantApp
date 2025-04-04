import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Linking,
  Platform,
  StatusBar,
  Pressable,
  ListRenderItemInfo,
} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {moderateVerticalScale, scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

import Ripple from '@app/components/ui/Animations/Ripple';
import Icon from '@app/components/Icon';
import StyledButton from '@app/components/ui/StyledButton';
import OfferButton from '@app/components/Paywall/OfferButton';
import CustomSafeArea from '@app/components/ui/Layout/CustomSafeArea';
import StyledText from '@app/components/ui/StyledText';
import useAppNavigation from '@app/hooks/useAppNavigation';
import useOnboarding from '@app/hooks/redux/useOnboarding';
import colors from '@app/lib/colors';
import ROUTES from '@app/constants/routes';
import theme from '@app/constants/theme';
import sizes from '@app/constants/sizes';
import {CDN_URL} from '@env';

type PaywallFeature = {
  icon: IconNames;
  title: string;
  description: string;
};

const PAYWALL_FEATURES: PaywallFeature[] = [
  {
    icon: 'scan',
    title: 'Unlimited',
    description: 'Plant Identify',
  },
  {
    icon: 'speed-meter',
    title: 'Faster',
    description: 'Process',
  },
  {
    icon: 'herb',
    title: 'Detailed',
    description: 'Plant care',
  },
];
const BOTTOM_LINKS = [
  {
    title: 'Terms',
    link: 'https://www.google.com',
  },
  {
    title: 'Privacy',
    link: 'https://www.google.com',
  },
  {
    title: 'Restore',
    onPress: () => {
      console.log('Restore');
    },
  },
];
const PAYWALL_FEATURES_ITEM_WIDTH = scale(140) + scale(16);

const Paywall = () => {
  const navigation = useAppNavigation();
  const [selectedOffer, setSelectedOffer] = useState<'month' | 'year'>('month');
  const {completeOnboarding} = useOnboarding();

  const handleContinuePress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: ROUTES.MAIN_TABS}],
      }),
    );
    completeOnboarding();
  };

  const renderFeatureItem = ({item}: ListRenderItemInfo<PaywallFeature>) => (
    <View style={styles.featureItemContainer}>
      <View style={styles.featureItemIconContainer}>
        <Icon name={item.icon} size={18} color="white" />
      </View>

      <StyledText variant="h2" color="white" weight="medium">
        {item.title}
      </StyledText>
      <StyledText
        size={scale(13)}
        color={colors.hexToRgba(theme.colors.white, 0.7)}
        weight="regular">
        {item.description}
      </StyledText>
      {Platform.OS === 'ios' && (
        <BlurView
          style={[StyleSheet.absoluteFillObject, styles.featureItemBlur]}
          blurAmount={18}
          blurType="materialDark"
          reducedTransparencyFallbackColor={colors.hexToRgba(
            theme.colors.white,
            0.08,
          )}
        />
      )}
    </View>
  );

  return (
    <CustomSafeArea edges={['top', 'bottom']} style={styles.safeAreaContainer}>
      <FastImage
        source={{
          uri: `${CDN_URL}/paywall/paywall_plant.png`,
        }}
        style={styles.plantImage}
        resizeMode="cover"
      />
      <Ripple style={styles.closeButtonContainer}>
        <Pressable style={styles.closeButton} onPress={handleContinuePress}>
          <Icon name="close" size={13} color="white" />
        </Pressable>
      </Ripple>
      <View style={styles.contentContainer}>
        <View style={styles.contentHeaderContainer}>
          <StyledText
            style={{
              marginBottom: moderateVerticalScale(3),
            }}
            weight="light"
            size={scale(27)}
            color="white">
            <StyledText weight="bold" size={scale(27)} color="white">
              PlantApp
            </StyledText>{' '}
            Premium
          </StyledText>
          <StyledText
            weight="light"
            size={scale(17)}
            color={colors.hexToRgba(theme.colors.white, 0.7)}>
            Access All Features
          </StyledText>
        </View>
        <View style={styles.featuresContainer}>
          <FlatList
            contentContainerStyle={styles.featuresListContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={PAYWALL_FEATURES}
            renderItem={renderFeatureItem}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={PAYWALL_FEATURES_ITEM_WIDTH}
          />
        </View>
        <View style={styles.offerButtonsContainer}>
          <OfferButton
            title="1 Month"
            description={
              <StyledText
                variant="caption"
                color={colors.hexToRgba(theme.colors.white, 0.7)}>
                $2.99/month
                <StyledText
                  variant="caption"
                  weight="regular"
                  color={colors.hexToRgba(theme.colors.white, 0.7)}>
                  , auto renewable
                </StyledText>
              </StyledText>
            }
            isSelected={selectedOffer === 'month'}
            onPress={() => {
              setSelectedOffer('month');
            }}
          />

          <OfferButton
            style={styles.offerButton}
            title="1 Year"
            description={
              <StyledText
                variant="caption"
                color={colors.hexToRgba(theme.colors.white, 0.7)}
                weight="regular">
                First 3 days free, then $529,99/year
              </StyledText>
            }
            isSelected={selectedOffer === 'year'}
            badgeText="Save 50%"
            onPress={() => {
              setSelectedOffer('year');
            }}
          />

          <StyledButton
            onPress={handleContinuePress}
            title="Try free for 3 days"
          />

          <StyledText
            style={styles.offerDisclaimer}
            size={scale(9)}
            weight="light"
            color={colors.hexToRgba(theme.colors.white, 0.52)}
            textAlign="center">
            After the 3-day free trial period you'll be charged ₺274.99 per year
            unless you cancel before the trial expires. Yearly Subscription is
            Auto-Renewable
          </StyledText>
          <View style={styles.bottomLinksContainer}>
            {BOTTOM_LINKS.map((bottomLink, i) => (
              <Pressable
                key={`bottom-link-${i}`}
                onPress={
                  bottomLink.onPress
                    ? bottomLink.onPress
                    : () => Linking.openURL(bottomLink.link)
                }>
                <StyledText
                  size={scale(11)}
                  weight="regular"
                  color={colors.hexToRgba(theme.colors.white, 0.5)}>
                  {`${bottomLink.title}${
                    i < BOTTOM_LINKS.length - 1 ? '  •  ' : ''
                  }`}
                </StyledText>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: theme.colors.dark_500,
    position: 'relative',
  },
  plantImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: sizes.windowHeight * 0.6,
    zIndex: -1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: Platform.select({
      ios: scale(42),
      android: StatusBar?.currentHeight ?? scale(21),
    }),
    right: scale(16),
    backgroundColor: colors.hexToRgba(theme.colors.black, 0.4),
    zIndex: 1,
    borderRadius: 50,
  },
  closeButton: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
  },
  headerContainer: {
    gap: scale(6),
  },
  contentContainer: {flex: 1, justifyContent: 'flex-end'},
  contentHeaderContainer: {paddingHorizontal: scale(24)},
  featuresContainer: {
    paddingTop: scale(20),
    paddingBottom: scale(24),
  },
  featuresListContainer: {
    paddingHorizontal: scale(24),
    gap: scale(10),
  },
  featureItemContainer: {
    position: 'relative',
    minWidth: scale(140),
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    padding: scale(16),
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor:
      Platform.OS === 'android' ? theme.colors.paywall_feature : undefined,
  },
  featureItemIconContainer: {
    padding: 9,
    backgroundColor: colors.hexToRgba(theme.colors.black, 0.25),
    borderRadius: 8,
    marginBottom: 16,
  },
  featureItemBlur: {zIndex: -1},
  offerButtonsContainer: {
    paddingHorizontal: scale(24),
  },
  offerDisclaimer: {marginTop: scale(8), marginBottom: scale(10)},
  bottomLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  offerButton: {
    marginBottom: scale(18),
  },
});

export default Paywall;
