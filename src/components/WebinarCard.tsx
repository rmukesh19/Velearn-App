import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../theme/colors';

type Webinar = {
  id: string;
  title: string;
  date: string;
  time?: string;
  speaker?: string;
  duration?: string;
  imageUrl?: string;
  attendees?: number;
  thumbnail?: string;
};

type Props = {
  webinar: Webinar;
  onPress?: () => void;
  fallbackImage?: ImageSourcePropType;
};

export default function WebinarCard({
  webinar,
  onPress,
  fallbackImage,
}: Props) {
  const navigation = useNavigation<any>();

  const getImageSource = () => {
    if (webinar.imageUrl) {
      return { uri: webinar.imageUrl };
    }
    if (webinar.thumbnail) {
      return { uri: webinar.thumbnail };
    }
    return fallbackImage || require('../../src/images/code-image.jpeg');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={getImageSource()}
          style={styles.image}
          resizeMode="cover"
        />

        {webinar.id === 'live' && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        )}
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {webinar.title}
        </Text>

        {/* Date & Time */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={Colors.gray}
            />
            <Text style={styles.infoText}>{webinar.date}</Text>
          </View>

          {webinar.time && (
            <>
              <Text style={styles.separator}>•</Text>
              <View style={styles.infoItem}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={Colors.gray}
                />
                <Text style={styles.infoText}>{webinar.time}</Text>
              </View>
            </>
          )}
        </View>

        {/* Speaker */}
        {webinar.speaker && (
          <View style={styles.speakerContainer}>
            <Ionicons
              name="person-outline"
              size={14}
              color={Colors.gray}
            />
            <Text style={styles.speakerText} numberOfLines={1}>
              {webinar.speaker}
            </Text>
          </View>
        )}

        {/* Enroll Button */}
        <TouchableOpacity
          style={styles.enrollButton}
          onPress={(e) => {
            e.stopPropagation();
            navigation.navigate('WebinarEnrollScreen', {
              webinarId: webinar.id,
            });
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
          <Ionicons
            name="arrow-forward"
            size={16}
            color={Colors.white}
            style={{ marginLeft: 8 }}
          />
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
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 180,
    backgroundColor: Colors.lightGray,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  liveBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.error,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 6,
  },
  separator: {
    marginHorizontal: 8,
    color: Colors.lightGray,
  },
  speakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  speakerText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 6,
  },
  enrollButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enrollButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
