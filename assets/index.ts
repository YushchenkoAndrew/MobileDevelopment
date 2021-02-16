export default {
  icons: {
    "Icon-36": require("./icons/Icon-36.png"),
    "Icon-48": require("./icons/Icon-48.png"),
    "Icon-72": require("./icons/Icon-72.png"),
    "Icon-96": require("./icons/Icon-96.png"),
    "Icon-144": require("./icons/Icon-144.png"),
    "Icon-192": require("./icons/Icon-192.png"),
    "Icon-512": require("./icons/Icon-512.png"),
  },
  BookCover: {
    Image_01: require("./BookCover/Image_01.png"),
    Image_02: require("./BookCover/Image_02.png"),
    Image_03: require("./BookCover/Image_03.png"),
    Image_05: require("./BookCover/Image_05.png"),
    Image_06: require("./BookCover/Image_06.png"),
    Image_07: require("./BookCover/Image_07.png"),
    Image_08: require("./BookCover/Image_08.png"),
    Image_10: require("./BookCover/Image_10.png"),
  },
  BookInfo: {
    "9780321856715": require("./BookInfo/9780321856715.json"),
    "9780321862969": require("./BookInfo/9780321862969.json"),
    "9781118841471": require("./BookInfo/9781118841471.json"),
    "9781430236054": require("./BookInfo/9781430236054.json"),
    "9781430237105": require("./BookInfo/9781430237105.json"),
    "9781430238072": require("./BookInfo/9781430238072.json"),
    "9781430245124": require("./BookInfo/9781430245124.json"),
    "9781430260226": require("./BookInfo/9781430260226.json"),
    "9781449308360": require("./BookInfo/9781449308360.json"),
    "9781449342753": require("./BookInfo/9781449342753.json"),
  },
};

export type BookCover = "Image_01" | "Image_02" | "Image_03" | "Image_05" | "Image_06" | "Image_07" | "Image_08" | "Image_10";
export type Icons = "Icon-36" | "Icon-48" | "Icon-72" | "Icon-96" | "Icon-144" | "Icon-192" | "Icon-512";
export const BookId = [
  "9780321856715",
  "9780321862969",
  "9781118841471",
  "9781430236054",
  "9781430237105",
  "9781430238072",
  "9781430245124",
  "9781430260226",
  "9781449308360",
  "9781449342753",
] as const;
export type BookInfo = typeof BookId[number];
