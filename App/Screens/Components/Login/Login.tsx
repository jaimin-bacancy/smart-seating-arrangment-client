import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppImages } from '@Theme';
import { Authentication, goToNextScreen, setItemInStorage } from '@Utils';
import { BottomView, ButtonComponent } from '@SubComponents';
import { CustomText, Layout } from '@CommonComponent';
import { Route } from '@Routes/AppRoutes';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const Login = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    email: '',
    password: '',
    isSecureTextEntry: true,
    isProcessing: false,
    rememberMe: false,
    emailError: '',
    passwordError: '',
  });

  const {
    email,
    password,
    isSecureTextEntry,
    isProcessing,
    rememberMe,
    emailError,
    passwordError,
  } = state;

  const onChangeText = (text: string, type: string) => {
    setState(prev => ({
      ...prev,
      [type]: text,
    }));
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setState(prev => ({
        ...prev,
        emailError: 'Email is required',
      }));
      return false;
    }

    if (!EMAIL_REGEX.test(email)) {
      setState(prev => ({
        ...prev,
        emailError: 'Please enter a valid email address',
      }));
      return false;
    }

    setState(prev => ({
      ...prev,
      emailError: '',
    }));
    return true;
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setState(prev => ({
        ...prev,
        passwordError: 'Password is required',
      }));
      return false;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setState(prev => ({
        ...prev,
        passwordError:
          'Password must be at least 8 characters long, contain a number and a capital letter',
      }));
      return false;
    }

    setState(prev => ({
      ...prev,
      passwordError: '',
    }));
    return true;
  };

  const onShowPassword = () => {
    setState(prev => ({
      ...prev,
      isSecureTextEntry: !prev.isSecureTextEntry,
    }));
  };

  const onToggleRemember = () => {
    setState(prev => ({
      ...prev,
      rememberMe: !prev.rememberMe,
    }));
  };

  const onLogin = async () => {
    try {
      setState(prev => ({
        ...prev,
        isProcessing: true,
        emailError: '',
        passwordError: '',
      }));

      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();

      if (!isEmailValid || !isPasswordValid) {
        return;
      }

      // Make API call here
      await setItemInStorage(Authentication.TOKEN, 'set login token');
      goToNextScreen(navigation, Route.HomeScreen);
    } catch (error) {
      // Handle error here
      console.error(error);
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <CustomText style={styles.logoText}>SO</CustomText>
          </View>
          <CustomText style={styles.title}>Smart Office</CustomText>
          <CustomText style={styles.subtitle}>
            Sign in to your workspace
          </CustomText>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="Corporate Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={text => onChangeText(text, 'email')}
            onBlur={validateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
          />
          {emailError ? (
            <CustomText style={styles.errorText}>{emailError}</CustomText>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, passwordError ? styles.inputError : null]}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={text => onChangeText(text, 'password')}
              onBlur={validatePassword}
              secureTextEntry={isSecureTextEntry}
              autoCapitalize="none"
              autoComplete="password"
            />
            <Pressable onPress={onShowPassword} style={styles.eyeIcon}>
              <Image
                source={{
                  uri: isSecureTextEntry
                    ? AppImages.passwordClosed
                    : AppImages.passwordOpen,
                }}
                style={{ width: 18, height: 18, resizeMode: 'contain' }}
              />
            </Pressable>
          </View>
          {passwordError ? (
            <CustomText style={styles.errorText}>{passwordError}</CustomText>
          ) : null}
        </View>

        <View style={styles.rememberContainer}>
          <Pressable style={styles.checkbox} onPress={onToggleRemember}>
            {(rememberMe && (
              <Image
                source={{ uri: AppImages.tick }}
                style={{ width: 20, height: 20 }}
              />
            )) || <View style={styles.checkView} />}
            <CustomText style={styles.checkboxText}>Remember me</CustomText>
          </Pressable>
          <Pressable>
            <CustomText style={styles.forgotText}>Forgot?</CustomText>
          </Pressable>
        </View>

        <ButtonComponent
          title="Sign In"
          onPress={onLogin}
          style={styles.signInButton}
          isProcessing={isProcessing}
        />

        <Pressable style={styles.ssoButton}>
          <CustomText style={styles.ssoText}>
            Sign in with Corporate SSO
          </CustomText>
        </Pressable>
      </View>

      <View style={styles.poweredBy}>
        <CustomText style={styles.poweredByText}>POWERED BY BACANCY</CustomText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '55%',
    transform: [{ translateY: -12 }],
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 8,
    color: '#000',
    fontSize: 14,
  },
  forgotText: {
    color: '#6C63FF',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  ssoButton: {
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
  },
  ssoText: {
    color: '#666',
    fontSize: 14,
  },
  poweredBy: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  poweredByText: {
    color: '#666',
    fontSize: 12,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  checkView: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Login;
