import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  StatusBar,
  Platform,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Colors = {
  primary: '#002e6e',
  secondary: '#00b9f1',
  background: '#f5f5f5',
  white: '#ffffff',
  black: '#000000',
  gray: '#808080',
  lightGray: '#d3d3d3',
  success: '#4CAF50',
  error: '#f44336',
  warning: '#ff9800',
};

const LiveClassScreen = () => {
  const windowDimensions = useWindowDimensions();
  const [orientation, setOrientation] = useState('portrait');
  const activeTab = 'live';
  const [showGoLiveModal, setShowGoLiveModal] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [currentLiveClass, setCurrentLiveClass] = useState(null);
  
  const [liveClassForm, setLiveClassForm] = useState({
    title: '',
    description: '',
    duration: '60',
    category: 'Web Development',
  });

  // Detect orientation changes
  useEffect(() => {
    const isPortrait = windowDimensions.height >= windowDimensions.width;
    setOrientation(isPortrait ? 'portrait' : 'landscape');
  }, [windowDimensions]);

  // Responsive values based on screen size
  const isSmallScreen = windowDimensions.width < 375;
  const isMediumScreen = windowDimensions.width >= 375 && windowDimensions.width < 768;
  const isLargeScreen = windowDimensions.width >= 768;

  const responsiveValues = {
    headerPadding: isSmallScreen ? 15 : isMediumScreen ? 20 : 30,
    cardPadding: isSmallScreen ? 12 : isMediumScreen ? 20 : 25,
    titleSize: isSmallScreen ? 22 : isMediumScreen ? 28 : 32,
    subtitleSize: isSmallScreen ? 13 : isMediumScreen ? 16 : 18,
    cardTitleSize: isSmallScreen ? 16 : isMediumScreen ? 18 : 20,
    iconSize: isSmallScreen ? 20 : isMediumScreen ? 24 : 28,
    spacing: isSmallScreen ? 10 : isMediumScreen ? 15 : 20,
  };

  const categories = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'UI/UX Design',
    'Business',
    'Marketing',
  ];

  const durations = ['30', '45', '60', '90', '120'];

  const liveClasses = [
    {
      id: 1,
      title: 'Advanced React Native',
      instructor: 'Alex Johnson',
      time: 'Live Now',
      participants: 245,
      duration: '2h',
      category: 'Mobile Development',
      isLive: true,
    },
    {
      id: 2,
      title: 'Python Data Analysis',
      instructor: 'Sarah Chen',
      time: '11:30 AM',
      participants: 189,
      duration: '1.5h',
      category: 'Data Science',
      isLive: true,
    },
  ];

  const handleGoLive = () => {
    if (isLive) {
      Alert.alert(
        'End Live Stream',
        'Are you sure you want to end the live stream?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'End Stream', 
            style: 'destructive', 
            onPress: () => {
              setIsLive(false);
              setCurrentLiveClass(null);
              Alert.alert('Success', 'Live stream ended successfully');
            }
          }
        ]
      );
    } else {
      setShowGoLiveModal(true);
    }
  };

  const startLiveStream = () => {
    if (!liveClassForm.title.trim()) {
      Alert.alert('Error', 'Please enter a title for your live class');
      return;
    }

    const newLiveClass = {
      id: Date.now(),
      title: liveClassForm.title,
      instructor: 'You',
      time: 'Live Now',
      participants: 1,
      duration: `${liveClassForm.duration} min`,
      category: liveClassForm.category,
      description: liveClassForm.description,
      isLive: true,
    };

    setCurrentLiveClass(newLiveClass);
    setIsLive(true);
    setShowGoLiveModal(false);
    
    setLiveClassForm({
      title: '',
      description: '',
      duration: '60',
      category: 'Web Development',
    });

    Alert.alert(
      'Live Stream Started!',
      'Your live class has started. Students can now join.',
      [{ text: 'OK' }]
    );
  };

  const renderGoLiveModal = () => (
    <Modal
      visible={showGoLiveModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowGoLiveModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[
          styles.modalContainer,
          { maxHeight: windowDimensions.height * 0.85 }
        ]}>
          <View style={[styles.modalHeader, { padding: responsiveValues.headerPadding }]}>
            <Text style={[styles.modalTitle, { fontSize: responsiveValues.titleSize - 4 }]}>
              Start Live Class
            </Text>
            <TouchableOpacity onPress={() => setShowGoLiveModal(false)}>
              <Icon name="close" size={responsiveValues.iconSize} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={[styles.modalContent, { padding: responsiveValues.headerPadding }]}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { fontSize: responsiveValues.subtitleSize }]}>
                Class Title *
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { fontSize: responsiveValues.subtitleSize }
                ]}
                placeholder="Enter class title"
                value={liveClassForm.title}
                onChangeText={(text) => setLiveClassForm({...liveClassForm, title: text})}
                placeholderTextColor={Colors.gray}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { fontSize: responsiveValues.subtitleSize }]}>
                Description (Optional)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  { fontSize: responsiveValues.subtitleSize }
                ]}
                placeholder="What will you teach?"
                value={liveClassForm.description}
                onChangeText={(text) => setLiveClassForm({...liveClassForm, description: text})}
                placeholderTextColor={Colors.gray}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { fontSize: responsiveValues.subtitleSize }]}>
                Category
              </Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesScroll}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      liveClassForm.category === category && styles.categoryChipActive,
                      { paddingHorizontal: isSmallScreen ? 12 : 16 }
                    ]}
                    onPress={() => setLiveClassForm({...liveClassForm, category})}
                  >
                    <Text style={[
                      styles.categoryText,
                      liveClassForm.category === category && styles.categoryTextActive,
                      { fontSize: isSmallScreen ? 12 : 14 }
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { fontSize: responsiveValues.subtitleSize }]}>
                Duration (minutes)
              </Text>
              <View style={styles.durationsContainer}>
                {durations.map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.durationChip,
                      liveClassForm.duration === duration && styles.durationChipActive,
                      { 
                        width: isSmallScreen ? 50 : 60,
                        height: isSmallScreen ? 40 : 50
                      }
                    ]}
                    onPress={() => setLiveClassForm({...liveClassForm, duration})}
                  >
                    <Text style={[
                      styles.durationText,
                      liveClassForm.duration === duration && styles.durationTextActive,
                      { fontSize: isSmallScreen ? 14 : 16 }
                    ]}>
                      {duration}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={[styles.modalActions, { marginTop: responsiveValues.spacing }]}>
              <TouchableOpacity 
                style={[styles.cancelButton, { flex: 1, marginRight: 10 }]}
                onPress={() => setShowGoLiveModal(false)}
              >
                <Text style={[styles.cancelButtonText, { fontSize: responsiveValues.subtitleSize }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.goLiveButton,
                  !liveClassForm.title.trim() && styles.goLiveButtonDisabled,
                  { flex: 2 }
                ]}
                onPress={startLiveStream}
                disabled={!liveClassForm.title.trim()}
              >
                <Icon name="videocam" size={responsiveValues.iconSize - 4} color={Colors.white} />
                <Text style={[
                  styles.goLiveButtonText,
                  { fontSize: responsiveValues.subtitleSize, marginLeft: 10 }
                ]}>
                  Go Live
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderClassCard = (classItem) => {
    const isUserClass = classItem.instructor === 'You';
    const actionButtonText = isUserClass ? 'Control' : 'Join';
    const actionButtonIcon = isUserClass ? "settings-outline" : "enter-outline";
    
    return (
      <View 
        key={classItem.id} 
        style={[
          styles.classCard,
          { 
            padding: responsiveValues.cardPadding,
            marginBottom: responsiveValues.spacing
          }
        ]}
      >
        <View style={styles.classHeader}>
          <View style={styles.classInfo}>
            <Text 
              style={[
                styles.classTitle,
                { fontSize: responsiveValues.cardTitleSize }
              ]} 
              numberOfLines={2}
            >
              {classItem.title}
            </Text>
            <Text style={[
              styles.classInstructor,
              { fontSize: isSmallScreen ? 12 : 14 }
            ]}>
              {isUserClass ? 'Your Class' : `By ${classItem.instructor}`}
            </Text>
          </View>
          <View style={[
            styles.liveBadge,
            { 
              paddingHorizontal: isSmallScreen ? 8 : 12,
              paddingVertical: isSmallScreen ? 4 : 6
            }
          ]}>
            <View style={styles.liveDot} />
            <Text style={[
              styles.liveBadgeText,
              { fontSize: isSmallScreen ? 10 : 12 }
            ]}>
              LIVE
            </Text>
          </View>
        </View>

        <View style={[styles.classDetails, { marginBottom: responsiveValues.spacing }]}>
          <View style={styles.detailItem}>
            <Icon 
              name="time-outline" 
              size={isSmallScreen ? 14 : 16} 
              color={Colors.primary} 
            />
            <Text style={[
              styles.detailText,
              { fontSize: isSmallScreen ? 12 : 14 }
            ]}>
              {classItem.time || `${classItem.duration}`}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon 
              name="people-outline" 
              size={isSmallScreen ? 14 : 16} 
              color={Colors.primary} 
            />
            <Text style={[
              styles.detailText,
              { fontSize: isSmallScreen ? 12 : 14 }
            ]}>
              {classItem.participants}
            </Text>
          </View>
        </View>

        <View style={styles.classFooter}>
          <View style={[
            styles.categoryTag,
            { 
              paddingHorizontal: isSmallScreen ? 8 : 12,
              paddingVertical: isSmallScreen ? 4 : 6
            }
          ]}>
            <Text style={[
              styles.categoryTagText,
              { fontSize: isSmallScreen ? 10 : 12 }
            ]}>
              {classItem.category}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.actionButton,
              isUserClass ? styles.controlButton : styles.joinButton,
              { 
                paddingHorizontal: isSmallScreen ? 12 : 20,
                paddingVertical: isSmallScreen ? 8 : 10
              }
            ]}
            onPress={() => {
              if (isUserClass) {
                Alert.alert('Control Panel', 'Manage your live stream settings');
              } else {
                Alert.alert('Join Class', `Join ${classItem.title}`);
              }
            }}
          >
            <Icon 
              name={actionButtonIcon} 
              size={isSmallScreen ? 16 : 18} 
              color={Colors.white} 
            />
            <Text style={[
              styles.actionButtonText,
              { fontSize: isSmallScreen ? 12 : 14 }
            ]}>
              {actionButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getCurrentClasses = () => {
    return [...(currentLiveClass ? [currentLiveClass] : []), ...liveClasses];
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      
      <View style={[
        styles.header,
        { 
          paddingHorizontal: responsiveValues.headerPadding,
          paddingTop: Platform.OS === 'ios' ? 50 : 30,
          paddingBottom: responsiveValues.spacing
        }
      ]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.headerTitle, { fontSize: responsiveValues.titleSize }]}>
            Live Classes
          </Text>
          <Text style={[styles.headerSubtitle, { fontSize: responsiveValues.subtitleSize }]}>
            Interactive learning sessions
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon 
              name="notifications-outline" 
              size={responsiveValues.iconSize} 
              color={Colors.white} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon 
              name="search-outline" 
              size={responsiveValues.iconSize} 
              color={Colors.white} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {isLive && currentLiveClass && (
        <View style={[
          styles.liveStatusBar,
          { paddingHorizontal: responsiveValues.headerPadding }
        ]}>
          <View style={styles.liveStatusContent}>
            <View style={styles.liveIndicator}>
              <View style={styles.livePulse} />
              <Text style={[
                styles.liveStatusText,
                { fontSize: isSmallScreen ? 10 : 12 }
              ]}>
                You are live
              </Text>
            </View>
            <Text 
              style={[
                styles.liveClassTitle,
                { fontSize: responsiveValues.subtitleSize }
              ]} 
              numberOfLines={1}
            >
              {currentLiveClass.title}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.controlPanelButton}
            onPress={() => Alert.alert('Control Panel', 'Manage your live stream')}
          >
            <Icon 
              name="settings-outline" 
              size={responsiveValues.iconSize - 4} 
              color={Colors.white} 
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={[
        styles.tabsContainer,
        { 
          marginHorizontal: responsiveValues.headerPadding,
          marginTop: responsiveValues.spacing
        }
      ]}>
        <View style={[styles.tab, styles.tabActive, { flex: 1, marginHorizontal: 0 }]}>
          <Icon 
            name="radio" 
            size={responsiveValues.iconSize - 4} 
            color={Colors.white} 
          />
          <Text style={[
            styles.tabText,
            styles.tabTextActive,
            { fontSize: isSmallScreen ? 12 : 14 }
          ]}>
            Live Now
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {getCurrentClasses().length > 0 ? (
          <View style={[
            styles.classesList,
            { padding: responsiveValues.headerPadding }
          ]}>
            {getCurrentClasses().map(renderClassCard)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Icon 
              name="videocam-outline" 
              size={isSmallScreen ? 60 : 80} 
              color={Colors.lightGray} 
            />
            <Text style={[
              styles.emptyStateTitle,
              { fontSize: responsiveValues.cardTitleSize + 2 }
            ]}>
              No Live Classes
            </Text>
            <Text style={[
              styles.emptyStateText,
              { 
                fontSize: responsiveValues.subtitleSize,
                paddingHorizontal: isSmallScreen ? 20 : 40
              }
            ]}>
              No classes are live right now. Start one!
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={[
            styles.quickAction, 
            styles.goLiveAction,
            { 
              flex: 1,
              marginHorizontal: responsiveValues.headerPadding,
              paddingVertical: isSmallScreen ? 10 : 12
            }
          ]}
          onPress={handleGoLive}
        >
          <Icon 
            name={isLive ? "radio" : "videocam-outline"} 
            size={responsiveValues.iconSize} 
            color={isLive ? Colors.error : Colors.white} 
          />
          <Text style={[
            styles.quickActionText,
            styles.goLiveActionText,
            { fontSize: isSmallScreen ? 12 : 14 }
          ]}>
            {isLive ? 'End Stream' : 'Go Live'}
          </Text>
        </TouchableOpacity>
      </View>

      {renderGoLiveModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: Colors.white,
  },
  headerSubtitle: {
    color: Colors.secondary,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  liveStatusBar: {
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  liveStatusContent: {
    flex: 1,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginRight: 8,
  },
  liveStatusText: {
    color: Colors.white,
    fontWeight: '600',
  },
  liveClassTitle: {
    color: Colors.white,
    fontWeight: '600',
    marginTop: 2,
  },
  controlPanelButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 4,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    marginLeft: 8,
    fontWeight: '600',
    color: Colors.primary,
  },
  tabTextActive: {
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
  classesList: {
    paddingBottom: 20,
  },
  classCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  classInfo: {
    flex: 1,
    marginRight: 10,
  },
  classTitle: {
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  classInstructor: {
    color: Colors.gray,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 15,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.white,
    marginRight: 6,
  },
  liveBadgeText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  classDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailText: {
    marginLeft: 6,
    color: Colors.primary,
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    backgroundColor: Colors.secondary + '20',
    borderRadius: 12,
  },
  categoryTagText: {
    color: Colors.secondary,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  joinButton: {
    backgroundColor: Colors.secondary,
  },
  controlButton: {
    backgroundColor: Colors.primary,
  },
  actionButtonText: {
    color: Colors.white,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyStateTitle: {
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    color: Colors.gray,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionText: {
    color: Colors.primary,
    marginTop: 4,
  },
  goLiveAction: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  goLiveActionText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  modalTitle: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  modalContent: {
    paddingBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 15,
    color: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoriesScroll: {
    marginTop: 10,
  },
  categoryChip: {
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.background,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    color: Colors.primary,
  },
  categoryTextActive: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  durationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  durationChip: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  durationChipActive: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  durationText: {
    color: Colors.primary,
  },
  durationTextActive: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '600',
    color: Colors.primary,
  },
  goLiveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  goLiveButtonDisabled: {
    opacity: 0.5,
  },
  goLiveButtonText: {
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default LiveClassScreen;