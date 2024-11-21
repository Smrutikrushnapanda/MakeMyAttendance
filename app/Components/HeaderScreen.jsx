import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderScreen = () => {
  const navigation = useNavigation();

  const handleWork = () => {
    navigation.navigate("Duty");
  };

  const handleCalendar = () => {
    // Logic for calendar
  };

  const handlePassword = () => {
    // Logic for password
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.navigate("Login");
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
