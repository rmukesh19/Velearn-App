import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';

const HelpSupportScreen = ({ navigation }: any) => {
  const [message, setMessage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to Settings > Account > Change Password. You will receive an email with reset instructions.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 14-day free trial for all new users. No credit card required.',
    },
    {
      question: 'How can I cancel my subscription?',
      answer: 'Go to Settings > Subscription > Cancel Subscription. You can cancel anytime.',
    },
    {
      question: 'Do you offer certificates for completed courses?',
      answer: 'Yes, certificates are available for all paid courses upon successful completion.',
    },
    {
      question: 'Can I download courses for offline viewing?',
      answer: 'Yes, most courses can be downloaded for offline access in the app settings.',
    },
  ];

  const topics = [
    { id: 'account', title: 'Account Issues', icon: 'person' },
    { id: 'billing', title: 'Billing & Payments', icon: 'card' },
    { id: 'courses', title: 'Courses Content', icon: 'book' },
    { id: 'technical', title: 'Technical Problems', icon: 'hardware-chip' },
    { id: 'feature', title: 'Feature Request', icon: 'bulb' },
    { id: 'other', title: 'Other', icon: 'help-circle' },
  ];

  const contactMethods = [
    {
      title: 'Email Support',
      description: 'Get help via email',
      icon: 'mail',
      action: () => Linking.openURL('mailto:support@codelearn.com'),
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: 'chatbubbles',
      action: () => Alert.alert('Live Chat', 'Live chat is available Mon-Fri, 9AM-6PM EST'),
    },
    {
      title: 'Knowledge Base',
      description: 'Browse helpful articles',
      icon: 'library',
      action: () => Linking.openURL('https://help.codelearn.com'),
    },
    {
      title: 'Community Forum',
      description: 'Ask the community',
      icon: 'people',
      action: () => Linking.openURL('https://community.codelearn.com'),
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter your message');
      return;
    }
    
    if (!selectedTopic) {
      Alert.alert('Error', 'Please select a topic');
      return;
    }
    
    Alert.alert(
      'Message Sent',
      'Thank you for reaching out! Our support team will get back to you within 24 hours.',
      [
        {
          text: 'OK',
          onPress: () => {
            setMessage('');
            setSelectedTopic('');
          },
        },
      ]
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <Text style={styles.headerSubtitle}>We're here to help you</Text>
      </View>

      <View style={styles.content}>
        {/* Quick Help Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Help</Text>
          <View style={styles.contactGrid}>
            {contactMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contactCard}
                onPress={method.action}
              >
                <View style={styles.contactIconContainer}>
                  <Icon name={method.icon} size={28} color={Colors.secondary} />
                </View>
                <Text style={styles.contactTitle}>{method.title}</Text>
                <Text style={styles.contactDescription}>{method.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.card}>
            {faqs.map((faq, index) => (
              <TouchableOpacity
                key={index}
                style={styles.faqItem}
                onPress={() => {
                  Alert.alert(faq.question, faq.answer);
                }}
              >
                <View style={styles.faqHeader}>
                  <Icon name="help-circle-outline" size={22} color={Colors.secondary} />
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                </View>
                <Icon name="chevron-forward" size={18} color={Colors.secondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>
          <View style={styles.card}>
            
            {/* Topic Selection */}
            <Text style={styles.formLabel}>Select Topic</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.topicsContainer}
            >
              {topics.map((topic) => (
                <TouchableOpacity
                  key={topic.id}
                  style={[
                    styles.topicButton,
                    selectedTopic === topic.id && styles.topicButtonSelected,
                  ]}
                  onPress={() => setSelectedTopic(topic.id)}
                >
                  <Icon 
                    name={topic.icon} 
                    size={20} 
                    color={selectedTopic === topic.id ? Colors.white : Colors.secondary} 
                  />
                  <Text 
                    style={[
                      styles.topicButtonText,
                      selectedTopic === topic.id && styles.topicButtonTextSelected,
                    ]}
                  >
                    {topic.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Message Input */}
            <Text style={styles.formLabel}>Your Message</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.messageInput}
                multiline
                numberOfLines={5}
                placeholder="Describe your issue or question..."
                placeholderTextColor={Colors.primary + '60'}
                value={message}
                onChangeText={setMessage}
                textAlignVertical="top"
              />
              <View style={styles.inputIcon}>
                <Icon name="create-outline" size={20} color={Colors.secondary} />
              </View>
            </View>

            {/* Send Button */}
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={handleSendMessage}
            >
              <Icon name="send" size={20} color={Colors.white} />
              <Text style={styles.sendButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <View style={[styles.card, styles.emergencyCard]}>
            <View style={styles.emergencyIconContainer}>
              <Icon name="warning" size={30} color={Colors.secondary} />
            </View>
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>Urgent Support</Text>
              <Text style={styles.emergencyText}>
                For critical issues requiring immediate attention, call our 24/7 support line
              </Text>
              <TouchableOpacity 
                style={styles.callButton}
                onPress={() => Linking.openURL('tel:+18001234567')}
              >
                <Icon name="call" size={18} color={Colors.white} />
                <Text style={styles.callButtonText}>Call +1 (800) 123-4567</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Operating Hours */}
        <View style={styles.infoCard}>
          <Icon name="time-outline" size={24} color={Colors.secondary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Support Hours</Text>
            <Text style={styles.infoText}>
              Monday - Friday: 9AM - 6PM EST{'\n'}
              Saturday: 10AM - 4PM EST{'\n'}
              Sunday: Closed
            </Text>
          </View>
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
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contactCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  contactIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.secondary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 12,
    color: Colors.primary + '70',
    textAlign: 'center',
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + '10',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  faqQuestion: {
    fontSize: 15,
    color: Colors.primary,
    marginLeft: 12,
    flex: 1,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 10,
    marginTop: 5,
  },
  topicsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  topicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary + '10',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.secondary + '30',
  },
  topicButtonSelected: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  topicButtonText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '500',
    marginLeft: 6,
  },
  topicButtonTextSelected: {
    color: Colors.white,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  messageInput: {
    backgroundColor: Colors.primary + '05',
    borderWidth: 1,
    borderColor: Colors.primary + '20',
    borderRadius: 12,
    padding: 15,
    paddingTop: 15,
    fontSize: 15,
    color: Colors.primary,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  inputIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  sendButton: {
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
  sendButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  emergencyCard: {
    backgroundColor: Colors.primary + '05',
    borderWidth: 1,
    borderColor: Colors.secondary + '30',
  },
  emergencyIconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  emergencyContent: {
    paddingRight: 40,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: Colors.primary + '80',
    lineHeight: 20,
    marginBottom: 15,
  },
  callButton: {
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  callButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  infoContent: {
    flex: 1,
    marginLeft: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: Colors.primary + '70',
    lineHeight: 20,
  },
});

export default HelpSupportScreen;