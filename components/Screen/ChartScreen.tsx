import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import * as ScreenOrientation from "expo-screen-orientation";
import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import SwitchSelector, { ISwitchSelectorProps } from "react-native-switch-selector";
import { VictoryChart, VictoryLine, VictoryPie, VictoryTheme } from "victory-native";
import { ParamList } from "../../App";

// Given Function by task
const func = (x: number) => x * x * x;
const pieData = [
  { y: 15, label: "15%", color: "#ffd54f" },
  { y: 25, label: "25%", color: "#866e2d" },
  { y: 45, label: "45%", color: "#90a4ae" },
  { y: 10, label: "10%", color: "#e91e63" },
  { y: 5, label: "5%", color: "#d1c4e9" },
];

interface ChartScreenProps {
  navigation?: BottomTabNavigationProp<ParamList>;
}

interface ChartScreenStates {
  chart: Chart;
  orientation: Orientation;
}

interface Chart {
  name: ChartName;
  size: number;
  radius: number;
}

type Orientation = "landscape" | "portrait";
type ChartName = "line" | "pie";

const { width, height } = Dimensions.get("screen");
const size = width < height ? width : height; // Get the min size

export default class ChartScreen extends React.Component<ChartScreenProps> {
  state = { chart: { name: "line", size, radius: 100 }, orientation: "portrait" } as ChartScreenStates;

  componentDidMount() {
    ScreenOrientation.getOrientationAsync().then((orientation) => this.setState({ ...this.state, ...this.getOrientationProps(orientation) }));

    ScreenOrientation.addOrientationChangeListener((rotationEvent) =>
      this.setState({ ...this.state, ...this.getOrientationProps(rotationEvent.orientationInfo.orientation) })
    );
  }

  componentWillUnmount() {
    ScreenOrientation.removeOrientationChangeListeners();
  }

  getOrientationProps(screenOrientation: ScreenOrientation.Orientation): ChartScreenStates {
    let orientation = (screenOrientation == ScreenOrientation.Orientation.PORTRAIT_UP ? "portrait" : "landscape") as Orientation;
    let chart = { ...this.state.chart, ...(orientation == "landscape" ? { size: size - 50, radius: 80 } : { size, radius: 100 }) };
    return { chart, orientation };
  }

  iterFunc(func: Function, min: number, max: number, step: number) {
    let coords = [];
    for (let x = min; x <= max; x += step) coords.push({ x, y: func(x) });
    return coords;
  }

  onClick(name: ChartName) {
    return new Promise((resolve, reject) => {
      resolve(this.setState({ ...this.state, chart: { ...this.state.chart, name } }));
    });
  }

  render() {
    return (
      <View style={{ ...styles.components, flexDirection: this.state.orientation == "portrait" ? "column" : "row" }}>
        <SwitchSelector {...switchProps} onPress={this.onClick.bind(this)} />
        {this.state.chart.name == "line" ? (
          <VictoryChart theme={VictoryTheme.material} width={this.state.chart.size} height={this.state.chart.size}>
            <VictoryLine data={this.iterFunc(func, -3, 3, 0.2)} animate={{ duration: 500 }} />
          </VictoryChart>
        ) : (
          <VictoryPie
            colorScale={pieData.map(({ color }) => color)}
            padAngle={() => 2}
            innerRadius={this.state.chart.radius}
            width={this.state.chart.size}
            height={this.state.chart.size}
            data={pieData.map(({ y, label }) => ({ y, label }))}
            animate={{ duration: 800 }}
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
    paddingTop: 20,
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
