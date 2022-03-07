import { View, Text } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";

const StockDetail = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          marginTop: 350,
          ...FONTS.h1,
          textAlign: "center",
        }}
      >
        StockDetail Screen
      </Text>
    </View>
  );
};
export default StockDetail;
