// screens/WebinarsScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../theme/colors';

const { width, height } = Dimensions.get('window');

interface Webinar {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  speaker: string;
  category: string;
  registered: boolean;
}

const WebinarsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
    { id: 'registered', label: 'Registered' },
  ];

  const webinars: Webinar[] = [
    {
      id: '1',
      title: 'Advanced React Native Patterns',
      date: '15 Dec 2023',
      time: '2:00 PM',
      duration: '90 mins',
      speaker: 'Alex Johnson',
      category: 'upcoming',
      registered: true,
    },
    {
      id: '2',
      title: 'UI/UX Design Fundamentals',
      date: '20 Dec 2023',
      time: '3:30 PM',
      duration: '60 mins',
      speaker: 'Sarah Chen',
      category: 'upcoming',
      registered: false,
    },
    {
      id: '3',
      title: 'Machine Learning Basics',
      date: '5 Dec 2023',
      time: '11:00 AM',
      duration: '120 mins',
      speaker: 'Dr. Raj Patel',
      category: 'past',
      registered: true,
    },
  ];

  const filteredWebinars = webinars.filter(webinar => 
    selectedCategory === 'all' || webinar.category === selectedCategory
  );

  const renderWebinar = ({ item }: { item: Webinar }) => (
    <View style={styles.webinarCard}>
      <View style={styles.webinarHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        {item.registered && (
          <View style={styles.registeredBadge}>
            <Icon name="checkmark" size={12} color={Colors.white} />
            <Text style={styles.registeredText}>Registered</Text>
          </View>
        )}
      </View>

      <Text style={styles.webinarTitle}>{item.title}</Text>
      
      <View style={styles.webinarDetails}>
        <View style={styles.detailItem}>
          <Icon name="calendar-outline" size={16} color={Colors.gray} />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="time-outline" size={16} color={Colors.gray} />
          <Text style={styles.detailText}>{item.time} • {item.duration}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="person-outline" size={16} color={Colors.gray} />
          <Text style={styles.detailText}>{item.speaker}</Text>
        </View>
      </View>

      <View style={styles.webinarActions}>
        {item.registered ? (
          <TouchableOpacity style={styles.registeredButton}>
            <Icon name="videocam-outline" size={18} color={Colors.primary} />
            <Text style={styles.registeredButtonText}>Join Webinar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.registerButton}>
            <Icon name="add-outline" size={18} color={Colors.white} />
            <Text style={styles.registerButtonText}>Register Now</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.infoButton}>
          <Icon name="information-circle-outline" size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContentContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category.id && styles.categoryChipTextActive
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.scheduleHeader}>
          <Text style={styles.scheduleTitle}>
            {selectedCategory === 'all' ? 'All Webinars' : 
             selectedCategory === 'upcoming' ? 'Upcoming Webinars' :
             selectedCategory === 'past' ? 'Past Webinars' : 'Registered Webinars'}
          </Text>
          <Text style={styles.webinarCount}>{filteredWebinars.length} webinars</Text>
        </View>

        <FlatList
          data={filteredWebinars}
          renderItem={renderWebinar}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.webinarList}
        />

        <TouchableOpacity style={styles.addButton}>
          <Icon name="add-circle-outline" size={20} color={Colors.white} />
          <Text style={styles.addButtonText}>Schedule New Webinar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 60,
    flexGrow: 1,
  },
  header: {
    padding: 24,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
  },
  categoryContainer: {
    marginVertical: 16,
    flexGrow: 0,
  },
  categoryContentContainer: {
    paddingHorizontal: 16,
    paddingRight: 32,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    flexShrink: 1,
  },
  webinarCount: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
  },
  webinarList: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  webinarCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  webinarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  categoryBadge: {
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  registeredText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '600',
    marginLeft: 4,
  },
  webinarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
    lineHeight: 24,
  },
  webinarDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  detailText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
    flexShrink: 1,
  },
  webinarActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
  },
  registerButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  registeredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}10`,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
  },
  registeredButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoButton: {
    padding: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 16,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default WebinarsScreen;