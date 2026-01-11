// screens/PrivacyPolicyScreen.tsx
import React, { useState } from 'react';
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

// Device detection helper
const hasNotch = (): boolean => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight ? StatusBar.currentHeight > 24 : false;
  }
  // iOS devices with notch
  return Platform.OS === 'ios' && (height >= 812 || width >= 812);
};

const PrivacyPolicyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  
  const [dataCollection, setDataCollection] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);

  const privacySections = [
    {
      title: 'Data We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support. This includes:

• Personal Information: Name, email address, phone number
• Account Information: Username, password, profile information
• Learning Data: Course progress, quiz scores, completion certificates
• Device Information: Device type, operating system, IP address
• Usage Data: Pages visited, features used, time spent on app

We use this data to provide and improve our services, personalize your experience, and communicate with you.`,
    },
    {
      title: 'How We Use Your Information',
      content: `Your information helps us:

• Provide and maintain our educational services
• Process your course enrollments and payments
• Personalize your learning experience
• Send important updates and notifications
• Improve our app and develop new features
• Prevent fraud and ensure security
• Comply with legal obligations

We never sell your personal data to third parties.`,
    },
    {
      title: 'Data Sharing',
      content: `We may share your information with:

• Service Providers: Companies that help us operate our services (payment processors, hosting providers)
• Instructors: Course instructors may see your progress and performance data
• Legal Authorities: When required by law or to protect our rights
• Business Transfers: In connection with a merger or acquisition

We ensure all third parties maintain appropriate security measures.`,
    },
    {
      title: 'Your Rights',
      content: `You have the right to:

• Access your personal data
• Correct inaccurate information
• Delete your data (with limitations)
• Object to data processing
• Data portability
• Withdraw consent

To exercise these rights, contact our privacy team at privacy@velearn.com.`,
    },
    {
      title: 'Data Security',
      content: `We implement industry-standard security measures:

• Encryption of data in transit and at rest
• Regular security audits and testing
• Access controls and authentication
• Secure data storage
• Incident response procedures

Despite our efforts, no method of transmission over the Internet is 100% secure.`,
    },
  ];

  const handleDownloadData = () => {
    // Implement data download functionality
  };

  const handleDeleteAccount = () => {
    // Implement account deletion flow
  };

  // Calculate header padding
  const headerPaddingTop = Math.max(insets.top, Platform.OS === 'ios' ? 44 : 20) + 16;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 20 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: headerPaddingTop }]}>
          <View style={styles.headerContent}>
            <Icon name="shield-checkmark-outline" size={32} color={Colors.white} />
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.subtitle}>Last updated: December 2023</Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Icon name="lock-closed" size={24} color={Colors.purple} />
            <Text style={styles.statLabel}>Data Protected</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="eye-off" size={24} color={Colors.purple} />
            <Text style={styles.statLabel}>No Data Selling</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="shield" size={24} color={Colors.purple} />
            <Text style={styles.statLabel}>GDPR Compliant</Text>
          </View>
        </View>

        <View style={styles.controlsSection}>
          <Text style={styles.controlsTitle}>Privacy Controls</Text>
          <View style={styles.controlsCard}>
            <View style={styles.controlItem}>
              <View style={styles.controlLeft}>
                <Icon name="analytics-outline" size={22} color={Colors.primary} />
                <View style={styles.controlTextContainer}>
                  <Text style={styles.controlText}>Data Collection</Text>
                  <Text style={styles.controlDescription}>Allow data collection for improvements</Text>
                </View>
              </View>
              <Switch
                value={dataCollection}
                onValueChange={setDataCollection}
                trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.controlItem}>
              <View style={styles.controlLeft}>
                <Icon name="megaphone-outline" size={22} color={Colors.secondary} />
                <View style={styles.controlTextContainer}>
                  <Text style={styles.controlText}>Personalized Ads</Text>
                  <Text style={styles.controlDescription}>Show relevant advertisements</Text>
                </View>
              </View>
              <Switch
                value={personalizedAds}
                onValueChange={setPersonalizedAds}
                trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.controlItem}>
              <View style={styles.controlLeft}>
                <Icon name="mail-outline" size={22} color={Colors.success} />
                <View style={styles.controlTextContainer}>
                  <Text style={styles.controlText}>Marketing Emails</Text>
                  <Text style={styles.controlDescription}>Receive product updates and offers</Text>
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

        <View style={styles.contentSection}>
          {privacySections.map((section, index) => (
            <View key={index} style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionNumber}>
                  <Text style={styles.sectionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsSection}>
          <Text style={styles.actionsTitle}>Your Privacy Rights</Text>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleDownloadData}
            activeOpacity={0.7}
          >
            <Icon name="download-outline" size={20} color={Colors.primary} />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Download Your Data</Text>
              <Text style={styles.actionDescription}>Get a copy of all your personal data</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={Colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Icon name="eye-outline" size={20} color={Colors.secondary} />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>View Data History</Text>
              <Text style={styles.actionDescription}>See how your data has been used</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={Colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.dangerAction]}
            onPress={handleDeleteAccount}
            activeOpacity={0.7}
          >
            <Icon name="trash-outline" size={20} color={Colors.error} />
            <View style={styles.actionContent}>
              <Text style={[styles.actionTitle, { color: Colors.error }]}>Delete Account</Text>
              <Text style={styles.actionDescription}>Permanently remove all your data</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={Colors.error} />
          </TouchableOpacity>
        </View>

        <View style={styles.contactSection}>
          <View style={styles.contactHeader}>
            <Icon name="information-circle-outline" size={24} color={Colors.purple} />
            <Text style={styles.contactTitle}>Contact Our Privacy Team</Text>
          </View>
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Icon name="mail-outline" size={18} color={Colors.gray} />
              <Text style={styles.contactText}>privacy@velearn.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="time-outline" size={18} color={Colors.gray} />
              <Text style={styles.contactText}>Response within 48 hours</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.contactButton}
            activeOpacity={0.8}
          >
            <Icon name="mail" size={18} color={Colors.white} />
            <Text style={styles.contactButtonText}>Send Privacy Inquiry</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Privacy Commitment</Text>
          <Text style={styles.footerText}>
            We are committed to protecting your privacy and being transparent about how we handle your data.
            This policy may be updated periodically. We will notify you of significant changes.
          </Text>
          <Text style={styles.updateDate}>Last reviewed: December 15, 2023</Text>
        </View>
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
  header: {
    alignItems: 'center',
    paddingBottom: 32,
    paddingHorizontal: 32,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
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
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 8,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: `${Colors.lightGray}50`,
  },
  controlsSection: {
    padding: 16,
  },
  controlsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
  },
  controlsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  controlItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  controlLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  controlTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  controlText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 2,
  },
  controlDescription: {
    fontSize: 13,
    color: Colors.gray,
  },
  divider: {
    height: 1,
    backgroundColor: `${Colors.lightGray}30`,
    marginLeft: 52,
  },
  contentSection: {
    padding: 16,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionNumberText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    flex: 1,
  },
  sectionContent: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 22,
  },
  actionsSection: {
    padding: 16,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  dangerAction: {
    borderWidth: 1,
    borderColor: `${Colors.error}30`,
  },
  actionContent: {
    flex: 1,
    marginLeft: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 13,
    color: Colors.gray,
  },
  contactSection: {
    padding: 20,
    backgroundColor: `${Colors.background}08`,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 8,
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  contactButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  updateDate: {
    fontSize: 12,
    color: Colors.lightGray,
    fontStyle: 'italic',
  },
});

export default PrivacyPolicyScreen;