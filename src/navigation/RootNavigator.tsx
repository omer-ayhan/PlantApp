import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingStack from '@navigation/OnboardingStack';
import MainTabs from '@navigation/MainTabs';
import Scan from '@screens/scan/Scan';
import Chat from '@screens/chat/Chat';
import Paywall from '@screens/paywall/Paywall';
import ROUTES from '@constants/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.ONBOARDING_STACK}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ROUTES.ONBOARDING_STACK}
        component={OnboardingStack}
      />
      <Stack.Screen name={ROUTES.PAYWALL} component={Paywall} />
      <Stack.Screen name={ROUTES.MAIN_TABS} component={MainTabs} />
      <Stack.Screen name={ROUTES.SCAN} component={Scan} />
      <Stack.Screen name={ROUTES.CHAT} component={Chat} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
