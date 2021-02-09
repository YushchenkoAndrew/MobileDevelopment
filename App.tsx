import React from "react";
import HomeScreen from "./components/HomeScreen";
import TestScreen from "./components/TestScreen";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

interface Icon {
  name: string;
  size: number;
  color: string;
}

export type ParamList = {
  General: Icon | undefined;
  Test: Icon | undefined;
};

const Tab = createBottomTabNavigator<ParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            return <Ionicons {...route.params} color={focused ? styles.activeTintColor : (route.params as Icon).color} />;
          },
        })}
        tabBarOptions={styles}
      >
        <Tab.Screen name="General" component={HomeScreen} initialParams={{ name: "person-outline", size: 24, color: "black" }} />
        <Tab.Screen name="Test" component={TestScreen} initialParams={{ name: "leaf-outline", size: 24, color: "black" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  activeTintColor: "#ec7063",
  inactiveTintColor: "gray",
};
