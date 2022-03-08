import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import { COLORS, FONTS, icons } from "../constants";
import { NewsContainer } from "../components/";
const LIST_DATA = [
  {
    companyName: "Reliance",
    icon: icons.reliance,
  },
  {
    companyName: "L&T",
    icon: icons.reliance,
  },
  {
    companyName: "TCS",
    icon: icons.reliance,
  },
];

const News = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      <Text
        style={{
          marginTop: 60,
          color: COLORS.white,
          ...FONTS.largeTitle,
          marginLeft: 10,
        }}
      >
        News
      </Text>
      <FlatList
        data={LIST_DATA}
        renderItem={({ item }) => {
          return <NewsContainer item={item} />;
        }}
      />
    </View>
  );
};

export default News;
