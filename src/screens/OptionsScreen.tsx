import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';

const OptionsScreen = ({ navigation }: any) => {
  const options = [
    {
      title: 'Practice IDE',
      description: 'Code and practice in our online IDE',
      icon: 'code-slash',
      screen: 'PracticeIDE',
      color: Colors.secondary, // Changed to secondary
    },
    {
      title: 'Debugging Tools',
      description: 'Advanced debugging and testing tools',
      icon: 'bug',
      screen: 'Debugging',
      color: Colors.secondary, // Changed to secondary
    },
    {
      title: 'Online Courses',
      description: 'Browse and enroll in courses',
      icon: 'school',
      screen: 'OnlineCourses',
      color: Colors.secondary,
    },
    {
      title: 'Settings',
      description: 'App preferences and account settings',
      icon: 'settings',
      screen: 'SettingsScreen',
      color: Colors.secondary, // Changed to secondary
    },
    {
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'help-circle',
      screen: 'Support',
      color: Colors.secondary, // Changed to secondary
    },
    {
      title: 'About',
      description: 'Learn more about the app',
      icon: 'information-circle',
      screen: 'AboutScreen',
      color: Colors.secondary, // Changed to secondary
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Options</Text>
        <Text style={styles.headerSubtitle}>Customize your learning experience</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={() => navigation.navigate(option.screen)}
          >
            <View style={[styles.optionIconContainer, { backgroundColor: Colors.secondary + '20' }]}>
              <Icon name={option.icon} size={30} color={Colors.secondary} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Icon name="chevron-forward" size={24} color={Colors.secondary} />
          </TouchableOpacity>
        ))}
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
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.secondary,
    marginTop: 5,
  },
  optionsContainer: {
    padding: 20,
    marginTop: 20,
  },
  optionCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: Colors.primary, // Changed to primary (was gray)
  },
});

export default OptionsScreen;