// screens/HelpSupportScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
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

const HelpSupportScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const faqs = [
    {
      id: '1',
      question: 'How do I reset my password?',
      answer: 'Go to Account Settings > Security > Change Password. You will receive an email with reset instructions.',
    },
    {
      id: '2',
      question: 'Can I download courses for offline viewing?',
      answer: 'Yes, most courses support offline downloads. Look for the download icon on course videos.',
    },
    {
      id: '3',
      question: 'How are certificates issued?',
      answer: 'Certificates are automatically issued upon course completion with a minimum score of 80%.',
    },
    {
      id: '4',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, PayPal, UPI, and net banking.',
    },
  ];

  const supportOptions = [
    {
      id: '1',
      title: 'FAQ Center',
      description: 'Find answers to common questions',
      icon: 'help-circle-outline',
      color: Colors.info,
      action: () => {},
    },
    {
      id: '2',
      title: 'Contact Support',
      description: 'Chat with our support team',
      icon: 'chatbubble-ellipses-outline',
      color: Colors.primary,
      action: () => Linking.openURL('mailto:support@velearn.com'),
    },
    {
      id: '3',
      title: 'Report a Problem',
      description: 'Submit a bug or issue report',
      icon: 'bug-outline',
      color: Colors.error,
      action: () => {},
    },
    {
      id: '4',
      title: 'Request a Feature',
      description: 'Suggest new features',
      icon: 'bulb-outline',
      color: Colors.warning,
      action: () => {},
    },
  ];

  const handleCallSupport = () => {
    Alert.alert(
      'Call Support',
      'Would you like to call our support team?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Linking.openURL('tel:+18005551234') },
      ]
    );
  };

  const handleOpenWebsite = () => {
    Linking.openURL('https://velearn.com/help');
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
            <Icon name="help-circle-outline" size={32} color={Colors.white} />
            <Text style={styles.title}>Help & Support</Text>
            <Text style={styles.subtitle}>We're here to help you</Text>
          </View>
        </View>

        <View style={styles.quickHelpCard}>
          <View style={styles.quickHelpHeader}>
            <Text style={styles.quickHelpTitle}>Quick Help</Text>
            <TouchableOpacity onPress={handleOpenWebsite}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.quickHelpGrid}>
            {supportOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.quickHelpItem}
                onPress={option.action}
                activeOpacity={0.7}
              >
                <View style={[styles.quickHelpIcon, { backgroundColor: `${option.color}15` }]}>
                  <Icon name={option.icon as any} size={24} color={option.color} />
                </View>
                <Text style={styles.quickHelpText}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <TouchableOpacity 
                key={faq.id} 
                style={[
                  styles.faqItem,
                  index === faqs.length - 1 && { borderBottomWidth: 0 }
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Icon name="chevron-down" size={20} color={Colors.gray} />
                </View>
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Options</Text>
          <View style={styles.contactContainer}>
            <TouchableOpacity 
              style={styles.contactCard}
              onPress={() => Linking.openURL('mailto:support@velearn.com')}
              activeOpacity={0.7}
            >
              <View style={[styles.contactIcon, { backgroundColor: `${Colors.primary}15` }]}>
                <Icon name="mail-outline" size={24} color={Colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Email Support</Text>
                <Text style={styles.contactDetail}>support@velearn.com</Text>
                <Text style={styles.contactTime}>Response: Within 24 hours</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.contactCard}
              onPress={handleCallSupport}
              activeOpacity={0.7}
            >
              <View style={[styles.contactIcon, { backgroundColor: `${Colors.success}15` }]}>
                <Icon name="call-outline" size={24} color={Colors.success} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Phone Support</Text>
                <Text style={styles.contactDetail}>+1 (800) 555-1234</Text>
                <Text style={styles.contactTime}>Mon-Fri, 9AM-6PM EST</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.contactCard, { borderBottomWidth: 0 }]}
              onPress={() => Linking.openURL('https://velearn.com/chat')}
              activeOpacity={0.7}
            >
              <View style={[styles.contactIcon, { backgroundColor: `${Colors.secondary}15` }]}>
                <Icon name="chatbubble-outline" size={24} color={Colors.secondary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Live Chat</Text>
                <Text style={styles.contactDetail}>Available 24/7</Text>
                <Text style={styles.contactTime}>Instant response</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Helpful Resources</Text>
          <View style={styles.resourcesContainer}>
            <TouchableOpacity style={styles.resourceCard} activeOpacity={0.7}>
              <Icon name="book-outline" size={20} color={Colors.primary} />
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceTitle}>User Guide</Text>
                <Text style={styles.resourceDescription}>Complete app documentation</Text>
              </View>
              <Icon name="download-outline" size={20} color={Colors.gray} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.resourceCard} activeOpacity={0.7}>
              <Icon name="videocam-outline" size={20} color={Colors.secondary} />
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceTitle}>Video Tutorials</Text>
                <Text style={styles.resourceDescription}>Step-by-step guides</Text>
              </View>
              <Icon name="play-circle-outline" size={20} color={Colors.gray} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.resourceCard, { borderBottomWidth: 0 }]} 
              activeOpacity={0.7}
            >
              <Icon name="people-outline" size={20} color={Colors.success} />
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceTitle}>Community Forum</Text>
                <Text style={styles.resourceDescription}>Connect with other users</Text>
              </View>
              <Icon name="arrow-forward" size={20} color={Colors.gray} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.emergencySection}>
          <View style={styles.emergencyHeader}>
            <Icon name="alert-circle-outline" size={24} color={Colors.error} />
            <Text style={styles.emergencyTitle}>Emergency Support</Text>
          </View>
          <Text style={styles.emergencyText}>
            For urgent account issues or security concerns, contact us immediately.
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={handleCallSupport}
            activeOpacity={0.8}
          >
            <Icon name="call" size={18} color={Colors.white} />
            <Text style={styles.emergencyButtonText}>Emergency Contact</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.feedbackSection}>
          <Text style={styles.feedbackTitle}>How can we improve?</Text>
          <Text style={styles.feedbackText}>
            Your feedback helps us make VeLearn better for everyone.
          </Text>
          <TouchableOpacity style={styles.feedbackButton} activeOpacity={0.8}>
            <Icon name="thumbs-up-outline" size={18} color={Colors.primary} />
            <Text style={styles.feedbackButtonText}>Send Feedback</Text>
          </TouchableOpacity>
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
    textAlign: 'center',
  },
  quickHelpCard: {
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
  quickHelpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quickHelpTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  quickHelpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickHelpItem: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 16,
    marginBottom: 12,
  },
  quickHelpIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickHelpText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 16,
  },
  faqContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  faqItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.lightGray}30`,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
    marginTop: 8,
  },
  contactContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.lightGray}30`,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  contactTime: {
    fontSize: 12,
    color: Colors.gray,
  },
  resourcesContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.lightGray}30`,
  },
  resourceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 2,
  },
  resourceDescription: {
    fontSize: 14,
    color: Colors.gray,
  },
  emergencySection: {
    padding: 20,
    backgroundColor: `${Colors.error}08`,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.error,
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
    marginBottom: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: Colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  emergencyButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  feedbackSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: `${Colors.primary}08`,
    margin: 16,
    borderRadius: 20,
    marginBottom: 8,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  feedbackButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HelpSupportScreen;