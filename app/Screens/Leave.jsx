import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TabView, SceneMap } from "react-native-tab-view";
import { DatePickerInput } from "react-native-paper-dates";

const Leave = ({ navigation }) => {
  const [inputDate, setInputDate] = useState(new Date()); // Move this inside the component

  const FirstTab = () => (
    <View style={styles.scene1}>
      <DatePickerInput
        locale="en"
        label="Birthdate"
        value={inputDate}
        onChange={(d) => setInputDate(d)}
        inputMode="start"
        style={styles.datePicker}
        mode="outlined"
      />
    </View>
  );

  const SecondTab = () => (
    <View style={styles.scene2}>
      <Text>This is the content for Tab 2.</Text>
    </View>
  );

  // State for TabView index and routes
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Leave Request" },
    { key: "second", title: "Leave Status" },
  ]);

  // Scene mapping for rendering the content of each tab
  const renderScene = SceneMap({
    first: FirstTab,
    second: SecondTab,
  });

  useEffect(() => {
    const backAction = () => {
      navigation.goBack(); // This will navigate to the previous screen
      return true; // Prevent the default back action
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove(); // Clean up the listener when the component unmounts
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
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

      {/* TabView Section */}
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height:50
  },
  scene2: {
    flex: 1,
    justifyContent: "center",
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
  datePicker: {
    width: 250,
    marginTop: 20,
    height:50
  },
});
