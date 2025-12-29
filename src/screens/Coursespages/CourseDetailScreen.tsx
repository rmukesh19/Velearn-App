import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';

type CourseDetailRouteProp = RouteProp<{ CourseDetail: { courseId: string } }, 'CourseDetail'>;

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 60;
const IMAGE_HEIGHT = 250;

const CourseDetailScreen: React.FC = () => {
  const route = useRoute<CourseDetailRouteProp>();
  const navigation = useNavigation();
  const { courseId } = route.params;
  
  // Use useRef for scrollY to avoid re-renders
  const scrollY = useRef(new Animated.Value(0)).current;

  // Mock course data
  const courseData = {
    title: 'React Native Masterclass',
    instructor: 'Mukesh',
    description: 'Learn React Native from scratch. Build real-world applications with hands-on projects and best practices. Master state management, navigation, API integration, and app deployment.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
    duration: '15h 30m',
    level: 'Intermediate',
    lessons: 24,
    rating: 4.8,
    enrolled: 1250,
    category: 'Mobile Development',
    lastUpdated: '2 weeks ago',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    tags: ['React Native', 'Mobile', 'JavaScript', 'TypeScript'],
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100, 150],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT],
    outputRange: [0, -IMAGE_HEIGHT / 2],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0, IMAGE_HEIGHT],
    outputRange: [1.2, 1, 0.8],
    extrapolate: 'clamp',
  });

  // Handle scroll event properly
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      
      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.primary }]} />
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Animated.Text style={styles.animatedTitle} numberOfLines={1}>
            {courseData.title}
          </Animated.Text>
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Fixed Header */}
      <SafeAreaView style={styles.fixedHeader} edges={['top']}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.placeholder} />
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Animated.ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        {/* Animated Course Image */}
        <Animated.View 
          style={[
            styles.imageContainer,
            {
              transform: [
                { translateY: imageTranslate },
                { scale: imageScale }
              ]
            }
          ]}
        >
          <Image 
            source={{ uri: courseData.image }} 
            style={styles.courseImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <View style={styles.imageContent}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>BESTSELLER</Text>
              </View>
              <Text style={styles.courseTitle}>{courseData.title}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color={Colors.warning} />
                <Text style={styles.ratingText}>{courseData.rating}</Text>
                <Text style={styles.ratingSubtext}>({courseData.enrolled.toLocaleString()} enrolled)</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Instructor Card */}
          <View style={styles.instructorCard}>
            <Image 
              source={{ uri: courseData.instructorAvatar }}
              style={styles.instructorAvatar}
            />
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorLabel}>Created by</Text>
              <Text style={styles.instructorName}>{courseData.instructor}</Text>
              <Text style={styles.instructorRole}>Senior Mobile Developer</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Icon name="person-add-outline" size={18} color={Colors.primary} />
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>

          {/* Course Stats */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Icon name="time-outline" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{courseData.duration}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="layers-outline" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{courseData.lessons}</Text>
              <Text style={styles.statLabel}>Lessons</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="trending-up-outline" size={24} color={Colors.primary} />
              <View style={styles.levelContainer}>
                <View style={[
                  styles.levelDot, 
                  courseData.level === 'Beginner' ? styles.beginnerDot :
                  courseData.level === 'Intermediate' ? styles.intermediateDot :
                  styles.advancedDot
                ]} />
                <Text style={styles.statValue}>{courseData.level}</Text>
              </View>
              <Text style={styles.statLabel}>Level</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="calendar-outline" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{courseData.lastUpdated}</Text>
              <Text style={styles.statLabel}>Updated</Text>
            </View>
          </View>

          {/* Tags */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.tagsContainer}
            contentContainerStyle={styles.tagsContent}
          >
            {courseData.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Course Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{courseData.description}</Text>
          </View>

          {/* What You'll Learn */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>What You'll Learn</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {[
              'Build complete React Native applications from scratch',
              'Understand React Native architecture and best practices',
              'Implement navigation and state management solutions',
              'Work with APIs and backend integration',
              'Publish apps to both iOS App Store and Google Play Store',
              'Debug and optimize React Native applications',
            ].slice(0, 3).map((item, index) => (
              <View key={index} style={styles.learnItem}>
                <View style={styles.learnIconContainer}>
                  <Icon name="checkmark-circle" size={20} color={Colors.success} />
                </View>
                <Text style={styles.learnText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Curriculum Preview */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Curriculum</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>24 Lessons</Text>
              </TouchableOpacity>
            </View>
            {[
              { title: 'Introduction to React Native', duration: '45min', free: true },
              { title: 'Setting Up Development Environment', duration: '60min', free: true },
              { title: 'React Native Components Deep Dive', duration: '90min', free: false },
            ].map((lesson, index) => (
              <TouchableOpacity key={index} style={styles.lessonItem}>
                <View style={styles.lessonInfo}>
                  <View style={styles.lessonIcon}>
                    <Icon 
                      name={lesson.free ? "play-circle-outline" : "lock-closed-outline"} 
                      size={24} 
                      color={lesson.free ? Colors.primary : Colors.gray} 
                    />
                  </View>
                  <View style={styles.lessonDetails}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                  </View>
                </View>
                {lesson.free && (
                  <View style={styles.freeBadge}>
                    <Text style={styles.freeBadgeText}>FREE</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.ScrollView>

      {/* Action Buttons */}
      <SafeAreaView style={styles.actionArea} edges={['bottom']}>
        <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.white }]} />
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.wishlistButton}>
            <Icon name="heart-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.enrollButton}
            onPress={() => navigation.navigate('CoursePlayer' as never, { courseId })}
          >
            <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.primary, borderRadius: 28 }]} />
            <Icon name="play-circle" size={24} color={Colors.white} />
            <Text style={styles.enrollButtonText}>Start Learning</Text>
            {/* <View style={styles.priceTag}>
              <Text style={styles.priceText}>$99.99</Text>
            </View> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT + 40,
    zIndex: 1000,
    paddingTop: 40,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: HEADER_HEIGHT,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    height: IMAGE_HEIGHT,
  },
  courseImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  imageContent: {
    marginBottom: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.warning,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  courseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    lineHeight: 34,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    marginLeft: 4,
    marginRight: 8,
  },
  ratingSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    padding: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  instructorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorLabel: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 2,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 2,
  },
  instructorRole: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: 4,
  },
  followButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    marginHorizontal: '1%',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  beginnerDot: {
    backgroundColor: Colors.success,
  },
  intermediateDot: {
    backgroundColor: Colors.warning,
  },
  advancedDot: {
    backgroundColor: Colors.error,
  },
  tagsContainer: {
    marginBottom: 24,
  },
  tagsContent: {
    paddingRight: 20,
  },
  tag: {
    backgroundColor: Colors.lightPrimary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tagText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    letterSpacing: -0.5,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: Colors.darkGray,
    lineHeight: 24,
  },
  learnItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  learnIconContainer: {
    width: 24,
    marginRight: 12,
  },
  learnText: {
    flex: 1,
    fontSize: 16,
    color: Colors.darkGray,
    lineHeight: 22,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lessonDetails: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 14,
    color: Colors.gray,
  },
  freeBadge: {
    backgroundColor: Colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  freeBadgeText: {
    color: Colors.success,
    fontSize: 12,
    fontWeight: '700',
  },
  actionArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wishlistButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  enrollButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    gap: 12,
  },
  enrollButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  priceTag: {
    position: 'absolute',
    right: 16,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default CourseDetailScreen;