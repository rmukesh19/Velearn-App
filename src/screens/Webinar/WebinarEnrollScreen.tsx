import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';

type WebinarEnrollScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WebinarEnrollScreen'>;
type WebinarEnrollRouteProp = RouteProp<RootStackParamList, 'WebinarEnrollScreen'>;

const { width, height } = Dimensions.get('window');

interface WebinarDetails {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  thumbnail: string;
  description: string;
  speaker: {
    name: string;
    designation: string;
    bio: string;
    avatar: string;
  };
  agenda: string[];
  requirements: string[];
  benefits: string[];
  attendeesCount: number;
  maxAttendees: number;
  category: string;
  level: string;
}

export default function WebinarEnrollScreen() {
  const navigation = useNavigation<WebinarEnrollScreenNavigationProp>();
  const route = useRoute<WebinarEnrollRouteProp>();
  const insets = useSafeAreaInsets();
  const { webinarId } = route.params || {};
  
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Mock webinar data
  const webinar: WebinarDetails = {
    id: webinarId || '1',
    title: 'How Data Analytics Works',
    date: 'Sunday, 14 Dec, 2025',
    time: '6.00pm to 8.00pm',
    duration: '2 hours',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    description: 'Join our comprehensive webinar on Data Analytics where you\'ll learn how to transform raw data into meaningful insights.',
    speaker: {
      name: 'Dr. Sarah Johnson',
      designation: 'Lead Data Scientist at TechCorp',
      bio: '10+ years experience in data analytics, previously worked at Google and Microsoft.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
    },
    agenda: [
      'Introduction to Data Analytics',
      'Data Collection Methods',
      'Data Processing Techniques',
      'Analytical Tools Overview',
      'Case Study: Real Business Application',
      'Q&A Session'
    ],
    requirements: [
      'Basic understanding of data concepts',
      'Laptop/Computer with internet',
      'Notebook for taking notes'
    ],
    benefits: [
      'Certificate of Participation',
      'Access to recording',
      'Presentation slides',
      'Networking with peers'
    ],
    attendeesCount: 142,
    maxAttendees: 200,
    category: 'Data Science',
    level: 'Beginner',
  };

  const handleEnroll = () => {
    if (isEnrolled) {
      Alert.alert(
        'Join Webinar',
        'The webinar will start at the scheduled time.',
        [{ text: 'OK' }]
      );
    } else {
      setIsEnrolled(true);
      Alert.alert(
        'Success!',
        'You have successfully enrolled in the webinar.',
        [{ text: 'OK' }]
      );
    }
  };

  const handlePreviousWebinar = () => {
    Alert.alert(
      'Previous Webinars',
      'This would navigate to previous webinars screen.',
      [{ text: 'OK' }]
    );
  };

  const handleShare = () => {
    Alert.alert(
      'Share Webinar',
      'Share this webinar with your friends!',
      [{ text: 'OK' }]
    );
  };

  const attendeesPercentage = (webinar.attendeesCount / webinar.maxAttendees) * 100;

  // Calculate bottom button container height including safe area
  const bottomButtonHeight = 68 + Math.max(insets.bottom, 0);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={Colors.white}
        translucent={false}
      />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Webinar Details</Text>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Icon name="share-outline" size={24} color={Colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomButtonHeight + 20 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Webinar Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: webinar.thumbnail }}
            style={styles.webinarImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{webinar.category}</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{webinar.title}</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{webinar.level}</Text>
            </View>
          </View>

          {/* Date and Time */}
          <View style={styles.datetimeSection}>
            <View style={styles.datetimeItem}>
              <Icon name="calendar-outline" size={18} color={Colors.primary} />
              <Text style={styles.datetimeText}>{webinar.date}</Text>
            </View>
            <View style={styles.datetimeItem}>
              <Icon name="time-outline" size={18} color={Colors.primary} />
              <Text style={styles.datetimeText}>{webinar.time}</Text>
            </View>
            <View style={styles.datetimeItem}>
              <Icon name="timer-outline" size={18} color={Colors.primary} />
              <Text style={styles.datetimeText}>{webinar.duration}</Text>
            </View>
          </View>

          {/* Seats Status */}
          <View style={styles.seatsContainer}>
            <View style={styles.seatsHeader}>
              <Text style={styles.seatsTitle}>Seats Filling Fast</Text>
              <Text style={styles.seatsCount}>
                {webinar.attendeesCount}/{webinar.maxAttendees}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${attendeesPercentage}%` }
                ]} 
              />
            </View>
            <Text style={styles.seatsLeft}>
              Only {webinar.maxAttendees - webinar.attendeesCount} seats left
            </Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{webinar.description}</Text>
          </View>

          {/* Speaker */}
          <View style={styles.speakerSection}>
            <Image
              source={{ uri: webinar.speaker.avatar }}
              style={styles.speakerAvatar}
            />
            <View style={styles.speakerInfo}>
              <Text style={styles.speakerName}>{webinar.speaker.name}</Text>
              <Text style={styles.speakerDesignation}>{webinar.speaker.designation}</Text>
              <Text style={styles.speakerBio}>{webinar.speaker.bio}</Text>
            </View>
          </View>

          {/* Agenda */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Agenda</Text>
            {webinar.agenda.map((item, index) => (
              <View key={index} style={styles.agendaItem}>
                <Text style={styles.agendaNumber}>{index + 1}.</Text>
                <Text style={styles.agendaText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Requirements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            {webinar.requirements.map((req, index) => (
              <View key={index} style={styles.requirementItem}>
                <Icon name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.requirementText}>{req}</Text>
              </View>
            ))}
          </View>

          {/* Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What You'll Get</Text>
            {webinar.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Icon name="gift-outline" size={18} color={Colors.secondary} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Buttons Container */}
      <View style={[
        styles.bottomButtonsContainer,
        { paddingBottom: Math.max(insets.bottom, 12) }
      ]}>
        <View style={styles.buttonsRow}>
          {/* Previous Webinar Button */}
          <TouchableOpacity 
            style={styles.previousButton}
            onPress={handlePreviousWebinar}
            activeOpacity={0.7}
          >
            <Icon name="play-back-outline" size={20} color={Colors.primary} />
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>

          {/* Enroll Button */}
          <TouchableOpacity 
            style={[
              styles.enrollButton,
              isEnrolled && styles.enrolledButton
            ]}
            onPress={handleEnroll}
            activeOpacity={0.7}
          >
            {isEnrolled ? (
              <>
                <Icon name="videocam" size={20} color={Colors.white} />
                <Text style={styles.enrollButtonText}>Join Webinar</Text>
              </>
            ) : (
              <>
                <Icon name="person-add" size={20} color={Colors.white} />
                <Text style={styles.enrollButtonText}>Enroll Now</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: 4,
  },
  shareButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    height: 220,
    position: 'relative',
  },
  webinarImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  categoryTag: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  content: {
    padding: 16,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    marginRight: 12,
    lineHeight: 28,
  },
  levelBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  datetimeSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  datetimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  datetimeText: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
  seatsContainer: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  seatsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  seatsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    lineHeight: 22,
  },
  seatsCount: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    lineHeight: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.white,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  seatsLeft: {
    fontSize: 12,
    color: Colors.gray,
    lineHeight: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
  speakerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  speakerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  speakerInfo: {
    flex: 1,
  },
  speakerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 2,
    lineHeight: 22,
  },
  speakerDesignation: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 4,
    lineHeight: 20,
  },
  speakerBio: {
    fontSize: 13,
    color: Colors.gray,
    lineHeight: 18,
  },
  agendaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  agendaNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: 8,
    minWidth: 24,
    lineHeight: 20,
  },
  agendaText: {
    flex: 1,
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
    lineHeight: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  bottomButtonsContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  previousButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 8,
    flex: 1,
  },
  previousButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    lineHeight: 24,
  },
  enrollButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    flexDirection: 'row',
    gap: 8,
  },
  enrolledButton: {
    backgroundColor: Colors.success,
  },
  enrollButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
});