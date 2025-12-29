import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';

// Local Images
const courseImages = {
  react_native: require('../../src/images/web-d.jpg'),
  full_stack: require('../../src/images/me-l.jpg'),
  python_ds: require('../../src/images/react-master.jpg'),
  ml_basics: require('../../src/images/mobile-app-design.jpg'),
};

const OnlineCoursesScreen = ({ navigation }: any) => {
  const categories = [
    { id: 1, name: 'Web Development', icon: 'globe' },
    { id: 2, name: 'Mobile Apps', icon: 'phone-portrait' },
    { id: 3, name: 'Data Science', icon: 'bar-chart' },
    { id: 4, name: 'AI/ML', icon: 'hardware-chip' },
  ];

  const courses = [
    {
      id: 1,
      title: 'React Native Masterclass',
      instructor: 'John Doe',
      rating: 4.8,
      students: '2.5k',
      duration: '12 hours',
      price: '₹1,999',
      category: 'Mobile Apps',
      thumbnail: courseImages.react_native,
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      instructor: 'Jane Smith',
      rating: 4.9,
      students: '5.2k',
      duration: '48 hours',
      price: '₹3,999',
      category: 'Web Development',
      thumbnail: courseImages.full_stack,
    },
    {
      id: 3,
      title: 'Python for Data Science',
      instructor: 'Alex Johnson',
      rating: 4.7,
      students: '3.8k',
      duration: '30 hours',
      price: '₹2,499',
      category: 'Data Science',
      thumbnail: courseImages.python_ds,
    },
    {
      id: 4,
      title: 'Machine Learning Basics',
      instructor: 'Sarah Wilson',
      rating: 4.6,
      students: '1.9k',
      duration: '20 hours',
      price: '₹2,999',
      category: 'AI/ML',
      thumbnail: courseImages.ml_basics,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Online Courses</Text>
          <Text style={styles.headerSubtitle}>Learn from industry experts</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryIconContainer}>
                <Icon name={category.icon} size={30} color={Colors.primary} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Courses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Courses</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {courses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            
            <Image 
              source={course.thumbnail}
              style={styles.courseImage}
            />

            <View style={styles.courseContent}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseInstructor}>By {course.instructor}</Text>
              
              <View style={styles.courseMeta}>
                <View style={styles.metaItem}>
                  <Icon name="star" size={16} color={Colors.warning} />
                  <Text style={styles.metaText}>{course.rating}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="people" size={16} color={Colors.gray} />
                  <Text style={styles.metaText}>{course.students}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="time" size={16} color={Colors.gray} />
                  <Text style={styles.metaText}>{course.duration}</Text>
                </View>
              </View>
              
              <View style={styles.courseFooter}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{course.category}</Text>
                </View>
                <View style={styles.footerRight}>
                  <Text style={styles.coursePrice}>{course.price}</Text>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startButtonText}>Start Learning</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </TouchableOpacity>
        ))}
      </View>

      {/* Recommended Courses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended For You</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.recommendedContainer}
        >
          {courses.slice(0, 2).map((course) => (
            <TouchableOpacity key={course.id} style={styles.recommendedCard}>
              
              <Image 
                source={course.thumbnail}
                style={styles.recommendedImage}
              />

              <View style={styles.recommendedContent}>
                <Text style={styles.recommendedTitle}>{course.title}</Text>
                <Text style={styles.recommendedInstructor}>{course.instructor}</Text>
                <View style={styles.recommendedFooter}>
                  <Text style={styles.recommendedPrice}>{course.price}</Text>
                  <TouchableOpacity style={styles.recommendedStartButton}>
                    <Text style={styles.recommendedStartButtonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </TouchableOpacity>
          ))}
        </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  searchButton: {
    padding: 10,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '600',
  },
  categoriesContainer: {
    marginTop: 10,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  categoryName: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  courseCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  courseImage: {
    width: '100%',
    height: 150,
  },
  courseContent: {
    padding: 15,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  courseInstructor: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 10,
  },
  courseMeta: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    marginLeft: 5,
    fontSize: 14,
    color: Colors.gray,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Changed from 'center' to 'flex-start' for better alignment
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  categoryBadge: {
    backgroundColor: Colors.secondary + '20',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 5, // Added for better vertical alignment
  },
  categoryBadgeText: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '600',
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8, // Added space between price and button
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  recommendedContainer: {
    marginTop: 10,
  },
  recommendedCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    width: 250,
    marginRight: 15,
    elevation: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  recommendedImage: {
    width: '100%',
    height: 120,
  },
  recommendedContent: {
    padding: 15,
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  recommendedInstructor: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 10,
  },
  recommendedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  recommendedStartButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  recommendedStartButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 12,
  },
});

export default OnlineCoursesScreen;