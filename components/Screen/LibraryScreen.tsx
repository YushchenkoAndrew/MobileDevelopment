import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Assets, { BookCover, BookInfo } from "../../assets/index";
import BookInfoScreen, { BookInfoType } from "./BookInfoScreen";

export type ParamList = {
  Library: undefined;
  BookInfo: BookInfoType;
};

export const Stack = createStackNavigator<ParamList>();

export default function Library() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Library" component={LibraryScreen} />
      <Stack.Screen name="BookInfo" component={BookInfoScreen} />
    </Stack.Navigator>
  );
}

interface LibraryScreenProps {
  navigation: StackNavigationProp<ParamList>;
}

type Book = {
  title: string;
  subtitle: string;
  isbn13: BookInfo;
  price: string;
  image: BookCover | null;
};

export class LibraryScreen extends React.Component<LibraryScreenProps> {
  books: Book[];
  unsubscribe: ((() => void) | undefined)[] = [];

  constructor(props: LibraryScreenProps) {
    super(props);
    this.books = require("../../assets/BooksList.json").books.map((item: any, key: number) => ({
      key: `${key}`,
      ...item,
      image: item.image?.split(".")?.[0] || null,
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
              <TouchableOpacity onPress={() => Assets.BookInfo[item.isbn13] && this.props.navigation?.navigate("BookInfo", Assets.BookInfo[item.isbn13])}>
                <View style={styles.item}>
                  <View style={{ width: 150, height: 150 }}>{item.image && <Image source={Assets.BookCover[item.image]} style={styles.image} />}</View>
                  <View style={styles.information}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.subtitle}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
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
