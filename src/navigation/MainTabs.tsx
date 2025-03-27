import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '@screens/home/Home';
import Diagnose from '@screens/home/Diagnose';
import MyGarden from '@screens/home/MyGarden';
import Profile from '@screens/home/Profile';
import ROUTES from '@constants/routes';

const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#28AF6E',
        tabBarInactiveTintColor: '#979798',
      }}>
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
