import { Platform, Dimensions, PixelRatio, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

// Device detection functions
export const isIPhoneX = (): boolean => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 812 || width === 812 || height === 896 || width === 896)
  );
};

export const hasNotch = (): boolean => {
  return Platform.OS === 'ios' && isIPhoneX();
};

export const hasDynamicIsland = (): boolean => {
  return (
    Platform.OS === 'ios' &&
    (height === 852 || width === 852 || height === 932 || width === 932)
  );
};

// Android specific detection
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

// Screen size categories
export const isSmallDevice = width < 375; // iPhone SE, 5/5S
export const isMediumDevice = width >= 375 && width < 414; // iPhone 6/7/8, X
export const isLargeDevice = width >= 414 && width < 768; // iPhone Plus, 11 Pro Max
export const isTablet = width >= 768; // iPad, tablets

// Safe area calculations
export const getStatusBarHeight = (): number => {
  if (isIOS) {
    if (hasDynamicIsland()) return 59;
    if (hasNotch()) return 44;
    return 20;
  }
  return StatusBar.currentHeight || 24;
};

export const getBottomSafeArea = (): number => {
  if (isIOS) {
    if (hasDynamicIsland() || hasNotch()) return 34;
    return 0;
  }
  return 0;
};

// Pixel density helper
export const getPixelDensity = (): number => pixelRatio;

// Export dimensions
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Navigation specific responsive functions
export const getTabBarConfig = () => {
  const tablet = isTablet;
  const smallDevice = isSmallDevice;
  const largeDevice = isLargeDevice;
  const ios = isIOS;
  const notch = hasNotch() || hasDynamicIsland();
  
  // Default values
  let heightValue = ios ? (notch ? 85 : 83) : 70;
  let iconSize = 24;
  let labelSize = 12;
  let paddingBottom = ios ? (notch ? 10 : 15) : 10;
  let paddingTop = 8;
  let paddingHorizontal = 20;
  
  // Adjustments
  if (tablet) {
    heightValue = ios ? 90 : 85;
    iconSize = 28;
    labelSize = 14;
    paddingBottom = ios ? 25 : 15;
    paddingTop = 12;
    paddingHorizontal = 40;
  } else if (smallDevice) {
    heightValue = ios ? 65 : 60;
    iconSize = 22;
    labelSize = 10;
    paddingBottom = ios ? 10 : 6;
    paddingTop = 4;
    paddingHorizontal = 20;
  } else if (largeDevice) {
    heightValue = ios ? 88 : 75;
    iconSize = 26;
    labelSize = 13;
    paddingBottom = ios ? 20 : 12;
    paddingTop = 10;
    paddingHorizontal = 20;
  }
  
  return {
    height: heightValue,
    iconSize,
    labelSize,
    paddingBottom,
    paddingTop,
    paddingHorizontal,
  };
};