// screens/AppSettingsScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../theme/colors';


const AppSettingsScreen: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [downloadWifi, setDownloadWifi] = React.useState(true);
  const [analytics, setAnalytics] = React.useState(true);

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear app cache? This will remove temporary files but not your account data.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => Alert.alert('Success', 'Cache cleared successfully') },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Warning: This will remove all downloaded content and reset app preferences. Your account data will remain safe.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const handleLogoutAll = () => {
    Alert.alert(
      'Logout All Devices',
      'This will log you out from all devices where you\'re currently signed in.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout All', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const settingSections = [
    {
      title: 'Appearance',
      items: [
        {
          id: '1',
          title: 'Dark Mode',
          description: 'Switch to dark theme',
          icon: 'moon-outline',
          color: Colors.purple,
          type: 'switch',
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          id: '2',
          title: 'Font Size',
          description: 'Adjust text size',
          icon: 'text-outline',
          color: Colors.primary,
          type: 'navigate',
        },
        {
          id: '3',
          title: 'Language',
          description: 'English (US)',
          icon: 'language-outline',
          color: Colors.secondary,
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Content',
      items: [
        {
          id: '4',
          title: 'Video Quality',
          description: 'Auto (Recommended)',
          icon: 'videocam-outline',
          color: Colors.info,
          type: 'navigate',
        },
        {
          id: '5',
          title: 'Auto-play Videos',
          description: 'Play next video automatically',
          icon: 'play-circle-outline',
          color: Colors.success,
          type: 'switch',
          value: autoPlay,
          onToggle: setAutoPlay,
        },
        {
          id: '6',
          title: 'Download over Wi-Fi only',
          description: 'Save mobile data',
          icon: 'wifi-outline',
          color: Colors.warning,
          type: 'switch',
          value: downloadWifi,
          onToggle: setDownloadWifi,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          id: '7',
          title: 'Push Notifications',
          description: 'Receive app notifications',
          icon: 'notifications-outline',
          color: Colors.error,
          type: 'switch',
          value: notifications,
          onToggle: setNotifications,
        },
        {
          id: '8',
          title: 'Notification Sounds',
          description: 'Play sound for notifications',
          icon: 'volume-high-outline',
          color: Colors.success,
          type: 'navigate',
        },
        {
          id: '9',
          title: 'Vibration',
          description: 'Vibrate on notifications',
          icon: 'phone-portrait-outline',
          color: Colors.secondary,
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Privacy & Data',
      items: [
        {
          id: '10',
          title: 'Usage Analytics',
          description: 'Help improve the app',
          icon: 'analytics-outline',
          color: Colors.purple,
          type: 'switch',
          value: analytics,
          onToggle: setAnalytics,
        },
        {
          id: '11',
          title: 'Clear Cache',
          description: 'Free up storage space',
          icon: 'trash-outline',
          color: Colors.gray,
          type: 'action',
          action: handleClearCache,
        },
        {
          id: '12',
          title: 'Clear All Data',
          description: 'Reset app to default',
          icon: 'refresh-outline',
          color: Colors.error,
          type: 'action',
          action: handleClearData,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Icon name="settings-outline" size={32} color={Colors.white} />
          <Text style={styles.title}>App Settings</Text>
          <Text style={styles.subtitle}>Customize your app experience</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>256 MB</Text>
            <Text style={styles.statLabel}>Cache Size</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Active Devices</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2 GB</Text>
            <Text style={styles.statLabel}>Downloads</Text>
          </View>
        </View>

        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={item.id}>
                  {item.type === 'switch' ? (
                    <View style={styles.settingItem}>
                      <View style={styles.settingLeft}>
                        <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                          <Icon name={item.icon as any} size={20} color={item.color} />
                        </View>
                        <View style={styles.settingInfo}>
                          <Text style={styles.settingTitle}>{item.title}</Text>
                          <Text style={styles.settingDescription}>{item.description}</Text>
                        </View>
                      </View>
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: Colors.lightGray, true: Colors.primary }}
                      />
                    </View>
                  ) : item.type === 'navigate' ? (
                    <TouchableOpacity style={styles.settingItem}>
                      <View style={styles.settingLeft}>
                        <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                          <Icon name={item.icon as any} size={20} color={item.color} />
                        </View>
                        <View style={styles.settingInfo}>
                          <Text style={styles.settingTitle}>{item.title}</Text>
                          <Text style={styles.settingDescription}>{item.description}</Text>
                        </View>
                      </View>
                      <Icon name="chevron-forward" size={20} color={Colors.lightGray} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.settingItem} onPress={item.action}>
                      <View style={styles.settingLeft}>
                        <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                          <Icon name={item.icon as any} size={20} color={item.color} />
                        </View>
                        <View style={styles.settingInfo}>
                          <Text style={[
                            styles.settingTitle,
                            item.color === Colors.error && { color: Colors.error }
                          ]}>
                            {item.title}
                          </Text>
                          <Text style={styles.settingDescription}>{item.description}</Text>
                        </View>
                      </View>
                      <Icon name="chevron-forward" size={20} color={Colors.lightGray} />
                    </TouchableOpacity>
                  )}
                  
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Security</Text>
          <View style={styles.securityCard}>
            <TouchableOpacity style={styles.securityItem} onPress={handleLogoutAll}>
              <Icon name="log-out-outline" size={20} color={Colors.error} />
              <Text style={[styles.securityText, { color: Colors.error }]}>Logout All Devices</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.securityItem}>
              <Icon name="shield-checkmark-outline" size={20} color={Colors.primary} />
              <Text style={styles.securityText}>Two-Factor Authentication</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Off</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.advancedSection}>
          <Text style={styles.advancedTitle}>Advanced Settings</Text>
          
          <TouchableOpacity style={styles.advancedButton}>
            <Icon name="code-slash-outline" size={18} color={Colors.primary} />
            <Text style={styles.advancedButtonText}>Developer Options</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.advancedButton}>
            <Icon name="bug-outline" size={18} color={Colors.secondary} />
            <Text style={styles.advancedButtonText}>Report a Bug</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.versionSection}>
          <Text style={styles.versionTitle}>App Version</Text>
          <Text style={styles.versionNumber}>1.0.0 (2025.01)</Text>
          <TouchableOpacity style={styles.updateButton}>
            <Icon name="download-outline" size={16} color={Colors.white} />
            <Text style={styles.updateButtonText}>Check for Updates</Text>
          </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.gray,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.white,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: -20,
    padding: 20,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.gray,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
    opacity: 0.7,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: `${Colors.lightGray}50`,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
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
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: Colors.gray,
  },
  divider: {
    height: 1,
    backgroundColor: `${Colors.lightGray}30`,
    marginLeft: 68,
  },
  securityCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  securityText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    flex: 1,
  },
  statusBadge: {
    backgroundColor: `${Colors.error}15`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.error,
  },
  advancedSection: {
    padding: 16,
  },
  advancedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
  },
  advancedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  advancedButtonText: {
    fontSize: 16,
    color: Colors.black,
    marginLeft: 12,
    flex: 1,
  },
  versionSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: `${Colors.primary}08`,
    margin: 16,
    borderRadius: 20,
  },
  versionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  versionNumber: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 16,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  updateButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AppSettingsScreen;