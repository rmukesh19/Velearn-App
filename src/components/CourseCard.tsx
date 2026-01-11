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
import { Colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // Adjust path as needed

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
  onPress?: (courseId: string) => void; // Add onPress prop for parent control
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CourseCard({ 
  course, 
  horizontal = false, 
  showProgress = false,
  onPress 
}: CourseCardProps) {
  const navigation = useNavigation<NavigationProp>();
  
  // Calculate card width with reduced margins
  const cardWidth = horizontal ? width * 0.85 : width - 24;
  
  // Fixed height for all cards
  const cardHeight = 400;

const handleCardPress = () => {
    if (onPress) {
      onPress(course.id);
    } else {
      navigation.navigate('FreeCoursesDetailScreen', { courseId: course.id });
    }
  };

  const handleAccessButtonPress = () => {
    if (course.type === 'live') {
      console.log('Join live course:', course.id);
    } else {
      navigation.navigate('FreeCoursesDetailScreen', { courseId: course.id });
    }
  };

  return (
    <View style={[styles.cardContainer, { width: cardWidth }]}>
      <TouchableOpacity 
        style={[styles.card, { height: cardHeight }]} 
        activeOpacity={0.9}
        onPress={handleCardPress}
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
              <Ionicons name="lock-open-outline" size={12} color={Colors.white} />
              <Text style={styles.accessText}>Access Free</Text>
            </View>
          </View>
        </View>

        {/* MIDDLE: Text Content - Fixed height container */}
        <View style={styles.textContainer}>
          {/* Level and Duration Row - Level on left, Hours on right with icon */}
          <View style={styles.infoRow}>
            {/* Left side: Intermediate Level Badge */}
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>
                {course.level ? course.level.toUpperCase() : 'INTERMEDIATE'}
              </Text>
            </View>
            
            {/* Right side: Hours with icon */}
            <View style={styles.durationContainer}>
              <Ionicons name="time-outline" size={14} color={Colors.gray} style={styles.durationIcon} />
              <Text style={styles.durationText}>{course.duration || '25hrs'}</Text>
            </View>
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
              <Ionicons name="person-outline" size={14} color={Colors.gray} />
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
          <TouchableOpacity 
            style={styles.accessButton} 
            activeOpacity={0.8}
            onPress={handleAccessButtonPress}
          >
            <Ionicons name="play-circle-outline" size={18} color={Colors.white} />
            <Text style={styles.accessButtonText}>
              {course.type === 'live' ? 'Join Now' : 'Access Free'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 6, // Reduced from 8
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: 160,
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
    padding: 10, // Reduced from 12
    justifyContent: 'space-between',
  },
  liveBadge: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 67, 54, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.white,
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  categoryBadgeTop: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 46, 110, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  accessBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  accessText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  textContainer: {
    flex: 1,
    padding: 14, // Reduced from 16
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: Colors.warning,
    paddingHorizontal: 10, // Reduced from 12
    paddingVertical: 5, // Reduced from 6
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontSize: 11, // Reduced from 12
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4, // Reduced from 6
  },
  durationIcon: {
    marginRight: 2, // Reduced from 4
  },
  durationText: {
    fontSize: 13, // Reduced from 14
    fontWeight: '600',
    color: Colors.gray,
  },
  title: {
    fontSize: 17, // Reduced from 18
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4, // Reduced from 8
    lineHeight: 22, // Reduced from 24
    minHeight: 44, // Reduced from 48
  },
  description: {
    fontSize: 13, // Reduced from 14
    color: Colors.gray,
    marginBottom: 8, // Increased from 4 for better spacing
    lineHeight: 18, // Reduced from 20
    minHeight: 36, // Reduced from 40
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // Reduced from 12
    gap: 6,
  },
  instructorText: {
    fontSize: 12, // Reduced from 13
    fontWeight: '500',
    color: Colors.black,
    flex: 1,
  },
  progressContainer: {
    marginBottom: 4,
  },
  progressSpacer: {
    height: 34,
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
    color: Colors.gray,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.black,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: 3,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14, // Reduced from 16
    paddingBottom: 14, // Reduced from 16
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    paddingTop: 14, // Reduced from 16
    minHeight: 64, // Reduced from 68
  },
  accessButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 11, // Reduced from 12
    borderRadius: 10,
    minHeight: 46, // Reduced from 48
  },
  accessButtonText: {
    fontSize: 14, // Reduced from 15
    fontWeight: '700',
    color: Colors.white,
  },
});