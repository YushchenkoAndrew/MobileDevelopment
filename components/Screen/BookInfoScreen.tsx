import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Assets, { BookCover } from "../../assets/index";
import StarRating from "../StarRating";
import TextInfo from "../TextInfo";
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
      <View style={{ backgroundColor: "#fff" }}>
        <ScrollView style={styles.container}>
          <View style={styles.detailsView}>
            <View style={{ width: 180, height: 200 }}>{image && <Image source={Assets.BookCover[image]} style={styles.image} />}</View>
            <View style={styles.details}>
              <TextInfo name="Page" info={pages} />
              <TextInfo name="Year" info={year} />
              <StarRating rating={Number(rating)} size={24} />
            </View>
          </View>
          <View style={styles.items}>
            <TextInfo name="Title" info={title} styleName={styles.name} styleInfo={styles.info} />
            <TextInfo name="Subtitle" info={subtitle} styleName={styles.name} styleInfo={styles.info} />
            <TextInfo name="Description" info={desc} styleName={styles.name} styleInfo={styles.info} />
            <TextInfo name="Author" info={authors} styleName={styles.name} styleInfo={styles.info} />
            <TextInfo name="Publisher" info={publisher} styleName={styles.name} styleInfo={styles.info} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  items: {
    flex: 1,
    backgroundColor: "#fff",

    paddingTop: 10,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    width: undefined,
    height: undefined,
  },

  detailsView: {
    flex: 1,
    flexDirection: "row",

    margin: 10,

    alignItems: "center",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  details: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },

  info: {
    fontSize: 15,
    alignItems: "flex-start",
    marginLeft: 30,
  },
  name: {
    fontSize: 15,
    alignItems: "flex-start",
    width: 80,
  },
});
