import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput,SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const Login = () => {
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);



  const navigation =useNavigation()

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

  const handelLogin = () =>{
    navigation.navigate('MainScreen')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/attendance-logo.png')}
        style={styles.logoimg}
        resizeMode="contain"
      />
      <Text style={styles.usertext}>User Login</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username:</Text>
        <View style={[styles.inputContainer, focusedInput === 'phonenumber' && styles.inputContainerFocused]}>
          <Icon name="person" size={24} color="#a19f9f" style={[styles.inputIcon]} />
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
          <Icon name="lock" size={24} color="#a19f9f" style={[styles.inputIcon]} />
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

        <TouchableOpacity style={styles.loginButton} onPress={handelLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
   backgroundColor:'#d8efff',
    flex: 1,
    alignItems: 'center',
    paddingTop: 50, // Adjusted padding top for better spacing
  },
  logoimg: {
    height: 200, 
    width: 200, 
    marginBottom: 30,  // Increased bottom margin for spacing
  },
  formContainer: {
    width: '90%',  // Adjusted width for better layout
    backgroundColor: '#fff',
    padding: 25,  // Increased padding for better spacing
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',  // Add shadow for better visual
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    marginBottom: 20,
    height: 50,
    position: 'relative',
  },
  inputContainerFocused: {
    borderColor: '#0066aa',
  },
  input: {
    height: '100%',
    width: '85%',
    paddingLeft: 40,
    fontSize: 16,
    borderRadius: 8,
    
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
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
    marginTop: 20, // Added margin for spacing
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  usertext: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 20,  // Increased bottom margin for better spacing
  },
});
