import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
  Animated,
  Platform,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../theme/colors';

// Main Screens (imports remain the same)
import SplashScreen from '../screens/Splashpage/SplashScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import LiveClassScreen from '../screens/Liveclass/LiveClassScreen';
import OptionsScreen from '../screens/Options/OptionsScreen';
import CoursesScreen from '../screens/Coursespages/CoursesScreen';
import PracticeIDEScreen from '../screens/PracticelIDEScreen/PracticeIDEScreen';
import LoginScreen from '../screens/Loginpage/LoginScreen';
import SignupScreen from '../screens/Signuppage/SignupScreen';

// Course Screens
import CourseDetailScreen from '../screens/Coursespages/CourseDetailScreen';
import CoursePlayerScreen from '../screens/Coursespages/CoursePlayerScreen';

// Live Class Screens
import OnlineClassScreen from '../screens/Liveclass/OnlineClassScreen';
import CourseSyllabusScreen from '../screens/Liveclass/CourseSyllabusScreen';
import CoursePlanScreen from '../screens/Liveclass/CoursePlanScreen';

// Practice Screens
import DebuggingScreen from '../screens/PracticelIDEScreen/DebuggingScreen';
import InteractiveIDEScreen from '../screens/PracticelIDEScreen/InteractiveIDEScreen';

// Other Screens
import ReferEarnScreen from '../screens/ReferEarn/ReferEarnScreen';
import WebinarEnrollScreen from '../screens/Webinar/WebinarEnrollScreen';
import BlogViewScreen from '../screens/BlogView/BlogViewScreen';

// Option Screens
import AccountSettingsScreen from '../screens/Options/AccountSettingsScreen/AccountSettingsScreen';
import WebinarsScreen from '../screens/Options/WebinarsScreen/WebinarsScreen';
import NotificationsScreen from '../screens/Options/NotificationsScreen/NotificationsScreen';
import BlogsScreen from '../screens/Options/BlogsScreen/BlogsScreen';
import VisitWebsiteScreen from '../screens/Options/VisitWebsiteScreen/VisitWebsiteScreen';
import CertificatesScreen from '../screens/Options/CertificatesScreen/CertificatesScreen';
import AppSettingsScreen from '../screens/Options/AppSettingsScreen/AppSettingsScreen';
import HelpSupportScreen from '../screens/Options/Help&SupportScreen/Help&SupportScreen';
import PrivacyPolicyScreen from '../screens/Options/PrivacyPolicyScreen/PrivacyPolicyScreen';
import FreeCoursesDetailScreen from '../screens/Coursespages/FreeCoursesDetailScreen.tsx';

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// User Context
interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

/* ───────── ANIMATED TAB ICON ───────── */
const AnimatedTabIcon = ({ focused, iconName, label }: { focused: boolean; iconName: string; label: string }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1.1 : 1,
        useNativeDriver: true,
        friction: 3,
      }),
      Animated.spring(translateYAnim, {
        toValue: focused ? -2 : 0,
        useNativeDriver: true,
        friction: 3,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View
      style={[
        styles.tabIconContainer,
        {
          transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
        },
      ]}
    >
      {focused && <View style={styles.activeIndicator} />}
      <Icon
        name={iconName}
        size={24}
        color={focused ? Colors.primary : Colors.gray}
        style={styles.tabIcon}
      />
      <Text
        style={[
          styles.tabLabel,
          { color: focused ? Colors.primary : Colors.gray },
          focused && styles.tabLabelActive,
        ]}
      >
        {label}
      </Text>
    </Animated.View>
  );
};

/* ───────── CUSTOM TAB BAR ───────── */
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    animatedValues.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: state.index === index ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [state.index]);

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          paddingBottom: Math.max(insets.bottom, 8),
          height: 65 + Math.max(insets.bottom, 8),
        },
      ]}
    >
      <View style={styles.tabBarContent}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Icon names based on route
          let iconName = 'menu-outline';
          let focusedIconName = 'menu';
          let label = route.name;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              focusedIconName = 'home';
              label = 'Home';
              break;
            case 'Course':
              iconName = 'book-outline';
              focusedIconName = 'book';
              label = 'Courses';
              break;
            case 'Live':
              iconName = 'videocam-outline';
              focusedIconName = 'videocam';
              label = 'Live';
              break;
            case 'Practice':
              iconName = 'code-slash-outline';
              focusedIconName = 'code-slash';
              label = 'Practice';
              break;
            case 'More':
              iconName = 'grid-outline';
              focusedIconName = 'grid';
              label = 'More';
              break;
          }

          const backgroundColor = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', Colors.primary + '15'],
          });

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.tabButtonBackground,
                  { backgroundColor },
                ]}
              >
                <AnimatedTabIcon
                  focused={isFocused}
                  iconName={isFocused ? focusedIconName : iconName}
                  label={label}
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

/* ───────── HEADER ───────── */
const Header = ({ navigation, isLoggedIn, userName }: { navigation: any; isLoggedIn: boolean; userName: string }) => {
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userData');
              await AsyncStorage.removeItem('authToken');
              navigation.navigate('Home');
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.headerContainer,
        { paddingTop: Math.max(insets.top, 10) },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Image
            source={require('../images/logo/velearn-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.authButtons}>
          {!isLoggedIn ? (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('Signup')}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.signupButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.userContainer}>
              <Text style={styles.welcomeText} numberOfLines={1}>
                Hi, {userName}
              </Text>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon name="log-out-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

/* ───────── SCREEN WRAPPER ───────── */
const ScreenWithHeader = ({ children, navigation, isLoggedIn = false, userName = '' }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} isLoggedIn={isLoggedIn} userName={userName} />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

/* ───────── WRAPPED SCREENS ───────── */
const HomeWithHeader = ({ navigation, route }: any) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadUserData = useCallback(async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const data = JSON.parse(userDataString);
        setUserData(data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  useEffect(() => {
    loadUserData();
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return unsubscribe;
  }, [navigation, loadUserData]);

  useEffect(() => {
    if (route.params?.userData) {
      setUserData(route.params.userData);
      setIsLoggedIn(true);
      navigation.setParams({ userData: undefined });
    }
  }, [route.params, navigation]);

  return (
    <ScreenWithHeader 
      navigation={navigation} 
      isLoggedIn={isLoggedIn} 
      userName={userData?.name || ''}
    >
      <HomeScreen />
    </ScreenWithHeader>
  );
};

const CoursesWithHeader = ({ navigation, route }: any) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadUserData = useCallback(async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const data = JSON.parse(userDataString);
        setUserData(data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  useEffect(() => {
    loadUserData();
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return unsubscribe;
  }, [navigation, loadUserData]);

  return (
    <ScreenWithHeader 
      navigation={navigation} 
      isLoggedIn={isLoggedIn} 
      userName={userData?.name || ''}
    >
      <CoursesScreen />
    </ScreenWithHeader>
  );
};

const LiveWithHeader = ({ navigation, route }: any) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadUserData = useCallback(async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const data = JSON.parse(userDataString);
        setUserData(data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  useEffect(() => {
    loadUserData();
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return unsubscribe;
  }, [navigation, loadUserData]);

  return (
    <ScreenWithHeader 
      navigation={navigation} 
      isLoggedIn={isLoggedIn} 
      userName={userData?.name || ''}
    >
      <LiveClassScreen />
    </ScreenWithHeader>
  );
};

const PracticeIDEWithHeader = ({ navigation, route }: any) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadUserData = useCallback(async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const data = JSON.parse(userDataString);
        setUserData(data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  useEffect(() => {
    loadUserData();
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return unsubscribe;
  }, [navigation, loadUserData]);

  return (
    <ScreenWithHeader 
      navigation={navigation} 
      isLoggedIn={isLoggedIn} 
      userName={userData?.name || ''}
    >
      <PracticeIDEScreen />
    </ScreenWithHeader>
  );
};

const OptionsWithHeader = ({ navigation, route }: any) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadUserData = useCallback(async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const data = JSON.parse(userDataString);
        setUserData(data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  useEffect(() => {
    loadUserData();
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return unsubscribe;
  }, [navigation, loadUserData]);

  return (
    <ScreenWithHeader 
      navigation={navigation} 
      isLoggedIn={isLoggedIn} 
      userName={userData?.name || ''}
    >
      <OptionsScreen />
    </ScreenWithHeader>
  );
};

/* ───────── MAIN TABS ───────── */
const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      sceneContainerStyle={{
        backgroundColor: Colors.white,
      }}
    >
      <Tab.Screen name="Home" component={HomeWithHeader} />
      <Tab.Screen name="Course" component={CoursesWithHeader} />
      <Tab.Screen name="Live" component={LiveWithHeader} />
      <Tab.Screen name="Practice" component={PracticeIDEWithHeader} />
      <Tab.Screen name="More" component={OptionsWithHeader} />
    </Tab.Navigator>
  );
};

// Define navigation types
type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  CourseDetail: { courseId: string };
  CoursePlayer: { courseId: string };
  DebuggingScreen: undefined;
  InteractiveIDEScreen: undefined;
  OnlineClass: { courseId: string; courseTitle: string };
  CourseSyllabus: { courseId: string; courseTitle: string };
  CoursePlan: { courseId: string; courseTitle: string };
  ReferEarnScreen: undefined;
  WebinarEnrollScreen: undefined;
  BlogViewScreen: undefined;
  Login: undefined;
  Signup: undefined;
  AccountSettings: undefined;
  Webinars: undefined;
  Notifications: undefined;
  Blogs: undefined;
  VisitWebsite: undefined;
  Certificates: undefined;
  AppSettings: undefined;
  HelpSupport: undefined;
  PrivacyPolicy: undefined;
  FreeCoursesScreen: undefined;
  FreeCoursesDetailScreen: undefined;
};

/* ───────── APP NAVIGATOR ───────── */
export default function AppNavigator() {
  const [isAppReady, setIsAppReady] = useState(false);
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
  const routeNameRef = useRef<string>();

  useEffect(() => {
    const initTimeout = setTimeout(() => {
      setIsAppReady(true);
    }, 1500);
    return () => clearTimeout(initTimeout);
  }, []);

  if (!isAppReady) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Image
            source={require('../images/logo/velearn-logo.png')}
            style={styles.loadingLogo}
            resizeMode="contain"
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white}
        translucent={false}
      />

      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
        }}
        onStateChange={() => {
          const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
          routeNameRef.current = currentRouteName;
        }}
      >
        <MainStack.Navigator 
          screenOptions={{ 
            headerShown: false,
            gestureEnabled: true,
            cardStyle: { backgroundColor: Colors.white },
            animationEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
            headerStyle: {
              backgroundColor: Colors.white,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: Colors.lightGray,
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
              color: Colors.black,
            },
            headerBackTitleVisible: false,
            headerLeftContainerStyle: { paddingLeft: 8 },
            headerTitleAlign: 'center',
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 300,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 300,
                },
              },
            },
          }}
          initialRouteName="Splash"
        >
          <MainStack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{ 
              headerShown: false,
              animationEnabled: false,
            }}
          />

          <MainStack.Screen 
            name="MainTabs" 
            component={MainTabs}
            options={{ 
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          
          <MainStack.Group
            screenOptions={{
              gestureEnabled: true,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          >
            <MainStack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{
                headerShown: false,
                title: 'Login',
              }}
            />
            
            <MainStack.Screen 
              name="Signup" 
              component={SignupScreen}
              options={{
                headerShown: false,
                title: 'Sign Up',
              }}
            />
          </MainStack.Group>
          
          <MainStack.Group
            screenOptions={{
              gestureEnabled: true,
            }}
          >
            <MainStack.Screen 
              name="CourseDetail" 
              component={CourseDetailScreen}
              options={({ route }: any) => ({
                headerShown: false,
                title: 'Course Details',
              })}
            />
            
            <MainStack.Screen 
              name="CoursePlayer" 
              component={CoursePlayerScreen}
              options={({ route }: any) => ({
                headerShown: false,
                title: 'Course Player',
                gestureEnabled: false,
              })}
            />

            <MainStack.Screen
              name="FreeCoursesDetailScreen"
              component={FreeCoursesDetailScreen}
              options={{
                headerShown: false,
                title: 'Free Course Details',
              }}
            />
          </MainStack.Group>

          <MainStack.Group>
            <MainStack.Screen 
              name="DebuggingScreen" 
              component={DebuggingScreen}
              options={{
                headerShown: false,
                title: 'Debugging Practice',
              }}
            />

            <MainStack.Screen 
              name="InteractiveIDEScreen" 
              component={InteractiveIDEScreen}
              options={{
                headerShown: false,
                title: 'Interactive IDE',
              }}
            />
          </MainStack.Group>

          <MainStack.Group>
            <MainStack.Screen 
              name="OnlineClass" 
              component={OnlineClassScreen}
              options={({ route }: any) => ({
                headerShown: false,
                title: 'Online Class',
              })}
            />

            <MainStack.Screen 
              name="CourseSyllabus" 
              component={CourseSyllabusScreen}
              options={({ route }: any) => ({
                headerShown: false,
                title: 'Course Syllabus',
              })}
            />

            <MainStack.Screen 
              name="CoursePlan" 
              component={CoursePlanScreen}
              options={({ route }: any) => ({
                headerShown: false,
                title: 'Course Plan',
              })}
            />
          </MainStack.Group>

          <MainStack.Group
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.white,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
              },
            }}
          >
            <MainStack.Screen
              name="AccountSettings"
              component={AccountSettingsScreen}
              options={{
                title: 'Account Settings',
              }}
            />

            <MainStack.Screen
              name="Webinars"
              component={WebinarsScreen}
              options={{
                title: 'Webinars',
              }}
            />

            <MainStack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{
                title: 'Notifications',
              }}
            />

            <MainStack.Screen
              name="Blogs"
              component={BlogsScreen}
              options={{
                title: 'Blogs',
              }}
            />

            <MainStack.Screen
              name="VisitWebsite"
              component={VisitWebsiteScreen}
              options={{
                title: 'Visit Website',
              }}
            />

            <MainStack.Screen
              name="Certificates"
              component={CertificatesScreen}
              options={{
                title: 'Certificates',
              }}
            />

            <MainStack.Screen
              name="AppSettings"
              component={AppSettingsScreen}
              options={{
                title: 'App Settings',
              }}
            />

            <MainStack.Screen
              name="HelpSupport"
              component={HelpSupportScreen}
              options={{
                title: 'Help & Support',
              }}
            />

            <MainStack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicyScreen}
              options={{
                title: 'Privacy Policy',
              }}
            />
          </MainStack.Group>

          <MainStack.Group>
            <MainStack.Screen
              name="ReferEarnScreen"
              component={ReferEarnScreen}
              options={{
                headerShown: true,
                title: 'Refer & Earn',
              }}
            />
            
            <MainStack.Screen
              name="WebinarEnrollScreen"
              component={WebinarEnrollScreen}
              options={{
                headerShown: false,
                title: 'Enroll Webinar',
              }}
            />
            
            <MainStack.Screen
              name="BlogViewScreen"
              component={BlogViewScreen}
              options={{
                headerShown: false,
                title: 'Blog Article',
              }}
            />
          </MainStack.Group>
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

/* ───────── STYLES ───────── */
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingLogo: {
    width: 150,
    height: 48,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.gray,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 100,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 100,
    height: 32,
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.primary,
  },
  signupButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  signupButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    maxWidth: 150,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  logoutButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: Colors.lightGray + '20',
  },
  
  // Custom Tab Bar Styles
  tabBarContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  tabBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabButtonBackground: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    minWidth: 60,
    alignItems: 'center',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  tabIcon: {
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tabLabelActive: {
    fontWeight: '700',
  },
});