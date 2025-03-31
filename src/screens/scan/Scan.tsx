import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

import StyledText from '@app/components/UI/StyledText';
import Ripple from '@app/components/UI/Animations/Ripple';
import StyledButton from '@app/components/UI/StyledButton';
import ScanFrame from '@app/components/Icon/ScanFrame';
import Icon from '@app/components/Icon';
import useAppNavigation from '@app/hooks/useAppNavigation';
import colors from '@app/lib/colors';
import theme from '@app/constants/theme';
import ROUTES from '@app/constants/routes';

const ScanningFrame = () => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const animatedTranslateStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: -230 / 2}, {translateY: translateY.value}],
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, {duration: 800}), -1, true);
    translateY.value = withRepeat(withTiming(100, {duration: 800}), -1, true);
  }, [opacity, translateY]);

  return (
    <Animated.View style={styles.scanningContainer}>
      <StyledText
        variant="caption"
        textAlign="center"
        weight="medium"
        color="primary"
        style={styles.scanningText}>
        Scanning...
      </StyledText>

      <Animated.View style={styles.scannerInnerContainer}>
        <Animated.View
          style={[styles.scannerInnerLine, animatedTranslateStyle]}
        />
        <Animated.View style={animatedStyle}>
          <ScanFrame />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const Scan = () => {
  const navigation = useAppNavigation();
  const {hasPermission, requestPermission} = useCameraPermission();
  const [isScanning, setIsScanning] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [scanMode, setScanMode] = useState<'identify' | 'multiple'>('identify');
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const handleClosePress = () => {
    navigation.goBack();
  };

  const toggleFlash = useCallback(() => {
    if (device?.hasFlash) {
      setFlashEnabled(prev => !prev);
    }
  }, [device]);

  const handleIdentifyPress = useCallback(() => {
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      navigation.navigate(ROUTES.PAYWALL);
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {device && hasPermission && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          enableZoomGesture
          torch={flashEnabled ? 'on' : 'off'}
        />
      )}

      <SafeAreaView style={styles.overlay}>
        <View style={styles.header}>
          <Ripple style={styles.headerButton}>
            <Pressable
              style={styles.headerPressableContainer}
              onPress={handleClosePress}>
              <Icon name="close" size={13} color="white" />
            </Pressable>
          </Ripple>
          {device?.hasFlash && (
            <Ripple style={styles.headerButton}>
              <Pressable
                style={styles.headerPressableContainer}
                onPress={toggleFlash}>
                <Icon
                  name={flashEnabled ? 'flash-on' : 'flash-off'}
                  size={18}
                  color="white"
                />
              </Pressable>
            </Ripple>
          )}
        </View>

        {!hasPermission ? (
          <View style={styles.permissionContainer}>
            <LottieView
              source={{
                uri: 'https://lottie.host/c126a1d8-521d-424f-a946-a74dbe090a00/i8utH6hwDB.lottie',
              }}
              style={styles.lottie}
              autoPlay
              loop
            />
            <StyledText
              variant="h2"
              textAlign="center"
              style={styles.permissionText}>
              Camera permission is required to identify plants
            </StyledText>

            <StyledButton
              title="Grant Permission"
              onPress={requestPermission}
            />
          </View>
        ) : (
          !device && (
            <View style={styles.permissionContainer}>
              <LottieView
                source={{
                  uri: 'https://lottie.host/6fc16217-65f4-406f-9bb6-8b5e07901834/PfXweNB9gG.lottie',
                }}
                style={styles.lottie}
                autoPlay
                loop
              />
              <StyledText
                variant="h2"
                style={styles.permissionText}
                textAlign="center">
                No camera device available
              </StyledText>
              <StyledButton title="Go Back" onPress={handleClosePress} />
            </View>
          )
        )}

        {isScanning && <ScanningFrame />}

        {hasPermission && device && (
          <View style={styles.content}>
            <View style={styles.scanModeContainer}>
              <TouchableOpacity
                onPress={() => setScanMode('identify')}
                style={[
                  styles.scanModeButton,
                  scanMode === 'identify' && styles.scanModeButtonActive,
                ]}>
                <StyledText
                  variant="caption"
                  weight="medium"
                  color={scanMode === 'identify' ? 'primary' : 'white'}>
                  Identify
                </StyledText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setScanMode('multiple')}
                style={[
                  styles.scanModeButton,
                  scanMode === 'multiple' && styles.scanModeButtonActive,
                ]}>
                <StyledText
                  variant="caption"
                  weight="medium"
                  color={scanMode === 'multiple' ? 'primary' : 'white'}>
                  Multiple
                </StyledText>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomControls}>
              <View style={styles.smallPlantContainer}>
                <FastImage
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
                  }}
                  style={styles.smallPlantImage}
                />
              </View>

              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleIdentifyPress}
                disabled={isScanning}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              <Ripple style={styles.infoButton}>
                <Pressable style={styles.infoButtonPressable}>
                  <Icon name="info" size={18} color="white" />
                </Pressable>
              </Ripple>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  permissionText: {
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  smallPlantContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  smallPlantImage: {
    width: 40,
    height: 40,
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
    padding: 3,
  },
  scanningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 100,
  },
  scannerInnerContainer: {
    position: 'absolute',
    top: '70%',
    left: '50%',
    transform: [{translateX: -(325 / 2)}, {translateY: -(325 / 2)}],
    zIndex: -1,
  },
  scannerInnerLine: {
    width: 230,
    height: 4,
    backgroundColor: 'white',
    position: 'absolute',
    top: '35%',
    left: '50%',
    borderRadius: 100,
    zIndex: 1,
  },
  headerButton: {
    backgroundColor: colors.hexToRgba(theme.colors.black, 0.4),
    borderRadius: 50,
  },
  headerPressableContainer: {
    width: scale(26),
    height: scale(26),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {width: scale(250), height: scale(200)},
  scanModeButton: {
    backgroundColor: 'transparent',
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    borderRadius: 100,
  },
  scanModeButtonActive: {
    backgroundColor: theme.colors.white,
  },
  scanModeContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colors.hexToRgba(theme.colors.black, 0.4),
    padding: scale(6),
    borderRadius: 100,
    marginBottom: scale(16),
  },
  captureButtonInner: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 60,
  },
  infoButton: {
    backgroundColor: colors.hexToRgba(theme.colors.white, 0.2),
    borderRadius: 10,
  },
  infoButtonPressable: {
    width: scale(32),
    height: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Scan;
