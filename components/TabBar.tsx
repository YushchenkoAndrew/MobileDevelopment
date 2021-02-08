import * as React from "react";
import { Text, Dimensions } from "react-native";

interface TabBarProps {
  name?: string;
}

const { width, height } = Dimensions.get("window");

export default class TabBar extends React.Component<TabBarProps> {
  render() {
    return (
      <Text>
        Hello world {this.props.name} {"\n"} Dimension = {JSON.stringify(Dimensions.get("window"))}
      </Text>
    );
  }
}
