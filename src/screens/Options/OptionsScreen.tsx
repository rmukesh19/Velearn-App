// screens/Options/OptionsScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation types
type OptionsStackParamList = {
  AccountSettings: undefined;
  Webinars: undefined;
  Notifications: undefined;
  Blogs: undefined;
  ReferEarnScreen: undefined;
  VisitWebsite: undefined;
  Certificates: undefined;
  AppSettings: undefined;
  HelpSupport: undefined;
  PrivacyPolicy: undefined;
};

type OptionsScreenNavigationProp = StackNavigationProp<OptionsStackParamList>;

interface OptionItem {
  id: string;
  title: string;
  icon: string;
  iconColor?: string;
  showChevron?: boolean;
  screenName?: keyof OptionsStackParamList;
}

const OptionsScreen: React.FC = () => {
  const navigation = useNavigation<OptionsScreenNavigationProp>();

  const options: OptionItem[] = [
    { 
      id: '1', 
      title: 'Account Settings', 
      icon: 'person-outline', 
      iconColor: Colors.primary,
      screenName: 'AccountSettings'
    },
    { 
      id: '2', 
      title: 'Webinars', 
      icon: 'videocam-outline', 
      iconColor: Colors.secondary,
      screenName: 'Webinars'
    },
    { 
      id: '3', 
      title: 'Notifications', 
      icon: 'notifications-outline', 
      iconColor: Colors.warning,
      screenName: 'Notifications'
    },
    { 
      id: '4', 
      title: 'Blogs', 
      icon: 'newspaper-outline', 
      iconColor: Colors.success,
      screenName: 'Blogs'
    },
    { 
      id: '5', 
      title: 'Refer & Earn', 
      icon: 'gift-outline', 
      iconColor: Colors.error,
      screenName: 'ReferEarnScreen'
    },
    { 
      id: '6', 
      title: 'Visit Website', 
      icon: 'globe-outline', 
      iconColor: Colors.secondary,
      screenName: 'VisitWebsite'
    },
    { 
      id: '7', 
      title: 'Certificates', 
      icon: 'ribbon-outline', 
      iconColor: Colors.primary,
      screenName: 'Certificates'
    },
    { 
      id: '8', 
      title: 'App Settings', 
      icon: 'settings-outline', 
      iconColor: Colors.gray,
      screenName: 'AppSettings'
    },
    { 
      id: '9', 
      title: 'Help & Support', 
      icon: 'help-circle-outline', 
      iconColor: Colors.info,
      screenName: 'HelpSupport'
    },
    { 
      id: '10', 
      title: 'Privacy Policy', 
      icon: 'shield-checkmark-outline', 
      iconColor: Colors.purple,
      screenName: 'PrivacyPolicy'
    },
  ];

  const handleOptionPress = (item: OptionItem) => {
    if (item.screenName) {
      navigation.navigate(item.screenName as any);
    }
  };

  const renderOptionItem = (item: OptionItem) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.optionItem}
      activeOpacity={0.7}
      onPress={() => handleOptionPress(item)}
    >
      <View style={styles.optionLeft}>
        <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}15` }]}>
          <Icon 
            name={item.icon as any} 
            size={20} 
            color={item.iconColor} 
          />
        </View>
        <Text style={styles.optionText}>{item.title}</Text>
      </View>
      <Icon 
        name="chevron-forward-outline" 
        size={20} 
        color={Colors.lightGray} 
      />
    </TouchableOpacity>
  );

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout pressed');
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    navigation.navigate('AccountSettings');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Profile */}
        <View style={styles.headerSection}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80' }} 
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editImageButton}>
                <Icon name="camera-outline" size={16} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Mukesh</Text>
              <Text style={styles.profileEmail}>mukesh@example.com</Text>
              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Courses</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Certificates</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>98%</Text>
                  <Text style={styles.statLabel}>Progress</Text>
                </View>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={handleEditProfile}
          >
            <Icon name="pencil-outline" size={16} color={Colors.primary} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Options Sections with Headers */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.optionsCard}>
            {options.slice(0, 3).map(renderOptionItem)}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Content</Text>
          <View style={styles.optionsCard}>
            {options.slice(3, 6).map(renderOptionItem)}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.optionsCard}>
            {options.slice(6, 8).map(renderOptionItem)}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <View style={styles.optionsCard}>
            {options.slice(8, 10).map(renderOptionItem)}
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.optionsCard}>
            <TouchableOpacity 
              style={styles.logoutButton} 
              activeOpacity={0.8}
              onPress={handleLogout}
            >
              <View style={styles.optionLeft}>
                <View style={[styles.iconContainer, { backgroundColor: `${Colors.error}10` }]}>
                  <Icon 
                    name="log-out-outline" 
                    size={20} 
                    color={Colors.error} 
                  />
                </View>
                <Text style={[styles.optionText, { color: Colors.error }]}>Logout</Text>
              </View>
              <Icon name="log-out-outline" size={20} color={`${Colors.error}30`} />
            </TouchableOpacity>
          </View>
        </View>

       {/* App Info */}
<View style={styles.appInfoContainer}>
  <View style={styles.appLogo}>
    <Image
      source={require('../../images/logo/favicon.png')}
      style={styles.faviconImage}
      resizeMode="contain"
    />
    <View style={styles.appLogoBadge}>
      <Icon name="checkmark" size={10} color={Colors.white} />
    </View>
  </View>

  
  <Text style={styles.versionNumber}>
    Version 1.0.0 • Build 2025.01
  </Text>
  <Text style={styles.copyrightText}>
    © 2025 VeLearn
  </Text>
</View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.lightGray,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 16,
    fontWeight: '400',
  },
  profileStats: {
    flexDirection: 'row',
    backgroundColor: `${Colors.primary}08`,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: `${Colors.primary}20`,
    marginHorizontal: 8,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.primary}10`,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginLeft: 110,
  },
  editProfileText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionsCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.lightGray}30`,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    flex: 1,
    letterSpacing: -0.2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  appInfoContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  appLogo: {
    position: 'relative',
    marginBottom: 12,
  },
  appLogoBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Colors.success,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },

  versionNumber: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 8,
    fontWeight: '500',
  },
  copyrightText: {
    fontSize: 12,
    color: Colors.lightGray,
    fontWeight: '400',
  },
  faviconImage: {
    width: 60,
    height: 60,
  },
});

export default OptionsScreen;