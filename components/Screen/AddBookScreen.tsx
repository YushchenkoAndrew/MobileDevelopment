import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ScreenOrientation from "expo-screen-orientation";
import * as React from "react";
import { Button, DeviceEventEmitter, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomTextInput from "../CustomTextInput";
import { Book, ParamList } from "./LibraryScreen";

interface AddBookProps {
  navigation: StackNavigationProp<ParamList>;
  route: RouteProp<ParamList, "AddBook">;
}

export default class AddBook extends React.Component<AddBookProps> {
  state = { title: "", subtitle: "", price: "", error: { title: false, price: false }, orientation: ScreenOrientation.Orientation.UNKNOWN };

  constructor(props: AddBookProps) {
    super(props);
  }

  componentDidMount() {
    ScreenOrientation.getOrientationAsync().then((orientation) => this.setState({ ...this.state, orientation }));

    ScreenOrientation.addOrientationChangeListener((rotationEvent) => this.setState({ ...this.state, orientation: rotationEvent.orientationInfo.orientation }));
  }

  componentWillUnmount() {
    ScreenOrientation.removeOrientationChangeListeners();
  }

  getBookElements(key: number): Book {
    return {
      key: `${key}`,
      title: this.state.title,
      subtitle: this.state.subtitle,
      price: "$" + this.state.price,
    };
  }

  onSubmit() {
    const { key } = this.props.route.params;
    const data = this.getBookElements(key);

    if (!data.title || !data.price.slice(1)) {
      this.setState({ ...this.state, error: { title: !data.title, price: !data.price.slice(1) } });
      return;
    }

    DeviceEventEmitter.emit("Library.addBook", data);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ ...styles.container, ...{ flexDirection: this.state.orientation == ScreenOrientation.Orientation.PORTRAIT_UP ? "column" : "row" } }}>
          <View>
            <CustomTextInput name="Title" callback={(title: string) => this.setState({ ...this.state, title })} error={this.state.error.title} />
            <CustomTextInput name="Subtitle" callback={(subtitle: string) => this.setState({ ...this.state, subtitle })} />
            <CustomTextInput
              name="Price"
              keyboardType="numeric"
              callback={(price: string) => this.setState({ ...this.state, price })}
              error={this.state.error.price}
            />
          </View>

          <View style={styles.button}>
            <Button title="Submit" onPress={this.onSubmit.bind(this)} />
          </View>
        </View>
      </ScrollView>
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
  button: {
    padding: 30,
  },
});
