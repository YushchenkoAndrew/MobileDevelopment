import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Assets from "../assets/index";
import { Book } from "./Screen/LibraryScreen";

interface BookCardProps {
  item: Book;
}

export default class BookCard extends React.PureComponent<BookCardProps> {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.item}>
        <View style={{ width: 150, height: 150 }}>{item.image && <Image source={Assets.BookCover[item.image]} style={styles.image} />}</View>
        <View style={styles.information}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.subtitle}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 5,

    marginRight: 10,
    marginLeft: 10,
    marginTop: 2,
    marginBottom: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  information: {
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "stretch",

    padding: 20,
  },

  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },

  description: {
    color: "gray",
    fontStyle: "italic",
  },

  price: {
    color: "#bf4040",
    fontWeight: "bold",
    alignSelf: "flex-end",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    width: undefined,
    height: undefined,
  },
});
