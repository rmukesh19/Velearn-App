import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';

const SettingsScreen = ({ navigation }: any) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          description: 'Receive updates and reminders',
          icon: 'notifications',
          type: 'switch',
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          description: 'Switch to dark theme',
          icon: 'moon',
          type: 'switch',
          value: darkModeEnabled,
          onValueChange: setDarkModeEnabled,
        },
        {
          id: 'autoSave',
          title: 'Auto-save Code',
          description: 'Automatically save your work',
          icon: 'save',
          type: 'switch',
          value: autoSaveEnabled,
          onValueChange: setAutoSaveEnabled,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Edit Profile',
          description: 'Update your personal information',
          icon: 'person',
          type: 'navigation',
          screen: 'EditProfile',
        },
        {
          id: 'privacy',
          title: 'Privacy Settings',
          description: 'Manage your privacy options',
          icon: 'lock-closed',
          type: 'navigation',
          screen: 'PrivacySettings',
        },
        {
          id: 'subscription',
          title: 'Subscription',
          description: 'View and manage your plan',
          icon: 'card',
          type: 'navigation',
          screen: 'Subscription',
        },
      ],
    },
    {
      title: 'Application',
      items: [
        {
          id: 'language',
          title: 'Language',
          description: 'Select app language',
          icon: 'language',
          type: 'navigation',
          screen: 'Language',
        },
        {
          id: 'data',
          title: 'Data Usage',
          description: 'Manage cache and storage',
          icon: 'cloud',
          type: 'navigation',
          screen: 'DataUsage',
        },
        {
          id: 'about',
          title: 'About App',
          description: 'Version and app info',
          icon: 'information-circle',
          type: 'navigation',
          screen: 'About',
        },
      ],
    },
  ];

  const handleSignOut = () => {
    // Implement sign out logic here
    console.log('Signing out...');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Manage your preferences</Text>
      </View>

      <View style={styles.settingsContainer}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.settingItem}
                  onPress={() => {
                    if (item.type === 'navigation' && item.screen) {
                      navigation.navigate(item.screen);
                    }
                  }}
                  disabled={item.type === 'switch'}
                >
                  <View style={styles.settingIconContainer}>
                    <Icon name={item.icon} size={24} color={Colors.secondary} />
                  </View>
                  
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>

                  {item.type === 'switch' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{ false: Colors.primary + '40', true: Colors.secondary + '80' }}
                      thumbColor={item.value ? Colors.secondary : Colors.primary}
                    />
                  ) : (
                    <Icon name="chevron-forward" size={20} color={Colors.secondary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}


        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 25,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.secondary,
    marginTop: 5,
  },
  settingsContainer: {
    padding: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    marginLeft: 5,
  },
  sectionContent: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + '10',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary + '20',
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
    color: Colors.primary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.primary + '80',
  },
  signOutSection: {
    marginTop: 10,
    marginBottom: 30,
  },
  signOutButton: {
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  signOutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  versionContainer: {
    alignItems: 'center',
    padding: 20,
  },
  versionText: {
    color: Colors.primary + '60',
    fontSize: 14,
  },
});

export default SettingsScreen;