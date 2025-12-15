// CourseCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    type: 'recorded' | 'live';
    thumbnail: string;
  };
  horizontal?: boolean;
}

export default function CourseCard({ course, horizontal = false }: CourseCardProps) {
  // If horizontal, use 70% of screen width, else full width
  const cardWidth = horizontal ? width * 0.7 : width - 32;

  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
      <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description}>{course.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6C757D',
  },
});
