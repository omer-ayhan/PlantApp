import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '@app/screens/home/Home';
import Diagnose from '@app/screens/home/Diagnose';
import MyGarden from '@app/screens/home/MyGarden';
import Profile from '@app/screens/home/Profile';
import TabBar from '@app/components/ui/TabBar';
import ROUTES from '@app/constants/routes';

type MainTabsParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.DIAGNOSE]: undefined;
  [ROUTES.SCAN]: undefined;
  [ROUTES.MY_GARDEN]: undefined;
  [ROUTES.PROFILE]: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name={ROUTES.DIAGNOSE}
        component={Diagnose}
        options={{
          tabBarLabel: 'Diagnose',
        }}
      />
      <Tab.Screen
        name={ROUTES.MY_GARDEN}
        component={MyGarden}
        options={{
          tabBarLabel: 'My Garden',
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
