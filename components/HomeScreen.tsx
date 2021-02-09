import * as React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamList } from "../App";

interface HomeScreenProps {
  name?: string;
  navigation?: BottomTabNavigationProp<ParamList>;
}

export default class HomeScreen extends React.Component<HomeScreenProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Yushchenko Andrew</Text>
        <Text>Group IO-82</Text>
        <Text>3K IO-8229</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
