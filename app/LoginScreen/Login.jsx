import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Alert 
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';



const Login = () => {
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handlePhoneNumberChange = (text) => {
    const cleanedText = text.replace(/\D/g, '').slice(0, 10);
    setPhonenumber(cleanedText);
  };

  const validateInputs = () => {
    if (phonenumber.length !== 10) {
      Alert.alert('Invalid Input', 'Phone number must be 10 digits.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Invalid Input', 'Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    // Simulating an API call for user authentication
    setTimeout(async () => {
      setLoading(false);

      // Example: Replace this with actual API call and response handling
      const isAuthenticated = phonenumber === '1234567890' && password === 'password'; // Mock
      const mockToken = 'abcdef123456'; // Mock token

      if (isAuthenticated) {
        await AsyncStorage.setItem('userToken', mockToken);
        navigation.navigate('MainScreen');
      } else {
        Alert.alert('Login Failed', 'Invalid phone number or password.');
      }
    }, 1000);
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      navigation.navigate('MainScreen');
    }
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={50}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('../../assets/images/attendance-logo.png')}
            style={styles.logoimg}
            resizeMode="contain"
          />
          <Text style={styles.usertext}>User Login</Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Phone Number:</Text>
            <View style={[styles.inputContainer, focusedInput === 'phonenumber' && styles.inputContainerFocused]}>
              <Icon name="person" size={24} color="#a19f9f" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder='Enter Your Number'
                value={phonenumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType='phone-pad'
                maxLength={10}
                onFocus={() => handleFocus('phonenumber')}
                onBlur={handleBlur}
                placeholderTextColor="#a8a8a8"
              />
            </View>

            <Text style={styles.label}>Password:</Text>
            <View style={[styles.inputContainer, focusedInput === 'password' && styles.inputContainerFocused]}>
              <Icon name="lock" size={24} color="#a19f9f" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder='Enter Your Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                placeholderTextColor="#a8a8a8"
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                <Icon name={passwordVisible ? 'visibility-off' : 'visibility'} size={20} color="#a19f9f" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

// Styles remain the same as before


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8efff',
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  logoimg: {
    height: 150,
    width: 150,
    marginBottom: 20,
    marginTop:70
  },
  usertext: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.315)',
},
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 8,
    marginBottom: 15,
    height: 50,
    paddingLeft: 10,
  },
  inputContainerFocused: {
    borderColor: '#0066aa',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingLeft: 40,
    fontSize: 16,
    color: '#333',
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  loginButton: {
    backgroundColor: '#007ab3',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});