// screens/VisitWebsiteScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH >= 768;
const isSmallDevice = SCREEN_WIDTH < 375;

const VisitWebsiteScreen: React.FC = () => {
  const websiteLinks = [
    {
      id: '1',
      title: 'Main Website',
      url: 'https://velearn.com',
      description: 'Visit our official website',
      icon: 'globe-outline',
      color: Colors.primary,
    },
    {
      id: '2',
      title: 'Course Catalog',
      url: 'https://velearn.com/courses',
      description: 'Browse all available courses',
      icon: 'library-outline',
      color: Colors.secondary,
    },
    {
      id: '3',
      title: 'Blog',
      url: 'https://velearn.com/blog',
      description: 'Read educational articles',
      icon: 'newspaper-outline',
      color: Colors.success,
    },
    {
      id: '4',
      title: 'Help Center',
      url: 'https://velearn.com/help',
      description: 'Get support and FAQs',
      icon: 'help-circle-outline',
      color: Colors.info,
    },
    {
      id: '5',
      title: 'Community Forum',
      url: 'https://community.velearn.com',
      description: 'Connect with other learners',
      icon: 'people-outline',
      color: Colors.purple,
    },
  ];

  const socialLinks = [
  
    {
      id: '2',
      title: 'LinkedIn',
      url: 'https://linkedin.com/company/velearn',
      icon: 'logo-linkedin',
      color: '#0077B5',
    },
    {
      id: '3',
      title: 'YouTube',
      url: 'https://youtube.com/velearn',
      icon: 'logo-youtube',
      color: '#FF0000',
    },
    {
      id: '4',
      title: 'Instagram',
      url: 'https://instagram.com/velearn',
      icon: 'logo-instagram',
      color: '#E4405F',
    },
    {
      id: '5',
      title: 'Facebook',
      url: 'https://facebook.com/velearn',
      icon: 'logo-facebook',
      color: '#1877F2',
    },
 
  
  ];

  const handleOpenLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open URL: ${url}`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while opening the link');
    }
  };

  const renderSocialCard = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={[
        styles.socialCard,
        index % 2 === 0 ? styles.socialCardEven : styles.socialCardOdd,
        isTablet && styles.socialCardTablet
      ]}
      onPress={() => handleOpenLink(item.url)}
      activeOpacity={0.7}
    >
      <View style={[styles.socialIconContainer, { backgroundColor: item.color + '15' }]}>
        <Icon name={item.icon as any} size={24} color={item.color} />
      </View>
      <Text style={styles.socialTitle} numberOfLines={1}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderFeatureCard = (feature: any) => (
    <View key={feature.title} style={[styles.featureCard, isTablet && styles.featureCardTablet]}>
      <View style={[styles.featureIcon, { backgroundColor: feature.color + '15' }]}>
        <Icon name={feature.icon as any} size={20} color={feature.color} />
      </View>
      <Text style={styles.featureTitle}>{feature.title}</Text>
      <Text style={styles.featureDescription}>{feature.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Header */}
        <View style={styles.heroSection}>
          <View style={styles.heroBackground} />
          <View style={styles.heroContent}>
            <View style={styles.logoContainer}>
              <Icon name="globe" size={40} color={Colors.white} />
            </View>
            <Text style={styles.heroTitle}>Explore Our Platform</Text>
            <Text style={styles.heroSubtitle}>
              Access courses, resources, and community features
            </Text>
          </View>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>500+</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>50K+</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>100+</Text>
            <Text style={styles.statLabel}>Instructors</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24/7</Text>
            <Text style={styles.statLabel}>Support</Text>
          </View>
        </View>

        {/* Quick Access */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            <Icon name="flash-outline" size={20} color={Colors.primary} />
          </View>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionPrimary}
              onPress={() => handleOpenLink('https://velearn.com/courses')}
            >
              <Icon name="search-outline" size={20} color={Colors.white} />
              <Text style={styles.quickActionText}>Browse Courses</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionSecondary}
              onPress={() => handleOpenLink('https://velearn.com/register')}
            >
              <Icon name="person-add-outline" size={20} color={Colors.primary} />
              <Text style={styles.quickActionText}>Sign Up Free</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Website Links */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Website Sections</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linksGrid}>
            {websiteLinks.map(link => (
              <TouchableOpacity
                key={link.id}
                style={styles.linkCard}
                onPress={() => handleOpenLink(link.url)}
                activeOpacity={0.7}
              >
                <View style={[styles.linkIcon, { backgroundColor: link.color + '10' }]}>
                  <Icon name={link.icon as any} size={24} color={link.color} />
                </View>
                <Text style={styles.linkTitle}>{link.title}</Text>
                <Text style={styles.linkDescription}>{link.description}</Text>
                <View style={styles.linkArrow}>
                  <Icon name="arrow-forward-circle" size={20} color={link.color} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Follow Us - Updated Icons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Connect With Us</Text>
            <Icon name="share-social-outline" size={20} color={Colors.primary} />
          </View>
          <Text style={styles.socialDescription}>
            Follow us for updates, tips, and community discussions
          </Text>
          
          <View style={styles.socialGrid}>
            {socialLinks.map((item, index) => renderSocialCard({ item, index }))}
          </View>
        </View>

        {/* Platform Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose veLearn?</Text>
          <View style={styles.featuresGrid}>
            {[
              {
                icon: 'videocam-outline',
                title: 'Video Lessons',
                description: 'HD quality videos',
                color: Colors.primary
              },
              {
                icon: 'document-text-outline',
                title: 'Resources',
                description: 'Downloadable materials',
                color: Colors.secondary
              },
              {
                icon: 'chatbubble-ellipses-outline',
                title: 'Live Support',
                description: '24/7 chat available',
                color: Colors.success
              },
              {
                icon: 'trophy-outline',
                title: 'Certifications',
                description: 'Industry recognized',
                color: Colors.warning
              }
            ].map(renderFeatureCard)}
          </View>
        </View>

        {/* Browser CTA */}
        <View style={styles.browserCta}>
          <Icon name="desktop-outline" size={40} color={Colors.white} />
          <Text style={styles.browserCtaTitle}>Full Experience on Web</Text>
          <Text style={styles.browserCtaDescription}>
            For complete features and better navigation, visit our website
          </Text>
          <TouchableOpacity 
            style={styles.browserButton}
            onPress={() => handleOpenLink('https://velearn.com')}
          >
            <Icon name="open-outline" size={20} color={Colors.white} />
            <Text style={styles.browserButtonText}>Open velearn.com</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      {/* <TouchableOpacity 
        style={styles.fab}
        onPress={() => handleOpenLink('https://velearn.com')}
      >
        <Icon name="earth" size={24} color={Colors.white} />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    backgroundColor: Colors.primary,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
  },
  heroBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primary,
    opacity: 0.9,
  },
  heroContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: isSmallDevice ? 24 : 28,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: isSmallDevice ? 14 : 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    maxWidth: 300,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: -20,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 4,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statValue: {
    fontSize: isSmallDevice ? 18 : 20,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.gray,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 18 : 22,
    fontWeight: '700',
    color: Colors.black,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: isSmallDevice ? 14 : 16,
    borderRadius: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: isSmallDevice ? 14 : 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  quickActionText: {
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  linkCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  linkIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  linkDescription: {
    fontSize: 12,
    color: Colors.gray,
    lineHeight: 16,
  },
  linkArrow: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  socialDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 16,
    lineHeight: 20,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  socialCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  socialCardTablet: {
    width: '24%',
  },
  socialCardEven: {
    backgroundColor: Colors.white,
  },
  socialCardOdd: {
    backgroundColor: Colors.background,
  },
  socialIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  socialTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    flex: 1,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureCardTablet: {
    width: '23%',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 16,
  },
  browserCta: {
    marginHorizontal: 20,
    marginBottom: 40,
    backgroundColor: Colors.secondary,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  browserCtaTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    marginTop: 12,
    marginBottom: 8,
  },
  browserCtaDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  browserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  browserButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
});

export default VisitWebsiteScreen;