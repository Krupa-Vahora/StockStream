import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import { MainLayout } from ".";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}
    >
      <Text
        style={{
          color: COLORS.lightGray3,
          ...FONTS.h4,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      ></View>
    </View>
  );
};

const Setting = ({ title, value, type, onPress }) => {
  if (type == "button") {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              // marginTop: -2,
              color: COLORS.lightGray3,
              ...FONTS.h3,
            }}
          >
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
              // paddingRight: 20,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            flex: 1,
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          {title}
        </Text>
        <Switch value={value} onValueChange={(value) => onPress(value)} />
      </View>
    );
  }
};

const Profile = ({ navigation }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("userData")
      .then((res) => {
        JSON.parse(res);
        console.log("user", JSON.parse(res));
        setData(JSON.parse(res).user);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log("data====", data);
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header  */}

        <View
          style={{
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Image
            source={icons.profile}
            style={{
              marginTop: 30,
              height: 150,
              width: 150,
              borderRadius: 100,
            }}
          />
        </View>
        {/* details  */}
        <ScrollView>
          {/* email  & user id*/}
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
            }}
          >
            {/* email  */}
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                  marginLeft: 105,
                }}
              >
                {data.name}
              </Text>
              <SectionTitle title="Email" />
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  marginTop: 30,
                }}
              >
                {data.email}
              </Text>
              <SectionTitle title="Contact" />
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  marginTop: 30,
                }}
              >
                {data.phone}
              </Text>
            </View>
            {/* status */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Image
                source={icons.verified}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
              <Text
                style={{
                  margin: SIZES.base,
                  color: COLORS.lightGreen,
                  ...FONTS.body4,
                }}
              >
                Verified
              </Text>
            </View>
          </View>
          {/* App section  */}
          <SectionTitle title="App" />

          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => navigation.navigate("Home")}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
