import { StyleSheet, Text, View, TouchableOpacity, Dimensions, BackHandler } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TabView, SceneMap } from "react-native-tab-view";

const FirstTab = () => (
  <View style={styles.scene1}>
    <Text>This is the content for Tab 1.</Text>
  </View>
);

const SecondTab = () => (
  <View style={styles.scene2}>
    <Text>This is the content for Tab 2.</Text>
  </View>
);

const Duty = ({ navigation }) => {
  // State for TabView index and routes
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Tab 1" },
    { key: "second", title: "Tab 2" },
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
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.dutyHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#fff" style={styles.backicon} />
        </TouchableOpacity>
        <Text style={styles.dutyName}>Duty Allotment</Text>
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
                  { backgroundColor: index === i ? "#007ab3" : "#f0f0f0" }, // Change active tab color
                ]}
                onPress={() => setIndex(i)}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: index === i ? "#fff" : "#007ab3" }, // Change text color for active tab
                  ]}
                >
                  {route.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default Duty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8efff',
  },
  dutyHeader: {
    height: 60,
    width: "100%",
    backgroundColor: "#007ab3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backicon: {
    marginRight: 15,
  },
  dutyName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  tabView: {
    flex: 1,
  },
  scene1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
