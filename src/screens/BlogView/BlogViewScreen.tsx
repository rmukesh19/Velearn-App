import React, { useState, useMemo, useCallback } from 'react';
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
  Alert,
  Animated,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH >= 768;
const isSmallDevice = SCREEN_HEIGHT < 700;

// Constants
const RELATED_ARTICLES = [
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

const TAGS = ['Technology', 'Development', 'React Native', 'Mobile', 'Programming'];

const DEFAULT_CONTENT = `In today's rapidly evolving digital landscape, staying ahead of the curve is more important than ever. This comprehensive guide explores the latest trends and technologies that are shaping the future of development.

One of the most significant shifts we're witnessing is the move towards more intuitive and user-centered design. Developers are now focusing on creating experiences that not only function well but also delight users at every interaction point.

The rise of artificial intelligence and machine learning has opened up new possibilities for personalization and automation. These technologies are becoming increasingly accessible, allowing developers to implement sophisticated features with relative ease.

Another key trend is the emphasis on performance and efficiency. With users expecting instant responses and seamless experiences, optimization has become a critical aspect of the development process. From code splitting to image optimization, every millisecond counts.

Accessibility is no longer an afterthought but a fundamental requirement. Building applications that are usable by everyone, regardless of their abilities or circumstances, is both a moral imperative and a business necessity.

As we look to the future, it's clear that the most successful developers will be those who embrace continuous learning and adaptation. The tools and technologies may change, but the core principles of good development remain constant.`;

// --- Subcomponents ---

const ErrorView = ({ navigation }) => (
  <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
    <View style={styles.errorContainer}>
      <View style={styles.errorIconContainer}>
        <Ionicons name="file-tray-outline" size={48} color={Colors.gray} />
      </View>
      <Text style={styles.errorTitle}>Article Not Found</Text>
      <Text style={styles.errorText}>
        The content you are looking for has been removed or does not exist.
      </Text>
      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.primaryButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const AnimatedHeader = ({ opacity, blog, isBookmarked, onBookmark, onBack }) => (
  <Animated.View style={[styles.animatedHeader, { opacity }]}>
    <SafeAreaView edges={['top']}>
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {blog.title}
        </Text>
        <TouchableOpacity style={styles.iconButton} onPress={onBookmark} hitSlop={10}>
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked ? Colors.primary : Colors.black}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </Animated.View>
);

const FloatingActions = ({ isBookmarked, isLiked, onBookmark, onShare, onLike }) => (
  <View style={styles.floatingActionsContainer}>
    <TouchableOpacity style={styles.floatingActionButton} onPress={onBookmark}>
      <Ionicons
        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
        size={22}
        color={Colors.white}
      />
    </TouchableOpacity>
    <TouchableOpacity style={styles.floatingActionButton} onPress={onShare}>
      <Ionicons name="share-outline" size={22} color={Colors.white} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.floatingActionButton} onPress={onLike}>
      <Ionicons
        name={isLiked ? 'heart' : 'heart-outline'}
        size={22}
        color={isLiked ? '#FF4757' : Colors.white} // Vivid red for liked
      />
    </TouchableOpacity>
  </View>
);

const AuthorSection = ({ author, date, avatar, onContact }) => (
  <View style={styles.card}>
    <View style={styles.authorRow}>
      <View style={styles.avatarWrapper}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatarImage} />
        ) : (
          <Ionicons name="person-circle" size={40} color={Colors.lightGray} />
        )}
      </View>
      <View style={styles.authorInfo}>
        <Text style={styles.authorName}>{author || 'Anonymous Author'}</Text>
        <Text style={styles.publishDate}>{date || 'Just now'}</Text>
      </View>
      <TouchableOpacity style={styles.outlinedButton} onPress={onContact}>
        <Ionicons name="mail-outline" size={16} color={Colors.primary} />
        <Text style={styles.outlinedButtonText}>Contact</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const StatsRow = ({ likes, comments, isLiked, onLike }) => (
  <View style={styles.statsRow}>
    <View style={styles.statItem}>
      <Ionicons name="eye-outline" size={18} color={Colors.gray} />
      <Text style={styles.statText}>1.2K Views</Text>
    </View>
    <View style={styles.verticalDivider} />
    <TouchableOpacity style={styles.statItem} onPress={onLike}>
      <Ionicons
        name={isLiked ? 'heart' : 'heart-outline'}
        size={18}
        color={isLiked ? '#FF4757' : Colors.gray}
      />
      <Text style={styles.statText}>{likes} Likes</Text>
    </TouchableOpacity>
    <View style={styles.verticalDivider} />
    <View style={styles.statItem}>
      <Ionicons name="chatbubble-ellipses-outline" size={18} color={Colors.gray} />
      <Text style={styles.statText}>{comments} Comments</Text>
    </View>
  </View>
);

const ContactForm = ({ author, comment, onChangeComment, onSend, onCancel }) => (
  <View style={styles.contactFormCard}>
    <View style={styles.contactHeader}>
      <Text style={styles.contactTitle}>Message Author</Text>
      <TouchableOpacity onPress={onCancel}>
        <Ionicons name="close-circle" size={24} color={Colors.gray} />
      </TouchableOpacity>
    </View>
    <Text style={styles.contactSubText}>Send a private message to {author || 'the author'}</Text>

    <TextInput
      style={styles.textInput}
      placeholder="Write your message..."
      placeholderTextColor={Colors.lightGray}
      multiline
      numberOfLines={4}
      value={comment}
      onChangeText={onChangeComment}
    />

    <TouchableOpacity style={[styles.primaryButton, styles.fullWidth]} onPress={onSend}>
      <Text style={styles.primaryButtonText}>Send Message</Text>
    </TouchableOpacity>
  </View>
);

const Tags = ({ tags }) => (
  <View style={styles.tagsContainer}>
    {tags.map((tag, index) => (
      <View key={index} style={styles.tagPill}>
        <Text style={styles.tagText}>#{tag}</Text>
      </View>
    ))}
  </View>
);

const RelatedCard = ({ article, onPress }) => (
  <TouchableOpacity style={styles.relatedCard} onPress={onPress}>
    <View style={styles.relatedCardContent}>
      <Text style={styles.relatedTitle}>{article.title}</Text>
      <View style={styles.relatedMeta}>
        <Text style={styles.relatedCategory}>{article.category}</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.relatedTime}>{article.readTime}</Text>
      </View>
    </View>
    <View style={styles.relatedIconBg}>
      <Ionicons name="chevron-forward" size={18} color={Colors.primary} />
    </View>
  </TouchableOpacity>
);

const BottomBar = ({ isLiked, onLike, onComment, onShare, onContact }) => (
  <SafeAreaView edges={['bottom']} style={styles.bottomBarSafeArea}>
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.barAction} onPress={onLike}>
        <Ionicons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={24}
          color={isLiked ? '#FF4757' : Colors.gray}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.barAction} onPress={onComment}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color={Colors.gray} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.barAction} onPress={onShare}>
        <Ionicons name="share-social-outline" size={24} color={Colors.gray} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.barAction} onPress={onContact}>
        <Ionicons name="mail-unread-outline" size={24} color={Colors.gray} />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

// --- Main Component ---

const BlogViewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { blog } = route.params || {};

  const [isBookmarked, setIsBookmarked] = useState(blog?.bookmarked || false);
  const [likes, setLikes] = useState(blog?.likes || 245);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [showContact, setShowContact] = useState(false);

  const scrollY = useMemo(() => new Animated.Value(0), []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Handlers
  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `Check out this blog: ${blog.title}\n\n${blog.excerpt}`,
        url: blog.url || 'https://velearn.com/blog',
        title: blog.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share content');
    }
  }, [blog]);

  const handleLike = useCallback(() => {
    setIsLiked((prev) => {
      const newVal = !prev;
      setLikes((l) => (newVal ? l + 1 : l - 1));
      return newVal;
    });
  }, []);

  const handleContact = useCallback(() => {
    setShowContact(true);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (comment.trim()) {
      Alert.alert('Success', 'Message sent successfully!');
      setComment('');
      setShowContact(false);
    }
  }, [comment]);

  const bottomPadding = useMemo(() => insets.bottom + 80, [insets.bottom]);

  if (!blog) {
    return <ErrorView navigation={navigation} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* Animated Header */}
      <AnimatedHeader
        opacity={headerOpacity}
        blog={blog}
        isBookmarked={isBookmarked}
        onBookmark={() => setIsBookmarked(!isBookmarked)}
        onBack={() => navigation.goBack()}
      />

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}>
        {/* Hero Image */}
        {blog.thumbnail && (
          <Image source={{ uri: blog.thumbnail }} style={styles.heroImage} />
        )}

        {/* Floating Actions */}
        <FloatingActions
          isBookmarked={isBookmarked}
          isLiked={isLiked}
          onBookmark={() => setIsBookmarked(!isBookmarked)}
          onShare={handleShare}
          onLike={handleLike}
        />

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Meta Row */}
          <View style={styles.metaRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{blog.category || 'General'}</Text>
            </View>
            <Text style={styles.readTimeText}>{blog.readTime || '5 min read'}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{blog.title}</Text>

          {/* Author Card */}
          <AuthorSection
            author={blog.author}
            date={blog.date}
            avatar={blog.avatar}
            onContact={handleContact}
          />

          {/* Excerpt Quote */}
          {blog.excerpt && (
            <View style={styles.quoteContainer}>
              <Ionicons name="quote" size={20} color={Colors.primary} style={styles.quoteIcon} />
              <Text style={styles.excerpt}>{blog.excerpt}</Text>
            </View>
          )}

          {/* Body Content */}
          <Text style={styles.bodyText}>{blog.content || DEFAULT_CONTENT}</Text>

          {/* Stats Row */}
          <StatsRow
            likes={likes}
            comments={42}
            isLiked={isLiked}
            onLike={handleLike}
          />

          {/* Contact Form Overlay (Conditional) */}
          {showContact && (
            <ContactForm
              author={blog.author}
              comment={comment}
              onChangeComment={setComment}
              onSend={handleSendMessage}
              onCancel={() => setShowContact(false)}
            />
          )}

          {/* Tags */}
          <Tags tags={TAGS} />

          {/* Related Articles */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Related Articles</Text>
          </View>
          <View style={styles.relatedList}>
            {RELATED_ARTICLES.map((article) => (
              <RelatedCard key={article.id} article={article} onPress={() => {}} />
            ))}
          </View>

          {/* Share Actions */}
          <View style={styles.shareSection}>
             <Text style={styles.shareTitle}>Share this post</Text>
             <View style={styles.shareRow}>
                <TouchableOpacity style={styles.shareIconBtn}><Ionicons name="logo-twitter" size={24} color="#000"/></TouchableOpacity>
                <TouchableOpacity style={styles.shareIconBtn}><Ionicons name="logo-facebook" size={24} color="#1877F2"/></TouchableOpacity>
                <TouchableOpacity style={styles.shareIconBtn}><Ionicons name="logo-linkedin" size={24} color="#0077b5"/></TouchableOpacity>
                <TouchableOpacity style={styles.shareIconBtn}><Ionicons name="link-outline" size={24} color={Colors.gray}/></TouchableOpacity>
             </View>
          </View>
          
          <View style={{ height: 20 }} />
        </View>
      </Animated.ScrollView>

      {/* Bottom Bar */}
      <BottomBar
        isLiked={isLiked}
        onLike={handleLike}
        onComment={() => Alert.alert('Coming Soon', 'Comments section will be available soon.')}
        onShare={handleShare}
        onContact={handleContact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Very light gray background for contrast
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  // --- Header ---
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGray,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    flex: 1,
    marginHorizontal: 12,
    textAlign: 'center',
  },
  // --- Hero & Floating ---
  heroImage: {
    width: '100%',
    height: isTablet ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.35,
    backgroundColor: Colors.lightGray,
  },
  floatingActionsContainer: {
    position: 'absolute',
    top: isTablet ? SCREEN_HEIGHT * 0.36 : SCREEN_HEIGHT * 0.31,
    right: 20,
    flexDirection: 'column',
    gap: 12,
  },
  floatingActionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  // --- Content Layout ---
  contentContainer: {
    padding: 24,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24, // Overlap the image slightly
    zIndex: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: Colors.primary + '15', // 15 hex = low opacity
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  readTimeText: {
    fontSize: 13,
    color: Colors.gray,
    marginLeft: 12,
    fontWeight: '500',
  },
  title: {
    fontSize: isSmallDevice ? 26 : 32,
    fontWeight: '800',
    color: Colors.black,
    lineHeight: isSmallDevice ? 36 : 42,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  // --- Card Styles ---
  card: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.lightGray + '50',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: Colors.lightGray,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 2,
  },
  publishDate: {
    fontSize: 13,
    color: Colors.gray,
  },
  outlinedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  outlinedButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 4,
  },
  // --- Text & Body ---
  quoteContainer: {
    position: 'relative',
    marginBottom: 24,
    padding: 20,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  quoteIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    opacity: 0.2,
  },
  excerpt: {
    fontSize: 17,
    color: Colors.gray,
    fontStyle: 'italic',
    lineHeight: 26,
    paddingLeft: 10,
  },
  bodyText: {
    fontSize: 17,
    color: Colors.black,
    lineHeight: 28,
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  // --- Stats ---
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    marginBottom: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 6,
    fontWeight: '500',
  },
  verticalDivider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.lightGray,
  },
  // --- Contact Form ---
  contactFormCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  contactSubText: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.black,
    textAlignVertical: 'top',
    marginBottom: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  fullWidth: {
    width: '100%',
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  // --- Tags & Related ---
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
    gap: 8,
  },
  tagPill: {
    backgroundColor: Colors.background,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.black,
  },
  relatedList: {
    marginBottom: 32,
    gap: 12,
  },
  relatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
  },
  relatedCardContent: {
    flex: 1,
  },
  relatedTitle: {
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
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  dot: {
    marginHorizontal: 6,
    color: Colors.gray,
  },
  relatedTime: {
    fontSize: 13,
    color: Colors.gray,
  },
  relatedIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  // --- Share Section ---
  shareSection: {
      alignItems: 'center',
      marginBottom: 20,
  },
  shareTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors.black,
      marginBottom: 16,
  },
  shareRow: {
      flexDirection: 'row',
      gap: 20,
  },
  shareIconBtn: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: Colors.background,
      justifyContent: 'center',
      alignItems: 'center',
  },
  // --- Bottom Bar ---
  bottomBarSafeArea: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray + '50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  barAction: {
    padding: 8,
    opacity: 0.8,
  },
  // --- Error View ---
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: Colors.white,
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
});

export default BlogViewScreen;