import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/rootReducer";
import { connect } from "react-redux";
import { setTradeModalVisibility } from "./store/tab/tabAction";
import {
  AddPortfolio,
  Portfolio,
  AddWatchList,
  StockDetail,
  Signup,
  SignIn,
} from "./screens";
const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Home"}
        >
          <Stack.Screen name="MainLayout" component={Tabs} />
          <Stack.Screen name="AddPortfolio" component={AddPortfolio} />
          <Stack.Screen name="Portfolio" component={Portfolio} />
          <Stack.Screen name="AddWatchList" component={AddWatchList} />
          <Stack.Screen name="StockDetail" component={StockDetail} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
