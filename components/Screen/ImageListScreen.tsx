import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export interface ImageListScreenProps {}

export default class ImageListScreen extends React.PureComponent<ImageListScreenProps> {
  state = { images: new Array(20).fill(0) };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row" }}>
          {this.state.images.map((image, index) => (
            <View key={index} style={styles.box} />
          ))}
        </ScrollView>
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

  box: {
    // flex: 1,
    backgroundColor: "powderblue",

    alignSelf: "flex-start",
    margin: 2,

    height: 50,
    width: 50,
  },
});
