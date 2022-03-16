import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
const IconTextButton = ({ label, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 18,
          height: 20,
        }}
      /> */}

      <Text
        style={{
          // marginLeft: SIZES.base,
          textAlign: "center",
          ...FONTS.h3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default IconTextButton;
