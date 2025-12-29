import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';
import { Colors } from '../theme/colors';

const LoadingOverlay = ({ visible = true, onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const spinAnimationRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Start spin loop
      spinAnimationRef.current = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spinAnimationRef.current.start();

      // Auto-finish after duration if onFinish provided
      if (onFinish) {
        timeoutRef.current = setTimeout(() => {
          onFinish();
        }, 2000); // Default 2 second loading time
      }
    } else {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    // Cleanup on unmount or visibility change
    return () => {
      if (spinAnimationRef.current) {
        spinAnimationRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible, fadeAnim, spinAnim, onFinish]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Always render when visible or animating out
  if (!visible && fadeAnim._value === 0) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <View style={styles.loaderContainer}>
        {/* Spinning border */}
        <Animated.View
          style={[
            styles.spinnerBorder,
            { transform: [{ rotate: spin }] },
          ]}
        />
        
        {/* Static logo in center */}
        <View style={styles.logoCenter}>
          <Image
            source={require('../images/logo/favicon.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerBorder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: Colors.primary,
    borderRightColor: Colors.primary,
    position: 'absolute',
  },
  logoCenter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoImage: {
    width: 35,
    height: 35,
  },
});

export default LoadingOverlay;