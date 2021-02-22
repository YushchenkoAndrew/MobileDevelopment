import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { DeviceEventEmitter, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Assets, { BookCover, BookId, BookInfo } from "../../assets/index";
import BookCard from "../BookCard";
import AddBook from "./AddBookScreen";
import BookInfoScreen, { BookInfoType } from "./BookInfoScreen";

export type ParamList = {
  Library: { filter: string } | undefined;
  BookInfo: BookInfoType;
  AddBook: { key: number };
};

export const Stack = createStackNavigator<ParamList>();

export default function Library() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={({ navigation, route }) => ({
          header: () => {
            return (
              <View style={{ height: 70 }}>
                <SearchBar
                  placeholder="Search"
                  lightTheme
                  searchIcon={{ size: 24 }}
                  cancelIcon={{ size: 24 }}
                  leftIconContainerStyle={{ backgroundColor: "#fff" }}
                  inputContainerStyle={{ backgroundColor: "#fff" }}
                  inputStyle={{ paddingLeft: 15 }}
                  containerStyle={{ backgroundColor: "#fff" }}
                  style={{ backgroundColor: "#f5f5f5", borderRadius: 10, paddingRight: 5 }}
                  onChangeText={(filter) => {
                    navigation.setParams({ filter });
                    DeviceEventEmitter.emit("Library.onSearch", filter);
                  }}
                  value={route.params?.filter ?? ""}
                />
              </View>
            );
          },
        })}
      />

      <Stack.Screen
        name="BookInfo"
        component={BookInfoScreen}
        options={({ route }) => ({
          headerTitle: route.params.title,
          headerBackImage: () => <Ionicons name="return-up-back-outline" size={32} color="#3795fe" />,
        })}
      />
      <Stack.Screen name="AddBook" component={AddBook} options={{ headerTitle: "Add new book" }} />
    </Stack.Navigator>
  );
}

interface LibraryScreenProps {
  navigation: StackNavigationProp<ParamList>;
  route: RouteProp<ParamList, "Library">;
}

export type Book = {
  key: number;
  title: string;
  subtitle: string;
  isbn13?: BookInfo;
  price: string;
  image?: BookCover;
};

export class LibraryScreen extends React.PureComponent<LibraryScreenProps> {
  state: { books: Book[]; filter: string };
  unsubscribe: ((() => void) | undefined)[] = [];
  uniqueKey: number;

  constructor(props: LibraryScreenProps) {
    super(props);
    this.state = {
      books: require("../../assets/BooksList.json").books.map((item: any, key: number) => ({
        key,
        ...item,
        isbn13: BookId.indexOf(item.isbn13) != -1 ? item.isbn13 : undefined,
        image: item.image?.split(".")?.[0] || undefined,
      })),
      filter: "",
    };
    this.uniqueKey = this.state.books.length;

    DeviceEventEmitter.addListener("Library.addBook", (book: Book) => this.setState({ books: [...this.state.books, book] }));
    DeviceEventEmitter.addListener("Library.onSearch", (filter: string) => this.setState({ ...this.state.books, filter }));
  }

  componentDidMount() {
    this.unsubscribe.push(this.props.navigation.addListener("focus", () => StatusBar.setHidden(true)));
    this.unsubscribe.push(this.props.navigation.addListener("blur", () => StatusBar.setHidden(false)));
  }

  componentWillUnmount() {
    for (let func of this.unsubscribe) if (func) func();
    DeviceEventEmitter.removeAllListeners();
  }

  rightAction(index: number) {
    return (
      <View style={{ flex: 0.2 }}>
        <TouchableOpacity style={{ height: "100%" }} onPress={() => this.setState({ books: this.state.books.filter((item, i) => i != index) })}>
          <View style={styles.swipeContainer}>
            <Ionicons name="trash-outline" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  floatButtonNavigation(name: string) {
    switch (name) {
      case "add":
        this.props.navigation.navigate("AddBook", { key: this.uniqueKey++ });
        break;

      // case "search":
      //   this.props.navigation.navigate("SearchBook", { books: this.state.books });
      //   break;
    }
  }

  renderBookList() {
    let bookList = this.state.books.filter(({ title }) => title.includes(this.state.filter));

    return bookList.length ? (
      <ScrollView>
        {bookList.map((item, index) => (
          <Swipeable key={item.key} friction={2} renderRightActions={() => this.rightAction(index)}>
            <TouchableOpacity onPress={() => item.isbn13 && this.props.navigation.navigate("BookInfo", Assets.BookInfo[item.isbn13])}>
              <BookCard item={item} />
            </TouchableOpacity>
          </Swipeable>
        ))}
      </ScrollView>
    ) : (
      <View style={styles.noResultContainer}>
        <Text style={{ fontSize: 18, alignSelf: "center" }}>Result not found</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#e9eaef" }}>
        {this.renderBookList()}

        <FloatingAction
          actions={actions}
          color="#fee2e1"
          onPressItem={(name) => this.floatButtonNavigation(name ?? "")}
          floatingIcon={<Ionicons name="settings-outline" size={24} color="#e93b2c" />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  swipeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fc5726",

    borderRadius: 5,

    marginRight: 10,
    marginLeft: 10,
    marginTop: 2,
    marginBottom: 3,

    // height: "100%",
  },

  noResultContainer: {
    flex: 1,
    // backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center",
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
  // {
  //   text: "Search",
  //   name: "search",
  //   color: "#e6edfe",
  //   icon: <Ionicons name="search-outline" size={24} color="#3779f4" />,
  //   position: 2,
  // },
];
