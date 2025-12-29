// screens/NotificationsScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Switch,
  
  SectionList 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../theme/colors';



interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'course' | 'system' | 'promotion' | 'social';
}

const NotificationsScreen: React.FC = () => {
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

  const renderNotification = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity style={styles.notificationItem}>
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
      

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="notifications-outline" size={22} color={Colors.primary} />
                <View>
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
                <View>
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

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="volume-high-outline" size={22} color={Colors.success} />
                <View>
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
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          <View style={styles.notificationsCard}>
            {notifications.map(notification => renderNotification({ item: notification }))}
          </View>
        </View>

        <TouchableOpacity style={styles.clearButton}>
          <Icon name="trash-outline" size={18} color={Colors.error} />
          <Text style={styles.clearButtonText}>Clear All Notifications</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
  },
  markAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 12,
  },
  markAllText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  settingsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
    marginBottom: 12,
    textTransform: 'uppercase',
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
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.lightGray}30`,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: Colors.black,
    marginLeft: 12,
  },
  settingSubtext: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 12,
    marginTop: 2,
  },
  notificationsSection: {
    padding: 16,
  },
  notificationsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
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