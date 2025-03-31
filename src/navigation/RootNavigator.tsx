import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingStack from '@app/navigation/OnboardingStack';
import MainTabs from '@app/navigation/MainTabs';
import Scan from '@app/screens/scan/Scan';
import Chat from '@app/screens/chat/Chat';
import Paywall from '@app/screens/paywall/Paywall';
import useOnboarding from '@app/hooks/redux/useOnboarding';
import ROUTES from '@app/constants/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
const {hasCompletedOnboarding} = useOnboarding();
  const initialRouteName = hasCompletedOnboarding
    ? ROUTES.MAIN_TABS
    : ROUTES.ONBOARDING_STACK;

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
      <Stack.Screen name={ROUTES.CHAT} component={Chat} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
