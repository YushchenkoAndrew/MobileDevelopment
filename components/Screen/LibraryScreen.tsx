import * as React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { BookCover, Images } from "../../assets/index";

interface LibraryScreenProps {}

type Book = {
  title: string;
  subtitle: string;
  price: string;
  image: BookCover;
};

export default class LibraryScreen extends React.Component<LibraryScreenProps> {
  books: Book[];

  constructor(props: LibraryScreenProps) {
    super(props);
    this.books = require("../../assets/BooksList.json").books.map((item: Book, key: number) => ({
      key,
      ...item,
      image: item.image.split(".")[0] || null,
    }));
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.books}
          renderItem={({ item }) => {
            return (
              <View style={styles.item}>
                {item.image && <Image source={Images.BookCover[item.image]} style={styles.image} />}
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text>{item.subtitle}</Text>
                  <Text>{item.price}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  title: {
    // width: 100,
    // padding: 10,
    // fontSize: 10,
  },

  image: {
    flex: 1,
    // padding: 10,
    // margin: 20,
    aspectRatio: 1,
    resizeMode: "contain",
  },
});
