import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  
  StatusBar,
  Platform,
  Dimensions,
  Share,
  Linking,
  Alert,
  Animated,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH >= 768;
const isSmallDevice = SCREEN_HEIGHT < 700;

const BlogViewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { blog } = route.params || {};
  const [isBookmarked, setIsBookmarked] = useState(blog?.bookmarked || false);
  const [likes, setLikes] = useState(blog?.likes || 245);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [showContact, setShowContact] = useState(false);
  
  const scrollY = new Animated.Value(0);
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  if (!blog) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <View style={styles.errorContainer}>
          <Ionicons name="document-text-outline" size={64} color={Colors.lightGray} />
          <Text style={styles.errorTitle}>Blog Not Found</Text>
          <Text style={styles.errorText}>The blog you're looking for doesn't exist.</Text>
          <TouchableOpacity 
            style={styles.errorButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this blog: ${blog.title}\n\n${blog.excerpt}`,
        url: blog.url || 'https://velearn.com/blog',
        title: blog.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share blog');
    }
  };

  const handleContactAuthor = () => {
    setShowContact(true);
  };

  const handleSendMessage = () => {
    if (comment.trim()) {
      Alert.alert('Message Sent', 'Your message has been sent to the author.');
      setComment('');
      setShowContact(false);
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const relatedArticles = [
    {
      id: '1',
      title: 'React Native Best Practices',
      category: 'Technology',
      readTime: '5 min',
    },
    {
      id: '2',
      title: 'Mobile App Performance',
      category: 'Development',
      readTime: '7 min',
    },
    {
      id: '3',
      title: 'UI Design Trends 2024',
      category: 'Design',
      readTime: '6 min',
    },
  ];

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.headerBackButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.black} />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>{blog.title}</Text>
            <TouchableOpacity 
              style={styles.headerBookmark}
              onPress={() => setIsBookmarked(!isBookmarked)}
            >
              <Ionicons 
                name={isBookmarked ? "bookmark" : "bookmark-outline"} 
                size={24} 
                color={isBookmarked ? Colors.primary : Colors.black} 
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>

      <SafeAreaView style={styles.container}>
        <Animated.ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* Hero Image */}
          {blog.thumbnail && (
            <Image source={{ uri: blog.thumbnail }} style={styles.heroImage} />
          )}
          
          {/* Floating Action Buttons */}
          <View style={styles.floatingActions}>
            <TouchableOpacity 
              style={styles.floatingAction}
              onPress={() => setIsBookmarked(!isBookmarked)}
            >
              <Ionicons 
                name={isBookmarked ? "bookmark" : "bookmark-outline"} 
                size={20} 
                color={isBookmarked ? Colors.white : Colors.white} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.floatingAction}
              onPress={handleShare}
            >
              <Ionicons name="share-outline" size={20} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.floatingAction}
              onPress={handleLike}
            >
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={20} 
                color={isLiked ? Colors.danger : Colors.white} 
              />
            </TouchableOpacity>
          </View>

          {/* Blog Content */}
          <View style={styles.blogContainer}>
            <View style={styles.categoryRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{blog.category || 'General'}</Text>
              </View>
              <Text style={styles.readTime}>{blog.readTime || '5 min read'}</Text>
            </View>

            <Text style={styles.title}>{blog.title}</Text>
            
            <View style={styles.authorContainer}>
              <View style={styles.authorAvatar}>
                <Ionicons name="person-circle" size={40} color={Colors.primary} />
              </View>
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{blog.author || 'Anonymous'}</Text>
                <Text style={styles.publishDate}>{blog.date || 'Recently'}</Text>
              </View>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={handleContactAuthor}
              >
                <Text style={styles.contactButtonText}>Contact</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.excerpt}>{blog.excerpt}</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Main Content */}
            <Text style={styles.fullContent}>
              {blog.content || `In today's rapidly evolving digital landscape, staying ahead of the curve is more important than ever. This comprehensive guide explores the latest trends and technologies that are shaping the future of development.

              One of the most significant shifts we're witnessing is the move towards more intuitive and user-centered design. Developers are now focusing on creating experiences that not only function well but also delight users at every interaction point.

              The rise of artificial intelligence and machine learning has opened up new possibilities for personalization and automation. These technologies are becoming increasingly accessible, allowing developers to implement sophisticated features with relative ease.

              Another key trend is the emphasis on performance and efficiency. With users expecting instant responses and seamless experiences, optimization has become a critical aspect of the development process. From code splitting to image optimization, every millisecond counts.

              Accessibility is no longer an afterthought but a fundamental requirement. Building applications that are usable by everyone, regardless of their abilities or circumstances, is both a moral imperative and a business necessity.

              As we look to the future, it's clear that the most successful developers will be those who embrace continuous learning and adaptation. The tools and technologies may change, but the core principles of good development remain constant.`}
            </Text>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="eye-outline" size={18} color={Colors.gray} />
                <Text style={styles.statText}>1.2K views</Text>
              </View>
              <TouchableOpacity 
                style={styles.statItem}
                onPress={handleLike}
              >
                <Ionicons 
                  name={isLiked ? "heart" : "heart-outline"} 
                  size={18} 
                  color={isLiked ? Colors.danger : Colors.gray} 
                />
                <Text style={styles.statText}>{likes} likes</Text>
              </TouchableOpacity>
              <View style={styles.statItem}>
                <Ionicons name="chatbubble-outline" size={18} color={Colors.gray} />
                <Text style={styles.statText}>42 comments</Text>
              </View>
            </View>

            {/* Contact Form (Conditional) */}
            {showContact && (
              <View style={styles.contactForm}>
                <Text style={styles.contactTitle}>Contact Author</Text>
                <Text style={styles.contactDescription}>
                  Send a message to {blog.author || 'the author'}
                </Text>
                
                <TextInput
                  style={styles.messageInput}
                  placeholder="Type your message here..."
                  placeholderTextColor={Colors.lightGray}
                  multiline
                  numberOfLines={4}
                  value={comment}
                  onChangeText={setComment}
                />
                
                <View style={styles.contactActions}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => setShowContact(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.sendButton}
                    onPress={handleSendMessage}
                  >
                    <Text style={styles.sendButtonText}>Send Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Tags */}
            <View style={styles.tagsContainer}>
              <Text style={styles.tagsTitle}>Tags:</Text>
              {['Technology', 'Development', 'React Native', 'Mobile', 'Programming'].map((tag, index) => (
                <TouchableOpacity key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Related Articles */}
            <View style={styles.relatedSection}>
              <Text style={styles.relatedTitle}>Related Articles</Text>
              {relatedArticles.map((article) => (
                <TouchableOpacity key={article.id} style={styles.relatedCard}>
                  <View style={styles.relatedContent}>
                    <Text style={styles.relatedTitleText}>{article.title}</Text>
                    <View style={styles.relatedMeta}>
                      <Text style={styles.relatedCategory}>{article.category}</Text>
                      <Text style={styles.relatedReadTime}>{article.readTime}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
                </TouchableOpacity>
              ))}
            </View>

            {/* Share Section */}
            <View style={styles.shareSection}>
              <Text style={styles.shareTitle}>Share this article</Text>
              <View style={styles.shareButtons}>
                <TouchableOpacity style={[styles.shareButton, styles.twitterButton]}>
                  <Ionicons name="logo-twitter" size={20} color={Colors.white} />
                  <Text style={styles.shareButtonText}>Twitter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.shareButton, styles.linkedinButton]}>
                  <Ionicons name="logo-linkedin" size={20} color={Colors.white} />
                  <Text style={styles.shareButtonText}>LinkedIn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.shareButton, styles.facebookButton]}>
                  <Ionicons name="logo-facebook" size={20} color={Colors.white} />
                  <Text style={styles.shareButtonText}>Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>

      {/* Fixed Bottom Bar */}
      <SafeAreaView style={styles.bottomBarSafeArea}>
        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={styles.bottomBarAction}
            onPress={handleLike}
          >
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={22} 
              color={isLiked ? Colors.danger : Colors.gray} 
            />
            <Text style={styles.bottomBarText}>Like</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.bottomBarAction}
            onPress={() => Alert.alert('Comments', 'Comments feature coming soon!')}
          >
            <Ionicons name="chatbubble-outline" size={22} color={Colors.gray} />
            <Text style={styles.bottomBarText}>Comment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.bottomBarAction}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={22} color={Colors.gray} />
            <Text style={styles.bottomBarText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.bottomBarAction}
            onPress={handleContactAuthor}
          >
            <Ionicons name="mail-outline" size={22} color={Colors.gray} />
            <Text style={styles.bottomBarText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray + '30',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBackButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  headerBookmark: {
    padding: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 24,
  },
  errorButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  errorButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: isTablet ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.3,
  },
  floatingActions: {
    position: 'absolute',
    top: isTablet ? SCREEN_HEIGHT * 0.36 : SCREEN_HEIGHT * 0.26,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  floatingAction: {
    padding: 12,
    alignItems: 'center',
  },
  blogContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  readTime: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
  },
  title: {
    fontSize: isSmallDevice ? 26 : 32,
    fontWeight: '800',
    color: Colors.black,
    marginBottom: 20,
    lineHeight: isSmallDevice ? 34 : 42,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 16,
  },
  authorAvatar: {
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  publishDate: {
    fontSize: 14,
    color: Colors.gray,
  },
  contactButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  contactButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  excerpt: {
    fontSize: 18,
    color: Colors.darkGray,
    lineHeight: 28,
    marginBottom: 24,
    fontStyle: 'italic',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 24,
  },
  fullContent: {
    fontSize: 16,
    color: Colors.black,
    lineHeight: 28,
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.background,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
    fontWeight: '500',
  },
  contactForm: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
  },
  contactDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 16,
  },
  messageInput: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.black,
    textAlignVertical: 'top',
    marginBottom: 16,
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  contactActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  cancelButtonText: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '600',
  },
  sendButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
  },
  sendButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 32,
  },
  tagsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginRight: 12,
  },
  tag: {
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  relatedSection: {
    marginBottom: 32,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 16,
  },
  relatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  relatedContent: {
    flex: 1,
  },
  relatedTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  relatedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  relatedCategory: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: 12,
  },
  relatedReadTime: {
    fontSize: 14,
    color: Colors.gray,
  },
  shareSection: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
  },
  shareTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 16,
    textAlign: 'center',
  },
  shareButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  twitterButton: {
    backgroundColor: '#000000',
  },
  linkedinButton: {
    backgroundColor: '#0077B5',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  shareButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomBarSafeArea: {
    backgroundColor: Colors.white,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomBarAction: {
    alignItems: 'center',
    padding: 8,
  },
  bottomBarText: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default BlogViewScreen;