import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Platform,
  Animated,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

// GUVI-inspired Color Palette
export const Colors = {
  primary: '#002e6e',      // GUVI Dark Blue
  secondary: '#00b9f1',    // GUVI Light Blue
  accent: '#FF6B35',       // GUVI Orange
  background: '#f8fafc',   // Light background
  card: '#ffffff',         // White cards
  textPrimary: '#0f172a',  // Dark text
  textSecondary: '#64748b', // Gray text
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  overlay: 'rgba(0, 46, 110, 0.85)',
  overlayLight: 'rgba(0, 46, 110, 0.7)',
};

const VIDEO_DATA = {
  id: '1',
  title: 'Full Stack Development with MERN Stack',
  chapter: 'Module 3: React.js Fundamentals',
  lesson: 'State Management with Hooks',
  instructor: 'Sanjay Kumar',
  instructorTitle: 'Full Stack Developer & Mentor',
  instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  duration: '15:30',
  totalLessons: 42,
  rating: 4.8,
  reviews: '1.2k',
  progress: 65,
  views: '25.4K',
  likes: '2.1K',
  enrolled: '38.5K',
};

const VIDEO_SOURCE = { 
  uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' 
};

const CoursePlayerScreen = () => {
  const videoRef = useRef(null);
  const controlsAnim = useRef(new Animated.Value(1)).current;
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [selectedSpeed, setSelectedSpeed] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const insets = useSafeAreaInsets();

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    Orientation.lockToPortrait();
    return () => Orientation.unlockAllOrientations();
  }, []);

  useEffect(() => {
    if (isFullScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }, [isFullScreen]);

  useEffect(() => {
    let timer;
    if (playing && showControls) {
      timer = setTimeout(() => {
        hideControls();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [playing, showControls]);

  const showControlsWithAnimation = () => {
    setShowControls(true);
    Animated.spring(controlsAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const hideControls = () => {
    Animated.timing(controlsAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowControls(false);
    });
  };

  const toggleControls = () => {
    if (showControls) {
      hideControls();
    } else {
      showControlsWithAnimation();
    }
  };

  const togglePlayPause = () => {
    setPlaying(!playing);
    showControlsWithAnimation();
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    showControlsWithAnimation();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (seconds) => {
    if (videoRef.current) {
      videoRef.current.seek(currentTime + seconds);
    }
    showControlsWithAnimation();
  };

  const handleSpeedSelect = (speed) => {
    setPlaybackRate(speed);
    setSelectedSpeed(speed);
    setShowSpeedOptions(false);
    showControlsWithAnimation();
  };

  const handleVideoError = () => {
    setVideoError('Failed to load video');
    setLoading(false);
  };

  const handleRetry = () => {
    setVideoError(null);
    setLoading(true);
    // In a real app, you might want to reload the video here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle={isFullScreen ? "light-content" : "dark-content"} 
        backgroundColor={isFullScreen ? "#000" : Colors.primary}
      />
      
      {/* Header */}
      {!isFullScreen && (
        <LinearGradient
          colors={[Colors.primary, Colors.primary]}
          style={[styles.header, { paddingTop: insets.top }]}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => console.log('Go back')}
            >
              <Icon name="chevron-back" size={24} color={Colors.card} />
            </TouchableOpacity>
            
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {VIDEO_DATA.chapter}
              </Text>
              <Text style={styles.headerSubtitle} numberOfLines={1}>
                {VIDEO_DATA.lesson}
              </Text>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Icon name="bookmark-outline" size={22} color={Colors.card} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Icon name="share-outline" size={22} color={Colors.card} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}

      {/* Video Container */}
      <View style={[styles.videoContainer, isFullScreen && styles.fullScreenContainer]}>
        <Video
          ref={videoRef}
          source={VIDEO_SOURCE}
          style={styles.video}
          paused={!playing}
          muted={mute}
          rate={playbackRate}
          resizeMode="contain"
          onProgress={({ currentTime }) => {
            setCurrentTime(currentTime);
            if (buffering) setBuffering(false);
          }}
          onLoad={({ duration }) => {
            setDuration(duration);
            setLoading(false);
          }}
          onBuffer={({ isBuffering }) => setBuffering(isBuffering)}
          onError={handleVideoError}
          onSeek={() => setBuffering(true)}
        />

        {/* Loading Overlay */}
        {(loading || buffering) && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={Colors.secondary} />
            <Text style={styles.loadingText}>
              {buffering ? 'Buffering...' : 'Loading video...'}
            </Text>
          </View>
        )}

        {/* Error Overlay */}
        {videoError && (
          <View style={styles.errorOverlay}>
            <Icon name="alert-circle" size={48} color={Colors.error} />
            <Text style={styles.errorText}>Failed to load video</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Video Controls Overlay */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleControls}
          style={styles.controlsOverlay}
        >
          <Animated.View 
            style={[
              styles.controlsContainer,
              {
                opacity: controlsAnim,
                transform: [{ translateY: controlsAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })}]
              }
            ]}
          >
            {/* Top Controls */}
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              style={styles.topControls}
            >
              {isFullScreen && (
                <TouchableOpacity 
                  style={styles.topControlButton}
                  onPress={() => setIsFullScreen(false)}
                >
                  <Icon name="chevron-down" size={24} color={Colors.card} />
                </TouchableOpacity>
              )}
              
              <View style={styles.topRightControls}>
                <TouchableOpacity 
                  style={styles.topControlButton}
                  onPress={() => setShowSpeedOptions(!showSpeedOptions)}
                >
                  <Text style={styles.speedText}>{playbackRate}x</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.topControlButton}
                  onPress={() => setMute(!mute)}
                >
                  <Icon 
                    name={mute ? "volume-mute" : "volume-high"} 
                    size={22} 
                    color={Colors.card} 
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {/* Center Controls */}
            <View style={styles.centerControls}>
              <TouchableOpacity 
                style={styles.controlButtonLarge}
                onPress={() => handleSeek(-10)}
              >
                <Icon name="play-back" size={32} color={Colors.card} />
                <Text style={styles.seekText}>10s</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.playButton}
                onPress={togglePlayPause}
              >
                <Icon 
                  name={playing ? "pause" : "play"} 
                  size={36} 
                  color={Colors.card} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.controlButtonLarge}
                onPress={() => handleSeek(10)}
              >
                <Icon name="play-forward" size={32} color={Colors.card} />
                <Text style={styles.seekText}>10s</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Controls */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.bottomControls}
            >
              <View style={styles.progressContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                
                <Slider
                  style={styles.progressSlider}
                  value={currentTime}
                  minimumValue={0}
                  maximumValue={duration}
                  minimumTrackTintColor={Colors.secondary}
                  maximumTrackTintColor="rgba(255,255,255,0.3)"
                  thumbTintColor={Colors.card}
                  onValueChange={(value) => {
                    setCurrentTime(value);
                    showControlsWithAnimation();
                  }}
                  onSlidingComplete={(value) => {
                    if (videoRef.current) {
                      videoRef.current.seek(value);
                    }
                    showControlsWithAnimation();
                  }}
                />
                
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
              
              <View style={styles.bottomActions}>
                <TouchableOpacity 
                  style={styles.bottomActionButton}
                  onPress={toggleFullScreen}
                >
                  <Icon 
                    name={isFullScreen ? "contract" : "expand"} 
                    size={22} 
                    color={Colors.card} 
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Playback Speed Options */}
          {showSpeedOptions && (
            <View style={styles.floatingSpeedOptions}>
              {playbackRates.map((rate) => (
                <TouchableOpacity
                  key={rate}
                  style={[
                    styles.floatingSpeedOption,
                    playbackRate === rate && styles.floatingSpeedOptionActive
                  ]}
                  onPress={() => handleSpeedSelect(rate)}
                >
                  <Text style={[
                    styles.floatingSpeedOptionText,
                    playbackRate === rate && styles.floatingSpeedOptionTextActive
                  ]}>
                    {rate}x
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Course Content */}
      {!isFullScreen && (
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        >
          {/* Course Info Card */}
          <View style={styles.courseInfoCard}>
            <Text style={styles.courseTitle}>{VIDEO_DATA.title}</Text>
            
            <View style={styles.courseMeta}>
              <View style={styles.metaItem}>
                <Icon name="play-circle" size={16} color={Colors.primary} />
                <Text style={styles.metaText}>{VIDEO_DATA.views} views</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="heart" size={16} color={Colors.error} />
                <Text style={styles.metaText}>{VIDEO_DATA.likes}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="time" size={16} color={Colors.warning} />
                <Text style={styles.metaText}>{VIDEO_DATA.duration}</Text>
              </View>
            </View>
          </View>

       
          {/* Progress Card */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Your Progress</Text>
              <Text style={styles.progressPercentage}>{VIDEO_DATA.progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${VIDEO_DATA.progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.floor((VIDEO_DATA.progress / 100) * VIDEO_DATA.totalLessons)} of {VIDEO_DATA.totalLessons} lessons completed
            </Text>
          </View>

     

          {/* Chapter List */}
          <View style={styles.chapterSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Course Content</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {[1, 2, 3, 4].map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.chapterItem,
                  index === 2 && styles.activeChapterItem
                ]}
              >
                <View style={[
                  styles.chapterNumber,
                  index === 2 && styles.activeChapterNumber
                ]}>
                  {index === 2 ? (
                    <Icon name="play" size={16} color={Colors.card} />
                  ) : (
                    <Text style={[
                      styles.chapterNumberText,
                      index === 2 && styles.activeChapterNumberText
                    ]}>{index + 1}</Text>
                  )}
                </View>
                
                <View style={styles.chapterContent}>
                  <Text style={[
                    styles.chapterTitle,
                    index === 2 && styles.activeChapterTitle
                  ]}>
                    {index === 0 && 'Introduction to MERN Stack'}
                    {index === 1 && 'Setting Up Development Environment'}
                    {index === 2 && 'React.js Fundamentals & State Management'}
                    {index === 3 && 'Building Components with Hooks'}
                  </Text>
                  <Text style={styles.chapterDuration}>
                    15:30 • {index === 2 ? 'Playing' : 'Locked'}
                  </Text>
                </View>
                
                {index !== 2 && (
                  <Icon name="lock-closed" size={18} color={Colors.textSecondary} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Resources */}
          <View style={styles.resourcesSection}>
            <Text style={styles.sectionTitle}>Resources</Text>
            <View style={styles.resourceItems}>
              <TouchableOpacity style={styles.resourceItem}>
                <Icon name="document-text" size={20} color={Colors.primary} />
                <Text style={styles.resourceText}>Lecture Slides</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceItem}>
                <Icon name="code-slash" size={20} color={Colors.primary} />
                <Text style={styles.resourceText}>Source Code</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceItem}>
                <Icon name="link" size={20} color={Colors.primary} />
                <Text style={styles.resourceText}>Useful Links</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Next Lesson Button */}
      {!isFullScreen && (
        <View style={[styles.nextLessonButtonContainer, { bottom: insets.bottom + 16 }]}>
          <TouchableOpacity style={styles.nextLessonButton}>
            <Icon name="arrow-forward" size={20} color={Colors.card} />
            <Text style={styles.nextLessonButtonText}>Next Lesson</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.card,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  videoContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  controlsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topControls: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topControlButton: {
    padding: 8,
  },
  topRightControls: {
    flexDirection: 'row',
    gap: 16,
  },
  speedText: {
    color: Colors.card,
    fontWeight: '600',
    fontSize: 14,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  controlButtonLarge: {
    alignItems: 'center',
  },
  seekText: {
    color: Colors.card,
    fontSize: 12,
    marginTop: 4,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomControls: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeText: {
    color: Colors.card,
    fontSize: 12,
    fontWeight: '600',
    minWidth: 40,
  },
  progressSlider: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomActionButton: {
    padding: 8,
  },
  floatingSpeedOptions: {
    position: 'absolute',
    top: 100,
    right: 16,
    backgroundColor: Colors.overlay,
    borderRadius: 12,
    padding: 8,
    minWidth: 80,
  },
  floatingSpeedOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  floatingSpeedOptionActive: {
    backgroundColor: Colors.secondary,
  },
  floatingSpeedOptionText: {
    color: Colors.card,
    textAlign: 'center',
    fontSize: 14,
  },
  floatingSpeedOptionTextActive: {
    fontWeight: '700',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.card,
    marginTop: 12,
    fontSize: 14,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.card,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: Colors.card,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  courseInfoCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
    lineHeight: 24,
  },
  courseMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  instructorCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  instructorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  instructorTitle: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  followButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: Colors.card,
    fontSize: 12,
    fontWeight: '600',
  },
  instructorStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.secondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    width: '22%',
  },
  actionButtonText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 6,
  },
  chapterSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  viewAllText: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  activeChapterItem: {
    backgroundColor: Colors.primary + '10',
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  chapterNumber: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChapterNumber: {
    backgroundColor: Colors.primary,
  },
  chapterNumberText: {
    fontWeight: '700',
    color: Colors.textSecondary,
    fontSize: 14,
  },
  activeChapterNumberText: {
    color: Colors.card,
  },
  chapterContent: {
    flex: 1,
  },
  chapterTitle: {
    fontWeight: '600',
    color: Colors.textPrimary,
    fontSize: 14,
    marginBottom: 2,
  },
  activeChapterTitle: {
    color: Colors.primary,
    fontWeight: '700',
  },
  chapterDuration: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  resourcesSection: {
    marginBottom: 24,
  },
  resourceItems: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  resourceText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  nextLessonButtonContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
  },
  nextLessonButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextLessonButtonText: {
    color: Colors.card,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CoursePlayerScreen;