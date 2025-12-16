// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { StatusBar } from 'react-native';
// import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Colors } from '../theme/colors';

// // Screens
// import HomeScreen from '../../src/screens/HomeScreen';
// import CoursesScreen from '../../src/screens/CoursesScreen';
// import LiveClassScreen from '../../src/screens/LiveClassScreen';
// import OptionsScreen from '../../src/screens/OptionsScreen';
// import PracticeIDEScreen from '../../src/screens/PracticeIDEScreen';
// import DebuggingScreen from '../../src/screens/DebuggingScreen';
// import OnlineCoursesScreen from '../../src/screens/OnlineCoursesScreen';
// import LoginScreen from '../../src/screens/LoginScreen';
// import SplashScreen from '../../src/screens/SplashScreen';
// import WalkthroughScreen from '../../src/screens/WalkthroughScreen';
// import ProfileScreen from '../../src/screens/ProfileScreen';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// /* ────────────── OPTIONS STACK ────────────── */
// const OptionsStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="OptionsMain" component={OptionsScreen} />
//     <Stack.Screen name="PracticeIDE" component={PracticeIDEScreen} />
//     <Stack.Screen name="Debugging" component={DebuggingScreen} />
//     <Stack.Screen name="OnlineCourses" component={OnlineCoursesScreen} />
//     <Stack.Screen name="Profile" component={ProfileScreen} />
//   </Stack.Navigator>
// );

// /* ────────────── BOTTOM TABS (SAFE-AREA FIXED) ────────────── */
// const AppTabs = () => {
//   const insets = useSafeAreaInsets();

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarActiveTintColor: Colors.secondary,
//         tabBarInactiveTintColor: Colors.gray,
//         tabBarStyle: {
//           backgroundColor: Colors.white,
//           borderTopColor: Colors.lightGray,
//           borderTopWidth: 1,
//           height: 65 + insets.bottom,   // auto safe-area handling
//           paddingBottom: insets.bottom,
//           paddingTop: 8,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: '500',
//           marginBottom: 2,
//         },
//         tabBarIcon: ({ color, focused }) => {
//           const icons = {
//             Home: focused ? 'home' : 'home-outline',
//             Courses: focused ? 'book' : 'book-outline',
//             LiveClass: focused ? 'tv' : 'tv-outline',
//             Options: focused ? 'menu' : 'menu-outline',
//           };
//           return <Icon name={icons[route.name]} size={26} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Courses" component={CoursesScreen} />
//       <Tab.Screen name="LiveClass" component={LiveClassScreen} />
//       <Tab.Screen name="Options" component={OptionsStack} />
      
//     </Tab.Navigator>
//   );
// };

// /* ────────────── MAIN APP NAVIGATION ────────────── */
// const AppNavigator = () => {
//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="SplashScreen"
//           screenOptions={{ headerShown: false }}
//         >
//           <Stack.Screen name="SplashScreen" component={SplashScreen} />
//           <Stack.Screen name="WalkthroughScreen" component={WalkthroughScreen} />
//           <Stack.Screen name="LoginScreen" component={LoginScreen} />
//           <Stack.Screen name="AppTabs" component={AppTabs} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';

// Screens
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LiveClassScreen from '../screens/LiveClassScreen';
import OptionsScreen from '../screens/OptionsScreen';

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarIcon: ({ color, focused }) => {
          const icons: any = {
            Home: focused ? 'home' : 'home-outline',
            Live: focused ? 'tv' : 'tv-outline',
            More: focused ? 'menu' : 'menu-outline',
          };
          return <Icon name={icons[route.name]} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Live" component={LiveClassScreen} />
      <Tab.Screen name="More" component={OptionsScreen} />
    </Tab.Navigator>
  );
};

/* ───────── APP NAVIGATOR ───────── */
export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <NavigationContainer>
        <MainStack.Navigator 
          screenOptions={{ 
            headerShown: false,
            animationEnabled: false // Disable animation for instant transition
          }}
        >
          <MainStack.Screen name="Splash" component={SplashScreen} />
          <MainStack.Screen name="MainTabs" component={MainTabs} />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}