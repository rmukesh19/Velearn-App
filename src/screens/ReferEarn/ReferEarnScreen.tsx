import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Share,
  Alert,
  Linking,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

// Modern Color Palette
const Theme = {
  primary: '#002e6e', // Indigo
  secondary: '#00b9f1', // Purple
  accent: '#f59e0b', // Amber
  background: '#FBFBFE',
  card: '#FFFFFF',
  text: '#1e293b',
  textLight: '#64748b',
  success: '#22c55e',
};

export default function ReferEarnScreen() {
  const navigation = useNavigation();
  const [copied, setCopied] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const referralCode = 'LEARN247';
  const referralLink = `https://app.learningplatform.com/invite/${referralCode}`;

  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert('Link Copied', 'Share it with your friends to start earning!');
  };

  const shareReferral = async () => {
    try {
      await Share.share({
        message: `Unlock 20% off your first course with my code: ${referralCode}\n${referralLink}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderHeader = () => {
    const headerHeight = scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0.95],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.headerContainer, { transform: [{ scale: headerHeight }] }]}>
        <LinearGradient
          colors={[Theme.primary, Theme.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 3, y: 3 }}
          style={styles.headerGradient}
        >
         

          <View style={styles.heroContent}>
            <View style={styles.giftBadge}>
              <MaterialIcon name="gift-outline" size={30} color="#FFF" />
            </View>
            <Text style={styles.mainHeading}>Refer a Friend,{"\n"}Get ₹500</Text>
            <Text style={styles.subHeading}>Share the joy of learning and earn rewards for every successful enrollment.</Text>
          </View>

          <View style={styles.codeCard}>
            <Text style={styles.codeLabel}>YOUR UNIQUE CODE</Text>
            <View style={styles.codeRow}>
              <Text style={styles.codeText}>{referralCode}</Text>
              <TouchableOpacity onPress={copyToClipboard} style={styles.copyIconButton}>
                <Icon name={copied ? "checkmark" : "copy-outline"} size={20} color={Theme.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const renderStats = () => (
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>24</Text>
        <Text style={styles.statLabel}>Invited</Text>
      </View>
      <View style={[styles.statItem, styles.statBorder]}>
        <Text style={styles.statValue}>18</Text>
        <Text style={styles.statLabel}>Joined</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={[styles.statValue, { color: Theme.success }]}>₹4.5k</Text>
        <Text style={styles.statLabel}>Earnings</Text>
      </View>
    </View>
  );

  const renderSteps = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>How it works</Text>
      <View style={styles.stepsContainer}>
        {[
          { icon: 'share-outline', t: 'Invite', s: 'Share link with friends' },
          { icon: 'person-add-outline', t: 'Sign Up', s: 'They join Learnify' },
          { icon: 'cash-outline', t: 'Earn', s: 'Receive ₹500 rewards' },
        ].map((step, i) => (
          <View key={i} style={styles.stepItem}>
            <View style={styles.stepIconBg}>
              <Icon name={step.icon} size={24} color={Theme.primary} />
            </View>
            <Text style={styles.stepT}>{step.t}</Text>
            <Text style={styles.stepS}>{step.s}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {renderHeader()}
        <View style={styles.body}>
          {renderStats()}
          {renderSteps()}
          
          <TouchableOpacity 
            activeOpacity={0.9} 
            style={styles.mainShareBtn}
            onPress={shareReferral}
          >
            <LinearGradient
              colors={[Theme.primary, Theme.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 6, y: 6 }}
              style={styles.btnGradient}
            >
              <Text style={styles.btnText}>Share Referral Link</Text>
              <Icon name="arrow-forward" size={20} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footerInfo}>
             <Icon name="information-circle" size={16} color={Theme.textLight} />
             <Text style={styles.footerLabel}>Terms and conditions apply. Rewards are subject to verification.</Text>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  headerContainer: {
    padding: 16,
  },
  headerGradient: {
    borderRadius: 32,
    padding: 24,
    paddingBottom: 32,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

 
  heroContent: {
    alignItems: 'center',
    marginBottom: 30,
  },
  giftBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 40,
  },
  subHeading: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  codeCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  codeLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Theme.textLight,
    letterSpacing: 1,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeText: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.text,
    marginRight: 12,
  },
  copyIconButton: {
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
  },
  body: {
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginTop: -20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#f1f5f9',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Theme.textLight,
    marginTop: 4,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.text,
    marginBottom: 16,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepItem: {
    width: (width - 60) / 3,
    alignItems: 'center',
  },
  stepIconBg: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepT: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.text,
  },
  stepS: {
    fontSize: 11,
    color: Theme.textLight,
    textAlign: 'center',
    marginTop: 4,
  },
  mainShareBtn: {
    marginTop: 40,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Theme.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingHorizontal: 30,
    gap: 6,
    marginBottom: 40,
  },
  footerLabel: {
    fontSize: 11,
    color: Theme.textLight,
    textAlign: 'center',
    lineHeight: 16,
  }
});