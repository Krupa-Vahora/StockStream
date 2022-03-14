import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SIZES, FONTS, COLORS, icons } from "../constants";

const ScriptInfo = (props) => {
  const { item } = props;

  return (
    <View
      style={{
        marginTop: 40,
        marginBottom: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        width: 150,
        backgroundColor: COLORS.black,
        marginHorizontal: SIZES.radius,
      }}
    >
      <View>
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.white,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            ...FONTS.h2,
            textAlign: "center",
            color: COLORS.white,
          }}
        >
          {item.value}
        </Text>

        <Text
          style={{
            color: COLORS.lightGreen,
            lineHeight: 15,
            ...FONTS.h3,
            textAlign: "center",
          }}
        >
          {item.per}
        </Text>
      </View>
    </View>
  );
};
export default ScriptInfo;
