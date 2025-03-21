import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera"; // Use Camera, CameraType, useCameraPermissions from expo-camera
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import HeaderScreen from "../Components/HeaderScreen";
import Icon from "react-native-vector-icons/MaterialIcons";



const MainScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [facing, setFacing] = useState("front");
  const [empData, setEmpData] = useState(''); // Corrected state variable
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cameraRef = useRef(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  // Use the new hook for permissions
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraStatus = await requestCameraPermission();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(
        cameraStatus.status === "granted" &&
        mediaLibraryStatus.status === "granted"
      );
    };

    requestPermissions();
  }, []);

  const getDate = () => {
    axios.get(`https://673890ed4eb22e24fca84f40.mockapi.io/MMA/MMA`)
      .then((res) => {
        setEmpData(res.data)
      })
      .catch((error) => {
        Alert.alert("Error", "Couldnot get data")
      });
  };

  useEffect(()=>{
    getDate()
  })
  


  // if (loading) return ;
  if (error) return <Text>Error: {error}</Text>;

  const handleCheckInOut = async () => {
    if (!cameraRef.current) {
      console.error("Camera is not initialized");
      Alert.alert("Error", "Camera is not ready.");
      return;
    }

    try {
      setIsCameraVisible(false);  // Hide camera view once the picture is taken

      // Capture the picture
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5, // You can adjust quality as needed
        base64: false, // Set to true if you need base64 encoding
      });

      // Alert for debugging
      console.log(photo);
      Alert.alert("Captured Photo", `Photo URI: ${photo.uri}`);

      if (photo.uri) {
        setPhotoUri(photo.uri);

        // Save the photo to the media library
        await MediaLibrary.saveToLibraryAsync(photo.uri);

        const currentTime = new Date().toISOString(); // Use ISO format for timestamp

        // Handle check-in/check-out logic
        if (!isCheckedIn) {
          setCheckInTime(currentTime);
        } else {
          setCheckOutTime(currentTime);
        }

        // Prepare FormData for API call
        const formData = new FormData();
        formData.append("photo", {
          uri: photo.uri,
          type: "image/jpeg",
          name: isCheckedIn ? "checkout.jpg" : "checkin.jpg",
        });
        formData.append("time", currentTime);

        // Make the API call
        const response = await axios.post(
          "https://makemyattendance.free.beeceptor.com/api/mma",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("API Response:", response.data);

        // Show success message
        Alert.alert(
          `${isCheckedIn ? "Check-out" : "Check-in"} Successful`,
          `You have successfully ${isCheckedIn ? "checked out" : "checked in"} at ${currentTime}`
        );

        // Toggle check-in/check-out state
        setIsCheckedIn(!isCheckedIn);
      } else {
        console.error("Failed to capture image: No URI found");
        Alert.alert("Error", "Failed to capture image");
      }
    } catch (error) {
      console.error("Error capturing image:", error);
      Alert.alert("Error", `Something went wrong: ${error.message}`);
    }
  };


  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera or media library</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isCameraVisible ? (
        <>
          <HeaderScreen />
          <View style={styles.mainScreen}>
            <View style={styles.employeeData}>
              <Text style={styles.Company}>MINDTRACK TECHNOLOGY PVT LTD</Text>
              {empData.length > 0 ? (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text style={styles.employeeName}>{empData.empname || "No employee data"}</Text>
                  <Text style={styles.designation}>{empData.designation || "No employee data"}</Text>
                </View>
              ) : (
                <ActivityIndicator size="small" color="#858585" />
              )}

            </View>

            <TouchableOpacity
              style={[
                styles.InOut,
                { backgroundColor: isCheckedIn ? "red" : "#1ba000" },
              ]}
              onPress={() => setIsCameraVisible(true)}
            >
              <Text style={styles.InOutData}>{isCheckedIn ? "OUT" : "IN"}</Text>
            </TouchableOpacity>

            <View>
              <Text style={styles.duty}>Today's Duty Allotment</Text>
            </View>
            <View>
              {empData ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={styles.intime}>
                    Check-in: {empData.checkin || "No check-in data"}
                  </Text>
                  <Text style={styles.intime}>
                    Check-out: {empData.checkout || "No check-out data"}
                  </Text>
                </View>
              ) : (
                <ActivityIndicator size="small" color="#a5a5a5" />
              )}
            </View>
          </View>
        </>
      ) : (
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          ratio="16:9"
        >
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCheckInOut}
          >
            <Icon name="camera" size={80} color="#ffffff" />
          </TouchableOpacity>
        </CameraView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d8efff" },
  mainScreen: { flex: 1, alignItems: "center" },
  employeeData: { paddingTop: 30 },
  Company: { fontSize: 20, textAlign: "center", fontWeight: "600" },
  employeeName: {
    textAlign: "center",
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "600",
  },
  designation: { textAlign: "center", fontSize: 17, padding: 5 },
  InOut: {
    margin: 45,
    height: 100,
    width: 100,
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  InOutData: { fontSize: 20, color: "white" },
  duty: { fontSize: 17, fontWeight: "600", paddingBottom: 20 },
  Check: {
    width: "90%",
    alignItems: "flex-start",
    paddingLeft: 10,
    margin: 15,
  },
  intime: { fontSize: 16, margin: 10, fontWeight: "600" },
  checktime: { fontWeight: "500" },
  camera: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    aspectRatio: 9 / 16,
  },
  captureButton: {
    position: "absolute",
    bottom: 20,
    left: "40%",
    marginLeft: -40,
    backgroundColor: "transparent",
    padding: 10,
  },
});

export default MainScreen;
