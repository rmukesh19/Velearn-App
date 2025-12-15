import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';

const AboutScreen = ({ navigation }: any) => {
  const appInfo = {
    version: '1.2.3',
    buildNumber: '2024.12',
    releaseDate: 'December 2024',
    developer: 'CodeLearn Inc.',
  };

  const features = [
    {
      icon: 'code-slash',
      title: 'Interactive IDE',
      description: 'Practice coding with our built-in IDE',
    },
    {
      icon: 'school',
      title: 'Learning Paths',
      description: 'Structured courses for all skill levels',
    },
    {
      icon: 'bug',
      title: 'Debugging Tools',
      description: 'Advanced tools to help you debug code',
    },
    {
      icon: 'rocket',
      title: 'Real Projects',
      description: 'Work on real-world coding projects',
    },
  ];

  const teamMembers = [
    { name: 'Sarah Chen', role: 'Lead Developer' },
    { name: 'Marcus Johnson', role: 'UX Designer' },
    { name: 'Priya Sharma', role: 'Content Creator' },
    { name: 'David Kim', role: 'Product Manager' },
  ];

  const links = [
    {
      title: 'Privacy Policy',
      url: 'https://example.com/privacy',
      icon: 'shield-checkmark',
    },
    {
      title: 'Terms of Service',
      url: 'https://example.com/terms',
      icon: 'document-text',
    },
    {
      title: 'Website',
      url: 'https://example.com',
      icon: 'globe',
    },
    {
      title: 'Contact Us',
      url: 'mailto:support@example.com',
      icon: 'mail',
    },
  ];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <Text style={styles.headerSubtitle}>Learn more about our app</Text>
      </View>

      <View style={styles.content}>
        {/* App Logo & Basic Info */}
        <View style={styles.appInfoCard}>
          <View style={styles.appIconContainer}>
            <Icon name="code-working" size={60} color={Colors.secondary} />
          </View>
          <Text style={styles.appName}>Velearn Pro</Text>
          <Text style={styles.appTagline}>Learn to code, the smart way</Text>
          
          <View style={styles.versionContainer}>
            <View style={styles.versionBadge}>
              <Text style={styles.versionText}>v{appInfo.version}</Text>
            </View>
            <Text style={styles.buildText}>Build {appInfo.buildNumber}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <View style={styles.card}>
            <Text style={styles.descriptionText}>
              VeLearn Pro is designed to help aspiring and experienced developers 
              improve their coding skills through interactive lessons, real-world 
              projects, and an integrated development environment. We believe in 
              learning by doing, and our platform provides everything you need to 
              become a better programmer.
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.card}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Icon name={feature.icon} size={24} color={Colors.secondary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Team */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Team</Text>
          <View style={styles.card}>
            {teamMembers.map((member, index) => (
              <View key={index} style={styles.teamMember}>
                <View style={styles.teamAvatar}>
                  <Text style={styles.avatarText}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.teamMemberInfo}>
                  <Text style={styles.teamMemberName}>{member.name}</Text>
                  <Text style={styles.teamMemberRole}>{member.role}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Links</Text>
          <View style={styles.card}>
            {links.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkItem}
                onPress={() => handleLinkPress(link.url)}
              >
                <View style={styles.linkIconContainer}>
                  <Icon name={link.icon} size={22} color={Colors.secondary} />
                </View>
                <Text style={styles.linkTitle}>{link.title}</Text>
                <Icon name="open-outline" size={20} color={Colors.secondary} style={styles.linkArrow} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.footer}>
          <Icon name="heart" size={16} color={Colors.secondary} />
          <Text style={styles.copyrightText}>
            Made with passion © {new Date().getFullYear()} {appInfo.developer}
          </Text>
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
  content: {
    padding: 20,
    paddingTop: 10,
  },
  appInfoCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.secondary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: Colors.secondary + '30',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  appTagline: {
    fontSize: 16,
    color: Colors.primary + '80',
    marginBottom: 20,
    textAlign: 'center',
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
  },
  versionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  buildText: {
    color: Colors.primary + '60',
    fontSize: 14,
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.primary + '90',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + '10',
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.secondary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 3,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.primary + '70',
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + '10',
  },
  teamAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.secondary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  teamMemberInfo: {
    flex: 1,
  },
  teamMemberName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 3,
  },
  teamMemberRole: {
    fontSize: 14,
    color: Colors.primary + '70',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + '10',
  },
  linkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  linkTitle: {
    flex: 1,
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  linkArrow: {
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    paddingBottom: 40,
  },
  copyrightText: {
    fontSize: 14,
    color: Colors.primary + '60',
    marginLeft: 8,
  },
});

export default AboutScreen;