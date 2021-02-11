import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import AuthorScreen from "./components/Screen/AuthorScreen";
import ChartScreen from "./components/Screen/ChartScreen";
import TestScreen from "./components/Screen/TestScreen";

interface Icon {
  name: string;
  size: number;
  color: string;
}

export type ParamList = {
  Author: Icon | undefined;
  Chart: Icon | undefined;
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
        <Tab.Screen name="Author" component={AuthorScreen} initialParams={{ name: "person-outline", size: 24, color: "black" }} />
        <Tab.Screen name="Chart" component={ChartScreen} initialParams={{ name: "bar-chart-outline", size: 24, color: "black" }} />
        <Tab.Screen name="Test" component={TestScreen} initialParams={{ name: "leaf-outline", size: 24, color: "black" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  activeTintColor: "#ec7063",
  inactiveTintColor: "gray",
};
