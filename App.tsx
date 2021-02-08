import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import TabBar from "./components/TabBar";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Testing...</Text>
      <Image source={require("./assets/icons/Icon-512.png")} style={{ width: 200, height: 200 }} />

      <Text style={{ fontSize: 24, color: "#F00" }}>Hello world</Text>

      <StatusBar style="auto" />
      <TabBar name={"Andrew Y"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
