// screens/AccountSettingsScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Switch 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../theme/colors';

const AccountSettingsScreen: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(false);
  const [marketingEmails, setMarketingEmails] = React.useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
       

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Icon name="person-outline" size={22} color={Colors.primary} />
                <Text style={styles.menuText}>Edit Profile</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={Colors.lightGray} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Icon name="mail-outline" size={22} color={Colors.secondary} />
                <Text style={styles.menuText}>Change Email</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={Colors.lightGray} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Icon name="lock-closed-outline" size={22} color={Colors.warning} />
                <Text style={styles.menuText}>Change Password</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={Colors.lightGray} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          <View style={styles.card}>
            <View style={styles.switchItem}>
              <View style={styles.switchLeft}>
                <Icon name="mail-outline" size={22} color={Colors.info} />
                <View>
                  <Text style={styles.switchText}>Email Notifications</Text>
                  <Text style={styles.switchSubtext}>Receive course updates via email</Text>
                </View>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              />
            </View>

            <View style={styles.switchItem}>
              <View style={styles.switchLeft}>
                <Icon name="chatbubble-outline" size={22} color={Colors.success} />
                <View>
                  <Text style={styles.switchText}>SMS Notifications</Text>
                  <Text style={styles.switchSubtext}>Important alerts via SMS</Text>
                </View>
              </View>
              <Switch
                value={smsNotifications}
                onValueChange={setSmsNotifications}
                trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              />
            </View>

            <View style={styles.switchItem}>
              <View style={styles.switchLeft}>
                <Icon name="megaphone-outline" size={22} color={Colors.purple} />
                <View>
                  <Text style={styles.switchText}>Marketing Emails</Text>
                  <Text style={styles.switchSubtext}>Updates about new courses</Text>
                </View>
              </View>
              <Switch
                value={marketingEmails}
                onValueChange={setMarketingEmails}
                trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.dangerItem}>
              <Icon name="download-outline" size={22} color={Colors.gray} />
              <Text style={[styles.dangerText, { color: Colors.gray }]}>Download Your Data</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dangerItem}>
              <Icon name="trash-outline" size={22} color={Colors.error} />
              <Text style={[styles.dangerText, { color: Colors.error }]}>Delete Account</Text>
            </TouchableOpacity>
          </View>
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
    padding: 24,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
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
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.lightGray}30`,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: Colors.black,
    marginLeft: 12,
    flex: 1,
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.lightGray}30`,
  },
  switchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  switchText: {
    fontSize: 16,
    color: Colors.black,
    marginLeft: 12,
  },
  switchSubtext: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 12,
    marginTop: 2,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.lightGray}30`,
  },
  dangerText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default AccountSettingsScreen;