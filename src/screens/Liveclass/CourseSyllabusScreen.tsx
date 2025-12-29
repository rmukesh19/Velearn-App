import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  StatusBar 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type CourseSyllabusRouteProp = RouteProp<{ CourseSyllabus: { courseId: string; courseTitle: string } }, 'CourseSyllabus'>;

const CourseSyllabusScreen: React.FC = () => {
  const route = useRoute<CourseSyllabusRouteProp>();
  const navigation = useNavigation();
  const { courseId, courseTitle } = route.params;

  const syllabusItems = [
    { id: '1', title: 'Introduction to Course', duration: '1 week', completed: true },
    { id: '2', title: 'Basic Concepts & Fundamentals', duration: '2 weeks', completed: true },
    { id: '3', title: 'Core Topics & Advanced Concepts', duration: '3 weeks', completed: false },
    { id: '4', title: 'Hands-on Projects', duration: '2 weeks', completed: false },
    { id: '5', title: 'Final Assessment & Certification', duration: '1 week', completed: false },
  ];

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
        <Text style={styles.headerTitle}>Course Syllabus</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{courseTitle}</Text>
          <Text style={styles.courseId}>Course ID: {courseId}</Text>
        </View>

        <View style={styles.syllabusContainer}>
          <Text style={styles.sectionTitle}>Syllabus Breakdown</Text>
          
          {syllabusItems.map((item, index) => (
            <View key={item.id} style={styles.syllabusItem}>
              <View style={styles.itemHeader}>
                <View style={styles.itemNumber}>
                  <Text style={styles.itemNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
              
              <View style={styles.itemFooter}>
                <View style={styles.durationContainer}>
                  <Icon name="time-outline" size={16} color={Colors.gray} />
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
                
                {item.completed ? (
                  <View style={[styles.statusBadge, styles.completedBadge]}>
                    <Icon name="checkmark" size={16} color={Colors.success} />
                    <Text style={[styles.statusText, { color: Colors.success }]}>Completed</Text>
                  </View>
                ) : (
                  <View style={[styles.statusBadge, styles.pendingBadge]}>
                    <Icon name="time-outline" size={16} color={Colors.warning} />
                    <Text style={[styles.statusText, { color: Colors.warning }]}>Upcoming</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Course Duration</Text>
          <Text style={styles.infoValue}>8 weeks total</Text>
          
          <View style={styles.infoDivider} />
          
          <Text style={styles.infoTitle}>Weekly Commitment</Text>
          <Text style={styles.infoValue}>6-8 hours per week</Text>
          
          <View style={styles.infoDivider} />
          
          <Text style={styles.infoTitle}>Certificate</Text>
          <Text style={styles.infoValue}>Upon successful completion</Text>
        </View>
        
        {/* Bottom padding for scroll view */}
        <View style={styles.bottomPadding} />
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
  scrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  courseInfo: {
    marginBottom: 24,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 8,
    lineHeight: 32,
  },
  courseId: {
    fontSize: 16,
    color: Colors.gray,
    lineHeight: 22,
  },
  syllabusContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 16,
    lineHeight: 28,
  },
  syllabusItem: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemNumberText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    flex: 1,
    lineHeight: 22,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 6,
    lineHeight: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  completedBadge: {
    backgroundColor: `${Colors.success}20`,
  },
  pendingBadge: {
    backgroundColor: `${Colors.warning}20`,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
    lineHeight: 24,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 12,
    lineHeight: 20,
  },
  infoDivider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 12,
  },
  bottomPadding: {
    height: 40,
  },
});

export default CourseSyllabusScreen;