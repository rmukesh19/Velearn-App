import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Dimensions,
  PixelRatio,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Dimensions for responsive scaling
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375;
const normalize = (size) => {
  const newSize = size * scale;
  return Platform.OS === 'ios'
    ? Math.round(PixelRatio.roundToNearestPixel(newSize))
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

// Colors
export const Colors = {
  primary: '#002e6e',
  secondary: '#00b9f1',
  background: '#f5f5f5',
  white: '#ffffff',
  black: '#000000',
  gray: '#808080',
  lightGray: '#d3d3d3',
  success: '#4CAF50',
  error: '#f44336',
  warning: '#ff9800',
};

// Helper to create transparent colors
const getTransparentColor = (color, opacity = 0.2) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// ------------------- Courses Screen -------------------
const CoursesScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses', icon: 'grid' },
    { id: 'ai-ml', name: 'AI/ML', icon: 'brain' },
    { id: 'machine-learning', name: 'Machine Learning', icon: 'analytics' },
    { id: 'computer-science', name: 'CS Fundamentals', icon: 'laptop' },
    { id: 'web', name: 'Web Dev', icon: 'globe' },
    { id: 'mobile', name: 'Mobile', icon: 'phone-portrait' },
    { id: 'ds', name: 'Data Science', icon: 'bar-chart' },
    { id: 'cloud', name: 'Cloud', icon: 'cloud' },
  ];

  const categoryCourses = {
    'ai-ml': [
      {
        id: 1,
        title: 'Introduction to Artificial Intelligence',
        category: 'ai-ml',
        description: 'Learn the fundamentals of AI and intelligent systems',
        progress: 30,
        lessons: 20,
        duration: '15 hours',
        instructor: 'Dr. Sarah Chen',
        color: Colors.primary,
        icon: 'brain',
        level: 'Beginner',
        rating: 4.8,
        enrolled: 12450,
      },
      {
        id: 2,
        title: 'Deep Learning Fundamentals',
        category: 'ai-ml',
        description: 'Master neural networks and deep learning concepts',
        progress: 15,
        lessons: 28,
        duration: '22 hours',
        instructor: 'Prof. Alex Kumar',
        color: Colors.secondary,
        icon: 'layers',
        level: 'Intermediate',
        rating: 4.9,
        enrolled: 8950,
      },
    ],
    'machine-learning': [
      {
        id: 3,
        title: 'Machine Learning A-Z',
        category: 'machine-learning',
        description: 'Complete guide to ML algorithms and implementation',
        progress: 25,
        lessons: 36,
        duration: '30 hours',
        instructor: 'Alex Kumar',
        color: Colors.primary,
        icon: 'analytics',
        level: 'Beginner',
        rating: 4.8,
        enrolled: 18430,
      },
      {
        id: 4,
        title: 'Supervised Learning',
        category: 'machine-learning',
        description: 'Master regression, classification and prediction models',
        progress: 0,
        lessons: 22,
        duration: '16 hours',
        instructor: 'Dr. James Wilson',
        color: Colors.secondary,
        icon: 'trending-up',
        level: 'Intermediate',
        rating: 4.6,
        enrolled: 7230,
      },
    ],
    'computer-science': [
      {
        id: 5,
        title: 'Data Structures & Algorithms',
        category: 'computer-science',
        description: 'Essential algorithms and structures for interviews',
        progress: 85,
        lessons: 20,
        duration: '15 hours',
        instructor: 'Kevin Patel',
        color: Colors.primary,
        icon: 'code-working',
        level: 'Intermediate',
        rating: 4.9,
        enrolled: 25480,
      },
      {
        id: 6,
        title: 'Computer Architecture',
        category: 'computer-science',
        description: 'Understanding how computers work at hardware level',
        progress: 40,
        lessons: 26,
        duration: '20 hours',
        instructor: 'Prof. Robert Brown',
        color: Colors.secondary,
        icon: 'hardware-chip',
        level: 'Advanced',
        rating: 4.7,
        enrolled: 3450,
      },
    ],
    'web': [
      {
        id: 7,
        title: 'JavaScript ES6+',
        category: 'web',
        description: 'Modern JavaScript features',
        progress: 90,
        lessons: 18,
        duration: '12 hours',
        instructor: 'Mike Johnson',
        color: Colors.primary,
        icon: 'logo-javascript',
        level: 'Beginner',
        rating: 4.7,
        enrolled: 18750,
      },
    ],
    'mobile': [
      {
        id: 8,
        title: 'React Native Mobile Development',
        category: 'mobile',
        description: 'Build cross-platform mobile apps',
        progress: 75,
        lessons: 24,
        duration: '18 hours',
        instructor: 'David Lee',
        color: Colors.secondary,
        icon: 'logo-react',
        level: 'Intermediate',
        rating: 4.8,
        enrolled: 15680,
      },
    ],
    'ds': [],
    'cloud': [],
  };

  const allCourses = Object.values(categoryCourses).flat();

  const getFilteredSubjects = () => {
    const courses = activeCategory === 'all' ? allCourses : categoryCourses[activeCategory] || [];
    if (!searchQuery.trim()) return courses;
    const query = searchQuery.toLowerCase().trim();
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query)
    );
  };

  const filteredSubjects = getFilteredSubjects();

  const navigateToCourseDetails = (course) => {
    navigation.navigate('CourseDetails', { course });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
        <Text style={styles.headerSubtitle}>Master your skills</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: normalize(30) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={normalize(20)} color={Colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            placeholderTextColor={Colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={normalize(20)} color={Colors.gray} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: normalize(20), paddingVertical: 10 }}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryButton,
                activeCategory === cat.id && styles.categoryButtonActive,
              ]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Icon
                name={cat.icon}
                size={normalize(20)}
                color={activeCategory === cat.id ? Colors.white : Colors.primary}
              />
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === cat.id && { color: Colors.white },
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Courses */}
        <View style={styles.subjectsSection}>
          {filteredSubjects.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="search" size={60} color={Colors.lightGray} />
              <Text style={styles.emptyStateText}>No courses found</Text>
            </View>
          ) : (
            filteredSubjects.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.subjectCard}
                onPress={() => navigateToCourseDetails(course)}
              >
                <View style={[styles.subjectIconContainer, { backgroundColor: getTransparentColor(course.color, 0.2) }]}>
                  <Icon name={course.icon} size={normalize(28)} color={course.color} />
                </View>
                <View style={styles.subjectContent}>
                  <Text style={styles.subjectTitle}>{course.title}</Text>
                  <Text style={styles.subjectDescription} numberOfLines={1}>
                    {course.description}
                  </Text>
                </View>
                <TouchableOpacity style={styles.continueButton} onPress={() => navigateToCourseDetails(course)}>
                  <Icon name={course.progress === 100 ? "checkmark-circle" : "play-circle"} size={normalize(26)} color={course.progress === 100 ? Colors.success : course.color} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ------------------- Course Details Screen -------------------
const CourseDetailsScreen = ({ route, navigation }) => {
  const { course } = route.params;

  const modules = [
    { id: 1, title: 'Introduction to Course', duration: '45 min', completed: true },
    { id: 2, title: 'Basic Concepts', duration: '1.5 hours', completed: true },
    { id: 3, title: 'Advanced Topics', duration: '2 hours', completed: course.progress > 50 },
    { id: 4, title: 'Practical Exercises', duration: '3 hours', completed: false },
    { id: 5, title: 'Final Project', duration: '4 hours', completed: false },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={course.color} barStyle="light-content" />
      <View style={[styles.detailsHeader, { backgroundColor: course.color }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={normalize(24)} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.detailsHeaderTitle}>Course Details</Text>
        <TouchableOpacity>
          <Icon name="bookmark" size={normalize(24)} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.detailsContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.courseHero, { backgroundColor: getTransparentColor(course.color, 0.2) }]}>
          <View style={[styles.courseIconLarge, { backgroundColor: course.color }]}>
            <Icon name={course.icon} size={normalize(40)} color={Colors.white} />
          </View>
          <Text style={styles.courseTitleLarge}>{course.title}</Text>
          <Text style={styles.courseInstructor}>By {course.instructor}</Text>
        </View>

        {/* Modules */}
        <View style={styles.modulesSection}>
          {modules.map((module) => (
            <TouchableOpacity key={module.id} style={styles.moduleCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name={module.completed ? "checkmark-circle" : "ellipse-outline"} size={normalize(24)} color={module.completed ? Colors.success : Colors.lightGray} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleDuration}>{module.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ------------------- Styles -------------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(20),
    paddingBottom: normalize(10),
    backgroundColor: Colors.primary,
  },
  headerTitle: { fontSize: normalize(26), fontWeight: 'bold', color: Colors.white },
  headerSubtitle: { fontSize: normalize(15), color: Colors.secondary, marginTop: normalize(3) },

  content: { flex: 1 },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: normalize(20),
    marginTop: normalize(20),
    borderRadius: normalize(15),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
    elevation: 3,
  },
  searchInput: { flex: 1, fontSize: normalize(16), color: Colors.primary, marginLeft: normalize(10) },

  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: normalize(25),
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    marginRight: normalize(12),
  },
  categoryButtonActive: { backgroundColor: Colors.primary },
  categoryText: { fontSize: normalize(14), fontWeight: '600', color: Colors.primary, marginLeft: normalize(6) },

  subjectsSection: { paddingHorizontal: normalize(20), paddingTop: normalize(10) },

  subjectCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: normalize(15),
    padding: normalize(16),
    marginBottom: normalize(15),
    alignItems: 'center',
    elevation: 2,
  },
  subjectIconContainer: {
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(28),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(15),
  },
  subjectContent: { flex: 1 },
  subjectTitle: { fontSize: normalize(16), fontWeight: 'bold', color: Colors.primary },
  subjectDescription: { fontSize: normalize(14), color: Colors.gray, marginTop: normalize(4) },
  continueButton: { marginLeft: normalize(8) },

  emptyState: { alignItems: 'center', paddingVertical: normalize(50) },
  emptyStateText: { fontSize: normalize(18), fontWeight: '600', color: Colors.primary },

  // Course Details
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
  },
  detailsHeaderTitle: { fontSize: normalize(18), fontWeight: 'bold', color: Colors.white },

  detailsContent: { flex: 1 },

  courseHero: { padding: normalize(25), alignItems: 'center' },
  courseIconLarge: { width: normalize(80), height: normalize(80), borderRadius: normalize(40), justifyContent: 'center', alignItems: 'center', marginBottom: normalize(16) },
  courseTitleLarge: { fontSize: normalize(24), fontWeight: 'bold', color: Colors.primary, textAlign: 'center', marginBottom: normalize(8) },
  courseInstructor: { fontSize: normalize(16), color: Colors.gray },

  modulesSection: { paddingHorizontal: normalize(20), paddingVertical: normalize(10) },
  moduleCard: { backgroundColor: Colors.white, borderRadius: normalize(12), padding: normalize(16), marginBottom: normalize(10) },
  moduleTitle: { fontSize: normalize(16), fontWeight: '600', color: Colors.primary },
  moduleDuration: { fontSize: normalize(14), color: Colors.gray, marginTop: 2 },
});

// Export
export default CoursesScreen;
export { CoursesScreen, CourseDetailsScreen };
