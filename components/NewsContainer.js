import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SIZES, COLORS, FONTS, icons } from "../constants";

const NewsContainer = (props) => {
  console.log("Data Props", props);
  const { item } = props;
  return (
    <TouchableOpacity
      style={{
        marginTop: 20,
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray,
        flex: 1,
        height: 90,
        marginRight: SIZES.radius,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginRight: 200,
        }}
      >
        <Image
          source={item.icon}
          style={{
            height: 50,
            width: 50,
          }}
        />

        <Text
          style={{
            ...FONTS.h2,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginLeft: 20,
          }}
        >
          {item.companyName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default NewsContainer;
