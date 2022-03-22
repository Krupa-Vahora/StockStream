import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitData = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    };
    const res = await dispatch(userAction.registerUser(data));
    if (res.status == 201) {
      navigation.navigate("Home");
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
        Welcome to Signup
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
          placeholder="Username"
          placeholderTextColor="#808080"
          autoCapitalize="none"
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#808080"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#808080"
          secureTextEntry={true}
          autoCapitalize="none"
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />

        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#808080"
          autoCapitalize="none"
          style={styles.input}
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
          }}
        />
        <View
          style={{
            marginTop: 40,
          }}
        >
          <Button title="Sign Up" onPress={() => submitData()} />
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
export default Signup;
