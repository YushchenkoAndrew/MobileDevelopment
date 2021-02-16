import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AddBookProps {}

export default class AddBook extends React.Component<AddBookProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
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
