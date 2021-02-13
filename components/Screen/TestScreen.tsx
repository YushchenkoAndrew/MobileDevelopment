import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { ParamList } from "../../App";

interface TestScreenProps {
  name?: string;
  navigation?: BottomTabNavigationProp<ParamList>;
}

export default class TestScreen extends React.Component<TestScreenProps> {
  state = { count: 0, date: new Date() };
  timer: NodeJS.Timeout | null = null;

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  tick() {
    this.setState({ ...this.state, date: new Date() });
  }

  handleClick() {
    // this.props.navigation?.goBack();
    this.setState({ ...this.state, count: this.state.count + 1 });

    // Update state in asynchronous case
    // this.setState((state, props) => ({ ...state, count: state.count + 1 }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello world</Text>
        <Text style={styles.text}>Count: {this.state.count}</Text>
        <Text style={{ ...styles.text, color: "#F00" }}>What time is it?</Text>
        <Text style={styles.text}>It's {this.state.date.toLocaleTimeString()}</Text>
        <Image source={require("../../assets/icons/Icon-144.png")} />
        <Button title="Count" onPress={() => this.handleClick()} />
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
  text: {
    fontSize: 18,
  },
});
