import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const Overview = ({ label, price, containerStyle }) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 20,
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        flex: 0.5,
        height: 70,
        marginRight: SIZES.radius,
      }}
    >
      <Text
        style={{
          ...FONTS.h3,
          fontWeight: "bold",
          ...containerStyle,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          ...FONTS.h3,
          ...containerStyle,
        }}
      >
        {price}
      </Text>
    </TouchableOpacity>
  );
};
export default Overview;
