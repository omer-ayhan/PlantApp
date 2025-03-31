import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale, scale} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';

import HomePlantCard from '@app/components/Home/HomePlantCard';
import HomeCategoryCard from '@app/components/Home/HomeCategoryCard';
import StyledText from '@app/components/UI/StyledText';
import Icon from '@app/components/Icon';
import Ripple from '@app/components/UI/Ripple';
import MailUpgrade from '@app/components/Icon/MailUpgrade';
import colors from '@app/lib/colors';
import ROUTES from '@app/constants/routes';
import theme from '@app/constants/theme';
import sizes from '@app/constants/sizes';
import {CDN_URL} from '@env';
import useAppNavigation from '@app/hooks/useAppNavigation';

const PLANT_CARDS = [
  {
    id: 1,
    image: `${CDN_URL}/paywall/paywall_plant.png`,
    title: 'How to identify plants easily with PlantApp?',
  },
  {
    id: 2,
    image: `${CDN_URL}/paywall/paywall_plant.png`,
    title: 'Species and varieties, what are the differences?',
  },
  {
    id: 3,
    image: `${CDN_URL}/paywall/paywall_plant.png`,
    title: 'The reasons why the same plant can look different',
  },
];
const PLANT_CATEGORIES = [
  {
    id: 1,
    image: 'https://cms-cdn.plantapp.app/5_d2384a3938/5_d2384a3938.png',
    title: 'Edible Plants',
  },
  {
    id: 2,
    image: 'https://cms-cdn.plantapp.app/5_d2384a3938/5_d2384a3938.png',
    title: 'Vegetables and Fruits',
  },
  {
    id: 3,
    image: 'https://cms-cdn.plantapp.app/5_d2384a3938/5_d2384a3938.png',
    title: 'Cacti and Succulents',
  },
];
const PLANT_CARD_WIDTH = moderateScale(240) + scale(12);

const Home = () => {
  const navigation = useAppNavigation();

  const navigateToPaywall = () => {
    navigation.navigate(ROUTES.PAYWALL);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.headerContainer}>
        <StyledText style={{marginBottom: scale(4)}}>
          Hi, plant lover!
        </StyledText>
        <StyledText variant="h1" weight="medium">
          Good Afternoon! ⛅
        </StyledText>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            style={styles.searchIcon}
            size={20}
            color={theme.colors.gray_200}
          />
          <TextInput
            placeholder="Search for a plant"
            style={[styles.searchInput, theme.rubikTypography.body1]}
          />
        </View>
        <FastImage
          source={{
            uri: `${CDN_URL}/home/home_plant.jpg`,
          }}
          resizeMode="cover"
          style={[StyleSheet.absoluteFillObject, styles.headerBackground]}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <Ripple
          style={styles.freePremiumContainer}
          rippleColor={theme.colors.yellow}>
          <Pressable
            style={styles.freePremiumButton}
            onPress={navigateToPaywall}>
            <MailUpgrade />

            <View style={styles.freePremiumTextContainer}>
              <StyledText
                fontFamily="sfPro"
                variant="subtitle1"
                color={theme.colors.yellow}>
                FREE Premium Available
              </StyledText>
              <StyledText
                fontFamily="sfPro"
                variant="caption"
                weight="regular"
                color={theme.colors.yellow}>
                Tap to upgrade your account!
              </StyledText>
            </View>
            <Icon
              style={styles.freePremiumChevronIcon}
              name="chevron-right"
              width={16}
              height={32}
              color={theme.colors.yellow}
            />
          </Pressable>
        </Ripple>
        <View style={styles.getStartedContainer}>
          <StyledText variant="subtitle1" style={styles.getStartedText}>
            Get Started
          </StyledText>

          <FlashList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={PLANT_CARDS}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={PLANT_CARD_WIDTH}
            renderItem={({item}) => (
              <HomePlantCard image={item.image} title={item.title} />
            )}
          />
        </View>

        <View style={styles.categoriesContainer}>
          {PLANT_CATEGORIES.map(plantCategory => (
            <HomeCategoryCard
              key={plantCategory.id}
              image={plantCategory.image}
              title={plantCategory.title}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: theme.colors.gray_100,
  },
  headerContainer: {
    position: 'relative',
    paddingHorizontal: scale(24),
    paddingTop: scale(4) + (StatusBar?.currentHeight ?? 0),
    marginBottom: scale(24),
    height: 'auto',
    borderBottomWidth: 0.4,
    borderBottomColor: colors.hexToRgba(theme.colors.gray_300, 0.25),
  },
  headerBackground: {
    zIndex: -1,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: scale(12),
    width: '100%',
    height: scale(44),
    paddingLeft: scale(43),
    paddingRight: scale(16),
    borderRadius: scale(12),
    backgroundColor: colors.hexToRgba(theme.colors.white, 0.9),
    borderWidth: 0.3,
    borderColor: colors.hexToRgba(theme.colors.gray_300, 0.25),
    marginVertical: scale(14),
    overflow: 'hidden',
  },
  searchIcon: {
    marginTop: scale(12),
    position: 'absolute',
    left: scale(16),
  },
  searchInput: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    color: theme.colors.dark,
    marginRight: scale(12),
  },
  buttonsContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#28AF6E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingBottom: sizes.windowHeight * 0.2,
  },
  freePremiumContainer: {marginHorizontal: scale(24), marginBottom: scale(24)},
  freePremiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.yellow_900,
    borderRadius: scale(12),
    paddingVertical: scale(8),
    paddingRight: scale(12),
    paddingLeft: scale(8),
  },
  freePremiumTextContainer: {flex: 1, paddingLeft: scale(8)},
  freePremiumChevronIcon: {
    marginBottom: scale(4),
  },
  getStartedContainer: {
    paddingLeft: scale(24),
  },
  getStartedText: {
    marginBottom: scale(16),
  },
  categoriesContainer: {
    padding: scale(24),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default Home;
