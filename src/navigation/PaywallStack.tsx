import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Paywall from '@screens/paywall/Paywall';
import ROUTES from '@constants/routes';

const Stack = createNativeStackNavigator<PaywallStackParamList>();

const PaywallStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.PAYWALL} component={Paywall} />
    </Stack.Navigator>
  );
};

export default PaywallStack;
