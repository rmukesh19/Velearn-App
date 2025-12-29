import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Define navigation types
type RootStackParamList = {
  LiveClass: undefined;
  OnlineClass: { courseId: string; courseTitle: string };
  CourseSyllabus: { courseId: string; courseTitle: string };
  CoursePlan: { courseId: string; courseTitle: string };
};

// --- INTERFACE DEFINITIONS ---
interface Course {
  id: string;
  title: string;
  instructor: string;
  image: string;
  isLive: boolean;
}

interface LiveCourse {
  id: string;
  title: string;
  description: string;
  image: string;
  isFeatured: boolean;
}

const LiveClassScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // --- MOCK DATA ---
  const myCourses: Course[] = [
    {
      id: '1',
      title: 'Master In Full Attack',
      instructor: '2 available',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      isLive: true,
    },
    {
      id: '2',
      title: 'Advanced UI/UX Design Course',
      instructor: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      isLive: false,
    },
  ];

  const liveCourses: LiveCourse[] = [
    {
      id: '1',
      title: 'Master Data Science Course',
      description: 'Live Digital Marketing Program',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      isFeatured: true,
    },
    {
      id: '2',
      title: 'Advanced Web Development',
      description: 'Live Frontend Program',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      isFeatured: false,
    },
    {
      id: '3',
      title: 'Mobile App Development',
      description: 'Live Mobile Program',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
      isFeatured: false,
    },
    {
      id: '4',
      title: 'Digital Marketing Mastery',
      description: 'Live Marketing Program',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      isFeatured: false,
    },
  ];

  // Handle Play Button Press
  const handlePlayPress = (course: Course) => {
    console.log('Navigating to OnlineClass with course:', course.id);
    navigation.navigate('OnlineClass', {
      courseId: course.id,
      courseTitle: course.title,
    });
  };

  // Handle Syllabus Button Press
  const handleSyllabusPress = (course: LiveCourse) => {
    console.log('Navigating to CourseSyllabus with course:', course.id);
    navigation.navigate('CourseSyllabus', {
      courseId: course.id,
      courseTitle: course.title,
    });
  };

  // Handle View Plan Button Press
  const handleViewPlanPress = (course: LiveCourse) => {
    console.log('Navigating to CoursePlan with course:', course.id);
    navigation.navigate('CoursePlan', {
      courseId: course.id,
      courseTitle: course.title,
    });
  };

  // --- MY COURSES ---
  const renderMyCourses = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Live Courses</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
      >
        {myCourses.map((course) => (
          <View key={course.id} style={styles.myCourseCard}>
            <Image source={{ uri: course.image }} style={styles.courseImage} />
            <View style={styles.courseOverlay}>
              {course.isLive && (
                <View style={styles.courseBadge}>
                  <Icon name="radio-outline" size={12} color={Colors.white} />
                  <Text style={styles.liveBadgeText}>LIVE</Text>
                </View>
              )}
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseInstructor}>{course.instructor}</Text>
              <TouchableOpacity 
                style={styles.playButton}
                onPress={() => handlePlayPress(course)}
                activeOpacity={0.8}
              >
                <Icon name="play-circle" size={20} color={Colors.white} />
                <Text style={styles.playButtonText}>Play</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  // --- UPCOMING COURSES ---
  const renderUpcomingCourses = () => (
    <View style={[styles.section, styles.lastSection]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Live Courses</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
      >
        {liveCourses.map((course) => (
          <View key={course.id} style={styles.upcomingCourseCard}>
            <View style={styles.upcomingCourseImageContainer}>
              <Image source={{ uri: course.image }} style={styles.upcomingCourseImage} />
              {course.isFeatured && (
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>Featured</Text>
                </View>
              )}
            </View>
            <View style={styles.upcomingCourseContent}>
              <Text style={styles.upcomingCourseTitle} numberOfLines={2}>{course.title}</Text>
              <Text style={styles.upcomingCourseDesc} numberOfLines={2}>{course.description}</Text>

              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.syllabusButton}
                  onPress={() => handleSyllabusPress(course)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.syllabusButtonText}>Syllabus</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.viewPlanButton}
                  onPress={() => handleViewPlanPress(course)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.viewPlanButtonText}>View Plan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderMyCourses()}
        {renderUpcomingCourses()}
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingBottom: 30,
  },
  horizontalScrollContent: {
    paddingHorizontal: 20,
    paddingRight: 30,
  },
  section: {
    marginBottom: 24,
  },
  lastSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  seeAllText: {
    color: Colors.secondary,
    fontWeight: '500',
  },
  myCourseCard: {
    width: width * 0.8,
    height: 200,
    borderRadius: 16,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  courseImage: {
    width: '100%',
    height: '100%',
  },
  courseOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  courseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  liveBadgeText: {
    color: Colors.white,
    marginLeft: 4,
    fontSize: 10,
    fontWeight: '700',
  },
  courseTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  courseInstructor: {
    color: Colors.lightGray,
    fontSize: 12,
    marginBottom: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: Colors.white,
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  upcomingCourseCard: {
    width: width * 0.7,
    marginRight: 15,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  upcomingCourseImageContainer: {
    position: 'relative',
    height: 140,
  },
  upcomingCourseImage: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.black,
  },
  upcomingCourseContent: {
    padding: 16,
  },
  upcomingCourseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 6,
    lineHeight: 22,
  },
  upcomingCourseDesc: {
    color: Colors.gray,
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  syllabusButton: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  syllabusButtonText: {
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  viewPlanButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewPlanButtonText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default LiveClassScreen;