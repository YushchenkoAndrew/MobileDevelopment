import { RouteProp } from "@react-navigation/native";
import * as React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { ParamList } from "./LibraryScreen";

interface AddBookProps {
  route: RouteProp<ParamList, "AddBook">;
}

export default class AddBook extends React.Component<AddBookProps> {
  state = { title: "Test", subtitle: "Text", price: "Text", color: "gray" };

  render() {
    return (
      <View style={styles.container}>
        <Text>Title</Text>
        <TextInput style={{ color: this.state.color }} value={this.state.title} onChangeText={(title) => this.setState({ ...this.state, title })} />

        <Text>Subtitle</Text>
        <TextInput value={this.state.subtitle} onChangeText={(subtitle) => this.setState({ ...this.state, subtitle })} />

        <Text>Price</Text>
        <TextInput value={this.state.price} onChangeText={(price) => this.setState({ ...this.state, price })} />
        <Button title="Add" onPress={() => console.log(this.props.route.params)} />
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
