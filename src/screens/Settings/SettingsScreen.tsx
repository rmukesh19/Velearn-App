import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

// Define navigation types
type SettingsStackParamList = {
  SettingsMain: undefined;
  ProfileScreen: undefined;
  SecurityScreen: undefined;
  SubscriptionScreen: undefined;
  PaymentScreen: undefined;
  LanguageScreen: undefined;
  AccessibilityScreen: undefined;
  DataScreen: undefined;
  QualityScreen: undefined;
  PrivacyScreen: undefined;
  TermsScreen: undefined;
  CookiesScreen: undefined;
  LicensesScreen: undefined;
  HelpSupportScreen: undefined;
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<SettingsStackParamList>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    wifiOnly: false,
    analytics: true,
    biometric: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Function to navigate to screens
  const navigateToScreen = (screenName: keyof SettingsStackParamList) => {
    if (screenName !== 'SettingsMain') {
      navigation.navigate(screenName);
    }
  };

  const settingsSections = [
    {
      title: 'Account',
      icon: 'person-circle',
      color: ['#667eea', '#764ba2'],
      items: [
        {
          id: 'profile',
          title: 'Profile',
          description: 'Manage your personal information',
          icon: 'person',
          screen: 'ProfileScreen' as keyof SettingsStackParamList,
        },
        {
          id: 'security',
          title: 'Security',
          description: 'Password, 2FA, and security settings',
          icon: 'shield-checkmark',
          screen: 'SecurityScreen' as keyof SettingsStackParamList,
        },
        {
          id: 'subscription',
          title: 'Subscription',
          description: 'Manage your premium plan',
          icon: 'diamond',
          screen: 'SubscriptionScreen' as keyof SettingsStackParamList,
        },
        {
          id: 'payment',
          title: 'Payment Methods',
          description: 'Update your payment information',
          icon: 'card',
          screen: 'PaymentScreen' as keyof SettingsStackParamList,
        },
      ],
    },
    {
      title: 'Preferences',
      icon: 'settings',
      color: ['#f093fb', '#f5576c'],
      items: [
        {
          id: 'notifications',
          title: 'Notifications',
          description: 'Customize your notification preferences',
          icon: 'notifications',
          type: 'switch' as const,
          value: settings.notifications,
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          description: 'Switch between light and dark themes',
          icon: 'moon',
          type: 'switch' as const,
          value: settings.darkMode,
        },
        {
          id: 'language',
          title: 'Language',
          description: 'App language and region settings',
          icon: 'language',
          screen: 'LanguageScreen' as keyof SettingsStackParamList,
        },
        {
          id: 'accessibility',
          title: 'Accessibility',
          description: 'Text size, contrast, and display',
          icon: 'accessibility',
          screen: 'AccessibilityScreen' as keyof SettingsStackParamList,
        },
      ],
    },
    {
      title: 'Content',
      icon: 'document-text',
      color: ['#4facfe', '#00f2fe'],
      items: [
        {
          id: 'data',
          title: 'Data & Storage',
          description: 'Manage cache and storage usage',
          icon: 'cloud',
          screen: 'DataScreen' as keyof SettingsStackParamList,
        },
        {
          id: 'autoSave',
          title: 'Auto-save',
          description: 'Automatically save your work',
          icon: 'save',
          type: 'switch' as const,
          value: settings.autoSave,
        },
        {
          id: 'quality',
          title: 'Quality',
          description: 'Video and image quality settings',
          icon: 'tv',
          screen: 'QualityScreen' as keyof SettingsStackParamList,
        },
        {
          id: 'download',
          title: 'Download Preferences',
          description: 'Wi-Fi only downloads and more',
          icon: 'download',
          type: 'switch' as const,
          value: settings.wifiOnly,
        },
      ],
    },
    {
      title: 'Legal',
      icon: 'shield',
      color: ['#30cfd0', '#330867'],
      items: [
        {
          id: 'privacy',
          title: 'Privacy Policy',
          description: 'How we handle your data',
          icon: 'lock-closed',
          screen: 'PrivacyScreen' as keyof SettingsStackParamList,
        },
        {
          id: 'terms',
          title: 'Terms of Service',
          description: 'Our terms and conditions',
          icon: 'document-text',
          screen: 'TermsScreen' as keyof SettingsStackParamList,
        },
        {
          id: 'cookies',
          title: 'Cookie Policy',
          description: 'Learn about our cookie usage',
          icon: 'nutrition',
          screen: 'CookiesScreen' as keyof SettingsStackParamList,
        },
        {
          id: 'licenses',
          title: 'Licenses',
          description: 'Open source licenses',
          icon: 'code',
          screen: 'LicensesScreen' as keyof SettingsStackParamList,
        },
      ],
    },
  ];

  const handleSignOut = () => {
    // Sign out logic
    console.log('Signing out...');
  };

  interface SettingItemProps {
    item: {
      id: string;
      title: string;
      description: string;
      icon: string;
      type?: 'switch';
      value?: boolean;
      screen?: keyof SettingsStackParamList;
    };
    sectionColor: string[];
  }

  const SettingItem = ({ item, sectionColor }: SettingItemProps) => {
    return (
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => {
          if (item.type === 'switch') {
            toggleSetting(item.id as keyof typeof settings);
          } else if (item.screen) {
            navigateToScreen(item.screen);
          }
        }}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={sectionColor}
          style={styles.iconGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon name={item.icon} size={20} color="#fff" />
        </LinearGradient>

        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>

        {item.type === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={() => toggleSetting(item.id as keyof typeof settings)}
            trackColor={{ false: '#e0e0e0', true: `${sectionColor[0]}60` }}
            thumbColor={item.value ? sectionColor[0] : '#f4f4f4'}
          />
        ) : (
          <Icon name="chevron-forward" size={22} color="#9ca3af" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSubtitle}>Customize your experience</Text>
          </View>
          <Icon name="settings" size={28} color="#fff" style={styles.headerIcon} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, index) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={section.color}
                style={styles.sectionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={section.icon} size={20} color="#fff" />
              </LinearGradient>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            
            <View style={styles.sectionCard}>
              {section.items.map((item, idx) => (
                <React.Fragment key={item.id}>
                  <SettingItem item={item} sectionColor={section.color} />
                  {idx < section.items.length - 1 && <View style={styles.divider} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.supportButton} 
            activeOpacity={0.8}
            onPress={() => navigateToScreen('HelpSupportScreen')}
          >
            <Icon name="help-circle" size={22} color="#667eea" />
            <Text style={styles.supportText}>Help & Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
            activeOpacity={0.8}
          >
            <Icon name="log-out-outline" size={22} color="#ff3b30" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>Version 2.4.1 (Build 247)</Text>
          <Text style={styles.copyright}>© 2024 YourApp Inc. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    fontWeight: '500',
  },
  headerIcon: {
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 5,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    letterSpacing: -0.3,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 15,
  },
  iconGradient: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 15,
  },
  actionButtons: {
    marginTop: 10,
    gap: 12,
  },
  supportButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#667eea',
  },
  supportText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
  signOutButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#ff3b30',
  },
  signOutText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  version: {
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  copyright: {
    color: '#9ca3af',
    fontSize: 12,
  },
});

export default SettingsScreen;