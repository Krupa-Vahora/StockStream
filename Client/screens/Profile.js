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

import * as userAction from "../store/user/userAction";
import { useSelector, useDispatch } from "react-redux";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";

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
  const [faceId, setFaceId] = useState(true);
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
        {/* <Headerbar title="Profile" /> */}
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
                  paddingLeft: 100,
                  // textAlign: "center",
                }}
              >
                {dummyData.profile.name}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  marginTop: 20,
                }}
              >
                {dummyData.profile.email}
              </Text>
            </View>
            {/* status */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 40,
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

          <SectionTitle title="Security" />
          <Setting
            title="FaceID"
            value={faceId}
            type="switch"
            onPress={(value) => setFaceId(value)}
          />
          {/* <Setting
            title="Password Settings"
            value=""
            type="button"
            onPress={() => console.log("PRESSED")}
          /> */}
          {/* <Setting
            title="Change Password "
            value=""
            type="button"
            onPress={() => console.log("PRESSED")}
          />
          <Setting
            title="Two Factor Authentication"
            value=""
            type="button"
            onPress={() => console.log("PRESSED")}
          /> */}
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
