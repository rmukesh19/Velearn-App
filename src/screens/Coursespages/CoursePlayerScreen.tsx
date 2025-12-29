import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform 
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';

type CoursePlayerRouteProp = RouteProp<{ CoursePlayer: { courseId: string } }, 'CoursePlayer'>;

const { width, height } = Dimensions.get('window');
const isSmallDevice = height < 700;
const isTablet = width >= 768;

const CoursePlayerScreen: React.FC = () => {
  const route = useRoute<CoursePlayerRouteProp>();
  const navigation = useNavigation();
  const { courseId } = route.params;

  // Mock course data
  const courseData = {
    title: 'React Native Masterclass',
    instructor: 'John Doe',
    duration: '15h 30m',
    progress: 65,
    currentLesson: 'Lesson 4: Components and Props',
    totalLessons: 24,
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={Colors.white}
        translucent={false}
      />
      
      {/* Header - Fixed */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>Course Player</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
      >
        {/* Course Info */}
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {courseData.title}
          </Text>
          <Text style={styles.courseInstructor}>By {courseData.instructor}</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>Progress</Text>
              <Text style={styles.progressPercentage}>{courseData.progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${courseData.progress}%` }]} />
            </View>
          </View>
        </View>

        {/* Video Player Placeholder */}
        <View style={styles.videoContainer}>
          <View style={styles.videoPlaceholder}>
            <TouchableOpacity style={styles.playButton}>
              <Icon name="play" size={isTablet ? 64 : 48} color={Colors.white} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.lessonTitle} numberOfLines={2}>
            {courseData.currentLesson}
          </Text>
          <Text style={styles.lessonProgress}>
            Lesson 4 of {courseData.totalLessons} • {courseData.duration}
          </Text>
        </View>

        {/* Player Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.timeControls}>
            <Text style={styles.timeText}>12:45</Text>
            <Text style={styles.timeText}>/ {courseData.duration}</Text>
          </View>
          
          <View style={styles.controlButtons}>
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="play-back" size={isTablet ? 28 : 24} color={Colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mainControlButton}>
              <Icon name="pause" size={isTablet ? 40 : 32} color={Colors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="play-forward" size={isTablet ? 28 : 24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.additionalControls}>
            <TouchableOpacity style={styles.additionalButton}>
              <Icon name="volume-high" size={20} color={Colors.gray} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.additionalButton}>
              <Icon name="settings-outline" size={20} color={Colors.gray} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.additionalButton}>
              <Icon name="expand-outline" size={20} color={Colors.gray} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Course Navigation */}
        <View style={styles.navigationContainer}>
          <Text style={styles.navigationTitle}>Course Content</Text>
          
          <TouchableOpacity style={styles.prevNextButton}>
            <Icon name="arrow-back" size={20} color={Colors.primary} />
            <Text style={styles.prevNextText}>Previous Lesson</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.prevNextButton, styles.nextButton]}>
            <Text style={[styles.prevNextText, styles.nextButtonText]}>Next Lesson</Text>
            <Icon name="arrow-forward" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Course ID Display */}
        <View style={styles.courseIdContainer}>
          <Text style={styles.courseIdLabel}>Course ID:</Text>
          <Text style={styles.courseIdValue}>{courseId}</Text>
        </View>

        {/* Spacer for bottom padding */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    backgroundColor: Colors.white,
    zIndex: 1000,
  },
  backButton: {
    padding: 4,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: isTablet ? 24 : 20,
    paddingTop: 20,
  },
  courseInfo: {
    marginBottom: isTablet ? 28 : 20,
  },
  courseTitle: {
    fontSize: isTablet ? 26 : 22,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
    lineHeight: isTablet ? 34 : 30,
  },
  courseInstructor: {
    fontSize: isTablet ? 18 : 16,
    color: Colors.gray,
    marginBottom: 16,
    lineHeight: isTablet ? 26 : 22,
  },
  progressContainer: {
    marginBottom: isTablet ? 28 : 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: isTablet ? 16 : 14,
    color: Colors.gray,
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  progressBar: {
    height: isTablet ? 8 : 6,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  videoContainer: {
    marginBottom: isTablet ? 32 : 24,
  },
  videoPlaceholder: {
    width: '100%',
    height: isTablet ? 280 : 200,
    maxHeight: height * 0.35,
    backgroundColor: Colors.background,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    position: 'relative',
    overflow: 'hidden',
  },
  playButton: {
    width: isTablet ? 90 : 70,
    height: isTablet ? 90 : 70,
    borderRadius: isTablet ? 45 : 35,
    backgroundColor: 'rgba(74, 144, 226, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
    lineHeight: isTablet ? 28 : 24,
  },
  lessonProgress: {
    fontSize: isTablet ? 16 : 14,
    color: Colors.gray,
    lineHeight: isTablet ? 24 : 20,
  },
  controlsContainer: {
    marginBottom: isTablet ? 32 : 24,
    paddingHorizontal: isSmallDevice ? 8 : 0,
  },
  timeControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeText: {
    fontSize: isTablet ? 16 : 14,
    color: Colors.gray,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: isTablet ? 50 : 40,
  },
  controlButton: {
    width: isTablet ? 60 : 50,
    height: isTablet ? 60 : 50,
    borderRadius: isTablet ? 30 : 25,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  mainControlButton: {
    width: isTablet ? 80 : 60,
    height: isTablet ? 80 : 60,
    borderRadius: isTablet ? 40 : 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: isTablet ? 40 : 30,
  },
  additionalButton: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    marginBottom: isTablet ? 32 : 24,
  },
  navigationTitle: {
    fontSize: isTablet ? 20 : 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
    lineHeight: isTablet ? 26 : 22,
  },
  prevNextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isTablet ? 18 : 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 10,
    gap: 8,
    minHeight: 50,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  prevNextText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  nextButtonText: {
    color: Colors.white,
  },
  courseIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isTablet ? 16 : 12,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginBottom: isTablet ? 32 : 24,
    minHeight: 50,
  },
  courseIdLabel: {
    fontSize: isTablet ? 16 : 14,
    color: Colors.gray,
    marginRight: 8,
  },
  courseIdValue: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    color: Colors.black,
  },
  bottomSpacer: {
    height: isTablet ? 40 : 30,
  },
});

export default CoursePlayerScreen;