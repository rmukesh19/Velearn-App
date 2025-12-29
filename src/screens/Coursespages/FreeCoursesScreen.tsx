import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  thumbnail: string;
  tags: string[];
  isBookmarked: boolean;
}

const FreeCoursesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading] = useState(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<string[]>(['1', '3']);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Dev' },
    { id: 'data', label: 'Data Science' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'business', label: 'Business' },
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete JavaScript Fundamentals',
      category: 'web',
      instructor: 'John Doe',
      rating: 4.8,
      students: 12500,
      duration: '8 hours',
      lessons: 42,
      level: 'Beginner',
      thumbnail:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
      tags: ['JavaScript', 'Frontend', 'Basics'],
      isBookmarked: true,
    },
    {
      id: '2',
      title: 'React Native Crash Course',
      category: 'mobile',
      instructor: 'Sarah Chen',
      rating: 4.9,
      students: 8500,
      duration: '6 hours',
      lessons: 35,
      level: 'Intermediate',
      thumbnail:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3',
      tags: ['React Native', 'Mobile'],
      isBookmarked: false,
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedCourses(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.title}>Free Courses</Text>
            <Text style={styles.subtitle}>Learn new skills without cost</Text>
          </View>

          {/* Spacer for symmetry */}
          <View style={{ width: 44 }} />
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon name="search-outline" size={20} color={Colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search free courses..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle" size={18} color={Colors.gray} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* CATEGORIES */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === cat.id && styles.categoryActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.id && styles.categoryTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* COURSES */}
        <View style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : filteredCourses.length === 0 ? (
            <Text style={styles.empty}>No courses found</Text>
          ) : (
            filteredCourses.map(course => (
              <View key={course.id} style={styles.card}>
                <Image source={{ uri: course.thumbnail }} style={styles.image} />

                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{course.title}</Text>
                    <TouchableOpacity onPress={() => toggleBookmark(course.id)}>
                      <Icon
                        name={
                          bookmarkedCourses.includes(course.id)
                            ? 'bookmark'
                            : 'bookmark-outline'
                        }
                        size={20}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.instructor}>
                    {course.instructor}
                  </Text>

                  <TouchableOpacity style={styles.enrollButton}>
                    <Text style={styles.enrollText}>Enroll Free</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FreeCoursesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
  },

  /* SEARCH */
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },

  /* CATEGORIES */
  categories: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginRight: 10,
  },
  categoryActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    color: Colors.gray,
  },
  categoryTextActive: {
    color: Colors.white,
  },

  /* LIST */
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    height: 160,
    width: '100%',
  },
  cardContent: {
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  instructor: {
    color: Colors.gray,
    marginVertical: 8,
  },
  enrollButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  enrollText: {
    color: Colors.white,
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    color: Colors.gray,
    marginTop: 40,
  },
});
