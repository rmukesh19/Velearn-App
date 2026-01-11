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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Define types for API response
interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  token: string;
  user: User;
}

const API_BASE_URL = 'https://nishaengineeringworks.in/velearn/api';

const SignupScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
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

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      Alert.alert('Error', 'Please enter a password');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare the request payload
      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        // Include phone if provided
        ...(formData.phone.trim() && { phone: formData.phone.trim() }),
      };

      console.log('Sending registration request:', {
        ...payload,
        password: '***' // Hide password in logs
      });

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: ApiResponse = await response.json();

      console.log('API Response:', data);

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      if (data.status) {
        // Success - store token and user data
        // You might want to use AsyncStorage or your state management here
        console.log('Registration successful:', data);
        
        // Store token (example using AsyncStorage - you'll need to install and import it)
        // await AsyncStorage.setItem('userToken', data.token);
        // await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        
        Alert.alert(
          'Success',
          data.message || 'Account created successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate to Home or Login screen
                // You might want to pass the token/user data
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' as never }],
                });
              },
            },
          ]
        );
      } else {
        // API returned status: false
        Alert.alert('Registration Failed', data.message || 'Something went wrong');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle specific error cases
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.message.includes('email has already been taken')) {
        errorMessage = 'This email is already registered. Please use a different email or login.';
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const bottomPadding = Math.max(insets.bottom, 20) + (Platform.OS === 'ios' ? 40 : 60);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              disabled={isLoading}
            >
              <Icon name="arrow-back-outline" size={24} color={Colors.black} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Create Account</Text>

            <View style={styles.headerSpacer} />
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../images/logo/favicon.png')}
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
              <Icon name="person-outline" size={20} color={Colors.gray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={formData.fullName}
                onChangeText={t => handleInputChange('fullName', t)}
                placeholderTextColor={Colors.lightGray}
                editable={!isLoading}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={20} color={Colors.gray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={formData.email}
                onChangeText={t => handleInputChange('email', t)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={Colors.lightGray}
                editable={!isLoading}
                returnKeyType="next"
              />
            </View>

            {/* Phone (Optional) */}
            <View style={styles.inputContainer}>
              <Icon name="call-outline" size={20} color={Colors.gray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChangeText={t => handleInputChange('phone', t)}
                keyboardType="phone-pad"
                placeholderTextColor={Colors.lightGray}
                editable={!isLoading}
                returnKeyType="next"
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} color={Colors.gray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={formData.password}
                onChangeText={t => handleInputChange('password', t)}
                secureTextEntry={!showPassword}
                placeholderTextColor={Colors.lightGray}
                editable={!isLoading}
                returnKeyType="next"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
                disabled={isLoading}
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
              <Icon name="lock-closed-outline" size={20} color={Colors.gray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={t => handleInputChange('confirmPassword', t)}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor={Colors.lightGray}
                editable={!isLoading}
                returnKeyType="done"
                onSubmitEditing={handleSignup}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
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
              style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
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
              <TouchableOpacity 
                onPress={() => navigation.navigate('Login' as never)}
                disabled={isLoading}
              >
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
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40,
    flexShrink: 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: 80,
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
  inputIcon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
    marginLeft: 12,
    marginRight: 12,
  },
  eyeIcon: {
    padding: 8,
    flexShrink: 0,
  },
  signupButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  signupButtonDisabled: {
    backgroundColor: Colors.lightGray,
    opacity: 0.7,
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
    flexWrap: 'wrap',
  },
  loginText: {
    color: Colors.gray,
    fontSize: 16,
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});

export default SignupScreen;