import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, View } from "react-native";

interface StarRatingProps {
  rating: number;
  size: number;
}

export default class StarRating extends React.Component<StarRatingProps> {
  getIconName(level: number) {
    const { rating } = this.props;
    const name = rating >= level ? "star" : "star-outline";
    return Math.floor(rating) == rating ? name : "star-half";
  }

  render() {
    const { size } = this.props;
    return (
      <View style={styles.container}>
        <Ionicons name={this.getIconName(1)} size={size} color="gold" />
        <Ionicons name={this.getIconName(2)} size={size} color="gold" />
        <Ionicons name={this.getIconName(3)} size={size} color="gold" />
        <Ionicons name={this.getIconName(4)} size={size} color="gold" />
        <Ionicons name={this.getIconName(5)} size={size} color="gold" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
