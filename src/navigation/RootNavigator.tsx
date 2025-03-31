import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import BootSplash from 'react-native-bootsplash';

import OnboardingStack from '@app/navigation/OnboardingStack';
import MainTabs from '@app/navigation/MainTabs';
import Scan from '@app/screens/scan/Scan';
import Paywall from '@app/screens/paywall/Paywall';
import useOnboarding from '@app/hooks/redux/useOnboarding';
import ROUTES from '@app/constants/routes';
import {CDN_URL} from '@env';

const ONBOARDING_IMAGES = [
  `${CDN_URL}/onboarding/onboarding_welcome_bg.jpg`,
  `${CDN_URL}/onboarding/welcome_plant.png`,
  `${CDN_URL}/onboarding/brush.png`,
  `${CDN_URL}/onboarding/info_img_1.png`,
  `${CDN_URL}/onboarding/info_artwork.png`,
  `${CDN_URL}/onboarding/info_iphone.png`,
  `${CDN_URL}/onboarding/onboarding_info_bg.jpg`,
  `${CDN_URL}/onboarding/info_leaves.jpg`,
];

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {hasCompletedOnboarding} = useOnboarding();
  const initialRouteName = hasCompletedOnboarding
    ? ROUTES.MAIN_TABS
    : ROUTES.ONBOARDING_STACK;

  useEffect(() => {
    const init = async () => {
      if (!hasCompletedOnboarding) {
        FastImage.preload(
          ONBOARDING_IMAGES.map(uri => ({
            uri,
            priority: FastImage.priority.high,
          })),
        );
      }
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, [hasCompletedOnboarding]);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      {!hasCompletedOnboarding && (
        <Stack.Screen
          name={ROUTES.ONBOARDING_STACK}
          component={OnboardingStack}
        />
      )}
      <Stack.Screen name={ROUTES.MAIN_TABS} component={MainTabs} />
      <Stack.Screen name={ROUTES.SCAN} component={Scan} />
      <Stack.Screen name={ROUTES.PAYWALL} component={Paywall} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
