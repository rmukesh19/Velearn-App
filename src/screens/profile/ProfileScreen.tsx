import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';

// Mock data
const userData = {
  name: 'Mukesh',
  email: 'mukesh@example.com',
  bio: 'Student and enthusiast of mobile development, focused on React Native, JavaScript, and UI/UX design.',
  avatar: require('../images/logo/favicon.png'), // <-- LOCAL IMAGE
  stats: [
    { label: 'Courses', value: 12 },
    { label: 'Certificates', value: 3 },
    { label: 'Points', value: 4500 },
  ],
};

// Reusable Menu Item
const ProfileMenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon name={icon} size={24} color={Colors.secondary} style={styles.menuIcon} />
    <Text style={styles.menuText}>{title}</Text>
    <Icon name="chevron-forward" size={20} color={Colors.gray} />
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    alert('Logging out...');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Profile Header */}
          <View style={styles.header}>
            <Image 
              source={userData.avatar}
              style={styles.avatar}
            />

            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>

            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => console.log('Edit Profile')}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {userData.stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* About Me */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.bioText}>{userData.bio}</Text>
          </View>

          {/* Menu */}
          {/* <View style={styles.menuSection}>
            <ProfileMenuItem 
              icon="settings-outline" 
              title="Account Settings"
              onPress={() => console.log('Account Settings')}
            />
            <ProfileMenuItem 
              icon="book-outline" 
              title="My Courses"
              onPress={() => console.log('My Courses')}
            />
            <ProfileMenuItem 
              icon="notifications-outline" 
              title="Notifications"
              onPress={() => console.log('Notifications')}
            />
          </View> */}

          {/* Logout */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
            <Icon name="log-out-outline" size={20} color={Colors.white} style={{ marginLeft: 8 }} />
          </TouchableOpacity>

        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop:100,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.secondary,
    marginBottom: 15,
    backgroundColor: Colors.lightGray,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark,
  },
  email: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: Colors.dark,
    fontWeight: '600',
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 18,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 4,
  },

  // About section
  section: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 18,
    marginBottom: 25,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    color: Colors.dark,
    lineHeight: 20,
  },

  // Menu
  menuSection: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 30,
    overflow: 'hidden',
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: Colors.dark,
  },

  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 12,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});

export default ProfileScreen;
