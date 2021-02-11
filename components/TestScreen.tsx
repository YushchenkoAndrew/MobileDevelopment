import * as React from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamList } from "../App";
import test from "../src/Contents";
import Coordinate from "../src/CoordinateAY";

// FIXME: Temporary code
test();

// TODO: Add some testing
let coordsA = new Coordinate({ degree: 17, minutes: 30, seconds: 35.8344, compass: "S" });
let coordsB = new Coordinate({});

console.log(coordsA.toString());
console.log(coordsA.toStringDecimal());
console.log(coordsA.calcMiddle(coordsB)?.toString());

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
