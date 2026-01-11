import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Image,
  Easing,
} from 'react-native';
import { Colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }: any) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.7);
  const logoScale = new Animated.Value(0);
  const waveAnim = new Animated.Value(0);
  const progressAnim = new Animated.Value(0);

  useEffect(() => {
    // Wave animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2800,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    // Main animation sequence
    Animated.sequence([
      Animated.delay(300),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Generate wave circles
  const renderWaveCircles = () => {
    const circles = [];
    for (let i = 0; i < 3; i++) {
      const scale = waveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.8 + i * 0.2],
      });

      const opacity = waveAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.15, 0.05, 0],
      });

      circles.push(
        <Animated.View
          key={i}
          style={[
            styles.waveCircle,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        />
      );
    }
    return circles;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      
      {/* Modern Background Elements */}
      <View style={styles.backgroundElements}>
        {/* Gradient-inspired accent */}
        <View style={styles.gradientAccent} />
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.particle,
              {
                top: 15 + (i * 15) % 40,
                left: 20 + (i * 30) % 60,
                transform: [{ rotate: `${i * 15}deg` }],
                opacity: 0.15 - i * 0.02,
              },
            ]}
          />
        ))}
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo with wave effect */}
        <View style={styles.logoWrapper}>
          {renderWaveCircles()}
          
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [
                  { scale: logoScale },
                  {
                    rotate: logoScale.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-20deg', '0deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Image
              source={require('../../images/logo/velearn-logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* App Name and Tagline */}
        <Animated.View
          style={[
            styles.appInfoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          
          <Text style={styles.appTagline}>Code. Learn. Grow.</Text>
          <View style={styles.divider} />
          <Text style={styles.appDescription}>
            Personalized coding journey for modern developers
          </Text>
        </Animated.View>

        {/* Animated Loading Indicator */}
        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {/* Progress bar with modern styling */}
          <View style={styles.loadingBar}>
            <Animated.View
              style={[
                styles.loadingProgress,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          
          <Text style={styles.loadingText}>Initializing your learning path...</Text>
          
          {/* Animated micro-interaction dots */}
          <View style={styles.dotsContainer}>
            {[...Array(3)].map((_, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.animatedDot,
                  {
                    transform: [
                      {
                        translateY: waveAnim.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [0, -10, 0],
                        }),
                      },
                    ],
                    opacity: fadeAnim.interpolate({
                      inputRange: [0, 0.8, 1],
                      outputRange: [0, 0.7, 1],
                    }),
                    animationDelay: i * 200,
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>

        {/* Minimal Footer */}
        <Animated.View
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.versionText}>v1.1.0</Text>
          <Text style={styles.poweredBy}>
            © 2026 Velearn • AI-Powered Learning
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  backgroundElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  gradientAccent: {
    position: 'absolute',
    top: -120,
    right: -120,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.primary,
    opacity: 0.05,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  logoWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    height: 160,
  },
  waveCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.primary,
    opacity: 0.1,
  },
  logoContainer: {
    width: 130,
    height: 130,
    borderRadius: 28,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      },
    }),
    borderWidth: 1,
    borderColor: Colors.primary + '10',
  },
  logoImage: {
    width: 85,
    height: 85,
  },
  appInfoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 56,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.5,
    marginBottom: 4,
    fontFamily: 'System',
  },
  appTagline: {
    fontSize: 19,
    fontWeight: '600',
    color: Colors.secondary,
    letterSpacing: 0.8,
    marginBottom: 18,
    textTransform: 'uppercase',
  },
  divider: {
    width: 50,
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 1,
    marginVertical: 14,
  },
  appDescription: {
    fontSize: 15,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'System',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  loadingBar: {
    width: '90%',
    height: 4,
    backgroundColor: Colors.lightGray,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 22,
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
    transform: [{ scaleX: 0.98 }], // Prevent pixel gaps
  },
  loadingText: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 18,
    fontWeight: '500',
    fontFamily: 'System',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 20,
    gap: 8,
  },
  animatedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  poweredBy: {
    fontSize: 11,
    color: Colors.gray,
    letterSpacing: 0.3,
  },
});

export default SplashScreen;