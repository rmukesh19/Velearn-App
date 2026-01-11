import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Provided Colors Palette
export const Colors = {
  primary: '#002e6e',    // Dark blue
  secondary: '#00b9f1',  // Light blue
  background: '#f5f5f5',
  white: '#ffffff',
  black: '#000000',
  gray: '#808080',
  lightGray: '#d3d3d3',
  success: '#4CAF50',
  error: '#f44336',
  warning: '#ff9800',
};

const PracticeIDEScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header Section */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.welcomeText}>Build your skills</Text>
          <Text style={styles.mainHeading}>Code Practice</Text>
        </View>
        <TouchableOpacity style={styles.profileCircle}>
          <Icon name="bolt" size={24} color={Colors.warning} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
     

        {/* Debugging Section */}
        <TouchableOpacity 
          style={styles.mainCard}
          onPress={() => navigation.navigate('DebuggingScreen' as never)}
          activeOpacity={0.9}
        >
          <View style={[styles.cardAccent, { backgroundColor: Colors.error }]} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeaderRow}>
              <View style={[styles.iconWrapper, { backgroundColor: '#FFF0F0' }]}>
                <Icon name="bug-report" size={28} color={Colors.error} />
              </View>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>Bug Hunter</Text>
                <Text style={styles.cardSubtitle}>Logic & Problem Solving</Text>
              </View>
            </View>

            <Text style={styles.cardDescription}>
              Fix broken code snippets and master the art of debugging in real-time.
            </Text>

            <View style={styles.tagContainer}>
              <View style={styles.tag}><Text style={styles.tagText}>Critical Thinking</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>Analysis</Text></View>
            </View>

            <View style={[styles.actionButton, { backgroundColor: Colors.primary }]}>
              <Text style={styles.actionButtonText}>Start Hunting</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.white} />
            </View>
          </View>
        </TouchableOpacity>

        {/* IDE Section */}
        <TouchableOpacity 
          style={styles.mainCard}
          onPress={() => navigation.navigate('InteractiveIDEScreen' as never)}
          activeOpacity={0.9}
        >
          <View style={[styles.cardAccent, { backgroundColor: Colors.secondary }]} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeaderRow}>
              <View style={[styles.iconWrapper, { backgroundColor: '#E0F7FF' }]}>
                <FontAwesome5 name="terminal" size={22} color={Colors.secondary} />
              </View>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>Interactive IDE</Text>
                <Text style={styles.cardSubtitle}>Pure Coding Freedom</Text>
              </View>
            </View>

            <Text style={styles.cardDescription}>
              A powerful, setup-free environment to write and execute code instantly.
            </Text>

            <View style={styles.tagContainer}>
              <View style={styles.tag}><Text style={styles.tagText}>Syntax</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>Live Preview</Text></View>
            </View>

            <View style={[styles.actionButton, { backgroundColor: Colors.primary }]}>
              <Text style={styles.actionButtonText}>Launch Console</Text>
              <FontAwesome5 name="rocket" size={14} color={Colors.white} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionHeading}>Learning Tips</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipIconCircle}>
              <Icon name="lightbulb" size={24} color={Colors.warning} />
            </View>
            <View style={styles.tipTextContent}>
              <Text style={styles.tipTitleText}>Consistent Practice</Text>
              <Text style={styles.tipBodyText}>
                Just 15 minutes a day builds muscle memory and helps you recognize logic patterns faster.
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -1,
  },
  profileCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 12,
  },
  statCardSmall: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statNum: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.gray,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  mainCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 6,
  },
  cardAccent: {
    height: 6,
    width: '100%',
  },
  cardContent: {
    padding: 24,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  cardSubtitle: {
    fontSize: 13,
    color: Colors.warning,
    fontWeight: '600',
    marginTop: -2,
  },
  cardDescription: {
    fontSize: 15,
    color: Colors.gray,
    lineHeight: 22,
    marginBottom: 18,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 10,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  tipsSection: {
    marginTop: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 15,
  },
  tipCard: {
    backgroundColor: '#fffbe6', // Soft warning tint
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe58f',
  },
  tipIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tipTextContent: {
    flex: 1,
  },
  tipTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  tipBodyText: {
    fontSize: 13,
    color: Colors.gray,
    lineHeight: 18,
  },
});

export default PracticeIDEScreen;