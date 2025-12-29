import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { Colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }: any) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const logoScale = new Animated.Value(0);
  const waveAnim = new Animated.Value(0);

  useEffect(() => {
    // Start wave animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Main animation sequence
    Animated.sequence([
      // Logo bounce animation
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      // Fade in and scale up content
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      // FIXED: Changed from 'AuthStack' to 'MainTabs'
      navigation.replace('MainTabs'); // Navigate to the MainTabs
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Generate wave circles
  const renderWaveCircles = () => {
    const circles = [];
    for (let i = 0; i < 3; i++) {
      const scale = waveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.5 + i * 0.3],
      });

      const opacity = waveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.1, 0],
      });

      circles.push(
        <Animated.View
          key={i}
          style={[
            styles.waveCircle,
            {
              transform: [{ scale }],
              opacity,
              borderWidth: 1,
              borderColor: Colors.primary + '20',
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
      
      {/* Decorative Background Elements */}
      <View style={styles.backgroundElements}>
        {/* Top left accent */}
        <View style={[styles.accentCircle, styles.topLeftAccent]} />
        
        {/* Bottom right accent */}
        <View style={[styles.accentCircle, styles.bottomRightAccent]} />
        
        {/* Geometric pattern */}
        <View style={styles.geometricPattern}>
          <View style={[styles.geometricShape, styles.shape1]} />
          <View style={[styles.geometricShape, styles.shape2]} />
          <View style={[styles.geometricShape, styles.shape3]} />
        </View>
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
                      outputRange: ['-180deg', '0deg'],
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
       
          
          {/* Divider */}
          <View style={styles.divider} />
          
          <Text style={styles.appDescription}>
            Your personalized coding learning platform
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
          <View style={styles.loadingBar}>
            <Animated.View
              style={[
                styles.loadingProgress,
                {
                  transform: [
                    {
                      translateX: waveAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-100, 100],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
          
          <Text style={styles.loadingText}>Preparing your learning journey...</Text>
          
          {/* Animated dots */}
          <View style={styles.dotsContainer}>
            {[...Array(3)].map((_, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.animatedDot,
                  {
                    backgroundColor: Colors.primary,
                    transform: [
                      {
                        translateY: waveAnim.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [0, -8, 0],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>

        {/* Version and Copyright */}
        <Animated.View
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.footerContent}>
            <Text style={styles.versionText}>Version 2.1.0</Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.copyrightText}>© 2025 Velearn Inc.</Text>
          </View>
          
          <Text style={styles.poweredBy}>
            Powered by Interactive Learning Technology
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
  },
  backgroundElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  accentCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.primary + '08',
  },
  topLeftAccent: {
    top: -100,
    left: -100,
  },
  bottomRightAccent: {
    bottom: -100,
    right: -100,
  },
  geometricPattern: {
    position: 'absolute',
    top: '30%',
    right: 30,
  },
  geometricShape: {
    position: 'absolute',
    backgroundColor: Colors.secondary + '10',
  },
  shape1: {
    width: 40,
    height: 40,
    borderRadius: 8,
    transform: [{ rotate: '45deg' }],
    top: 0,
    right: 0,
  },
  shape2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    top: 30,
    right: -20,
  },
  shape3: {
    width: 30,
    height: 30,
    borderRadius: 6,
    top: -20,
    right: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  waveCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.primary + '10',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: Colors.primary + '40',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary + '10',
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  logoFallback: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    letterSpacing: 1,
  },
  appInfoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontSize: 52,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.secondary,
    letterSpacing: 1,
    marginBottom: 16,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    marginVertical: 16,
  },
  appDescription: {
    fontSize: 14,
    color: Colors.grey,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  loadingBar: {
    width: '80%',
    height: 4,
    backgroundColor: Colors.lightGrey,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 20,
  },
  loadingProgress: {
    width: '30%',
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.grey,
    marginBottom: 20,
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  animatedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  versionText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginHorizontal: 8,
  },
  copyrightText: {
    fontSize: 12,
    color: Colors.grey,
  },
  poweredBy: {
    fontSize: 10,
    color: Colors.lightGrey,
    letterSpacing: 0.5,
  },
});

export default SplashScreen;