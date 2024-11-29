import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert
  
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderScreen = () => {
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


  
  const handleWork = () => {
    navigation.navigate("Duty");
  };

  const handleCalendar = () => {
    navigation.navigate("Leave");
  };

  const handlePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem('userToken');
            setPhonenumber(''); // Clear the phone number input
            setPassword('');    // Clear the password input
            navigation.navigate('Login'); // Navigate to Login screen
          },
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.headerContainer}>
      {/* Logo Section */}
      <Image
        source={require("../../assets/images/attendance-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Icons Section */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={handleWork} activeOpacity={0.7}>
          <Icon
            name="work-outline"
            size={27}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCalendar} activeOpacity={0.7}>
          <Icon
            name="calendar-month"
            size={27}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePassword} activeOpacity={0.7}>
          <Icon
            name="lock-outline"
            size={27}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
          <Icon name="logout" size={27} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007ab3",
    paddingHorizontal: 1,
    height: 60,
    justifyContent: "space-between", // Space between logo and icons
  },
  logo: {
    height: 40,
    width: 120,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220, // Adjusted width to provide more space for icons
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5, // Adds space between icons
  },
});

export default HeaderScreen;
