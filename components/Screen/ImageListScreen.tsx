import * as ScreenOrientation from "expo-screen-orientation";
import * as React from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

export interface ImageListScreenProps {}

export default class ImageListScreen extends React.PureComponent<ImageListScreenProps> {
  state = { images: new Array(7).fill(0), grid: [], orientation: ScreenOrientation.Orientation.UNKNOWN };
  index = 0;

  componentDidMount() {
    ScreenOrientation.getOrientationAsync().then((orientation) => this.setState({ ...this.state, orientation }));
  }

  componentWillUnmount() {
    ScreenOrientation.removeOrientationChangeListeners();
  }

  next() {
    const { grid } = this.state;
    const size = (this.state.orientation == ScreenOrientation.Orientation.PORTRAIT_UP ? width : height) / 3;

    switch (this.index++ % 9) {
      case 4:
        this.setState({ ...this.state, grid: [...grid, <View key={this.index} style={{ ...styles.box, width: size * 2 - 5, height: size * 2 - 5 }} />] });
        break;

      case 5:
        this.setState({
          ...this.state,
          grid: [
            ...grid.slice(0, -2),
            <View key={this.index} style={{ flexDirection: "row" }}>
              <View key={this.index} style={{ flexDirection: "column" }}>
                <View style={{ ...styles.box, width: size - 5, height: size - 5 }} />
                <View style={{ ...styles.box, width: size - 5, height: size - 5 }} />
              </View>
              <View style={{ ...styles.box, width: size * 2 - 5, height: size * 2 - 5 }} />
            </View>,
          ],
        });
        break;

      default:
        this.setState({ ...this.state, grid: [...grid, <View key={this.index} style={{ ...styles.box, width: size - 5, height: size - 5 }} />] });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row" }}>{this.state.grid}</ScrollView>
        <Button title="Press" onPress={() => this.next()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },

  box: {
    // flex: 2,
    backgroundColor: "powderblue",

    alignSelf: "flex-start",
    justifyContent: "flex-start",
    margin: 2,
  },
});
