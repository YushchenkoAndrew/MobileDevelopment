import * as React from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamList } from "../App";

interface TestScreenProps {
  name?: string;
  navigation?: BottomTabNavigationProp<ParamList>;
}

export default class TestScreen extends React.Component<TestScreenProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
        <Image source={require("../assets/icons/Icon-144.png")} />
        <Button title="Home" onPress={() => this.props.navigation?.goBack()} />
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
