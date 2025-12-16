// components/CourseCard.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    type: 'recorded' | 'live';
    thumbnail: string;
    instructor?: string;
    duration?: string;
    progress?: number;
    category?: string;
    level?: string;
  };
  horizontal?: boolean;
  showProgress?: boolean;
}

export default function CourseCard({ course, horizontal = false, showProgress = false }: CourseCardProps) {
  // Calculate card width with proper margins
  const cardWidth = horizontal ? width * 0.8 - 24 : width - 32;
  
  // Fixed height for all cards
  const cardHeight = 400; // Fixed height for consistency

  return (
    <View style={[styles.cardContainer, { width: cardWidth }]}>
      <TouchableOpacity 
        style={[styles.card, { height: cardHeight }]} 
        activeOpacity={0.9}
      >
        {/* TOP: Image with badges */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: course.thumbnail || 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec7?w=400&h=225&fit=crop' }} 
            style={styles.thumbnail} 
            resizeMode="cover"
          />
          
          {/* Badges on top of image */}
          <View style={styles.imageBadges}>
            {course.type === 'live' && (
              <View style={styles.liveBadge}>
                <View style={styles.liveIndicator} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
            
            {/* Category badge on top left */}
            {course.category && (
              <View style={styles.categoryBadgeTop}>
                <Text style={styles.categoryBadgeText}>{course.category}</Text>
              </View>
            )}
            
            {/* "Access Free" badge on bottom of image */}
            <View style={styles.accessBadge}>
              <Ionicons name="lock-open-outline" size={12} color="white" />
              <Text style={styles.accessText}>Access Free</Text>
            </View>
          </View>
        </View>

        {/* MIDDLE: Text Content - Fixed height container */}
        <View style={styles.textContainer}>
          {/* Level and Duration */}
          <View style={styles.infoRow}>
            {course.level && (
              <View style={styles.levelContainer}>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{course.level}</Text>
                </View>
                <View style={styles.separatorDot} />
                <Text style={styles.durationText}>{course.duration || '25hrs'}</Text>
              </View>
            )}
          </View>

          {/* Course Title - Fixed 2 lines */}
          <Text style={styles.title} numberOfLines={2}>
            {course.title}
          </Text>
          
          {/* Course Description - Fixed 2 lines */}
          <Text style={styles.description} numberOfLines={2}>
            {course.description}
          </Text>

          {/* Instructor Info */}
          {course.instructor && (
            <View style={styles.instructorContainer}>
              <Ionicons name="person-outline" size={14} color="#6C757D" />
              <Text style={styles.instructorText} numberOfLines={1}>
                By {course.instructor}
              </Text>
            </View>
          )}

          {/* Progress Bar - Only show when progress exists */}
          {showProgress && course.progress !== undefined ? (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Your Progress</Text>
                <Text style={styles.progressPercent}>{course.progress}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${Math.min(course.progress, 100)}%` }
                  ]} 
                />
              </View>
            </View>
          ) : (
            // Empty spacer to maintain consistent height when no progress bar
            <View style={styles.progressSpacer} />
          )}
        </View>

        {/* BOTTOM: Action Buttons - Fixed at bottom */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.accessButton} activeOpacity={0.8}>
            <Ionicons name="play-circle-outline" size={18} color="white" />
            <Text style={styles.accessButtonText}>
              {course.type === 'live' ? 'Join Now' : 'Start Learning'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkButton} activeOpacity={0.7}>
            <Ionicons name="bookmark-outline" size={20} color="#6C757D" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: 160, // Fixed image height
    position: 'relative',
    width: '100%',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  imageBadges: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    justifyContent: 'space-between',
  },
  liveBadge: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.5,
  },
  categoryBadgeTop: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 123, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.5,
  },
  accessBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 199, 89, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  accessText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.3,
  },
  textContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  infoRow: {
    marginBottom: 8,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
  },
  separatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6C757D',
    marginHorizontal: 8,
  },
  durationText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6C757D',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
    lineHeight: 24,
    minHeight: 48, // Fixed height for 2 lines
  },
  description: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 12,
    lineHeight: 20,
    minHeight: 40, // Fixed height for 2 lines
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  instructorText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#495057',
    flex: 1,
  },
  progressContainer: {
    marginBottom: 4,
  },
  progressSpacer: {
    height: 34, // Same height as progress container (24 + margin)
    marginBottom: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6C757D',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: '#212529',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E9ECEF',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 3,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
    minHeight: 68, // Fixed height for action section
  },
  accessButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    minHeight: 48,
  },
  accessButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  bookmarkButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
});