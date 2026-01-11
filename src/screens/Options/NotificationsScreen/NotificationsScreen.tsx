// screens/NotificationsScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../theme/colors';

const { height, width } = Dimensions.get('window');

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'course' | 'system' | 'promotion' | 'social';
}

const NotificationsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [enabled, setEnabled] = React.useState(true);
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(true);

  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'New Course Available',
      description: 'React Native Advanced Patterns course is now available',
      time: '2 hours ago',
      read: false,
      type: 'course',
    },
    {
      id: '2',
      title: 'Course Reminder',
      description: 'Your Web Development class starts in 30 minutes',
      time: '5 hours ago',
      read: true,
      type: 'course',
    },
    {
      id: '3',
      title: 'System Update',
      description: 'App maintenance scheduled for tonight at 2 AM',
      time: '1 day ago',
      read: true,
      type: 'system',
    },
    {
      id: '4',
      title: 'Special Offer',
      description: 'Get 50% off on all annual subscriptions',
      time: '2 days ago',
      read: true,
      type: 'promotion',
    },
    {
      id: '5',
      title: 'Achievement Unlocked',
      description: 'You completed 10 courses this month!',
      time: '3 days ago',
      read: true,
      type: 'social',
    },
  ];

  const getIconByType = (type: string) => {
    switch(type) {
      case 'course':
        return 'school-outline';
      case 'system':
        return 'settings-outline';
      case 'promotion':
        return 'pricetag-outline';
      case 'social':
        return 'people-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getColorByType = (type: string) => {
    switch(type) {
      case 'course':
        return Colors.primary;
      case 'system':
        return Colors.secondary;
      case 'promotion':
        return Colors.success;
      case 'social':
        return Colors.purple;
      default:
        return Colors.gray;
    }
  };

  const renderNotification = ({ item, index }: { item: NotificationItem; index: number }) => (
    <TouchableOpacity 
      key={item.id}
      style={[
        styles.notificationItem,
        index === notifications.length - 1 && { borderBottomWidth: 0 }
      ]}
      activeOpacity={0.7}
    >
      <View style={[
        styles.notificationIcon,
        { backgroundColor: `${getColorByType(item.type)}15` }
      ]}>
        <Icon 
          name={getIconByType(item.type)} 
          size={20} 
          color={getColorByType(item.type)} 
        />
      </View>
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[
            styles.notificationTitle,
            !item.read && styles.unreadTitle
          ]}>
            {item.title}
          </Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 20 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="notifications-outline" size={22} color={Colors.primary} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingText}>Push Notifications</Text>
                  <Text style={styles.settingSubtext}>Receive push notifications</Text>
                </View>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="mail-outline" size={22} color={Colors.secondary} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingText}>Email Notifications</Text>
                  <Text style={styles.settingSubtext}>Receive notifications via email</Text>
                </View>
              </View>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              />
            </View>

            <View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
              <View style={styles.settingLeft}>
                <Icon name="volume-high-outline" size={22} color={Colors.success} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingText}>Sound</Text>
                  <Text style={styles.settingSubtext}>Play sound for notifications</Text>
                </View>
              </View>
              <Switch
                value={enabled}
                onValueChange={setEnabled}
                trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              />
            </View>
          </View>
        </View>

        <View style={styles.notificationsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            <TouchableOpacity style={styles.markAllButton}>
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.notificationsCard}>
            {notifications.map((notification, index) => 
              renderNotification({ item: notification, index })
            )}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.clearButton}
          activeOpacity={0.7}
        >
          <Icon name="trash-outline" size={18} color={Colors.error} />
          <Text style={styles.clearButtonText}>Clear All Notifications</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  settingsSection: {
    padding: 16,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  markAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 12,
  },
  markAllText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  settingsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.lightGray}30`,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 2,
  },
  settingSubtext: {
    fontSize: 12,
    color: Colors.gray,
  },
  notificationsSection: {
    padding: 16,
  },
  notificationsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.lightGray}30`,
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    flex: 1,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: 8,
  },
  notificationDescription: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: Colors.lightGray,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 14,
    backgroundColor: `${Colors.error}10`,
    borderRadius: 16,
  },
  clearButtonText: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default NotificationsScreen;