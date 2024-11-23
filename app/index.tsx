import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import Login from "./LoginScreen/Login";
import MainScreen from "./MainScreen/MainScreen";
import Duty from "./Screens/Duty";
import Leave from "./Screens/Leave";


// Enable screens for better performance
enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // Single NavigationContainer wrapping the whole app's navigation
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {/* Login screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        {/* MainScreen */}
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Duty"
          component={Duty}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Leave"
          component={Leave}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
