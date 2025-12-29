import React, { useState, useEffect, useRef } from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';

// Main Screens
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
import FreeCoursesScreen from '../screens/Coursespages/FreeCoursesScreen.tsx';  

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* ───────── HEADER ───────── */
const Header = ({ navigation, isLoggedIn = false }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.headerContainer,
        { paddingTop: Math.max(insets.top, 10) },
      ]}
    >
      <View style={styles.header}>
        <Image
          source={require('../images/logo/velearn-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.authButtons}>
          {!isLoggedIn ? (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.signupButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.welcomeText}>Welcome!</Text>
          )}
        </View>
      </View>
    </View>
  );
};

/* ───────── SCREEN WRAPPER ───────── */
const ScreenWithHeader = ({ children, navigation, isLoggedIn = false }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} isLoggedIn={isLoggedIn} />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

/* ───────── WRAPPED SCREENS ───────── */
const HomeWithHeader = ({ navigation }) => (
  <ScreenWithHeader navigation={navigation} isLoggedIn={false}>
    <HomeScreen />
  </ScreenWithHeader>
);

const CoursesWithHeader = ({ navigation }) => (
  <ScreenWithHeader navigation={navigation} isLoggedIn={false}>
    <CoursesScreen />
  </ScreenWithHeader>
);

const LiveWithHeader = ({ navigation }) => (
  <ScreenWithHeader navigation={navigation} isLoggedIn={false}>
    <LiveClassScreen />
  </ScreenWithHeader>
);

const OptionsWithHeader = ({ navigation }) => (
  <ScreenWithHeader navigation={navigation} isLoggedIn={false}>
    <OptionsScreen />
  </ScreenWithHeader>
);

const PracticeIDEWithHeader = ({ navigation }) => (
  <ScreenWithHeader navigation={navigation} isLoggedIn={false}>
    <PracticeIDEScreen />
  </ScreenWithHeader>
);

/* ───────── MAIN TABS ───────── */
const MainTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.lightGray,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -4,
          fontWeight: '500',
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName = 'menu-outline';

          if (route.name === 'Home')
            iconName = focused ? 'home' : 'home-outline';
          if (route.name === 'Course')
            iconName = focused ? 'book' : 'book-outline';
          if (route.name === 'Live')
            iconName = focused ? 'tv' : 'tv-outline';
          if (route.name === 'Practice')
            iconName = focused ? 'code-slash' : 'code-slash-outline';
          if (route.name === 'More')
            iconName = focused ? 'menu' : 'menu-outline';

          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeWithHeader}
        options={{ 
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Course"
        component={CoursesWithHeader}
        options={{ 
          tabBarLabel: 'Courses',
        }}
      />
      <Tab.Screen 
        name="Live" 
        component={LiveWithHeader}
        options={{ 
          tabBarLabel: 'Live',
        }}
      />
      <Tab.Screen 
        name="Practice" 
        component={PracticeIDEWithHeader}
        options={{ 
          tabBarLabel: 'Practice',
        }}
      />
      <Tab.Screen 
        name="More" 
        component={OptionsWithHeader}
        options={{ 
          tabBarLabel: 'More',
        }}
      />
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
  // Option Screens
  AccountSettings: undefined;
  Webinars: undefined;
  Notifications: undefined;
  Blogs: undefined;
  VisitWebsite: undefined;
  Certificates: undefined;
  AppSettings: undefined;
  HelpSupport: undefined;
  PrivacyPolicy: undefined;
};

/* ───────── APP NAVIGATOR ───────── */
export default function AppNavigator() {
  const [isAppReady, setIsAppReady] = useState(false);
  const navigationRef = useRef<any>(null);
  const initTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize app loading
  useEffect(() => {
    // Simulate app initialization
    initTimeoutRef.current = setTimeout(() => {
      setIsAppReady(true);
    }, 1500);

    return () => {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
    };
  }, []);


  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white}
        translucent={false}
      />

      <NavigationContainer
        ref={navigationRef}
      >
        <MainStack.Navigator 
          screenOptions={{ 
            headerShown: false,
            gestureEnabled: true,
            cardStyle: { backgroundColor: Colors.white },
            animationEnabled: true,
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
          }}
          initialRouteName="Splash"
        >
          {/* Splash Screen */}
          <MainStack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{ 
              headerShown: false,
              animationEnabled: false 
            }}
          />

          {/* Main Tabs */}
          <MainStack.Screen 
            name="MainTabs" 
            component={MainTabs}
            options={{ 
              headerShown: false,
              animationEnabled: false 
            }}
          />
          
          {/* COURSE-RELATED SCREENS */}
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
            })}
          />

          {/* PRACTICE SCREENS */}
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

          {/* LIVE CLASS SCREENS */}
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
            name="FreeCoursesScreen"
            component={FreeCoursesScreen}
            options={{
              headerShown: false,
              title: 'Free Courses',
            }}
          />

          <MainStack.Screen 
            name="CoursePlan" 
            component={CoursePlanScreen}
            options={({ route }: any) => ({
              headerShown: false,
              title: 'Course Plan',
            })}
          />

          {/* OPTION SCREENS */}
          <MainStack.Screen
            name="AccountSettings"
            component={AccountSettingsScreen}
            options={{
              headerShown: true,
              title: 'Account Settings',
            }}
          />

          <MainStack.Screen
            name="Webinars"
            component={WebinarsScreen}
            options={{
              headerShown: true,
              title: 'Webinars',
            }}
          />

          <MainStack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              headerShown: true,
              title: 'Notifications',
            }}
          />

          <MainStack.Screen
            name="Blogs"
            component={BlogsScreen}
            options={{
              headerShown: true,
              title: 'Blogs',
            }}
          />

          <MainStack.Screen
            name="VisitWebsite"
            component={VisitWebsiteScreen}
            options={{
              headerShown: true,
              title: 'Visit Website',
            }}
          />

          <MainStack.Screen
            name="Certificates"
            component={CertificatesScreen}
            options={{
              headerShown: true,
              title: 'Certificates',
            }}
          />

          <MainStack.Screen
            name="AppSettings"
            component={AppSettingsScreen}
            options={{
              headerShown: true,
              title: 'App Settings',
            }}
          />

          <MainStack.Screen
            name="HelpSupport"
            component={HelpSupportScreen}
            options={{
              headerShown: true,
              title: 'Help & Support',
            }}
          />

          <MainStack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreen}
            options={{
              headerShown: true,
              title: 'Privacy Policy',
            }}
          />

          {/* OTHER SCREENS */}
          <MainStack.Screen
            name="ReferEarnScreen"
            component={ReferEarnScreen}
            options={{
              headerShown: false,
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
          
          {/* AUTH SCREENS */}
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
  },
  signupButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },
  welcomeText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.black,
  },
});