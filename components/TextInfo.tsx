import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TextInfoProps {
  name: string;
  info: string;
  styleName?: object;
  styleInfo?: object;
}

export default class TextInfo extends React.PureComponent<TextInfoProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.name, ...(this.props.styleName ?? this.props.styleInfo ?? {}) }}>{this.props.name}: </Text>
        <Text style={{ ...styles.info, ...(this.props.styleInfo ?? this.props.styleName ?? {}) }}>{this.props.info}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 5,
  },

  name: {
    color: "gray",
    fontSize: 18,
  },

  info: {
    fontSize: 18,
  },
});
