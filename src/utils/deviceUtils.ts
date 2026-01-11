import { 
  Platform, 
  Dimensions, 
  PixelRatio, 
  StatusBar, 
  NativeModules 
} from 'react-native';

const { width, height } = Dimensions.get('window');
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const pixelRatio = PixelRatio.get();

// Get device model
let deviceModel = '';
if (Platform.OS === 'android') {
  deviceModel = Platform.constants?.Model || '';
}

// ==================== DEVICE TYPE DETECTION ====================

// iOS Device Detection
export const isIPhoneX = (): boolean => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 812 || width === 812 || height === 896 || width === 896)
  );
};

export const isIPhone14Pro = (): boolean => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 852 || width === 852)
  );
};

export const isIPhone14ProMax = (): boolean => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 932 || width === 932)
  );
};

export const isIPhone15Pro = (): boolean => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 852 || width === 852)
  );
};

export const isIPhone15ProMax = (): boolean => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 932 || width === 932)
  );
};

export const isIPhone12or13 = (): boolean => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 844 || width === 844 || height === 926 || width === 926)
  );
};

export const hasDynamicIsland = (): boolean => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 852 || width === 852 || height === 932 || width === 932)
  );
};

export const hasNotch = (): boolean => {
  if (Platform.OS === 'android') {
    const androidNotchModels = [
      'Pixel 3 XL', 'Pixel 4 XL', 'Pixel 5', 'Pixel 6', 'Pixel 7',
      'Mi 8', 'Mi 9', 'Mi 10', 'Mi 11',
      'P20 Pro', 'P30 Pro', 'P40 Pro',
      'LG G7', 'LG V30', 'LG V40',
      'OPPO R15', 'OPPO Find X',
      'ONEPLUS 6', 'ONEPLUS 7', 'ONEPLUS 8', 'ONEPLUS 9',
      'Samsung Galaxy S10', 'Samsung Galaxy S20', 'Samsung Galaxy S21',
      'Samsung Galaxy S22', 'Samsung Galaxy S23',
    ];
    
    if (deviceModel && androidNotchModels.some(model => 
      deviceModel.toLowerCase().includes(model.toLowerCase()))) {
      return true;
    }
    
    return StatusBar.currentHeight ? StatusBar.currentHeight > 24 : false;
  }
  return Platform.OS === 'ios' && isIPhoneX();
};

// ==================== PLATFORM DETECTION ====================

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const isWeb = Platform.OS === 'web';

// ==================== SCREEN SIZE CATEGORIES ====================

// Phone sizes
export const isSmallDevice = width < 375; // iPhone SE, older Android
export const isMediumDevice = width >= 375 && width < 414; // iPhone 12/13/14, standard Android
export const isLargeDevice = width >= 414 && width < 768; // iPhone Plus, Pro Max, large Android

// Tablet sizes
export const isSmallTablet = width >= 768 && width < 1024; // iPad Mini, 7-8" tablets
export const isMediumTablet = width >= 1024 && width < 1366; // iPad, 9-11" tablets
export const isLargeTablet = width >= 1366; // iPad Pro 12.9", large tablets

export const isTablet = width >= 768;
export const isPhone = width < 768;

// Aspect ratio detection
export const isLandscape = width > height;
export const isPortrait = height >= width;
export const aspectRatio = width / height;

// ==================== SAFE AREA CALCULATIONS ====================

export const getStatusBarHeight = (): number => {
  if (isIOS) {
    if (hasDynamicIsland()) return 59;
    if (isIPhone12or13()) return 47;
    if (hasNotch()) return 44;
    if (Platform.isPad) return 24;
    return 20;
  }
  
  if (isAndroid) {
    const currentHeight = StatusBar.currentHeight || 0;
    if (hasNotch()) {
      return Math.max(currentHeight, 30);
    }
    return currentHeight || 24;
  }
  
  return 0;
};

export const getBottomSafeArea = (): number => {
  if (isIOS) {
    if (hasDynamicIsland()) return 34;
    if (hasNotch()) return 34;
    if (isIPhone12or13()) return 34;
    if (height >= 812) return 34;
    if (Platform.isPad) return 20;
    return 0;
  }
  
  if (isAndroid) {
    if (hasNotch()) return 24;
    
    const hasGestureNavigation = height > 1920 || width > 1080;
    if (hasGestureNavigation) return 20;
    
    if (deviceModel.toLowerCase().includes('samsung')) return 10;
  }
  
  return 0;
};

export const getTopSafeArea = (): number => {
  return getStatusBarHeight();
};

export const getLeftSafeArea = (): number => {
  if (isLandscape && (hasNotch() || hasDynamicIsland())) {
    return 44;
  }
  return 0;
};

export const getRightSafeArea = (): number => {
  if (isLandscape && (hasNotch() || hasDynamicIsland())) {
    return 44;
  }
  return 0;
};

// ==================== RESPONSIVE DIMENSIONS ====================

// Scale based on device width (375 is base iPhone width)
export const scale = (size: number): number => {
  const baseWidth = 375;
  return (width / baseWidth) * size;
};

// Scale with moderate factor
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

// Vertical scale based on device height
export const verticalScale = (size: number): number => {
  const baseHeight = 667; // iPhone 8 height
  return (height / baseHeight) * size;
};

// Font scaling
export const scaleFontSize = (size: number): number => {
  const newSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

// ==================== RESPONSIVE SPACING ====================

export const getResponsiveSpacing = () => {
  if (isTablet) {
    return {
      xs: 6,
      sm: 12,
      md: 20,
      lg: 32,
      xl: 48,
      xxl: 64,
    };
  } else if (isLargeDevice) {
    return {
      xs: 5,
      sm: 10,
      md: 16,
      lg: 24,
      xl: 36,
      xxl: 48,
    };
  } else if (isSmallDevice) {
    return {
      xs: 3,
      sm: 6,
      md: 10,
      lg: 16,
      xl: 24,
      xxl: 32,
    };
  }
  
  return {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 20,
    xl: 28,
    xxl: 40,
  };
};

// ==================== RESPONSIVE FONT SIZES ====================

export const getResponsiveFontSizes = () => {
  if (isTablet) {
    return {
      xxs: 14,
      xs: 16,
      sm: 18,
      md: 22,
      lg: 28,
      xl: 36,
      xxl: 48,
      xxxl: 64,
    };
  } else if (isLargeDevice) {
    return {
      xxs: 11,
      xs: 13,
      sm: 15,
      md: 18,
      lg: 22,
      xl: 28,
      xxl: 36,
      xxxl: 48,
    };
  } else if (isSmallDevice) {
    return {
      xxs: 9,
      xs: 11,
      sm: 13,
      md: 15,
      lg: 18,
      xl: 22,
      xxl: 28,
      xxxl: 36,
    };
  }
  
  return {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 42,
  };
};

// ==================== TAB BAR CONFIGURATION ====================

export const getTabBarConfig = () => {
  const bottomSafeArea = getBottomSafeArea();
  
  let baseHeight = isIOS ? 49 : 56;
  let iconSize = 24;
  let labelSize = 12;
  let paddingTop = 8;
  let paddingHorizontal = 16;
  
  if (isTablet) {
    baseHeight = isIOS ? 65 : 72;
    iconSize = 32;
    labelSize = 15;
    paddingTop = 14;
    paddingHorizontal = 28;
  } else if (isLargeDevice) {
    baseHeight = isIOS ? 52 : 60;
    iconSize = 26;
    labelSize = 13;
    paddingTop = 10;
    paddingHorizontal = 18;
  } else if (isSmallDevice) {
    baseHeight = isIOS ? 46 : 52;
    iconSize = 22;
    labelSize = 10;
    paddingTop = 6;
    paddingHorizontal = 12;
  }
  
  const totalHeight = baseHeight + bottomSafeArea;
  const paddingBottom = bottomSafeArea > 0 ? bottomSafeArea : (isIOS ? 12 : 8);
  
  return {
    height: totalHeight,
    baseHeight,
    safeArea: bottomSafeArea,
    iconSize,
    labelSize,
    paddingBottom,
    paddingTop,
    paddingHorizontal,
  };
};

// ==================== BOTTOM BUTTON CONFIGURATION ====================

export const getBottomButtonConfig = () => {
  const bottomSafeArea = getBottomSafeArea();
  const isSmallScreen = isSmallDevice || height < 700;
  
  let buttonHeight = 50;
  let fontSize = 18;
  let borderRadius = 12;
  let paddingHorizontal = 16;
  
  if (isTablet) {
    buttonHeight = 60;
    fontSize = 20;
    borderRadius = 16;
    paddingHorizontal = 24;
  } else if (isSmallScreen) {
    buttonHeight = 44;
    fontSize = 16;
    borderRadius = 10;
    paddingHorizontal = 14;
  }
  
  return {
    containerStyle: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      paddingBottom: bottomSafeArea > 0 ? bottomSafeArea + 8 : 20,
      paddingTop: 16,
      paddingHorizontal,
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 8,
    },
    buttonStyle: {
      height: buttonHeight,
      borderRadius,
    },
    textStyle: {
      fontSize,
      fontWeight: '600' as const,
    }
  };
};

// ==================== HEADER CONFIGURATION ====================

export const getHeaderConfig = () => {
  const statusBarHeight = getStatusBarHeight();
  
  let headerHeight = isIOS ? 44 : 56;
  let titleSize = 18;
  let iconSize = 24;
  
  if (isTablet) {
    headerHeight = isIOS ? 56 : 64;
    titleSize = 22;
    iconSize = 28;
  } else if (isSmallDevice) {
    headerHeight = isIOS ? 40 : 52;
    titleSize = 16;
    iconSize = 22;
  }
  
  return {
    height: headerHeight + statusBarHeight,
    headerHeight,
    statusBarHeight,
    titleSize,
    iconSize,
    paddingHorizontal: isTablet ? 24 : 16,
  };
};

// ==================== CARD CONFIGURATION ====================

export const getCardConfig = () => {
  if (isTablet) {
    return {
      borderRadius: 16,
      padding: 24,
      marginHorizontal: 24,
      marginVertical: 12,
      shadowRadius: 8,
      elevation: 6,
    };
  } else if (isLargeDevice) {
    return {
      borderRadius: 14,
      padding: 18,
      marginHorizontal: 18,
      marginVertical: 10,
      shadowRadius: 6,
      elevation: 4,
    };
  } else if (isSmallDevice) {
    return {
      borderRadius: 10,
      padding: 12,
      marginHorizontal: 12,
      marginVertical: 8,
      shadowRadius: 4,
      elevation: 2,
    };
  }
  
  return {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowRadius: 5,
    elevation: 3,
  };
};

// ==================== MODAL CONFIGURATION ====================

export const getModalConfig = () => {
  if (isTablet) {
    return {
      maxWidth: 600,
      borderRadius: 20,
      padding: 32,
      centered: true,
    };
  }
  
  return {
    maxWidth: width - 40,
    borderRadius: 16,
    padding: 24,
    centered: !isSmallDevice,
  };
};

// ==================== FULL SAFE AREA HOOK ====================

export const useSafeAreaConfig = () => {
  const statusBarHeight = getStatusBarHeight();
  const bottomSafeArea = getBottomSafeArea();
  const leftSafeArea = getLeftSafeArea();
  const rightSafeArea = getRightSafeArea();
  const tabBarConfig = getTabBarConfig();
  const bottomButtonConfig = getBottomButtonConfig();
  const headerConfig = getHeaderConfig();
  const spacing = getResponsiveSpacing();
  const fontSizes = getResponsiveFontSizes();
  
  return {
    statusBarHeight,
    bottomSafeArea,
    leftSafeArea,
    rightSafeArea,
    tabBarConfig,
    bottomButtonConfig,
    headerConfig,
    spacing,
    fontSizes,
    safeAreaInsets: {
      top: statusBarHeight,
      bottom: bottomSafeArea,
      left: leftSafeArea,
      right: rightSafeArea,
    },
    // Container styles
    safeContainer: {
      flex: 1,
      paddingTop: statusBarHeight,
      paddingBottom: bottomSafeArea,
      paddingLeft: leftSafeArea,
      paddingRight: rightSafeArea,
    },
    safeContainerWithTabBar: {
      flex: 1,
      paddingTop: statusBarHeight,
      marginBottom: tabBarConfig.height,
    },
    safeContainerWithBottomButton: {
      flex: 1,
      paddingTop: statusBarHeight,
      paddingBottom: bottomButtonConfig.containerStyle.paddingBottom + 
                     bottomButtonConfig.buttonStyle.height + 32,
    },
    scrollViewContent: {
      paddingTop: spacing.md,
      paddingBottom: spacing.xl,
      paddingHorizontal: spacing.md,
    },
  };
};

// ==================== DEVICE INFO OBJECT ====================

export const deviceInfo = {
  // Platform
  isIOS,
  isAndroid,
  isWeb,
  
  // Device type
  isIPhoneX: isIPhoneX(),
  isIPhone14Pro: isIPhone14Pro(),
  isIPhone14ProMax: isIPhone14ProMax(),
  isIPhone15Pro: isIPhone15Pro(),
  isIPhone15ProMax: isIPhone15ProMax(),
  hasNotch: hasNotch(),
  hasDynamicIsland: hasDynamicIsland(),
  
  // Size categories
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  isSmallTablet,
  isMediumTablet,
  isLargeTablet,
  isTablet,
  isPhone,
  
  // Orientation
  isLandscape,
  isPortrait,
  aspectRatio,
  
  // Dimensions
  screenWidth: width,
  screenHeight: height,
  windowWidth: width,
  windowHeight: height,
  pixelRatio,
  
  // Safe areas
  statusBarHeight: getStatusBarHeight(),
  bottomSafeArea: getBottomSafeArea(),
  leftSafeArea: getLeftSafeArea(),
  rightSafeArea: getRightSafeArea(),
  
  // Device model
  deviceModel,
  
  // Responsive values
  spacing: getResponsiveSpacing(),
  fontSizes: getResponsiveFontSizes(),
};

// ==================== EXPORTS ====================

export default {
  // Device detection
  isIPhoneX,
  isIPhone14Pro,
  isIPhone14ProMax,
  isIPhone15Pro,
  isIPhone15ProMax,
  hasNotch,
  hasDynamicIsland,
  isAndroid,
  isIOS,
  isWeb,
  
  // Size categories
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  isSmallTablet,
  isMediumTablet,
  isLargeTablet,
  isTablet,
  isPhone,
  isLandscape,
  isPortrait,
  
  // Safe areas
  getStatusBarHeight,
  getBottomSafeArea,
  getTopSafeArea,
  getLeftSafeArea,
  getRightSafeArea,
  
  // Responsive functions
  scale,
  moderateScale,
  verticalScale,
  scaleFontSize,
  
  // Configurations
  getTabBarConfig,
  getBottomButtonConfig,
  getHeaderConfig,
  getCardConfig,
  getModalConfig,
  getResponsiveSpacing,
  getResponsiveFontSizes,
  
  // Hook
  useSafeAreaConfig,
  
  // Constants
  deviceInfo,
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
};