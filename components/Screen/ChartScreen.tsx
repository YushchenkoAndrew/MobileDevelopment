import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import "expo-screen-orientation";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import SwitchSelector, { ISwitchSelectorProps } from "react-native-switch-selector";
import { VictoryChart, VictoryLine, VictoryPie, VictoryTheme } from "victory-native";
import { ParamList } from "../../App";

interface ChartScreenProps {
  navigation?: BottomTabNavigationProp<ParamList>;
}

// Given Function by task
const func = (x: number) => x * x * x;
const pieData = [
  { y: 15, label: "15%", color: "#ffd54f" },
  { y: 25, label: "25%", color: "#866e2d" },
  { y: 45, label: "45%", color: "#90a4ae" },
  { y: 10, label: "10%", color: "#e91e63" },
  { y: 5, label: "5%", color: "#d1c4e9" },
];

export default class ChartScreen extends React.Component<ChartScreenProps> {
  state = { chart: "line" };

  iterFunc(func: Function, min: number, max: number, step: number) {
    let coords = [];
    for (let x = min; x <= max; x += step) coords.push({ x, y: func(x) });
    return coords;
  }

  onClick(chart: string) {
    return new Promise((resolve, reject) => {
      resolve(this.setState({ ...this.state, chart }));
    });
  }

  render() {
    return (
      <View style={styles.components}>
        <SwitchSelector {...switchProps} onPress={this.onClick.bind(this)} />
        {this.state.chart == "line" ? (
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine data={this.iterFunc(func, -3, 3, 0.2)} animate={{ duration: 2000 }} />
          </VictoryChart>
        ) : (
          <VictoryPie
            colorScale={pieData.map(({ color }) => color)}
            padAngle={() => 2}
            innerRadius={100}
            data={pieData.map(({ y, label }) => ({ y, label }))}
          />
        )}
      </View>
    );
  }
}

const options = [
  { label: "Line Chart", value: "line" },
  { label: "Pie Chart", value: "pie" },
];

const styles = StyleSheet.create({
  components: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  switchStyle: {
    width: 200,
  },
});

const switchProps: ISwitchSelectorProps = {
  initial: 0,
  textColor: "#7a44cf",
  selectedColor: "#fff",
  buttonColor: "#7a44cf",
  borderColor: "#7a44cf",
  hasPadding: true,
  animationDuration: 250,
  onPress: () => null,
  options,
  style: styles.switchStyle,
};
