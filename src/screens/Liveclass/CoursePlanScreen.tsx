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

type CoursePlanRouteProp = RouteProp<{ CoursePlan: { courseId: string; courseTitle: string } }, 'CoursePlan'>;

const CoursePlanScreen: React.FC = () => {
  const route = useRoute<CoursePlanRouteProp>();
  const navigation = useNavigation();
  const { courseId, courseTitle } = route.params;

  const plans = [
    { id: '1', name: 'Basic Plan', price: 'Free', features: ['Access to course materials', 'Weekly assignments', 'Community forum access'] },
    { id: '2', name: 'Premium Plan', price: '$49.99', features: ['Everything in Basic', 'Live Q&A sessions', 'Personal mentor support', 'Certificate of completion'] },
    { id: '3', name: 'Enterprise Plan', price: 'Custom', features: ['Everything in Premium', 'Team management dashboard', 'Custom learning paths', 'Priority support'] },
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
        <Text style={styles.headerTitle}>Course Plans</Text>
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

        <Text style={styles.sectionTitle}>Choose Your Plan</Text>
        <Text style={styles.sectionDescription}>
          Select the plan that best fits your learning needs and budget
        </Text>

        {plans.map((plan, index) => (
          <View key={plan.id} style={[
            styles.planCard,
            index === 1 && styles.featuredPlanCard
          ]}>
            {index === 1 && (
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>Most Popular</Text>
              </View>
            )}
            
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>{plan.price}</Text>
            </View>
            
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, featureIndex) => (
                <View key={featureIndex} style={styles.featureItem}>
                  <Icon 
                    name="checkmark-circle" 
                    size={20} 
                    color={index === 1 ? Colors.primary : Colors.success} 
                  />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity style={[
              styles.selectButton,
              index === 1 ? styles.selectButtonPrimary : styles.selectButtonSecondary
            ]}>
              <Text style={[
                styles.selectButtonText,
                index === 1 ? styles.selectButtonTextPrimary : styles.selectButtonTextSecondary
              ]}>
                Select Plan
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Need Help Deciding?</Text>
          <Text style={styles.infoText}>
            Contact our support team for personalized recommendations based on your goals and requirements.
          </Text>
          
          <TouchableOpacity style={styles.contactButton}>
            <Icon name="chatbubble-outline" size={20} color={Colors.white} />
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 8,
    lineHeight: 28,
  },
  sectionDescription: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 24,
    lineHeight: 22,
  },
  planCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    position: 'relative',
  },
  featuredPlanCard: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  featuredBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featuredBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    lineHeight: 28,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    lineHeight: 32,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: Colors.black,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  selectButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectButtonPrimary: {
    backgroundColor: Colors.primary,
  },
  selectButtonSecondary: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  selectButtonTextPrimary: {
    color: Colors.white,
  },
  selectButtonTextSecondary: {
    color: Colors.primary,
  },
  infoCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 12,
    lineHeight: 26,
  },
  infoText: {
    fontSize: 16,
    color: Colors.gray,
    lineHeight: 22,
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
  },
  contactButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  bottomPadding: {
    height: 40,
  },
});

export default CoursePlanScreen;