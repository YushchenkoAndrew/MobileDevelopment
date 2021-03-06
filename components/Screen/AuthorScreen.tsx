import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ParamList } from "../../App";

interface AuthorScreenProps {
  name?: string;
  navigation?: BottomTabNavigationProp<ParamList>;
}

export default class HomeScreen extends React.Component<AuthorScreenProps> {
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
