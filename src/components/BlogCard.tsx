import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../theme/colors';

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  thumbnail?: string;
  author?: string;
  date?: string;
  readTime?: string;
  category?: string;
  content?: string; // Add content field for full blog view
};

type Props = {
  blog: Blog;
  onPress?: () => void;
  compact?: boolean;
};

const { width } = Dimensions.get('window');

export default function BlogCard({ blog, onPress, compact = false }: Props) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Default navigation to BlogViewScreen with blog data
      navigation.navigate('BlogViewScreen', { 
        blog,
        blogId: blog.id 
      });
    }
  };

  const handleReadMore = () => {
    navigation.navigate('BlogViewScreen', { 
      blog,
      blogId: blog.id 
    });
  };

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactContainer} onPress={handlePress}>
        {blog.thumbnail && (
          <Image source={{ uri: blog.thumbnail }} style={styles.compactThumbnail} />
        )}
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={2}>{blog.title}</Text>
          <Text style={styles.compactExcerpt} numberOfLines={3}>{blog.excerpt}</Text>
          
          <View style={styles.compactFooter}>
            {blog.date && (
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={12} color={Colors.gray} />
                <Text style={styles.metaText}>{blog.date}</Text>
              </View>
            )}
            {blog.readTime && (
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={12} color={Colors.gray} />
                <Text style={styles.metaText}>{blog.readTime} read</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {blog.thumbnail && (
        <Image source={{ uri: blog.thumbnail }} style={styles.thumbnail} />
      )}
      <View style={styles.content}>
        {blog.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{blog.category}</Text>
          </View>
        )}
        
        <Text style={styles.title} numberOfLines={2}>{blog.title}</Text>
        <Text style={styles.excerpt} numberOfLines={3}>{blog.excerpt}</Text>
        
        <View style={styles.metaContainer}>
          {blog.author && (
            <View style={styles.metaItem}>
              <Ionicons name="person-outline" size={14} color={Colors.gray} />
              <Text style={styles.metaText}>{blog.author}</Text>
            </View>
          )}
          
          {blog.date && (
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color={Colors.gray} />
              <Text style={styles.metaText}>{blog.date}</Text>
            </View>
          )}
          
          {blog.readTime && (
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={Colors.gray} />
              <Text style={styles.metaText}>{blog.readTime} read</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.readMoreButton}
          onPress={handleReadMore}
        >
          <Text style={styles.readMoreText}>View More</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  compactContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  compactThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    padding: 16,
  },
  compactContent: {
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: Colors.background,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  excerpt: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
    marginBottom: 12,
  },
  compactExcerpt: {
    fontSize: 12,
    color: Colors.gray,
    lineHeight: 18,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  compactFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 4,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '600',
    marginRight: 4,
  },
});