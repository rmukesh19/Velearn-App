// screens/SignupScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupScreen: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignup = () => {
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!formData.password) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back-outline" size={24} color={Colors.black} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Create Account</Text>

            <View style={{ width: 40 }} />
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
             <Image
                source={require('../../images/logo/favicon.png')} // Replace with your logo image path
                style={styles.logoImage}
                resizeMode="contain"
                />
            <Image
              source={require('../../images/logo/velearn-logo.png')}
              style={styles.velearnLogo}
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Join our learning community</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Icon name="person-outline" size={20} color={Colors.gray} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={formData.fullName}
                onChangeText={t => handleInputChange('fullName', t)}
                placeholderTextColor={Colors.lightGray}
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={20} color={Colors.gray} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={formData.email}
                onChangeText={t => handleInputChange('email', t)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={Colors.lightGray}
              />
            </View>

            {/* Phone */}
            <View style={styles.inputContainer}>
              <Icon name="call-outline" size={20} color={Colors.gray} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={formData.phone}
                onChangeText={t => handleInputChange('phone', t)}
                keyboardType="phone-pad"
                placeholderTextColor={Colors.lightGray}
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} color={Colors.gray} />
              <TextInput
                style={[styles.input, { paddingRight: 40 }]}
                placeholder="Password"
                value={formData.password}
                onChangeText={t => handleInputChange('password', t)}
                secureTextEntry={!showPassword}
                placeholderTextColor={Colors.lightGray}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={Colors.gray}
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} color={Colors.gray} />
              <TextInput
                style={[styles.input, { paddingRight: 40 }]}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={t => handleInputChange('confirmPassword', t)}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor={Colors.lightGray}
                onSubmitEditing={handleSignup}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={Colors.gray}
                />
              </TouchableOpacity>
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
              disabled={isLoading}
            >
              <Text style={styles.signupButtonText}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            {/* Login */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.termsText}>
              By signing up, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
   logoImage: {
    width: 150,
    height: 80,
  },
  velearnLogo: {
    width: 180,
    height: 50,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.gray,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
    marginLeft: 12,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  signupButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  signupButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  loginText: {
    color: Colors.gray,
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default SignupScreen;
