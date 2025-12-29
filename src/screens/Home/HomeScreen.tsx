import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import CourseCard from '../../components/CourseCard';
import WebinarCard from '../../components/WebinarCard';
import BlogCard from '../../components/BlogCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';

type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

/* ✅ MOVED TO TOP-LEVEL SCOPE */
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  /* ✅ MUST BE INSIDE COMPONENT */
  const handleReferPress = () => {
    navigation.navigate('ReferEarnScreen');
     
  };

 

  const featuredCourses = [
    {
      id: '1',
      title: 'Python For Beginners',
      description:
        'Master Python programming from basics to advanced concepts',
      type: 'recorded' as const,
      thumbnail:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop',
      category: 'Inomobile (2.5x3)',
      level: 'Intermediate',
      duration: '25hrs',
    },
    {
      id: '2',
      title: 'Web Development Bootcamp',
      description:
        'Full-stack web development with React and Node.js',
      type: 'recorded' as const,
      thumbnail:
        'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop',
      category: 'Web Dev',
      level: 'Beginner',
      duration: '40hrs',
    },
    {
      id: '3',
      title: 'Data Science Fundamentals',
      description:
        'Learn data analysis and machine learning basics',
      type: 'recorded' as const,
      thumbnail:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      category: 'Data Science',
      level: 'Intermediate',
      duration: '30hrs',
    },
    {
      id: '4',
      title: 'Mobile App Development',
      description:
        'Build cross-platform apps with React Native',
      type: 'recorded' as const,
      thumbnail:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop',
      category: 'Mobile Dev',
      level: 'Advanced',
      duration: '35hrs',
    },
  ];

const webinars = [
  {
    id: '1',
    title: 'How Data Analytics Works',
    date: 'Sunday, 14 Dec, 2025',
    time: '6.00pm to 8.00pm',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
  },
  {
    id: '2',
    title: 'Enterprise Data Management',
    date: 'Friday, 5 Jan ,2025',
    time: '2.00pm to 4.00pm',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
  },
  {
    id: '3',
    title: 'Cloud Migration Strategies',
    date: 'Monday, 11 Jan, 2025',
    time: '11.00am to 12.00pm',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop',
  },
  {
    id: '4',
    title: 'AI in Business',
    date: 'Wednesday, 4 apr, 2025',
    time: '4.00pm to 5.30pm',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop',
  },
];


  const blogs = [
    {
      id: '1',
      title: 'Debugging Tips for Beginners',
      excerpt: 'Learn how to find and fix bugs faster',
      thumbnail:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
      author: 'Tech Guru',
      date: 'Mar 15, 2024',
      readTime: '5 min',
    },
    {
      id: '2',
      title: 'IDE Setup Guide',
      excerpt: 'Configure your development environment',
      thumbnail:
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop',
      author: 'Dev Expert',
      date: 'Mar 10, 2024',
      readTime: '7 min',
    },
    {
      id: '3',
      title: 'React Best Practices',
      excerpt: 'Write cleaner and more efficient React code',
      thumbnail:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
      author: 'React Pro',
      date: 'Mar 5, 2024',
      readTime: '8 min',
    },
    {
      id: '4',
      title: 'API Security Essentials',
      excerpt: 'Protect your APIs from common vulnerabilities',
      thumbnail:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop',
      author: 'Security Expert',
      date: 'Feb 28, 2024',
      readTime: '6 min',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
        
      
        </View>

        {/* MAIN BANNER */}
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
            }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Start Your Learning Journey</Text>
              <Text style={styles.bannerSubtitle}>
                Access free courses and enhance your skills
              </Text>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Explore Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      

        {/* FREE COURSES - Horizontal Scroll */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Free Courses</Text>
              <Text style={styles.sectionSubtitle}>Start learning for free today</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Icon name="chevron-forward" size={16} color={Colors.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {featuredCourses.map((course, index) => (
              <View 
                key={course.id} 
                style={[
                  styles.courseCardContainer,
                  index === 0 && styles.firstCard
                ]}
              >
                <CourseCard course={course} horizontal />
              </View>
            ))}
          </ScrollView>

          {/* FREE COURSES BANNER */}
          <View style={styles.courseBanner}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=300&fit=crop',
              }}
              style={styles.courseBannerImage}
              resizeMode="cover"
            />
            <View style={styles.courseBannerOverlay}>
              <View style={styles.courseBannerContent}>
                <View>
                  <Text style={styles.courseBannerTitle}>Explore Skill-Driven Courses</Text>
                  <Text style={styles.courseBannerText}>
                    Built around real workflows with expert guidance
                  </Text>
                </View>
                <TouchableOpacity style={styles.courseBannerButton}>
                  <Text style={styles.courseBannerButtonText}>Explore Courses</Text>
                  <Icon name="arrow-forward" size={16} color={Colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* WEBINARS - Horizontal Scroll */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Webinars</Text>
              <Text style={styles.sectionSubtitle}>Live interactive sessions</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>View All</Text>
              <Icon name="chevron-forward" size={16} color={Colors.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {webinars.map((webinar, index) => (
              <View 
                key={webinar.id} 
                style={[
                  styles.webinarCardContainer,
                  index === 0 && styles.firstCard
                ]}
              >
                <WebinarCard webinar={webinar} />
              </View>
            ))}
          </ScrollView>

          {/* WATCH PREVIOUS WEBINARS */}
          <TouchableOpacity style={styles.previousWebinarsContainer}>
            <View style={styles.previousWebinarsContent}>
              <Icon name="play-circle" size={24} color={Colors.secondary} />
              <View style={styles.previousWebinarsTextContainer}>
                <Text style={styles.previousWebinarsTitle}>Watch our previous webinars</Text>
                <Text style={styles.previousWebinarsSubtitle}>Access recorded sessions anytime</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={Colors.gray} />
            </View>
          </TouchableOpacity>

          {/* REFER & EARN */}
        <View style={styles.referBanner}>
          <Image
            source={require('../../images/banner/earn.jpg')}
            style={styles.referBannerImage}
          />
          <View style={styles.referBannerOverlay}>
            <View style={styles.referBannerContent}>
              <Text style={styles.referTitle}>Refer & Earn</Text>
              <Text style={styles.referSubtitle}>
                Invite friends and earn exciting rewards
              </Text>

              <TouchableOpacity
                style={styles.referButton}
                onPress={handleReferPress}
              >
                <Text style={styles.referButtonText}>Refer Now</Text>
                <Icon
                  name="arrow-forward"
                  size={16}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </View>

        {/* BLOGS - Horizontal Scroll */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Blogs</Text>
              <Text style={styles.sectionSubtitle}>Tips, tutorials & insights</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Read All</Text>
              <Icon name="chevron-forward" size={16} color={Colors.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {blogs.map((blog, index) => (
              <View 
                key={blog.id} 
                style={[
                  styles.blogCardContainer,
                  index === 0 && styles.firstCard
                ]}
              >
                <BlogCard blog={blog} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
  },
  subGreeting: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* MAIN BANNER */
  bannerContainer: {
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 24,
    overflow: 'hidden',
    height: 200,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 24,
    justifyContent: 'center',
  },
  bannerContent: {
    maxWidth: '70%',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 8,
    lineHeight: 28,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  primaryButtonText: {
    color: Colors.primary || '#667eea',
    fontWeight: '600',
    fontSize: 14,
  },

  /* QUICK STATS */
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 8,
  },

  /* SECTIONS */
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.black,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
  },
  
  /* Horizontal Scroll Content */
  horizontalScrollContent: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  
  /* Course Card Container */
  courseCardContainer: {
    width: CARD_WIDTH,
    marginRight: 16,
  },
  
  /* Webinar Card Container */
  webinarCardContainer: {
    width: CARD_WIDTH,
    marginRight: 16,
  },
  
  /* Blog Card Container */
  blogCardContainer: {
    width: CARD_WIDTH,
    marginRight: 16,
  },
  
  /* First card in scroll view */
  firstCard: {
    marginLeft: 0,
  },

  /* FREE COURSE BANNER */
  courseBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    height: 180,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  courseBannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  courseBannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 24,
    justifyContent: 'center',
  },
  courseBannerContent: {
    gap: 20,
  },
  courseBannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 6,
  },
  courseBannerText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  courseBannerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  courseBannerButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },

  /* PREVIOUS WEBINARS */
  previousWebinarsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  previousWebinarsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  previousWebinarsTextContainer: {
    flex: 1,
    
  },
  previousWebinarsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  previousWebinarsSubtitle: {
    fontSize: 14,
    color: Colors.gray,
  },

  /* REFER & EARN */
  referBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    height: 200,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  referBannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  referBannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(103, 103, 103, 0.5)',
    padding: 24,
    justifyContent: 'center',
  },
  referBannerContent: {
    gap: 20,
  },
  referIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  referTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 6,
  },
  referSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  referButton: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
  referButtonText: {
    color: Colors.primary || '#667eea',
    fontWeight: '600',
    fontSize: 14,
  },
});