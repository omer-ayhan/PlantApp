import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import RootNavigator from './src/navigation/RootNavigator';
import {navigationRef} from './src/hooks/useAppNavigation';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
