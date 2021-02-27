import * as ScreenOrientation from "expo-screen-orientation";
import * as React from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

export interface ImageListScreenProps {}

export default class ImageListScreen extends React.PureComponent<ImageListScreenProps> {
  state = { images: new Array(7).fill(0), grid: [], orientation: ScreenOrientation.Orientation.UNKNOWN };
  size = (width < height ? width : height) / 3;
  index = 0;

  componentDidMount() {
    ScreenOrientation.addOrientationChangeListener((rotationEvent) => this.updateOrientation(rotationEvent.orientationInfo.orientation));
  }

  componentWillUnmount() {
    ScreenOrientation.removeOrientationChangeListeners();
  }

  updateOrientation(orientation: ScreenOrientation.Orientation) {
    this.size = (orientation == ScreenOrientation.Orientation.PORTRAIT_UP ? width : height) / 3;

    this.setState({
      ...this.state,
      grid: this.state.grid.map(({ id, item }) => {
        switch (id % 9) {
          case 4:
            return { id, item: React.cloneElement(item, { style: { ...styles.box, width: this.size * 2 - 5, height: this.size * 2 - 5 } }) };

          case 5:
            return {
              id,
              item: (
                <View key={id} style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ ...styles.box, width: this.size - 5, height: this.size - 5 }} />
                    <View style={{ ...styles.box, width: this.size - 5, height: this.size - 5 }} />
                  </View>
                  <View style={{ ...styles.box, width: this.size * 2 - 5, height: this.size * 2 - 5 }} />
                </View>
              ),
            };

          default:
            return { id, item: React.cloneElement(item, { style: { ...styles.box, width: this.size - 5, height: this.size - 5 } }) };
        }
      }),
    });
  }

  next() {
    const { grid } = this.state;

    switch (this.index++ % 9) {
      case 4:
        this.setState({
          ...this.state,
          grid: [
            ...grid,
            { id: this.index - 1, item: <View key={this.index} style={{ ...styles.box, width: this.size * 2 - 5, height: this.size * 2 - 5 }} /> },
          ],
        });
        break;

      case 5:
        this.setState({
          ...this.state,
          grid: [
            ...grid.slice(0, -2),
            {
              id: this.index - 1,
              item: (
                <View key={this.index} style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ ...styles.box, width: this.size - 5, height: this.size - 5 }} />
                    <View style={{ ...styles.box, width: this.size - 5, height: this.size - 5 }} />
                  </View>
                  <View style={{ ...styles.box, width: this.size * 2 - 5, height: this.size * 2 - 5 }} />
                </View>
              ),
            },
          ],
        });
        break;

      default:
        this.setState({
          ...this.state,
          grid: [...grid, { id: this.index - 1, item: <View key={this.index} style={{ ...styles.box, width: this.size - 5, height: this.size - 5 }} /> }],
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row" }}>{this.state.grid.map(({ item }) => item)}</ScrollView>
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

    marginTop: 25,
  },

  box: {
    // flex: 2,
    backgroundColor: "powderblue",

    alignSelf: "flex-start",
    justifyContent: "flex-start",
    margin: 2,
  },
});
