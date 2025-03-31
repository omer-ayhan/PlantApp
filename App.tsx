import React, {useEffect} from 'react';
import {StatusBar, StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';

import ReduxProvider from '@app/components/Providers/ReduxProvider';
import RootNavigator from '@app/navigation/RootNavigator';
import navigation from '@app/lib/navigation';

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <ReduxProvider>
        <StatusBar barStyle="dark-content" translucent={false} />
        <NavigationContainer ref={navigation.navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
