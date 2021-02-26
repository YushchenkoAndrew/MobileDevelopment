import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import AuthorScreen from "./components/Screen/AuthorScreen";
import ChartScreen from "./components/Screen/ChartScreen";
import ImageListScreen from "./components/Screen/ImageListScreen";
import LibraryScreen from "./components/Screen/LibraryScreen";
import TestScreen from "./components/Screen/TestScreen";

interface Icon {
  name: string;
  size: number;
  color: string;
}

export type ParamList = {
  Author: Icon | undefined;
  Chart: Icon | undefined;
  Library: Icon | undefined;
  Images: Icon | undefined;
  Test: Icon | undefined;
};

const Tab = createBottomTabNavigator<ParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (!focused) return <Ionicons {...route.params} />;

            const { name, size } = route.params ?? { name: "help", size: 24 };
            return <Ionicons name={name.split("-").slice(0, -1).join("-")} size={size} color={styles.activeTintColor} />;
          },
        })}
        tabBarOptions={styles}
      >
        <Tab.Screen name="Author" component={AuthorScreen} initialParams={{ name: "person-outline", size: 24, color: "black" }} />
        <Tab.Screen name="Chart" component={ChartScreen} initialParams={{ name: "bar-chart-outline", size: 24, color: "black" }} />
        <Tab.Screen name="Library" component={LibraryScreen} initialParams={{ name: "book-outline", size: 24, color: "black" }} />
        <Tab.Screen name="Images" component={ImageListScreen} initialParams={{ name: "images-outline", size: 24, color: "black" }} />
        <Tab.Screen name="Test" component={TestScreen} initialParams={{ name: "leaf-outline", size: 24, color: "black" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles: BottomTabBarOptions = {
  activeTintColor: "#ec7063",
  inactiveTintColor: "gray",
};
