import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
const WatchListButton = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity
      style={{
        marginLeft: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 80,
        borderRadius: 10,
        backgroundColor: "#D3D3D3",
      }}
    >
      <Text
        style={{
          ...FONTS.h3,
        }}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};
export default WatchListButton;
