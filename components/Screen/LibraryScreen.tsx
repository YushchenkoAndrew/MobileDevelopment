import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { DeviceEventEmitter, ScrollView, StatusBar, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { TouchableOpacity } from "react-native-gesture-handler";
import Assets, { BookCover, BookId, BookInfo } from "../../assets/index";
import BookCard from "../BookCard";
import AddBook from "./AddBookScreen";
import BookInfoScreen, { BookInfoType } from "./BookInfoScreen";

export type ParamList = {
  Library: undefined;
  BookInfo: BookInfoType;
  AddBook: { key: number };
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
      <Stack.Screen name="AddBook" component={AddBook} options={{ headerTitle: "Add new book" }} />
    </Stack.Navigator>
  );
}

interface LibraryScreenProps {
  navigation: StackNavigationProp<ParamList>;
  route: RouteProp<ParamList, "Library">;
}

export type Book = {
  key: string;
  title: string;
  subtitle: string;
  isbn13?: BookInfo;
  price: string;
  image?: BookCover;
};

export class LibraryScreen extends React.PureComponent<LibraryScreenProps> {
  state: { books: Book[] };
  unsubscribe: ((() => void) | undefined)[] = [];

  constructor(props: LibraryScreenProps) {
    super(props);
    this.state = {
      books: require("../../assets/BooksList.json").books.map((item: any, key: number) => ({
        key: `${key}`,
        ...item,
        isbn13: BookId.indexOf(item.isbn13) != -1 ? item.isbn13 : undefined,
        image: item.image?.split(".")?.[0] || undefined,
      })),
    };

    DeviceEventEmitter.addListener("Library.addBook", (book: Book) => this.setState({ books: [...this.state.books, book] }));
  }

  componentDidMount() {
    this.unsubscribe.push(this.props.navigation?.addListener("focus", () => StatusBar.setHidden(true)));
    this.unsubscribe.push(this.props.navigation?.addListener("blur", () => StatusBar.setHidden(false)));
  }

  componentWillUnmount() {
    for (let func of this.unsubscribe) if (func) func();
    DeviceEventEmitter.removeAllListeners();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#e9eaef" }}>
        <ScrollView>
          {this.state.books.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => item.isbn13 && this.props.navigation.navigate("BookInfo", Assets.BookInfo[item.isbn13])}>
              <BookCard item={item} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FloatingAction
          actions={actions}
          color="#fee2e1"
          onPressItem={(name) => name == "add" && this.props.navigation.navigate("AddBook", { key: 0 })}
          floatingIcon={<Ionicons name="settings-outline" size={24} color="#e93b2c" />}
        />
      </View>
    );
  }
}

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
