import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import "expo-screen-orientation";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import { ParamList } from "../../App";

interface ChartScreenProps {
  navigation?: BottomTabNavigationProp<ParamList>;
}

// Given Function by task
const func = (x: number) => x * x * x;

export default class ChartScreen extends React.Component<ChartScreenProps> {
  iterFunc(func: Function, min: number, max: number, step: number) {
    let coords = [];
    for (let x = min; x < max; x += step) coords.push({ x, y: func(x) });
    return coords;
  }

  render() {
    return (
      <View style={styles.components}>
        <Text>Chart Screen</Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine data={this.iterFunc(func, -3, 3, 0.01)} />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
