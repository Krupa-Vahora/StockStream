import React, { useState } from "react";
import {
  Text,
  Button,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, icons } from "../constants";
import * as userAction from "../store/user/userAction";
import { useDispatch } from "react-redux";
const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const submitData = async () => {
    //Check for the email TextInput
    if (!email.trim()) {
      alert("Please Enter email");
      return;
    }
    //Check for the Email TextInput
    if (!password.trim()) {
      alert("Please Enter password");
      return;
    }
    const data = {
      email: email,
      password: password,
    };
    console.log("data", data);
    const res = await dispatch(userAction.loginUser(data));
    if (res.status == 200) {
      navigation.popToTop();
      // navigation.navigate("Portfolio");
    }
  };

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
          ...FONTS.h1,
          marginTop: 90,
          textAlign: "center",
        }}
      >
        Welcome to SignIn
      </Text>
      <Image
        source={icons.logo}
        style={{
          height: 120,
          width: 120,
          borderRadius: 90,
          marginHorizontal: 132,
          marginTop: 50,
        }}
      />
      <View style={{ flex: 1, marginTop: 60, marginHorizontal: 90 }}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#808080"
          autoCapitalize="none"
          value={email}
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#808080"
          autoCapitalize="none"
          value={password}
          style={styles.input}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <View
          style={{
            marginTop: 40,
          }}
        >
          <Button title="Sign In" onPress={() => submitData()} />
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
              textAlign: "center",
            }}
          >
            New Member ?
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h4,
                  marginLeft: 4,
                  marginTop: 4,
                  textAlign: "center",
                }}
              >
                SignUp
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 2,
    marginTop: 40,
    color: COLORS.white,
    textAlign: "center",
  },
});
export default SignIn;
