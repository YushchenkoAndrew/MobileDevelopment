import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { ParamList } from "../../App";
import { BookCover, Images } from "../../assets/index";

interface LibraryScreenProps {
  navigation?: BottomTabNavigationProp<ParamList>;
}

type Book = {
  title: string;
  subtitle: string;
  price: string;
  image: BookCover;
};

export default class LibraryScreen extends React.Component<LibraryScreenProps> {
  books: Book[];
  unsubscribe: ((() => void) | undefined)[] = [];

  constructor(props: LibraryScreenProps) {
    super(props);
    this.books = require("../../assets/BooksList.json").books.map((item: Book, key: number) => ({
      key: `${key}`,
      ...item,
      image: item.image.split(".")[0] || null,
    }));
  }

  componentDidMount() {
    this.unsubscribe.push(this.props.navigation?.addListener("focus", () => StatusBar.setHidden(true)));
    this.unsubscribe.push(this.props.navigation?.addListener("blur", () => StatusBar.setHidden(false)));
  }

  componentWillUnmount() {
    for (let func of this.unsubscribe) if (func) func();
  }

  render() {
    return (
      <View style={{ backgroundColor: "#e9eaef" }}>
        <FlatList
          data={this.books}
          renderItem={({ item }) => {
            return (
              <View style={styles.item}>
                <View style={{ width: 150, height: 150 }}>{item.image && <Image source={Images.BookCover[item.image]} style={styles.image} />}</View>
                <View style={styles.information}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.subtitle}</Text>
                  <Text style={styles.price}>{item.price}</Text>
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

    height: "100%",
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
