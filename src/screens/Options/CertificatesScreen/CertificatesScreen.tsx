// screens/CertificatesScreen.tsx
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
  Share,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../theme/colors';


interface Certificate {
  id: string;
  title: string;
  course: string;
  issueDate: string;
  completionDate: string;
  certificateId: string;
  grade: string;
  instructor: string;
  verified: boolean;
  downloadable: boolean;
  thumbnail: string;
}

const CertificatesScreen: React.FC = () => {
  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'React Native Mastery',
      course: 'Advanced Mobile Development',
      issueDate: 'Dec 15, 2023',
      completionDate: 'Dec 10, 2023',
      certificateId: 'RN-2023-001',
      grade: 'A+',
      instructor: 'Alex Johnson',
      verified: true,
      downloadable: true,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: 'UI/UX Design Expert',
      course: 'User Interface Design',
      issueDate: 'Nov 30, 2023',
      completionDate: 'Nov 25, 2023',
      certificateId: 'UX-2023-045',
      grade: 'A',
      instructor: 'Sarah Chen',
      verified: true,
      downloadable: true,
      thumbnail: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      course: 'Web Development Bootcamp',
      issueDate: 'Oct 20, 2023',
      completionDate: 'Oct 15, 2023',
      certificateId: 'FS-2023-089',
      grade: 'A+',
      instructor: 'Mike Wilson',
      verified: true,
      downloadable: false,
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  const stats = [
    { label: 'Total', value: '12', color: Colors.primary },
    { label: 'Verified', value: '10', color: Colors.success },
    { label: 'In Progress', value: '2', color: Colors.warning },
  ];

  const handleShareCertificate = async (certificate: Certificate) => {
    try {
      await Share.share({
        message: `I earned a certificate in ${certificate.course} from VeLearn! Certificate ID: ${certificate.certificateId}`,
        title: `Certificate: ${certificate.title}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share certificate');
    }
  };

  const handleViewCertificate = (certificate: Certificate) => {
    Alert.alert(
      'View Certificate',
      `Would you like to view or download your certificate for ${certificate.course}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'View', onPress: () => {} },
        { text: 'Download', onPress: () => {} },
      ]
    );
  };

  const renderCertificateCard = ({ item }: { item: Certificate }) => (
    <TouchableOpacity 
      style={styles.certificateCard}
      onPress={() => handleViewCertificate(item)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.certificateImage} />
      
      <View style={styles.certificateBadge}>
        <Icon name="ribbon-outline" size={14} color={Colors.white} />
        <Text style={styles.certificateBadgeText}>Certificate</Text>
      </View>

      <View style={styles.certificateContent}>
        <View style={styles.certificateHeader}>
          <Text style={styles.certificateTitle}>{item.title}</Text>
          <View style={[
            styles.gradeBadge,
            { backgroundColor: item.grade === 'A+' ? Colors.success : Colors.primary }
          ]}>
            <Text style={styles.gradeText}>{item.grade}</Text>
          </View>
        </View>

        <Text style={styles.courseName}>{item.course}</Text>
        
        <View style={styles.certificateDetails}>
          <View style={styles.detailRow}>
            <Icon name="calendar-outline" size={14} color={Colors.gray} />
            <Text style={styles.detailText}>Issued: {item.issueDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="person-outline" size={14} color={Colors.gray} />
            <Text style={styles.detailText}>Instructor: {item.instructor}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="finger-print-outline" size={14} color={Colors.gray} />
            <Text style={styles.detailText}>ID: {item.certificateId}</Text>
          </View>
        </View>

        <View style={styles.certificateFooter}>
          <View style={styles.statusContainer}>
            {item.verified ? (
              <View style={styles.verifiedBadge}>
                <Icon name="checkmark-circle" size={14} color={Colors.success} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            ) : (
              <View style={styles.pendingBadge}>
                <Icon name="time-outline" size={14} color={Colors.warning} />
                <Text style={styles.pendingText}>Pending</Text>
              </View>
            )}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={() => handleShareCertificate(item)}
            >
              <Icon name="share-outline" size={16} color={Colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.downloadButton,
                !item.downloadable && styles.downloadButtonDisabled
              ]}
              disabled={!item.downloadable}
            >
              <Icon 
                name={item.downloadable ? "download-outline" : "download-off-outline"} 
                size={16} 
                color={item.downloadable ? Colors.white : Colors.gray} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Icon name="ribbon-outline" size={32} color={Colors.white} />
            <Text style={styles.title}>Certificates</Text>
            <Text style={styles.subtitle}>Your earned achievements</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Certificates</Text>
          
          <FlatList
            data={certificates}
            renderItem={renderCertificateCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.certificatesList}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certificate Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.primaryAction}>
              <Icon name="add-circle-outline" size={20} color={Colors.white} />
              <Text style={styles.primaryActionText}>Request Certificate</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryAction}>
              <Icon name="search-outline" size={20} color={Colors.primary} />
              <Text style={styles.secondaryActionText}>Verify Certificate</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle-outline" size={24} color={Colors.primary} />
            <Text style={styles.infoTitle}>About Certificates</Text>
          </View>
          <Text style={styles.infoText}>
            • Certificates are issued upon successful course completion{'\n'}
            • All certificates are digitally verified and shareable{'\n'}
            • You can download certificates in PDF format{'\n'}
            • Employers can verify certificates using the certificate ID
          </Text>
        </View>

        <View style={styles.printSection}>
          <TouchableOpacity style={styles.printButton}>
            <Icon name="print-outline" size={20} color={Colors.white} />
            <Text style={styles.printButtonText}>Print All Certificates</Text>
          </TouchableOpacity>
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
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.white,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: -20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: '500',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 16,
  },
  certificatesList: {
    paddingBottom: 8,
  },
  certificateCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  certificateImage: {
    width: '100%',
    height: 120,
  },
  certificateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  certificateBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  certificateContent: {
    padding: 16,
  },
  certificateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  certificateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    flex: 1,
    marginRight: 12,
  },
  gradeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 40,
    alignItems: 'center',
  },
  gradeText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  courseName: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 12,
  },
  certificateDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 13,
    color: Colors.gray,
    marginLeft: 8,
  },
  certificateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flex: 1,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.success}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    color: Colors.success,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.warning}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  pendingText: {
    color: Colors.warning,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  downloadButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButtonDisabled: {
    backgroundColor: Colors.lightGray,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 16,
  },
  primaryActionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.primary}10`,
    paddingVertical: 14,
    borderRadius: 16,
  },
  secondaryActionText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoSection: {
    padding: 20,
    backgroundColor: `${Colors.primary}08`,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 8,
  },
  infoText: {
    fontSize: 13,
    color: Colors.gray,
    lineHeight: 20,
  },
  printSection: {
    padding: 16,
    paddingBottom: 24,
  },
  printButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    paddingVertical: 16,
    borderRadius: 16,
  },
  printButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CertificatesScreen;