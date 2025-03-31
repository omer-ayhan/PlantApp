import React from 'react';
import {Platform, StatusBar, ViewStyle} from 'react-native';

import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';

const CustomSafeArea = ({
  style,
  children,
  edges,
  ...props
}: SafeAreaViewProps) => {
  const statusBarHeight = StatusBar?.currentHeight ?? 0;

  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={[style]} edges={edges} {...props}>
        {children}
      </SafeAreaView>
    );
  }

  const paddingStyle: ViewStyle = {};

  if (!edges) {
    paddingStyle.paddingTop = statusBarHeight;
    paddingStyle.paddingBottom = statusBarHeight;
    paddingStyle.paddingLeft = statusBarHeight;
    paddingStyle.paddingRight = statusBarHeight;
  } else {
    const edgeArray = Array.isArray(edges) ? edges : [];

    if (edgeArray.indexOf('top') !== -1) {
      paddingStyle.paddingTop = statusBarHeight;
    }

    if (edgeArray.indexOf('bottom') !== -1) {
      paddingStyle.paddingBottom = statusBarHeight;
    }

    if (edgeArray.indexOf('left') !== -1) {
      paddingStyle.paddingLeft = statusBarHeight;
    }

    if (edgeArray.indexOf('right') !== -1) {
      paddingStyle.paddingRight = statusBarHeight;
    }
  }

  return (
    <SafeAreaView style={[paddingStyle, style]} {...props}>
      {children}
    </SafeAreaView>
  );
};

export default CustomSafeArea;
