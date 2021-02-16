import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Assets, { BookCover, BookInfo } from "../../assets/index";
import AddBook from "./AddBookScreen";
import BookInfoScreen, { BookInfoType } from "./BookInfoScreen";

export type ParamList = {
  Library: undefined;
  BookInfo: BookInfoType;
  AddBook: undefined;
};

export const Stack = createStackNavigator<ParamList>();

export default function Library() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="BookInfo"
        component={BookInfoScreen}
        options={({ route }) => ({
          headerTitle: route.params.title,
          headerBackImage: () => <Ionicons name="return-up-back-outline" size={32} color="#3795fe" />,
        })}
      />
      <Stack.Screen name="AddBook" component={AddBook} />
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
        <FloatingAction
          actions={actions}
          color="#fee2e1"
          onPressItem={(name) => name == "add" && this.props.navigation.navigate("AddBook")}
          floatingIcon={<Ionicons name="settings-outline" size={24} color="#e93b2c" />}
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

const actions = [
  {
    text: "Add",
    name: "add",
    color: "#e6edfe",
    icon: <Ionicons name="add-outline" size={24} color="#3779f4" />,
    position: 1,
  },
  {
    text: "Search",
    name: "search",
    color: "#e6edfe",
    icon: <Ionicons name="search-outline" size={24} color="#3779f4" />,
    position: 2,
  },
];
