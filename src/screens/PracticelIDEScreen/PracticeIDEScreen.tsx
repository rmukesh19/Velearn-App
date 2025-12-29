import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PracticeIDEScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.mainHeading}>Code Practice</Text>
          <Text style={styles.subHeading}>Master coding through hands-on exercises</Text>
        </View>

        {/* Debugging Section */}
        <TouchableOpacity 
          style={[styles.card, styles.debugCard]}
          onPress={() => navigation.navigate('DebuggingScreen' as never)}
          activeOpacity={0.8}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,107,107,0.1)' }]}>
                <Icon name="bug-report" size={24} color="#002e6e" />
              </View>
              <Text style={[styles.sectionTitle, { color: '#1E293B' }]}>Debugging</Text>
            </View>
            
            <Text style={styles.sectionDescription}>
              Sharpen your problem-solving skills with real-world debugging scenarios
            </Text>
            
            <View style={styles.featureContainer}>
              <View style={styles.featureRow}>
                <View style={[styles.featureIcon, { backgroundColor: '#002e6e' }]}>
                  <Icon name="check" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.featureText}>
                  Real debugging scenarios for beginners and learners
                </Text>
              </View>
              
              <View style={styles.featureRow}>
                <View style={[styles.featureIcon, { backgroundColor: '#002e6e' }]}>
                  <Icon name="check" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.featureText}>
                  Guided bug-finding exercises to strengthen skills
                </Text>
              </View>
            </View>
            
            <View style={[styles.startButton, { backgroundColor: '#002e6e' }]}>
              <View style={styles.buttonContent}>
                <Text style={styles.startButtonText}>Start Practice</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* IDE Section */}
        <TouchableOpacity 
          style={[styles.card, styles.ideCard]}
          onPress={() => navigation.navigate('InteractiveIDEScreen' as never)}
          activeOpacity={0.8}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(74,144,226,0.1)' }]}>
                <FontAwesome5 name="code" size={22} color="#002e6e" />
              </View>
              <Text style={[styles.sectionTitle, { color: '#1E293B' }]}>Interactive IDE</Text>
            </View>
            
            <Text style={styles.sectionDescription}>
              Practice coding in a powerful, setup-free environment
            </Text>
            
            <View style={styles.featureContainer}>
              <View style={styles.featureRow}>
                <View style={[styles.featureIcon, { backgroundColor: '#002e6e' }]}>
                  <Icon name="check" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.featureText}>
                  Instant error highlights to fix issues on the spot
                </Text>
              </View>
              
              <View style={styles.featureRow}>
                <View style={[styles.featureIcon, { backgroundColor: '#002e6e' }]}>
                  <Icon name="check" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.featureText}>
                  Write, run, and test code in one seamless window
                </Text>
              </View>
            </View>
            
            <View style={[styles.startButton, { backgroundColor: '#002e6e' }]}>
              <View style={styles.buttonContent}>
                <Text style={styles.startButtonText}>Launch IDE</Text>
                <FontAwesome5 name="rocket" size={18} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Practice Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>25+</Text>
            <Text style={styles.statLabel}>Exercises</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Languages</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Free</Text>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Tips for Success</Text>
          
          <View style={styles.tipItem}>
            <View style={styles.tipBullet}>
              <Icon name="lightbulb" size={16} color="#002e6e" />
            </View>
            <Text style={styles.tipText}>
              Start with simple exercises and gradually increase complexity
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <View style={styles.tipBullet}>
              <Icon name="lightbulb" size={16} color="#002e6e" />
            </View>
            <Text style={styles.tipText}>
              Practice regularly to build muscle memory and problem-solving skills
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <View style={styles.tipBullet}>
              <Icon name="lightbulb" size={16} color="#002e6e" />
            </View>
            <Text style={styles.tipText}>
              Don't be afraid to make mistakes - they're learning opportunities
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <View style={styles.tipBullet}>
              <Icon name="lightbulb" size={16} color="#002e6e" />
            </View>
            <Text style={styles.tipText}>
              Review and refactor your code to improve efficiency and readability
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 22,
  },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  debugCard: {
    backgroundColor: '#FFF5F5',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  ideCard: {
    backgroundColor: '#F0F9FF',
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  section: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  sectionDescription: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 20,
  },
  featureContainer: {
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  featureIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    fontSize: 15,
    color: '#334155',
    flex: 1,
    lineHeight: 22,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#002e6e',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 10,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E2E8F0',
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipBullet: {
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    fontSize: 15,
    color: '#475569',
    flex: 1,
    lineHeight: 22,
  },
});

export default PracticeIDEScreen;

export const Colors = {
  primary: '#4A90E2',
  secondary: '#FF6B6B',
  background: '#F8FAFC',
  white: '#FFFFFF',
  black: '#1E293B',
  gray: '#64748B',
  lightGray: '#E2E8F0',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  debugBackground: '#FFF5F5',
  ideBackground: '#F0F9FF',
  statsBackground: '#FFFFFF',
};