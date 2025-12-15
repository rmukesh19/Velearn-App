import { Platform, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

// Device detection functions
export const isTablet = () => width >= 768;
export const isSmallDevice = () => height < 700;
export const isLargeDevice = () => height > 800;
export const hasNotch = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height >= 812 || width >= 812)
  );
};

// Navigation specific responsive functions
export const getTabBarConfig = () => {
  const tablet = isTablet();
  const smallDevice = isSmallDevice();
  const largeDevice = isLargeDevice();
  const notch = hasNotch();
  
  // Base values
  let heightValue = Platform.select({ 
    ios: notch ? 85 : 83, 
    android: 70 
  });
  
  let iconSize = 24;
  let labelSize = 12;
  let paddingBottom = Platform.select({ 
    ios: notch ? 34 : 15, 
    android: 10 
  });
  let paddingTop = 8;
  
  // Adjustments for different devices
  if (tablet) {
    heightValue = Platform.select({ ios: 90, android: 85 });
    iconSize = 28;
    labelSize = 14;
    paddingBottom = Platform.select({ ios: 25, android: 15 });
    paddingTop = 12;
  } else if (smallDevice) {
    heightValue = Platform.select({ ios: 65, android: 60 });
    iconSize = 22;
    labelSize = 10;
    paddingBottom = Platform.select({ ios: 10, android: 6 });
    paddingTop = 4;
  } else if (largeDevice) {
    heightValue = Platform.select({ ios: 88, android: 75 });
    iconSize = 26;
    labelSize = 13;
    paddingBottom = Platform.select({ ios: 20, android: 12 });
    paddingTop = 10;
  }
  
  return {
    height: heightValue,
    iconSize,
    labelSize,
    paddingBottom,
    paddingTop,
    paddingHorizontal: tablet ? 40 : 20,
  };
};

// Get responsive tab bar style
export const getTabBarStyle = (backgroundColor = '#FFFFFF', borderColor = '#E5E5E5') => {
  const config = getTabBarConfig();
  
  return {
    backgroundColor,
    borderTopColor: borderColor,
    borderTopWidth: 1,
    height: config.height,
    paddingBottom: config.paddingBottom,
    paddingTop: config.paddingTop,
    paddingHorizontal: config.paddingHorizontal,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  };
};

// Get tab bar label style
export const getTabBarLabelStyle = () => {
  const config = getTabBarConfig();
  
  return {
    fontSize: config.labelSize,
    marginBottom: Platform.select({ ios: 2, android: 0 }),
    fontWeight: '500',
  };
};

// Get icon props
export const getIconProps = () => {
  const config = getTabBarConfig();
  
  return {
    size: config.iconSize,
  };
};

// Complete tab bar options
export const getTabBarOptions = (colors) => {
  const style = getTabBarStyle(
    colors?.backgroundColor || '#FFFFFF',
    colors?.borderColor || '#E5E5E5'
  );
  const labelStyle = getTabBarLabelStyle();
  
  return {
    tabBarStyle: style,
    tabBarLabelStyle: labelStyle,
    tabBarItemStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 4,
    },
  };
};