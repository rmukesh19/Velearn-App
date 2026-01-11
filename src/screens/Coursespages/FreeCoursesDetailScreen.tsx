import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  Share,
  Platform,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../theme/colors';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  CourseDetail: { courseId: string };
};

type CourseDetailRouteProp = RouteProp<RootStackParamList, 'CourseDetail'>;

interface CourseDetail {
  id: string;
  title: string;
  category: string;
  instructor: string;
  instructorTitle: string;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  thumbnail: string;
  tags: string[];
  description: string;
  instructorAvatar: string;
  instructorBio: string;
  whatYouLearn: string[];
  syllabus: { title: string; topics: string[]; duration: string }[];
  prerequisites: string[];
  isCertificateAvailable: boolean;
  language: string;
  lastUpdated: string;
  price: { original: number; discounted: number };
  reviewsCount: number;
}

const FreeCoursesDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<CourseDetailRouteProp>();
  const insets = useSafeAreaInsets();
  const { courseId } = route.params;

  // Mock course data
  const course: CourseDetail = {
    id: courseId,
    title: 'Full Stack Development with MERN',
    category: 'Web Development',
    instructor: 'Sanjay Kumar',
    instructorTitle: 'Full Stack Developer & Instructor',
    rating: 4.7,
    students: 38500,
    duration: '45 hours',
    lessons: 180,
    level: 'Beginner to Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
    tags: ['MERN Stack', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Projects'],
    description: 'Master Full Stack Development with hands-on projects. Learn MongoDB, Express.js, React.js, and Node.js to build modern web applications. Get job-ready with real-world projects.',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    instructorBio: '10+ years of industry experience. Trained 50,000+ students. Former Lead Developer at Amazon.',
    whatYouLearn: [
      'Build complete MERN stack applications',
      'Master React with hooks and context API',
      'Implement REST APIs with Node.js & Express',
      'Database design with MongoDB',
      'Authentication & Authorization',
      'Deployment on cloud platforms',
      'Industry best practices & coding standards'
    ],
    syllabus: [
      { 
        title: 'HTML, CSS & JavaScript Fundamentals', 
        topics: ['HTML5 Semantic Elements', 'CSS Flexbox & Grid', 'Modern JavaScript ES6+'], 
        duration: '8 hours' 
      },
      { 
        title: 'React.js Deep Dive', 
        topics: ['Components & Props', 'State Management', 'Hooks & Context API'], 
        duration: '12 hours' 
      },
      { 
        title: 'Node.js & Express.js', 
        topics: ['Server Setup', 'REST API Development', 'Middleware & Authentication'], 
        duration: '10 hours' 
      },
      { 
        title: 'MongoDB & Mongoose', 
        topics: ['Database Design', 'CRUD Operations', 'Data Modeling'], 
        duration: '8 hours' 
      },
      { 
        title: 'Capstone Project', 
        topics: ['E-commerce Application', 'Real-time Features', 'Deployment'], 
        duration: '7 hours' 
      }
    ],
    prerequisites: [
      'Basic computer knowledge',
      'No prior programming experience required',
      'Dedication to learn and practice'
    ],
    isCertificateAvailable: true,
    language: 'English & தமிழ்',
    lastUpdated: 'December 2023',
    price: { original: 9999, discounted: 0 },
    reviewsCount: 2450
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this free course on GUVI: ${course.title}`,
        url: 'https://guvi.in/courses/' + course.id,
        title: course.title
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleEnroll = () => {
    alert(`Successfully enrolled in "${course.title}"! Start learning now.`);
  };

  const handleStartLearning = () => {
    alert('Starting course... Redirecting to first lesson.');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Icon key={i} name="star" size={16} color="#FFD700" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Icon key={i} name="star-half" size={16} color="#FFD700" />);
      } else {
        stars.push(<Icon key={i} name="star-outline" size={16} color="#FFD700" />);
      }
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      
      {/* Modern Header with Gradient */}
      <LinearGradient
        colors={['rgba(30, 58, 138, 0.95)', 'rgba(30, 58, 138, 0.85)']}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Course Details</Text>
          
          <View style={styles.headerRightActions}>
            <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
              <Icon name="share-outline" size={22} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="bookmark-outline" size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.thumbnailOverlay}
          />
          
          <View style={styles.heroContent}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{course.category}</Text>
            </View>
            
            <Text style={styles.courseTitle}>{course.title}</Text>
            
            <View style={styles.ratingContainer}>
              <View style={styles.ratingStars}>
                {renderStars(course.rating)}
                <Text style={styles.ratingText}>{course.rating}</Text>
              </View>
              <Text style={styles.reviewsText}>({course.reviewsCount.toLocaleString()} reviews)</Text>
            </View>
          </View>
          
          {course.isCertificateAvailable && (
            <View style={styles.certificateBadge}>
              <IconMaterial name="verified" size={16} color={Colors.white} />
              <Text style={styles.certificateText}>Certificate Included</Text>
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Course Highlights */}
          <View style={styles.highlightsCard}>
            <View style={styles.highlightItem}>
              <Icon name="people" size={22} color={Colors.primary} />
              <View>
                <Text style={styles.highlightValue}>{course.students.toLocaleString()}+</Text>
                <Text style={styles.highlightLabel}>Students</Text>
              </View>
            </View>
            
            <View style={styles.highlightDivider} />
            
            <View style={styles.highlightItem}>
              <Icon name="time" size={22} color={Colors.primary} />
              <View>
                <Text style={styles.highlightValue}>{course.duration}</Text>
                <Text style={styles.highlightLabel}>Duration</Text>
              </View>
            </View>
            
            <View style={styles.highlightDivider} />
            
            <View style={styles.highlightItem}>
              <Icon name="play-circle" size={22} color={Colors.primary} />
              <View>
                <Text style={styles.highlightValue}>{course.lessons}</Text>
                <Text style={styles.highlightLabel}>Lessons</Text>
              </View>
            </View>
            
            <View style={styles.highlightDivider} />
            
            <View style={styles.highlightItem}>
              <Icon name="trending-up" size={22} color={Colors.primary} />
              <View>
                <Text style={styles.highlightValue}>{course.level}</Text>
                <Text style={styles.highlightLabel}>Level</Text>
              </View>
            </View>
          </View>
          
          {/* Instructor Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructor</Text>
            <View style={styles.instructorCard}>
              <Image 
                source={{ uri: course.instructorAvatar }} 
                style={styles.instructorAvatar} 
              />
              <View style={styles.instructorDetails}>
                <Text style={styles.instructorName}>{course.instructor}</Text>
                <Text style={styles.instructorTitle}>{course.instructorTitle}</Text>
                <View style={styles.instructorStats}>
                  <View style={styles.instructorStat}>
                    <Icon name="star" size={14} color="#FFD700" />
                    <Text style={styles.instructorStatText}>4.8 Rating</Text>
                  </View>
                  <View style={styles.instructorStat}>
                    <Icon name="people" size={14} color={Colors.primary} />
                    <Text style={styles.instructorStatText}>50K+ Students</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.instructorBio}>{course.instructorBio}</Text>
          </View>
          
          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About This Course</Text>
            <Text style={styles.description}>{course.description}</Text>
          </View>
          
          {/* What You'll Learn */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>What You'll Learn</Text>
            </View>
            <View style={styles.learnGrid}>
              {course.whatYouLearn.map((item, index) => (
                <View key={index} style={styles.learnCard}>
                  <Icon name="checkmark-circle" size={20} color={Colors.success} />
                  <Text style={styles.learnText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Course Curriculum */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Course Curriculum</Text>
              <View style={styles.totalDurationBadge}>
                <Icon name="time-outline" size={14} color={Colors.white} />
                <Text style={styles.totalDuration}>{course.duration}</Text>
              </View>
            </View>
            
            {course.syllabus.map((module, index) => (
              <View key={index} style={styles.moduleCard}>
                <View style={styles.moduleHeader}>
                  <View style={styles.moduleIndexContainer}>
                    <Text style={styles.moduleIndex}>{index + 1}</Text>
                  </View>
                  <View style={styles.moduleContent}>
                    <Text style={styles.moduleTitle}>{module.title}</Text>
                    <View style={styles.moduleTopics}>
                      {module.topics.slice(0, 2).map((topic, topicIndex) => (
                        <Text key={topicIndex} style={styles.moduleTopicText}>
                          • {topic}
                        </Text>
                      ))}
                      {module.topics.length > 2 && (
                        <Text style={styles.moreTopics}>
                          +{module.topics.length - 2} more topics
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.moduleDurationBadge}>
                    <Text style={styles.moduleDurationText}>{module.duration}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          
          {/* Prerequisites */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prerequisites</Text>
            <View style={styles.prerequisitesGrid}>
              {course.prerequisites.map((item, index) => (
                <View key={index} style={styles.prerequisiteCard}>
                  <Icon name="checkmark-done" size={18} color={Colors.primary} />
                  <Text style={styles.prerequisiteText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Course Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Course Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Icon name="language" size={20} color={Colors.primary} />
                <Text style={styles.detailLabel}>Language</Text>
                <Text style={styles.detailValue}>{course.language}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Icon name="calendar" size={20} color={Colors.primary} />
                <Text style={styles.detailLabel}>Updated</Text>
                <Text style={styles.detailValue}>{course.lastUpdated}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Icon name="school" size={20} color={Colors.primary} />
                <Text style={styles.detailLabel}>Level</Text>
                <Text style={styles.detailValue}>{course.level}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Icon name="ribbon" size={20} color={Colors.primary} />
                <Text style={styles.detailLabel}>Certificate</Text>
                <Text style={styles.detailValue}>
                  {course.isCertificateAvailable ? 'Yes' : 'No'}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Tags */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {course.tags.map((tag, index) => (
                <TouchableOpacity key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Fixed Action Button */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)']}
        style={[styles.footer, { paddingBottom: insets.bottom }]}
      >
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.priceLabel}>PRICE</Text>
            <View style={styles.priceRow}>
              <Text style={styles.originalPrice}>₹{course.price.original.toLocaleString()}</Text>
              <Text style={styles.discountedPrice}>FREE</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.enrollButton} 
            onPress={handleEnroll}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[Colors.primary, '#3B82F6']}
              style={styles.enrollButtonGradient}
            >
              <Icon name="rocket" size={22} color={Colors.white} />
              <Text style={styles.enrollButtonText}>Enroll Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  headerRightActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    height: 300,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    backdropFilter: 'blur(10px)',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  courseTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    marginTop: 12,
    marginBottom: 8,
    lineHeight: 34,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  certificateBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  certificateText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 20,
  },
  highlightsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginTop: -40,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  highlightItem: {
    alignItems: 'center',
    flex: 1,
  },
  highlightValue: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.black,
    marginTop: 8,
  },
  highlightLabel: {
    fontSize: 11,
    color: Colors.gray,
    fontWeight: '500',
    marginTop: 2,
  },
  highlightDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.lightGray,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.black,
    letterSpacing: -0.5,
  },
  totalDurationBadge: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  totalDuration: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '700',
  },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  instructorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  instructorDetails: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 8,
  },
  instructorStats: {
    flexDirection: 'row',
    gap: 12,
  },
  instructorStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  instructorStatText: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: '500',
  },
  instructorBio: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 22,
  },
  description: {
    fontSize: 15,
    color: Colors.gray,
    lineHeight: 24,
  },
  learnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  learnCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: '48%',
    marginBottom: 12,
    gap: 12,
  },
  learnText: {
    flex: 1,
    fontSize: 13,
    color: Colors.gray,
    lineHeight: 18,
  },
  moduleCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray + '30',
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  moduleIndexContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleIndex: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 6,
  },
  moduleTopics: {
    gap: 2,
  },
  moduleTopicText: {
    fontSize: 13,
    color: Colors.gray,
  },
  moreTopics: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
    marginTop: 2,
  },
  moduleDurationBadge: {
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  moduleDurationText: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: '600',
  },
  prerequisitesGrid: {
    gap: 12,
  },
  prerequisiteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  prerequisiteText: {
    flex: 1,
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailItem: {
    width: '48%',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '700',
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: Colors.primary + '10',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray + '30',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 11,
    color: Colors.gray,
    fontWeight: '600',
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.gray,
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  discountedPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.success,
  },
  enrollButton: {
    flex: 1,
    marginLeft: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  enrollButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  enrollButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FreeCoursesDetailScreen;