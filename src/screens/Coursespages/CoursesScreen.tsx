import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Course, Category } from '../types/course.types';
import { Colors } from '../../theme/colors';

// Define navigation types
type RootStackParamList = {
  Courses: undefined;
  CourseDetail: { courseId: string };
  CoursePlayer: { courseId: string };
};

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;

// Course Card Component - FIXED
const CourseCard: React.FC<{ course: Course; horizontal?: boolean }> = ({ course, horizontal = false }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const handleCoursePress = () => {
    console.log('Navigating to CourseDetail with ID:', course.id);
    navigation.navigate('CourseDetail', { courseId: course.id });
  };
  
  const handlePlayPress = (e: any) => {
    e.stopPropagation();
    console.log('Navigating to CoursePlayer with ID:', course.id);
    navigation.navigate('CoursePlayer', { courseId: course.id });
  };
  
  const handleEnrollPress = (e: any) => {
    e.stopPropagation();
    if (course.isEnrolled) {
      navigation.navigate('CoursePlayer', { courseId: course.id });
    } else {
      // Handle enroll logic
      console.log('Enroll in course:', course.id);
      // Add your enroll logic here
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        horizontal ? styles.horizontalCourseCard : styles.verticalCourseCard,
        horizontal && styles.horizontalCardMargin
      ]}
      onPress={handleCoursePress}
      activeOpacity={0.7}
    >
      <View style={styles.courseImageContainer}>
        <Image 
          source={{ uri: course.image || 'https://via.placeholder.com/150' }} 
          style={styles.courseImage}
          resizeMode="cover"
        />
        <View style={styles.courseLevelBadge}>
          <Text style={styles.courseLevelText}>{course.level}</Text>
        </View>
        {course.isEnrolled && (
          <View style={styles.playButtonOverlay}>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={handlePlayPress}
            >
              <Icon name="play" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
        <Text style={styles.courseInstructor}>{course.instructor}</Text>
        <View style={styles.courseMeta}>
          <View style={styles.metaItem}>
            <Icon name="time-outline" size={14} color={Colors.gray} />
            <Text style={styles.metaText}>{course.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon name="play-circle-outline" size={14} color={Colors.gray} />
            <Text style={styles.metaText}>{course.lessons || '12'} lessons</Text>
          </View>
        </View>
        {!horizontal && (
          <TouchableOpacity 
            style={[styles.enrollButton, course.isEnrolled && styles.continueButton]}
            onPress={handleEnrollPress}
          >
            <Text style={[styles.enrollButtonText, course.isEnrolled && styles.continueButtonText]}>
              {course.isEnrolled ? (
                <>
                  <Icon name="play-circle" size={16} color={Colors.primary} />{' '}
                  Continue Learning
                </>
              ) : 'Enroll Now'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

// My Course Card - FIXED
const MyCourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const handleCoursePress = () => {
    console.log('MyCourse - Navigating to CourseDetail with ID:', course.id);
    navigation.navigate('CourseDetail', { courseId: course.id });
  };
  
  const handlePlayPress = (e: any) => {
    e.stopPropagation();
    console.log('MyCourse - Navigating to CoursePlayer with ID:', course.id);
    navigation.navigate('CoursePlayer', { courseId: course.id });
  };
  
  return (
    <TouchableOpacity 
      style={[styles.myCourseCard, styles.horizontalCardMargin]}
      onPress={handleCoursePress}
      activeOpacity={0.7}
    >
      <View style={styles.myCourseImageContainer}>
        <Image 
          source={{ uri: course.image || 'https://via.placeholder.com/150' }} 
          style={styles.myCourseImage}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.myCoursePlayButton}
          onPress={handlePlayPress}
        >
          <Icon name="play" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.myCourseContent}>
        <View style={styles.myCourseHeader}>
          <Text style={styles.myCourseTitle} numberOfLines={2}>{course.title}</Text>
          <Text style={styles.myCourseInstructor}>{course.instructor}</Text>
        </View>
        <View style={styles.myCourseMeta}>
          <View style={styles.metaItem}>
            <Icon name="time-outline" size={12} color={Colors.gray} />
            <Text style={styles.metaText}>{course.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon name="play-circle-outline" size={12} color={Colors.gray} />
            <Text style={styles.metaText}>{course.lessons || '12'} lessons</Text>
          </View>
          <TouchableOpacity 
            style={styles.resumeButton}
            onPress={handlePlayPress}
          >
            <Icon name="play" size={16} color={Colors.primary} />
            <Text style={styles.resumeButtonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Main Screen Component - FIXED
const CoursesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  // Set first category as selected by default
  const [selectedCategory, setSelectedCategory] = useState<string | null>('Software Development');

  const categories: Category[] = [
    { id: '1', name: 'Software Development', icon: 'code-slash-outline' },
    { id: '2', name: 'Web Development', icon: 'globe-outline' },
    { id: '3', name: 'IT & Management', icon: 'business-outline' },
    { id: '4', name: 'Special Programs', icon: 'trophy-outline' },
  ];

  const myCourses: Course[] = [
    { id: '1', title: 'React Native Masterclass', instructor: 'John Doe', category: 'mobile', duration: '15h 30m', progress: 75, isEnrolled: true, level: 'Intermediate', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400', lessons: 24 },
    { id: '2', title: 'Advanced TypeScript', instructor: 'Jane Smith', category: 'frontend', duration: '12h 45m', progress: 30, isEnrolled: true, level: 'Advanced', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', lessons: 18 },
    { id: '3', title: 'Node.js Backend Development', instructor: 'Mike Johnson', category: 'backend', duration: '20h 15m', progress: 10, isEnrolled: true, level: 'Intermediate', image: 'https://images.unsplash.com/photo-1625843687916-c6c5c8d7e4c3?w=400', lessons: 30 },
  ];

  const featuredCourses: Course[] = [
    { id: '4', title: 'Full Stack Web Development', instructor: 'Sarah Wilson', category: 'web', duration: '35h 20m', progress: 0, isEnrolled: false, level: 'Beginner', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', lessons: 45 },
    { id: '5', title: 'IT Project Management', instructor: 'Alex Brown', category: 'it', duration: '18h 30m', progress: 0, isEnrolled: false, level: 'Intermediate', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400', lessons: 22 },
    { id: '6', title: 'Software Engineering Fundamentals', instructor: 'Emily Davis', category: 'software', duration: '25h 45m', progress: 0, isEnrolled: false, level: 'Beginner', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400', lessons: 32 },
    { id: '7', title: 'Special Program: AI Bootcamp', instructor: 'Robert Wilson', category: 'special', duration: '40h 00m', progress: 0, isEnrolled: false, level: 'Advanced', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400', lessons: 50 },
    { id: '8', title: 'Database Design & Management', instructor: 'Lisa Anderson', category: 'it', duration: '14h 30m', progress: 0, isEnrolled: false, level: 'Intermediate', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400', lessons: 20 },
  ];

  const filteredCourses = selectedCategory 
    ? featuredCourses.filter(course => {
        const categoryMap: Record<string, string[]> = {
          'Software Development': ['software', 'backend', 'frontend', 'mobile'],
          'Web Development': ['web', 'frontend', 'backend'],
          'IT & Management': ['it', 'management'],
          'Special Programs': ['special'],
        };
        return categoryMap[selectedCategory]?.includes(course.category);
      })
    : featuredCourses;

  const renderCategoryCard = ({ item }: { item: Category }) => {
    const isSelected = selectedCategory === item.name;
    
    return (
      <TouchableOpacity 
        style={[styles.categoryCard, isSelected && styles.selectedCategoryCard]}
        onPress={() => setSelectedCategory(isSelected ? null : item.name)}
        activeOpacity={0.7}
      >
        <View style={styles.categoryContent}>
          <Text style={[styles.categoryName, isSelected && styles.selectedCategoryText]}>
            {item.name}
          </Text>
          <Text style={[styles.categoryCount, isSelected && styles.selectedCategoryCount]}>
            {filteredCourses.length} courses
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSeeAllMyCourses = () => {
    console.log('See All My Courses pressed');
    // Navigate to MyCourses screen or show all my courses
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
      

        {/* My Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Courses</Text>
            <TouchableOpacity onPress={handleSeeAllMyCourses}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {myCourses.map((course) => (
              <MyCourseCard key={course.id} course={course} />
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={handleClearFilter}>
              <Text style={styles.seeAllText}>
                {selectedCategory ? 'Clear Filter' : 'Browse All'}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.categoryRow}
            contentContainerStyle={styles.categoryListContent}
          />
        </View>

        {/* Featured / Filtered Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory ? `${selectedCategory} Courses` : 'Featured Courses'}
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>
                {filteredCourses.length} courses
              </Text>
            </TouchableOpacity>
          </View>
          {filteredCourses.length > 0 ? (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} horizontal />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.noCoursesContainer}>
              <Icon name="book-outline" size={48} color={Colors.gray} />
              <Text style={styles.noCoursesText}>No courses found for this category</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: Colors.background 
  },
  scrollView: { 
    flex: 1 
  },
  scrollViewContent: { 
    paddingBottom: 30 
  },
  
  section: { 
    marginBottom: 24, 
    marginTop: 20
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16,
    paddingHorizontal: 20 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: Colors.black 
  },
  seeAllText: { 
    color: Colors.secondary, 
    fontWeight: '500', 
    fontSize: 14 
  },
  categoryListContent: {
    paddingHorizontal: 20,
  },
  categoryRow: { 
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryCard: { 
    width: (width - 60) / 2,
    backgroundColor: Colors.white, 
    borderRadius: 16, 
    padding: 16,
    borderWidth: 1, 
    borderColor: Colors.lightGray, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 3, 
    elevation: 2,
    marginBottom: 12,
  },
  selectedCategoryCard: { 
    backgroundColor: Colors.primary, 
    borderColor: Colors.primary, 
    shadowColor: Colors.primary, 
    shadowOpacity: 0.2 
  },
  categoryContent: {
    alignItems: 'flex-start',
  },
  categoryName: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: Colors.black,
    marginBottom: 4,
  },
  selectedCategoryText: { 
    color: Colors.white 
  },
  categoryCount: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: '500',
  },
  selectedCategoryCount: {
    color: Colors.white,
    opacity: 0.9,
  },
  horizontalScrollContent: { 
    paddingHorizontal: 20,
    paddingRight: 20
  },
  horizontalCardMargin: {
    marginRight: CARD_MARGIN
  },
  myCourseCard: { 
    width: 280, 
    backgroundColor: Colors.white, 
    borderRadius: 16, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: Colors.lightGray, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  myCourseImageContainer: { 
    position: 'relative', 
    height: 140, 
    width: '100%' 
  },
  myCourseImage: { 
    width: '100%', 
    height: '100%' 
  },
  myCoursePlayButton: { 
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: [{ translateX: -28 }, { translateY: -28 }], 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  myCourseContent: { 
    padding: 16 
  },
  myCourseHeader: { 
    marginBottom: 12 
  },
  myCourseTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: Colors.black, 
    marginBottom: 4 
  },
  myCourseInstructor: { 
    fontSize: 14, 
    color: Colors.gray 
  },
  myCourseMeta: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  resumeButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: Colors.background, 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: Colors.primary 
  },
  resumeButtonText: { 
    color: Colors.primary, 
    fontSize: 12, 
    fontWeight: '600', 
    marginLeft: 4 
  },
  horizontalCourseCard: { 
    width: 280, 
    backgroundColor: Colors.white, 
    borderRadius: 16, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: Colors.lightGray, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 3, 
    elevation: 2 
  },
  verticalCourseCard: { 
    backgroundColor: Colors.white, 
    borderRadius: 16, 
    marginBottom: 16, 
    marginHorizontal: 20,
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: Colors.lightGray, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 3, 
    elevation: 2 
  },
  courseImageContainer: { 
    position: 'relative', 
    height: 160, 
    width: '100%' 
  },
  courseImage: { 
    width: '100%', 
    height: '100%' 
  },
  playButtonOverlay: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  playButton: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: Colors.primary, 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 5 
  },
  courseLevelBadge: { 
    position: 'absolute', 
    top: 12, 
    right: 12, 
    backgroundColor: Colors.white, 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 12, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2, 
    elevation: 2 
  },
  courseLevelText: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: Colors.black 
  },
  courseContent: { 
    padding: 16 
  },
  courseTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: Colors.black, 
    marginBottom: 4 
  },
  courseInstructor: { 
    fontSize: 14, 
    color: Colors.gray 
  },
  courseMeta: { 
    flexDirection: 'row', 
    marginTop: 8 
  },
  metaItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 16 
  },
  metaText: { 
    fontSize: 12, 
    color: Colors.gray, 
    marginLeft: 4 
  },
  enrollButton: { 
    marginTop: 12, 
    paddingVertical: 10, 
    borderRadius: 8, 
    backgroundColor: Colors.primary, 
    alignItems: 'center' 
  },
  enrollButtonText: { 
    color: Colors.white, 
    fontWeight: '600' 
  },
  continueButton: { 
    backgroundColor: Colors.white, 
    borderWidth: 1, 
    borderColor: Colors.primary 
  },
  continueButtonText: { 
    color: Colors.primary 
  },
  noCoursesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginHorizontal: 20,
  },
  noCoursesText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
  },
});

export default CoursesScreen;