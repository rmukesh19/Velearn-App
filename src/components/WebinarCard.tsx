// components/WebinarCard.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


type Webinar = {
  id: string;
  title: string;
  date: string;
  speaker?: string;
  duration?: string;
};

type Props = {
  webinar: Webinar;
  onPress?: () => void;
};

export default function WebinarCard({ webinar, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Ionicons name="videocam-outline" size={24} color="#007AFF" />
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>{webinar.title}</Text>
          <Text style={styles.schedule}>
            <Ionicons name="time-outline" size={14} color="#8E8E93" />
            {` ${webinar.date}`}
          </Text>
        </View>
      </View>
      
      {webinar.speaker && (
        <Text style={styles.speaker}>
          <Ionicons name="person-outline" size={14} color="#8E8E93" />
          {` By ${webinar.speaker}`}
        </Text>
      )}
      
      {webinar.duration && (
        <Text style={styles.duration}>
          <Ionicons name="timer-outline" size={14} color="#8E8E93" />
          {` ${webinar.duration}`}
        </Text>
      )}
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register Now</Text>
        </TouchableOpacity>
        <View style={styles.attendeeCount}>
          <Ionicons name="people-outline" size={16} color="#8E8E93" />
          <Text style={styles.attendeeText}>42 attending</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  schedule: {
    fontSize: 14,
    color: '#8E8E93',
    flexDirection: 'row',
    alignItems: 'center',
  },
  speaker: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 16,
  },
  registerButton: {
    backgroundColor: '#002e6e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  attendeeCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
});