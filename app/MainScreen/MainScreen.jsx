import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';
import HeaderScreen from '../Components/HeaderScreen';

const MainScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(
        cameraStatus.status === 'granted' && mediaLibraryStatus.status === 'granted'
      );
    })();
  }, []);

  const handleCheckInOut = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);

      // Save photo to device gallery (optional)
      await MediaLibrary.saveToLibraryAsync(photo.uri);

      const currentTime = new Date().toLocaleString();
      if (!isCheckedIn) {
        setCheckInTime(currentTime);
        Alert.alert('Check-in Successful', 'You have successfully checked in!');
      } else {
        setCheckOutTime(currentTime);
        Alert.alert('Check-out Successful', 'You have successfully checked out!');
      }

      // Send data to API
      const formData = new FormData();
      formData.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: isCheckedIn ? 'checkout.jpg' : 'checkin.jpg',
      });
      formData.append('time', currentTime);

      await axios.post('https://your-api-endpoint.com/check', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsCheckedIn(!isCheckedIn);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong while processing your action.');
    } finally {
      setIsCameraVisible(false); // Hide the camera after the operation
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
      <HeaderScreen />
      <View style={styles.mainScreen}>
        <View style={styles.employeeData}>
          <Text style={styles.Company}>MINDTRACK TECHNOLOGY PVT LTD</Text>
          <Text style={styles.employeeName}>SMRUTI KRUSHNA PANDA</Text>
          <Text style={styles.designation}>Associate Designer</Text>
        </View>
        
        {!isCameraVisible && (
          <TouchableOpacity
            style={[styles.InOut, { backgroundColor: isCheckedIn ? 'red' : '#1ba000' }]}
            onPress={() => {
              console.log('Camera visibility set to true');
              setIsCameraVisible(true);
            }}
          >
            <Text style={styles.InOutData}>{isCheckedIn ? 'OUT' : 'IN'}</Text>
          </TouchableOpacity>
        )}

        {isCameraVisible && (
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.front} // Or Camera.Constants.Type.back if preferred
            ref={cameraRef}
          >
            <TouchableOpacity style={styles.captureButton} onPress={handleCheckInOut}>
              <Text style={styles.captureButtonText}>Capture</Text>
            </TouchableOpacity>
          </Camera>
        )}

        <View>
          <Text style={styles.duty}>Today's Duty Allotment</Text>
        </View>
        <View style={styles.Check}>
          {checkInTime && (
            <Text style={styles.intime}>
              <Text>Check In: </Text>
              <Text style={styles.checktime}>{checkInTime}</Text>
            </Text>
          )}
          {checkOutTime && (
            <Text style={styles.intime}>
              <Text>Check Out: </Text>
              <Text style={styles.checktime}>{checkOutTime}</Text>
            </Text>
          )}
        </View>

        {Platform.OS === 'web' && (
          <Text style={styles.cameraMessage}>Web does not support camera functionality.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8efff',
  },
  mainScreen: {
    flex: 1,
    alignItems: 'center',
  },
  employeeData: {
    paddingTop: 30,
  },
  Company: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  employeeName: {
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 18,
  },
  designation: {
    textAlign: 'center',
    fontSize: 17,
    padding: 5,
  },
  InOut: {
    margin: 45,
    height: 100,
    width: 100,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  InOutData: {
    fontSize: 20,
    color: 'white',
  },
  duty: {
    fontSize: 17,
    fontWeight: '600',
    paddingBottom: 20,
  },
  Check: {
    width: '90%',
    alignItems: 'flex-start',
    paddingLeft: 10,
    margin: 15,
  },
  intime: {
    fontSize: 16,
    margin: 10,
    fontWeight: '600',
  },
  checktime: {
    fontWeight: '500',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: 300, // Ensure camera has visible height
  },
  cameraMessage: {
    fontSize: 16,
    color: 'gray',
    padding: 20,
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    marginLeft: -50,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
