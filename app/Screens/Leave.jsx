import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  SafeAreaView,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TabView, SceneMap } from "react-native-tab-view";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from 'axios';

const OPTIONS1 = [
  { label: "Morning Shift", value: "Morning Shift" },
  { label: "Day Shift", value: "Day Shift" },
  { label: "Night Shift", value: "Night Shift" },
  { label: "General Shift", value: "General Shift" },
  { label: "Tour Duty", value: "Tour Duty" },
  { label: "Weekly Off", value: "Weekly Off" },
];
const OPTIONS2 = [
  { label: "Sambhusil Manohar Das", value: "Sambhusil Manohar Das" },
  { label: "Rajesh Panda", value: "Rajesh Panda" },
  { label: "Chitaranjan samantray", value: "Chitaranjan samantray" },
  { label: "Deepsundar Rout", value: "Deepsundar Rout" },
  { label: "Himanshu Ranjan Mohanty", value: "Himanshu Ranjan Mohanty" },
  { label: "Biswajit Nath", value: "Biswajit Nath" },
];

const Leave = ({ navigation }) => {
  const [inputDate, setInputDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [shift, setShift] = useState(null);
  const [replacement, setReplacement] = useState(null);
  const [leaveData, setLeaveData] = useState([]);


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setInputDate(selectedDate);
  };

  const submitForm = async () => {
    const formData = {
      date: inputDate.toISOString(),
      shiftData: shift,
      replacementData: replacement
    };
    try {
      const response = await axios.post('https://673890ed4eb22e24fca84f40.mockapi.io/MMA/Login', formData);
      console.log('Response:', response.data);
      alert('Form submitted successfully!');
    }
    catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
    }
  }

  

  const getLeaveData = () => {
    axios
      .get("https://673890ed4eb22e24fca84f40.mockapi.io/MMA/Login")
      .then((res) => {
        setLeaveData(res.data || []); // Ensure fallback to an empty array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Could not get data");
        setLeaveData([]); // Fallback to an empty array
      });
  };

  useEffect(() => {
    getLeaveData()
  }, []);

  const FirstTab = () => (
    <View style={styles.scene1}>
      {/* Custom Date Picker with Icon */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInput}
      >
        <Text style={styles.dateText}>
          {inputDate.toLocaleDateString("en-US")}
        </Text>
        <Icon name="calendar-today" size={20} color="#007ab3" style={styles.dateIcon} />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={inputDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Dropdown 1 */}
      <Dropdown
        data={OPTIONS1}
        labelField="label"
        valueField="value"
        placeholder="Select Option"
        value={shift}
        onChange={(item) => setShift(item.value)}
        style={styles.dropInput}
      />

      {/* Dropdown 2 */}
      <Dropdown
        data={OPTIONS2}
        labelField="label"
        valueField="value"
        placeholder="Select Another Option"
        value={replacement}
        onChange={(item) => setReplacement(item.value)}
        style={styles.dropInput}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={submitForm}>
        <Text style={styles.submitName}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  const SecondTab = () => (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.scene2}>
        {
          leaveData.map((currentData, index) => (
            <View style={styles.leaveStatus} key={index}>
              <View style={styles.leaveItem}>
                <Text style={styles.leaveLabel}>Shift</Text>
                <Text style={styles.leaveValue}>{currentData.shiftData}</Text>
              </View>
  
              <View style={styles.leaveItem}>
                <Text style={styles.leaveLabel}>Date</Text>
                <Text style={styles.leaveValue}>
                  {new Date(currentData.date).toLocaleDateString()}
                </Text>
              </View>
  
              <View style={styles.leaveItem}>
                <Text style={styles.leaveLabel}>Status</Text>
                <Text style={styles.leaveValue}>
                  {currentData.status || "Pending"}
                </Text>
              </View>
  
              <View style={styles.leaveItem}>
                <Text style={styles.leaveLabel}>Replacement Employee</Text>
                <Text style={styles.leaveValue}>
                  {currentData.replacementData || "N/A"}
                </Text>
              </View>
            </View>
          ))
        }
      </View>
    </ScrollView>
  );
  

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Leave Request" },
    { key: "second", title: "Leave Status" },
  ]);

  const renderScene = SceneMap({
    first: FirstTab,
    second: SecondTab,
  });

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dutyHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={30}
            color="#fff"
            style={styles.backicon}
          />
        </TouchableOpacity>
        <Text style={styles.dutyName}>Leave Status</Text>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        style={styles.tabView}
        renderTabBar={(props) => (
          <View style={styles.tabBarContainer}>
            {props.navigationState.routes.map((route, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.tabButton,
                  {
                    backgroundColor: index === i ? "#007ab3" : "#f0f0f0",
                    borderBottomWidth: index === i ? 3 : 0,
                  },
                ]}
                onPress={() => setIndex(i)}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: index === i ? "#fff" : "#007ab3" },
                  ]}
                >
                  {route.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Leave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8efff",
  },
  dutyHeader: {
    height: 60,
    width: "100%",
    backgroundColor: "#007ab3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  backicon: {
    marginRight: 10,
  },
  dutyName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  tabView: {
    flex: 1,
  },
  scene1: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  scene2: {
    flex: 1,
    alignItems: "center",
  },
  tabBarContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "center",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#007ab3",

  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  dateIcon: {
    marginLeft: 10,
  },
  dropInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#007ab3",
    paddingHorizontal: 10,
    justifyContent: "center",
    marginTop: 20,
  },
  submitBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#007ab3",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 20,
  },
  submitName: {
    color: '#fff',
    textAlign: 'center'
  },
  scene2: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20
  },
  leaveStatus: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  leaveItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexWrap: "wrap", // Ensures text wraps within the container
},
leaveLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
},
leaveValue: {
    fontSize: 16,
    color: "#007ab3",
    fontWeight: "600",
    flex: 1, // Allows the name to take up remaining space
    marginLeft: 10,
    overflow: "hidden", // Ensures text is clipped if it overflows
    textOverflow: "ellipsis", // Adds ellipsis if text is too long
    maxWidth: "80%", // Ensures text wraps or ellipsizes
},

});