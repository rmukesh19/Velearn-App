import { Platform, Dimensions } from 'react-native';
import { 
  isTablet, 
  isSmallDevice, 
  isMediumDevice, 
  isLargeDevice,
  hasNotch,
  hasDynamicIsland 
} from './deviceUtils';

// Navigation specific responsive functions
export const getTabBarConfig = () => {
  const isTabletDevice = isTablet;
  const isSmallPhone = isSmallDevice;
  
  return {
    height: isTabletDevice
      ? Platform.select({ ios: 90, android: 80 })
      : isSmallPhone
      ? Platform.select({ ios: 65, android: 60 })
      : Platform.select({ ios: 75, android: 70 }),
    
    iconSize: isTabletDevice ? 28 : isSmallPhone ? 22 : 24,
    
    labelSize: isTabletDevice ? 14 : isSmallPhone ? 10 : 12,
    
    paddingBottom: isTabletDevice
      ? Platform.select({ ios: 25, android: 15 })
      : isSmallPhone
      ? Platform.select({ ios: 10, android: 6 })
      : Platform.select({ ios: 15, android: 10 }),
    
    paddingTop: isTabletDevice ? 12 : isSmallPhone ? 4 : 8,
    
    paddingHorizontal: isTabletDevice ? 40 : 20,
  };
};

// Safe area insets for navigation
export const getSafeAreaInsets = () => {
  const { width, height } = Dimensions.get('window');
  
  return {
    top: hasDynamicIsland() ? 59 : hasNotch() ? 44 : Platform.select({ ios: 20, android: 0 }),
    bottom: Platform.select({ 
      ios: hasNotch() || hasDynamicIsland() ? 34 : 0,
      android: 0 
    }),
    left: 0,
    right: 0,
  };
};