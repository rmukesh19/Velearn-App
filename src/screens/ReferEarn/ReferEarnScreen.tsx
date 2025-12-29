import React, { useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function ReferEarnScreen() {
  const navigation = useNavigation();
  const [copied, setCopied] = useState(false);
  
  const referralCode = 'LEARN247';
  const referralLink = `https://app.learningplatform.com/invite/${referralCode}`;

  const rewards = [
    {
      id: '1',
      icon: 'gift',
      title: 'Free Course Access',
      description: 'Get 1 month free premium access',
      points: 3,
      color: '#FF6B6B',
    },
    {
      id: '2',
      icon: 'cash',
      title: '₹500 Cash Reward',
      description: 'Direct credit to your wallet',
      points: 5,
      color: '#4ECDC4',
    },
    {
      id: '3',
      icon: 'trophy',
      title: 'Certificate Upgrade',
      description: 'Free certificate on any course',
      points: 2,
      color: '#FFD166',
    },
    {
      id: '4',
      icon: 'star',
      title: 'Premium Badge',
      description: 'Exclusive learner badge',
      points: 4,
      color: '#A663CC',
    },
  ];

  const referrals = [
    {
      id: '1',
      name: 'Alex Johnson',
      date: 'Today, 10:30 AM',
      status: 'Signed Up',
      reward: '100 Points',
      avatar: '👨‍💻',
    },
    {
      id: '2',
      name: 'Sarah Miller',
      date: 'Yesterday, 3:45 PM',
      status: 'Course Enrolled',
      reward: '250 Points',
      avatar: '👩‍🎓',
    },
    {
      id: '3',
      name: 'Mike Chen',
      date: 'Dec 12, 2024',
      status: 'Completed Course',
      reward: '500 Points',
      avatar: '👨‍🏫',
    },
    {
      id: '4',
      name: 'Emma Wilson',
      date: 'Dec 10, 2024',
      status: 'Signed Up',
      reward: '100 Points',
      avatar: '👩‍💼',
    },
  ];

  const stats = {
    totalReferrals: 24,
    successfulReferrals: 18,
    totalEarnings: '₹4,500',
    pendingEarnings: '₹1,200',
    availablePoints: 1250,
  };

  // Enhanced share function
  const shareReferral = async (method = 'default') => {
    try {
      const message = `Join me on Learnify! Use my referral code ${referralCode} to get 20% off on your first course. Sign up here: ${referralLink}`;
      
      if (method === 'default') {
        // Use React Native's built-in Share
        await Share.share({
          message,
          title: 'Join Learnify with my referral',
        });
        return;
      }

      // For specific apps
      let url = '';
      switch(method) {
        case 'whatsapp':
          url = `whatsapp://send?text=${encodeURIComponent(message)}`;
          break;
        case 'telegram':
          url = `tg://msg?text=${encodeURIComponent(message)}`;
          break;
        case 'twitter':
          url = `twitter://post?message=${encodeURIComponent(message)}`;
          break;
        case 'messenger':
          url = `fb-messenger://share?link=${encodeURIComponent(referralLink)}`;
          break;
        case 'email':
          url = `mailto:?subject=Join%20Learnify&body=${encodeURIComponent(message)}`;
          break;
        case 'sms':
          url = `sms:?body=${encodeURIComponent(message)}`;
          break;
      }

      if (url) {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          // Fallback to default share if app not installed
          Alert.alert(
            'App Not Installed',
            `${method.charAt(0).toUpperCase() + method.slice(1)} is not installed. Using default share.`,
            [
              { text: 'OK', onPress: () => shareReferral('default') }
            ]
          );
        }
      }
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Error', 'Unable to share referral link');
    }
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    // Note: You need to install @react-native-clipboard/clipboard
    // import Clipboard from '@react-native-clipboard/clipboard';
    // Clipboard.setString(referralLink);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert('Copied!', 'Referral link copied to clipboard');
  };

  // Modern share options
  const openShareOptions = () => {
    Alert.alert(
      'Share Referral',
      'Choose your sharing method',
      [
        { text: 'WhatsApp', onPress: () => shareReferral('whatsapp') },
        { text: 'Telegram', onPress: () => shareReferral('telegram') },
        { text: 'Twitter', onPress: () => shareReferral('twitter') },
        { text: 'Messenger', onPress: () => shareReferral('messenger') },
        { text: 'Email', onPress: () => shareReferral('email') },
        { text: 'SMS', onPress: () => shareReferral('sms') },
        { text: 'Copy Link', onPress: copyToClipboard },
        { text: 'More Options', onPress: () => shareReferral('default') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Quick share buttons
  const QuickShareButtons = () => (
    <View style={styles.quickShareContainer}>
      <Text style={styles.quickShareTitle}>Quick Share</Text>
      <View style={styles.quickShareGrid}>
        <TouchableOpacity 
          style={[styles.quickShareButton, { backgroundColor: '#25D366' }]}
          onPress={() => shareReferral('whatsapp')}
        >
          <Icon name="logo-whatsapp" size={24} color={Colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.quickShareButton, { backgroundColor: '#0088cc' }]}
          onPress={() => shareReferral('telegram')}
        >
          <Icon name="paper-plane" size={24} color={Colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.quickShareButton, { backgroundColor: '#1DA1F2' }]}
          onPress={() => shareReferral('twitter')}
        >
          <Icon name="logo-twitter" size={24} color={Colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.quickShareButton, { backgroundColor: '#0084ff' }]}
          onPress={() => shareReferral('messenger')}
        >
          <Icon name="chatbubble" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderReferralCard = () => (
    <View style={styles.referralCard}>
      <View style={styles.referralHeader}>
        <View style={styles.referralIconContainer}>
          <Icon name="gift-outline" size={32} color={Colors.white} />
        </View>
        <View style={styles.referralHeaderContent}>
          <Text style={styles.referralTitle}>Invite Friends & Earn Rewards</Text>
          <Text style={styles.referralSubtitle}>
            Share your referral code and earn exciting rewards for each successful referral
          </Text>
        </View>
      </View>

      <View style={styles.codeContainer}>
        <View style={styles.codeDisplay}>
          <Text style={styles.codeText}>{referralCode}</Text>
          <TouchableOpacity 
            style={styles.copyButton} 
            onPress={copyToClipboard}
          >
            <Icon 
              name={copied ? "checkmark" : "copy"} 
              size={20} 
              color={Colors.primary} 
            />
            <Text style={styles.copyText}>
              {copied ? 'Copied!' : 'Copy'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.codeHint}>
          Share this code with friends or copy the link below
        </Text>
        
        <View style={styles.referralLinkContainer}>
          <Text style={styles.referralLink} numberOfLines={1}>
            {referralLink}
          </Text>
        </View>
      </View>

      {/* Quick Share Buttons */}
      <QuickShareButtons />

      <TouchableOpacity style={styles.shareButton} onPress={openShareOptions}>
        <Icon name="share-social" size={24} color={Colors.white} />
        <Text style={styles.shareButtonText}>More Share Options</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.totalReferrals}</Text>
          <Text style={styles.statLabel}>Total Referrals</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.successfulReferrals}</Text>
          <Text style={styles.statLabel}>Successful</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.totalEarnings}</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.availablePoints}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
      </View>
    </View>
  );

  const renderRewards = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        <Text style={styles.sectionSubtitle}>Redeem your points</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rewardsScroll}
      >
        {rewards.map((reward) => (
          <View key={reward.id} style={styles.rewardCard}>
            <View style={[styles.rewardIconContainer, { backgroundColor: reward.color }]}>
              <Icon name={reward.icon} size={24} color={Colors.white} />
            </View>
            <Text style={styles.rewardTitle}>{reward.title}</Text>
            <Text style={styles.rewardDescription}>{reward.description}</Text>
            <View style={styles.rewardPoints}>
              <Icon name="star" size={14} color={Colors.warning} />
              <Text style={styles.rewardPointsText}>{reward.points} referrals needed</Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.redeemButton,
                stats.successfulReferrals >= reward.points 
                  ? styles.redeemActive 
                  : styles.redeemDisabled
              ]}
              disabled={stats.successfulReferrals < reward.points}
            >
              <Text style={styles.redeemButtonText}>
                {stats.successfulReferrals >= reward.points ? 'Redeem Now' : 'Not Enough Points'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderReferralList = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Referrals</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.referralList}>
        {referrals.map((referral) => (
          <View key={referral.id} style={styles.referralItem}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{referral.avatar}</Text>
            </View>
            <View style={styles.referralInfo}>
              <Text style={styles.referralName}>{referral.name}</Text>
              <Text style={styles.referralDate}>{referral.date}</Text>
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusBadge,
                  referral.status === 'Completed Course' && styles.statusSuccess,
                  referral.status === 'Course Enrolled' && styles.statusWarning,
                ]}>
                  <Text style={styles.statusText}>{referral.status}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rewardContainer}>
              <Icon name="trophy" size={16} color={Colors.warning} />
              <Text style={styles.rewardText}>{referral.reward}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderHowItWorks = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>How It Works</Text>
      
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Share Your Code</Text>
            <Text style={styles.stepDescription}>
              Share your unique referral code with friends
            </Text>
          </View>
        </View>

        <View style={styles.stepDivider}>
          <View style={styles.dottedLine} />
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Friend Signs Up</Text>
            <Text style={styles.stepDescription}>
              Your friend signs up using your referral code
            </Text>
          </View>
        </View>

        <View style={styles.stepDivider}>
          <View style={styles.dottedLine} />
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Friend Enrolls</Text>
            <Text style={styles.stepDescription}>
              Your friend enrolls in any paid course
            </Text>
          </View>
        </View>

        <View style={styles.stepDivider}>
          <View style={styles.dottedLine} />
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>You Earn Rewards</Text>
            <Text style={styles.stepDescription}>
              You receive points and rewards instantly
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Refer & Earn</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Icon name="information-circle-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {renderReferralCard()}
        {renderStats()}
        {renderRewards()}
        {renderHowItWorks()}
        {renderReferralList()}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Terms & Conditions apply. Rewards are subject to successful course enrollment by referrals.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
  },
  infoButton: {
    padding: 4,
  },
  
  // Referral Card
  referralCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  referralHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  referralIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  referralHeaderContent: {
    flex: 1,
  },
  referralTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
  },
  referralSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
  codeContainer: {
    marginBottom: 20,
  },
  codeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  codeText: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 4,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  copyText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  codeHint: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 12,
    textAlign: 'center',
  },
  referralLinkContainer: {
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  referralLink: {
    fontSize: 14,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  // Quick Share
  quickShareContainer: {
    marginBottom: 20,
  },
  quickShareTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  quickShareGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  quickShareButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  
  // Stats
  statsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.lightGray,
  },
  
  // Sections
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.gray,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  
  // Rewards
  rewardsScroll: {
    paddingRight: 20,
  },
  rewardCard: {
    width: 180,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  rewardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 12,
    flex: 1,
  },
  rewardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  rewardPointsText: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  redeemButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  redeemActive: {
    backgroundColor: Colors.primary,
  },
  redeemDisabled: {
    backgroundColor: Colors.lightGray,
  },
  redeemButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
  
  // How It Works
  stepsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
  stepDivider: {
    alignItems: 'center',
    height: 24,
    paddingLeft: 18,
  },
  dottedLine: {
    flex: 1,
    width: 2,
    borderLeftWidth: 2,
    borderLeftColor: Colors.lightGray,
    borderStyle: 'dashed',
  },
  
  // Referral List
  referralList: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
  },
  referralItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
  },
  referralInfo: {
    flex: 1,
  },
  referralName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 2,
  },
  referralDate: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: Colors.infoLight,
    alignSelf: 'flex-start',
  },
  statusSuccess: {
    backgroundColor: Colors.successLight,
  },
  statusWarning: {
    backgroundColor: Colors.warningLight,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  
  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 40,
    marginTop: 24,
  },
  footerText: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 18,
  },
});