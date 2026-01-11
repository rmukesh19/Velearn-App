import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type OnlineClassRouteProp = RouteProp<{ OnlineClass: { courseId: string; courseTitle: string } }, 'OnlineClass'>;

const OnlineClassScreen: React.FC = () => {
  const route = useRoute<OnlineClassRouteProp>();
  const navigation = useNavigation();
  const { courseId, courseTitle } = route.params;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={Colors.white}
        translucent={false}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Online Class</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.mainContent}>
          <Icon name="play-circle" size={80} color={Colors.primary} />
          <Text style={styles.title}>{courseTitle}</Text>
          <Text style={styles.subtitle}>Course ID: {courseId}</Text>
          
          <View style={styles.videoPlaceholder}>
            <Text style={styles.videoText}>🎥 Live Class Video Player</Text>
            <Text style={styles.videoDescription}>This would display the live class stream</Text>
            
            {/* Play Button Overlay */}
            <TouchableOpacity style={styles.playOverlay}>
              <Icon name="play" size={40} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="mic-outline" size={24} color={Colors.white} />
              <Text style={styles.controlText}>Mic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="videocam-outline" size={24} color={Colors.white} />
              <Text style={styles.controlText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="chatbubble-outline" size={24} color={Colors.white} />
              <Text style={styles.controlText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Controls */}
        {/* <View style={styles.additionalControls}>
          <TouchableOpacity style={styles.additionalButton}>
            <Icon name="share-outline" size={20} color={Colors.primary} />
            <Text style={styles.additionalButtonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalButton}>
            <Icon name="download-outline" size={20} color={Colors.primary} />
            <Text style={styles.additionalButtonText}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalButton}>
            <Icon name="settings-outline" size={20} color={Colors.primary} />
            <Text style={styles.additionalButtonText}>Settings</Text>
          </TouchableOpacity>
        </View> */}
      </View>
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
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  videoPlaceholder: {
    width: '100%',
    height: 220,
    backgroundColor: Colors.background,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    position: 'relative',
  },
  videoText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
    lineHeight: 24,
  },
  videoDescription: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  playOverlay: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(74, 144, 226, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -35 }, { translateY: -35 }],
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  controlButton: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    width: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlText: {
    color: Colors.white,
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
    paddingBottom: 20,
  },
  additionalButton: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  additionalButtonText: {
    color: Colors.primary,
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
});

export default OnlineClassScreen;