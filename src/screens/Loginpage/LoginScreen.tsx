import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    // Basic validation
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://nishaengineeringworks.in/velearn/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.message === 'Login successful') {
        // Store token and user data
        await AsyncStorage.setItem('authToken', 'your-token-here'); // Replace with actual token if API provides
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));

        // Store credentials if remember me is checked
        if (rememberMe) {
          await AsyncStorage.setItem('rememberedEmail', email.trim());
        } else {
          await AsyncStorage.removeItem('rememberedEmail');
        }

        // Navigate to home screen
        navigation.replace('MainTabs');
        
        // Show success message
        Alert.alert('Success', data.message || 'Login successful');
      } else {
        // Handle API errors
        const errorMessage = data.message || 'Login failed. Please check your credentials.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Network error. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const loadRememberedEmail = async () => {
      try {
        const rememberedEmail = await AsyncStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
          setEmail(rememberedEmail);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Error loading remembered email:', error);
      }
    };
    
    loadRememberedEmail();
  }, []);

  const handleGoogleSignIn = () => {
    // Google sign-in implementation
    // For now, navigate directly
    navigation.replace('MainTabs');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  const bottomPadding = Math.max(insets.bottom, 20) + (Platform.OS === 'ios' ? 40 : 60);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Icon name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Welcome Back</Text>
          <Text style={styles.headerSubtitle}>
            Sign in to continue your learning journey
          </Text>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Image
              source={require('../../images/logo/favicon.png')}
              style={styles.faviconImage}
              resizeMode="contain"
            />
          </View>
          <Image
            source={require('../../images/logo/velearn-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Icon name="mail" size={20} color={Colors.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={Colors.gray}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              editable={!loading}
              returnKeyType="next"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Icon name="lock-closed" size={20} color={Colors.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.gray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!loading}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color={Colors.gray}
              />
            </TouchableOpacity>
          </View>

          {/* Remember & Forgot Password */}
          <View style={styles.rememberContainer}>
            <TouchableOpacity 
              style={styles.rememberCheckbox}
              onPress={() => setRememberMe(!rememberMe)}
              disabled={loading}
            >
              <Icon 
                name={rememberMe ? 'checkbox' : 'square-outline'} 
                size={20} 
                color={rememberMe ? Colors.primary : Colors.gray} 
              />
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <>
                <Text style={styles.loginButtonText}>Log In</Text>
                <Icon name="arrow-forward" size={20} color={Colors.white} />
              </>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={[styles.socialButton, loading && styles.socialButtonDisabled]} 
              onPress={handleGoogleSignIn}
              disabled={loading}
            >
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.socialButton, styles.facebookButton, loading && styles.socialButtonDisabled]}
              disabled={loading}
            >
              <Icon name="logo-facebook" size={24} color="#1877F2" />
              <Text style={[styles.socialButtonText, styles.facebookText]}>
                Facebook
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp} disabled={loading}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.white 
  },
  scrollContainer: { 
    flexGrow: 1,
  },
  header: { 
    paddingHorizontal: 25, 
    paddingTop: 60, 
    paddingBottom: 20 
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: Colors.primary, 
    marginBottom: 10 
  },
  headerSubtitle: { 
    fontSize: 16, 
    color: Colors.gray, 
    lineHeight: 24 
  },
  logoContainer: { 
    alignItems: 'center', 
    marginVertical: 20 
  },
  logo: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faviconImage: {
    width: 80,
    height: 80,
  },
  logoImage: {
    width: 150,
    height: 80,
  },
  form: { 
    paddingHorizontal: 25, 
    marginTop: 20 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  inputIcon: { 
    marginRight: 15,
    flexShrink: 0,
  },
  input: { 
    flex: 1, 
    fontSize: 16, 
    color: Colors.primary, 
    paddingVertical: 15 
  },
  passwordToggle: { 
    padding: 10,
    flexShrink: 0,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  rememberCheckbox: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flexShrink: 0,
  },
  rememberText: { 
    fontSize: 14, 
    color: Colors.gray, 
    marginLeft: 10 
  },
  forgotText: { 
    fontSize: 14, 
    color: Colors.secondary,
    flexShrink: 0,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: Colors.lightGray,
    opacity: 0.7,
  },
  loginButtonText: { 
    color: Colors.white, 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginRight: 10 
  },
  dividerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 30 
  },
  divider: { 
    flex: 1, 
    height: 1, 
    backgroundColor: Colors.lightGray 
  },
  dividerText: { 
    marginHorizontal: 15, 
    fontSize: 14, 
    color: Colors.gray 
  },
  socialButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 30,
    gap: 10,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  socialButtonDisabled: {
    opacity: 0.5,
  },
  socialIcon: { 
    width: 24, 
    height: 24, 
    marginRight: 10 
  },
  socialButtonText: { 
    fontSize: 16, 
    color: Colors.primary 
  },
  facebookButton: { 
    borderColor: '#1877F2' 
  },
  facebookText: { 
    color: '#1877F2' 
  },
  signUpContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 20,
    flexWrap: 'wrap',
  },
  signUpText: { 
    fontSize: 16, 
    color: Colors.gray 
  },
  signUpLink: { 
    fontSize: 16, 
    color: Colors.secondary, 
    fontWeight: 'bold' 
  },
});

export default LoginScreen;