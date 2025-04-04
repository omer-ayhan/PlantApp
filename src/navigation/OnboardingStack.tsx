import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingWelcome from '@app/screens/onboarding/OnboardingWelcome';
import OnboardingInfo from '@app/screens/onboarding/OnboardingInfo';
import ROUTES from '@app/constants/routes';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ROUTES.ONBOARDING_WELCOME}
        component={OnboardingWelcome}
      />
      <Stack.Screen name={ROUTES.ONBOARDING_INFO} component={OnboardingInfo} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
