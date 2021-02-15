import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Assets, { BookCover } from "../../assets/index";
import { ParamList } from "./LibraryScreen";

interface BookInfoScreenProps {
  navigation: StackNavigationProp<ParamList>;
  route: RouteProp<ParamList, "BookInfo">;
}

export type BookInfoType = {
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  isbn13: string;
  pages: string;
  year: string;
  rating: string;
  desc: string;
  price: string;
  image: string;
};

export default class BookInfoScreen extends React.Component<BookInfoScreenProps> {
  render() {
    const { title, subtitle, desc, authors, publisher, pages, year, rating } = this.props.route.params;
    const image = (this.props.route.params.image?.split(".")?.[0] as BookCover) || null;
    return (
      <View>
        <ScrollView style={styles.container}>
          <View style={styles.items}>
            <View style={styles.image}>
              {image && <Image source={Assets.BookCover[image]} />}
              <View style={{ flex: 1 }}>
                <Text>Pages: {pages}</Text>
                <Text>Year: {year}</Text>
                <Text>Rating: {rating}</Text>
              </View>
            </View>
            <Text>Title: {title}</Text>
            <Text>Subtitle: {subtitle}</Text>
            <Text>Description: {desc}</Text>
            <Text>Author: {authors}</Text>
            <Text>Publisher: {publisher}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },

  items: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    flex: 1,
    flexDirection: "row",
  },
});
