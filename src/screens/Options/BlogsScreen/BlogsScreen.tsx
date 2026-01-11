import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  FlatList 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../theme/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH >= 768;
const isSmallDevice = SCREEN_HEIGHT < 700;

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  bookmarked: boolean;
  views: number;
  likes: number;
}

const BlogsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<string[]>(['1', '3']);

  const categories = [
    { id: 'all', label: 'All', icon: 'grid-outline' },
    { id: 'technology', label: 'Tech', icon: 'hardware-chip-outline' },
    { id: 'design', label: 'Design', icon: 'color-palette-outline' },
    { id: 'business', label: 'Business', icon: 'trending-up-outline' },
    { id: 'education', label: 'Edu', icon: 'school-outline' },
    { id: 'health', label: 'Health', icon: 'fitness-outline' },
    { id: 'lifestyle', label: 'Lifestyle', icon: 'cafe-outline' },
  ];

  const blogs: Blog[] = [
    {
      id: '1',
      title: 'The Future of React Native Development',
      excerpt: 'Exploring the latest trends and features in React Native development for 2024. Learn about new architectures and performance improvements.',
      category: 'technology',
      author: 'Alex Johnson',
      date: 'Dec 10, 2023',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      bookmarked: true,
      views: 1245,
      likes: 89,
    },
    {
      id: '2',
      title: 'UI/UX Design Principles for Mobile Apps',
      excerpt: 'Essential design principles that every mobile app developer should know to create intuitive and engaging user experiences.',
      category: 'design',
      author: 'Sarah Chen',
      date: 'Dec 8, 2023',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      bookmarked: false,
      views: 892,
      likes: 67,
    },
    {
      id: '3',
      title: 'Building Scalable Mobile Applications',
      excerpt: 'Learn how to build mobile applications that can scale with your user base using modern architecture patterns.',
      category: 'technology',
      author: 'Mike Wilson',
      date: 'Dec 5, 2023',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      bookmarked: true,
      views: 1567,
      likes: 124,
    },
    {
      id: '4',
      title: 'AI in Modern Web Development',
      excerpt: 'How artificial intelligence is transforming the way we build and optimize web applications.',
      category: 'technology',
      author: 'David Lee',
      date: 'Dec 3, 2023',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      bookmarked: false,
      views: 2341,
      likes: 156,
    },
    {
      id: '5',
      title: 'The Psychology of Color in Design',
      excerpt: 'Understanding how color choices affect user behavior and perception in digital products.',
      category: 'design',
      author: 'Emma Davis',
      date: 'Nov 28, 2023',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      bookmarked: false,
      views: 1023,
      likes: 78,
    },
  ];

  const filteredBlogs = blogs.filter(blog => 
    selectedCategory === 'all' || blog.category === selectedCategory
  );

  const toggleBookmark = (blogId: string) => {
    setBookmarkedBlogs(prev => 
      prev.includes(blogId) 
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      technology: Colors.primary + '20',
      design: Colors.secondary + '20',
      business: Colors.success + '20',
      education: Colors.warning + '20',
      health: Colors.danger + '20',
      lifestyle: Colors.info + '20',
    };
    return colors[category as keyof typeof colors] || Colors.lightGray;
  };

  const renderFeaturedCard = ({ item }: { item: Blog }) => (
    <TouchableOpacity 
      style={styles.featuredCard}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.featuredGradient}>
        <View style={styles.featuredContent}>
          <View style={styles.featuredHeader}>
            <View style={styles.featuredCategory}>
              <Icon name="star" size={12} color={Colors.white} />
              <Text style={styles.featuredCategoryText}>Featured</Text>
            </View>
            <TouchableOpacity 
              style={styles.featuredBookmark}
              onPress={() => toggleBookmark(item.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon 
                name={bookmarkedBlogs.includes(item.id) ? "bookmark" : "bookmark-outline"} 
                size={20} 
                color={Colors.white} 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.featuredTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.featuredExcerpt} numberOfLines={2}>{item.excerpt}</Text>
          
          <View style={styles.featuredFooter}>
            <View style={styles.featuredAuthor}>
              <Icon name="person-circle-outline" size={16} color={Colors.white} />
              <Text style={styles.featuredAuthorText}>{item.author}</Text>
            </View>
            <View style={styles.featuredStats}>
              <Icon name="time-outline" size={14} color={Colors.lightGray} />
              <Text style={styles.statText}>{item.readTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBlogCard = ({ item }: { item: Blog }) => (
    <TouchableOpacity 
      style={[
        styles.blogCard, 
        isTablet && styles.blogCardTablet
      ]}
      activeOpacity={0.9}
    >
      <View style={styles.blogImageContainer}>
        <Image source={{ uri: item.image }} style={styles.blogCardImage} />
        <TouchableOpacity 
          style={styles.blogBookmark}
          onPress={() => toggleBookmark(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon 
            name={bookmarkedBlogs.includes(item.id) ? "bookmark" : "bookmark-outline"} 
            size={18} 
            color={bookmarkedBlogs.includes(item.id) ? Colors.primary : Colors.gray} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.blogCardContent}>
        <View style={styles.blogCardHeader}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.categoryBadgeText}>{item.category}</Text>
          </View>
          <Text style={styles.readTimeText}>{item.readTime}</Text>
        </View>

        <Text style={styles.blogCardTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.blogCardExcerpt} numberOfLines={3}>{item.excerpt}</Text>

        <View style={styles.blogCardFooter}>
          <View style={styles.authorContainer}>
            <View style={styles.authorAvatar}>
              <Icon name="person-outline" size={14} color={Colors.gray} />
            </View>
            <View>
              <Text style={styles.authorName}>{item.author}</Text>
              <Text style={styles.blogDate}>{item.date}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Icon name="eye-outline" size={14} color={Colors.gray} />
              <Text style={styles.statCount}>{item.views}</Text>
            </View>
            <View style={styles.stat}>
              <Icon name="heart-outline" size={14} color={Colors.gray} />
              <Text style={styles.statCount}>{item.likes}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Dynamic bottom padding calculation
  const bottomPadding = Math.max(insets.bottom, 20) + 20;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomPadding }
        ]}
        nestedScrollEnabled={true}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Discover Articles</Text>
            <Text style={styles.headerSubtitle}>Stay updated with latest insights</Text>
          </View>
          <TouchableOpacity 
            style={styles.searchButton}
            hitSlop={15}
          >
            <Icon name="search-outline" size={22} color={Colors.gray} />
          </TouchableOpacity>
        </View>

        {/* Categories - Horizontal Scroll */}
        <View style={styles.categoriesWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
            nestedScrollEnabled={true}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.8}
              >
                <Icon 
                  name={category.icon} 
                  size={18} 
                  color={selectedCategory === category.id ? Colors.white : Colors.gray} 
                />
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category.id && styles.categoryButtonTextActive
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Section - Side Scrollable Fixed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Today</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {/* Using ScrollView instead of FlatList for smoother horizontal scroll inside vertical ScrollView */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
            decelerationRate="fast"
            snapToInterval={isTablet ? (SCREEN_WIDTH * 0.7 + 20) : (SCREEN_WIDTH * 0.85 + 20)}
            snapToAlignment="center"
          >
            {blogs.filter(blog => blog.featured).map(item => (
              <View key={item.id} style={{ marginRight: 16 }}>
                {renderFeaturedCard({ item })}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* All Articles - Responsive Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Latest Articles</Text>
              <Text style={styles.sectionSubtitle}>{filteredBlogs.length} articles found</Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Icon name="filter-outline" size={18} color={Colors.gray} />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>
          
          {/* Responsive Layout Logic: FlexWrap for Tablet Grid */}
          <View style={[
            styles.blogListWrapper,
            isTablet && styles.blogGridWrapper
          ]}>
            {filteredBlogs.map((item) => (
              <View key={item.id} style={isTablet ? styles.gridItem : { marginBottom: 16 }}>
                {renderBlogCard({ item })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray + '30',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: isSmallDevice ? 24 : 28,
    fontWeight: '800',
    color: Colors.black,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: isSmallDevice ? 13 : 15,
    color: Colors.gray,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.lightGray + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Categories
  categoriesWrapper: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray + '20',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.lightGray + '10',
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
    marginLeft: 8,
  },
  categoryButtonTextActive: {
    color: Colors.white,
  },

  // Sections
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 2,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.lightGray + '20',
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray,
    marginLeft: 6,
  },

  // Featured Horizontal List
  featuredList: {
    paddingLeft: 20,
    paddingRight: 20, // Ensure last card isn't cut off
  },
  featuredCard: {
    width: isTablet ? SCREEN_WIDTH * 0.7 : SCREEN_WIDTH * 0.85,
    height: isTablet ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.32,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredGradient: {
    flex: 1,
    backgroundGradient: {
      colors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 }
    },
    // Fallback for gradient if module isn't used, standard opacity
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'flex-end',
    padding: 20,
  },
  featuredContent: {
    marginTop: 'auto',
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featuredCategoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
    marginLeft: 4,
  },
  featuredBookmark: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredTitle: {
    fontSize: isSmallDevice ? 18 : 22,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 8,
    lineHeight: 28,
  },
  featuredExcerpt: {
    fontSize: isSmallDevice ? 13 : 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
    lineHeight: 20,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredAuthorText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
    marginLeft: 8,
  },
  featuredStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: Colors.lightGray,
    marginLeft: 4,
  },

  // Blog List (Responsive)
  blogListWrapper: {
    paddingHorizontal: 20,
  },
  // Tablet Grid Layout
  blogGridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%', // Takes roughly half width in tablet grid
    marginBottom: 16,
  },

  blogCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  blogCardTablet: {
    // Specific overrides for grid items if needed, usually handled by container width
    height: '100%', 
  },
  blogImageContainer: {
    position: 'relative',
  },
  blogCardImage: {
    width: '100%',
    height: isSmallDevice ? 160 : 180,
  },
  blogBookmark: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  blogCardContent: {
    padding: 16,
  },
  blogCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  readTimeText: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: '500',
  },
  blogCardTitle: {
    fontSize: isSmallDevice ? 16 : 17,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
    lineHeight: 24,
  },
  blogCardExcerpt: {
    fontSize: isSmallDevice ? 13 : 14,
    color: Colors.gray,
    lineHeight: 20,
    marginBottom: 16,
  },
  blogCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.lightGray + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  blogDate: {
    fontSize: 11,
    color: Colors.gray,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  statCount: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default BlogsScreen;