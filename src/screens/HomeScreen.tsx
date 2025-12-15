// screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
 
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import CourseCard from '../components/CourseCard';
import WebinarCard from '../components/WebinarCard';
import BlogCard from '../components/BlogCard';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const featuredCourses = [
    { 
      id: '1', 
      title: 'Python for Beginners', 
      description: 'Start your programming journey with Python basics', 
      type: 'recorded' as const, 
      thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec7?w=400&h=225&fit=crop' 
    },
    { 
      id: '2', 
      title: 'Excel Mastery', 
      description: 'Advanced Excel techniques for professionals', 
      type: 'recorded' as const, 
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop' 
    },
    { 
      id: '3', 
      title: 'Web Development', 
      description: 'Full stack web development course', 
      type: 'recorded' as const, 
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w-400&h=225&fit=crop' 
    },
  ];

  const webinars = [
    { 
      id: '1', 
      title: 'Navigate Analytics', 
      date: 'Tomorrow, 3 PM',
      speaker: 'Alex Johnson',
      duration: '1.5 hours'
    },
    { 
      id: '2', 
      title: 'Enterprise Data Management', 
      date: 'Friday, 2 PM',
      speaker: 'Sarah Williams',
      duration: '2 hours'
    },
  ];

  const blogs = [
    { 
      id: '1', 
      title: 'Debugging Tips for Beginners', 
      excerpt: 'Learn how to find and fix bugs faster in your code',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
      author: 'Tech Guru',
      date: 'Mar 15, 2024',
      readTime: '5 min'
    },
    { 
      id: '2', 
      title: 'IDE Setup Guide', 
      excerpt: 'Configure your development environment for maximum productivity',
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop',
      author: 'Dev Expert',
      date: 'Mar 10, 2024',
      readTime: '7 min'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image 
            source={require('../images/logo/velearn-logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <View style={styles.authButtons}>
            {!isLoggedIn ? (
              <>
                <TouchableOpacity 
                  style={styles.loginButton}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.signupButton}
                  onPress={() => navigation.navigate('Signup')}
                >
                  <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.welcomeText}>Welcome!</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Banner with Image */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop' }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Start Your Learning Journey</Text>
            <Text style={styles.bannerSubtitle}>Access free courses and enhance your skills</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Free Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Free Courses</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coursesScroll}
          >
            {featuredCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                horizontal 
              />
            ))}
          </ScrollView>
        </View>

        {/* Explore Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Courses</Text>
          </View>
          <TouchableOpacity style={styles.exploreCard}>
            <View style={styles.exploreCardContent}>
              <View style={styles.exploreTextContainer}>
                <Text style={styles.exploreTitle}>Discover 100+ Courses</Text>
                <Text style={styles.exploreDescription}>
                  Programming, Data Science, Business, and more
                </Text>
              </View>
              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>Browse All →</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Webinars */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Webinars</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {webinars.map((webinar) => (
            <WebinarCard key={webinar.id} webinar={webinar} />
          ))}
          <TouchableOpacity style={styles.webinarLink}>
            <Text style={styles.linkText}>Watch previous webinars →</Text>
          </TouchableOpacity>
        </View>

        {/* Refer & Earn */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.referCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=200&fit=crop' }}
              style={styles.referBackground}
              resizeMode="cover"
            />
            <View style={styles.referOverlay}>
              <View style={styles.referContent}>
                <Text style={styles.referTitle}>Refer & Earn</Text>
                <Text style={styles.referDescription}>
                  Refer 4 friends and earn exciting rewards
                </Text>
                <TouchableOpacity style={styles.referButton}>
                  <Text style={styles.referButtonText}>Invite Friends</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.referBadge}>
                <Text style={styles.referBadgeText}>₹500</Text>
                <Text style={styles.referBadgeLabel}>per referral</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Blogs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Blogs</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Read All</Text>
            </TouchableOpacity>
          </View>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </View>

        {/* Footer Space */}
        <View style={styles.footerSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  logo: {
    width: 100,
    height: 32,
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#495057',
  },
  signupButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#002e6e',
    borderRadius: 8,
  },
  signupButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  profileButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  welcomeText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#495057',
  },
  bannerContainer: {
    position: 'relative',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bannerButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 25,
  },
  bannerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
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
    color: '#212529',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#00b9f1',
  },
  coursesScroll: {
    paddingRight: 16,
  },
  exploreCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  exploreCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exploreTextContainer: {
    flex: 1,
  },
  exploreTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  exploreDescription: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
  },
  exploreButton: {
    backgroundColor: '#002e6e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  webinarLink: {
    marginTop: 12,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  referCard: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    height: 140,
  },
  referBackground: {
    width: '100%',
    height: '100%',
  },
  referOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 149, 0, 0.9)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  referContent: {
    flex: 1,
  },
  referTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  referDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  referButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  referButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9500',
  },
  referBadge: {
    alignItems: 'center',
    marginLeft: 16,
  },
  referBadgeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  referBadgeLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  footerSpace: {
    height: 20,
  },
});