import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SIZES, COLORS, FONTS, icons } from "../constants";

const NewsContainer = (props) => {
  // console.log("Data Props", props);
  //console.log(props.navigation());
  const { item } = props;
  return (
    <TouchableOpacity
      style={{
        marginTop: 20,
        // alignItems: "center",
        justifyContent: "space-around",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray,
        flex: 1,
        height: "100%",
        width: "100%",
        marginRight: SIZES.radius,
      }}
      // onPress={() => console.log("press")}
      //onPress={() => props.navigation.navigate("NewsMore")}
    >
      <View
        style={{
          flexDirection: "row",
          marginRight: 100,
          marginLeft: 20,
          marginTop: 10,
        }}
      >
        <Image
          // source={{ uri: "https://picsum.photos/200" }}
          source={icons.newsImage}
          style={{
            height: 60,
            width: 60,
            borderRadius: 50,
            top: 8,
          }}
        />

        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "white",

            marginLeft: 11,
          }}
        >
          {item.title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 90,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            // fontWeight: "bold",
            color: "white",
            textAlign: "justify",
            marginLeft: 3,
            marginRight: 20,
            marginTop: -28,
          }}
        >
          {item.content}
        </Text>
      </View>

      {/* <View
        style={{
          flexDirection: "row",
          marginRight: 200,
          marginLeft: 20,
        }}
      >
        <Text
          style={{
            ...FONTS.body4,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginLeft: 90,
          }}
        >
          {item.content}
        </Text>
        <Text
          style={{
            ...FONTS.body4,
            color: "white",
            textAlign: "center",
            marginLeft: 90,
          }}
        >
          {item.date}
        </Text>
      </View> */}
    </TouchableOpacity>
  );
};
export default NewsContainer;
