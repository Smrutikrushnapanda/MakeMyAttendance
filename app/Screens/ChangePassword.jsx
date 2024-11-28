import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppHead from "../Components/AppHead";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const STORED_OLD_PASSWORD = "oldPassword123"; // Simulate stored password

  const handleChangePassword = () => {
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (currentPassword !== STORED_OLD_PASSWORD) {
      setError("Current password is incorrect.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    Alert.alert("Success", "Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <View style={styles.container}>
      <AppHead headerName="Change Password" />
      <View style={styles.inputBox}>
        {/* Current Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            <Icon
              name={showCurrentPassword ? "visibility-off" : "visibility"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* New Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Icon
              name={showNewPassword ? "visibility-off" : "visibility"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon
              name={showConfirmPassword ? "visibility-off" : "visibility"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8efff",
  },
  inputBox: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007ab3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});
