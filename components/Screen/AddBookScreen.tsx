import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Book, ParamList } from "./LibraryScreen";

enum Color {
  Focused = "#F00",
  Error = "#F00",
  Default = "black",
}

interface AddBookProps {
  navigation: StackNavigationProp<ParamList>;
  route: RouteProp<ParamList, "AddBook">;
}

export default class AddBook extends React.Component<AddBookProps> {
  state = { title: { value: "", color: Color.Default }, subtitle: { value: "", color: Color.Default }, price: { value: "", color: Color.Default } };

  getBookElements(key: number): Book {
    return {
      key: `${key}`,
      title: this.state.title.value,
      subtitle: this.state.subtitle.value,
      price: this.state.price.value,
    };
  }

  onSubmit() {
    const { books } = this.props.route.params;
    const data = this.getBookElements(books.length);

    if (!data.title || !data.key) {
      this.setState({
        ...this.state,
        title: { ...this.state.title, ...(data.title ? {} : { color: Color.Error }) },
        price: { ...this.state.price, ...(data.price ? {} : { color: Color.Error }) },
      });
      return;
    }

    books.push(data);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Title</Text>
        <TextInput
          style={{ ...styles.textInput, borderColor: this.state.title.color }}
          placeholder="Type book's Title"
          value={this.state.title.value}
          onChangeText={(value) => this.setState({ ...this.state, title: { ...this.state.title, value } })}
        />

        <Text>Subtitle</Text>
        <TextInput
          style={{ ...styles.textInput, borderColor: this.state.subtitle.color }}
          placeholder="Type book's Subtitle (optional)"
          value={this.state.subtitle.value}
          onChangeText={(value) => this.setState({ ...this.state, subtitle: { ...this.state.subtitle, value } })}
        />

        <Text>Price</Text>
        <TextInput
          style={{ ...styles.textInput, borderColor: this.state.price.color }}
          placeholder="Set the Price"
          keyboardType="numeric"
          value={this.state.price.value}
          onChangeText={(value) => this.setState({ ...this.state, price: { ...this.state.price, value: (value[0] == "$" ? "" : "$") + value } })}
        />
        <Button title="Submit" onPress={this.onSubmit.bind(this)} />
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

  textInput: {
    // flex: 1,

    justifyContent: "flex-end",
    // height: 40,

    borderWidth: 2,
    borderRadius: 40,
    paddingVertical: 5,
    paddingHorizontal: 15,
    // border

    margin: 10,
    fontSize: 15,
  },
});
