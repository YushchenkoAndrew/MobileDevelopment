import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ScreenOrientation from "expo-screen-orientation";
import * as React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Config from "../../assets/config";

const { width, height } = Dimensions.get("screen");

const API_KEY = Config.API_KEY;
const REQUEST = "night+city";
const COUNT = 27;

const reqHeader = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export interface ImageListScreenProps {}

export default class ImageListScreen extends React.PureComponent<ImageListScreenProps> {
  state = { grid: [], permission: false };
  size = (width < height ? width : height) / 3;
  index = 0;

  componentDidMount() {
    ScreenOrientation.addOrientationChangeListener((rotationEvent) => this.updateOrientation(rotationEvent.orientationInfo.orientation));

    fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${REQUEST}&image_type=photo&per_page=${COUNT}`, reqHeader)
      .then((res) => res.json())
      .then((json) => json.hits.map((item: { largeImageURL: string }) => this.next(item.largeImageURL)));

    ImagePicker.requestMediaLibraryPermissionsAsync().then((state) => this.setState({ ...this.state, permission: state.granted }));
  }

  componentWillUnmount() {
    ScreenOrientation.removeOrientationChangeListeners();
  }

  updateOrientation(orientation: ScreenOrientation.Orientation) {
    this.size = (orientation == ScreenOrientation.Orientation.PORTRAIT_UP ? width : height) / 3;

    this.setState({
      ...this.state,
      grid: this.state.grid.map(({ id, uri, item }) => {
        switch ((id - 1) % 9) {
          case 4:
            return { id, uri, item: React.cloneElement(item, { style: { ...styles.box, width: this.size * 2 - 5, height: this.size * 2 - 5 } }) };

          case 5:
            return {
              id,
              uri,
              item: (
                <View key={id} style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column" }}>
                    <Image style={{ ...styles.box, width: this.size - 5, height: this.size - 5 }} source={{ uri: uri[0] }} />
                    <Image style={{ ...styles.box, width: this.size - 5, height: this.size - 5 }} source={{ uri: uri[2] }} />
                  </View>
                  <Image style={{ ...styles.box, width: this.size * 2 - 5, height: this.size * 2 - 5 }} source={{ uri: uri[1] }} />
                </View>
              ),
            };

          default:
            return { id, uri, item: React.cloneElement(item, { style: { ...styles.box, width: this.size - 5, height: this.size - 5 } }) };
        }
      }),
    });
  }

  next(uri: string) {
    const { grid } = this.state;

    switch (this.index++ % 9) {
      case 4:
        this.setState({
          ...this.state,
          grid: [
            ...grid,
            {
              id: this.index,
              uri,
              item: <Image key={this.index} style={{ ...styles.box, width: this.size * 2 - 5, height: this.size * 2 - 5 }} source={{ uri }} />,
            },
          ],
        });
        break;

      case 5:
        let prev = grid.slice(-2).map(({ uri }) => uri);
        this.setState({
          ...this.state,
          grid: [
            ...grid.slice(0, -2),
            {
              id: this.index,
              uri: [...prev, uri],
              item: (
                <View key={this.index} style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column" }}>
                    <Image style={{ ...styles.box, width: this.size - 5, height: this.size - 5 }} source={{ uri: prev[0] }} />
                    <Image style={{ ...styles.box, width: this.size - 5, height: this.size - 5 }} source={{ uri }} />
                  </View>
                  <Image style={{ ...styles.box, width: this.size * 2 - 5, height: this.size * 2 - 5 }} source={{ uri: prev[1] }} />
                </View>
              ),
            },
          ],
        });
        break;

      default:
        this.setState({
          ...this.state,
          grid: [
            ...grid,
            {
              id: this.index,
              uri,
              loading: true,
              item: <Image key={this.index} style={{ ...styles.box, width: this.size - 5, height: this.size - 5 }} source={{ uri }} />,
            },
          ],
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              this.state.permission &&
              ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
              }).then((result) => !result.cancelled && this.next(result.uri))
            }
          >
            <Ionicons name="add-outline" size={32} color="black" style={{ marginTop: 18, marginRight: 15 }} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row" }}>{this.state.grid.map(({ item }) => item)}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },

  box: {
    // flex: 2,
    // backgroundColor: "powderblue",

    alignSelf: "flex-start",
    justifyContent: "flex-start",
    margin: 2,
  },

  header: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-end",
    justifyContent: "center",

    height: 80,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
