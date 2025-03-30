import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import navigation from '@app/lib/navigation';
import RootNavigator from '@app/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <StatusBar barStyle="dark-content" translucent={false} />
      <NavigationContainer ref={navigation.navigationRef}>
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
