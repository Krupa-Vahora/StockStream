import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import * as stockAction from "../store/market/stockAction";
import * as watchlistAction from "../store/watchlist/watchlistAction";
import { connect, useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
const AddWatchList = ({ navigation }) => {
  const [stockData, setStockData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");

  const stock = useSelector((state) => state.stock.stocks);
  const stockInfo = useSelector((state) => state.stock.stockInfo);
  const watchlistInfo = useSelector((state) => state.watchlist.getwatchlist);
  console.log("info", watchlistInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stockAction.getStock());
    dispatch(stockAction.getStockInfo());
    dispatch(watchlistAction.getWatch());
  }, []);
  useEffect(() => {
    stock?.map((item, key) => {
      if (stockInfo?.length > 0) {
        item.id = stockInfo[key]?._id ?? 0;
        item.price = stockInfo[key]?.price ?? 0;
        item.high = stockInfo[key]?.high ?? 0;
        item.low = stockInfo[key]?.low ?? 0;
        item.qty = stockInfo[key]?.qty ?? 0;
        item.volume = stockInfo[key]?.volume ?? 0;
        item.percentage = stockInfo[key]?.percentage ?? 0;
      }
      // console.log("NewDataa on watchlist", item, stockInfo);
      setStockData({ ...stockData, item });

      setFilterData(stock);
      setMasterData(stock);
    });
  }, [stock]);

  const submitData = async (item) => {
    const data = {
      companyName: item.companyName,
      price: item.price,
      percentage: item.percentage,
    };
    console.log("data=>", data);

    const res = await dispatch(watchlistAction.sendWatch(data));
    dispatch(watchlistAction.getWatch());
    Alert.alert("Stock Added to your watchlist");
    // if (res.type == "SEND_WATCH_DATA") {
    // navigation.popToTop();
    // }
  };
  function deleteData(id) {
    dispatch(watchlistAction.deleteWatch(id));
    Alert.alert("Stock Remove to your watchlist");
    dispatch(watchlistAction.getWatch());
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.companyName
          ? item.companyName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={icons.leftArrow}
          style={{
            height: 25,
            width: 25,
            tintColor: COLORS.white,
            marginTop: 70,
          }}
        />
        <Text
          style={{
            marginTop: -30,
            color: COLORS.white,
            ...FONTS.h1,
            textAlign: "center",
          }}
        >
          Update Your Watchlist
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 0.4, width: SIZES.width, marginTop: 60 }}>
        <TextInput
          style={{
            backgroundColor: COLORS.lightGray,
            borderRadius: 20,
            height: 40,
            width: "87%",
            marginTop: -20,
            paddingLeft: 20,
            marginLeft: 20,
            textAlign: "left",
            color: COLORS.white,
            ...FONTS.body3,
            fontWeight: "bold",
          }}
          value={search}
          placeholder="Search Here"
          placeholderTextColor="white"
          onChangeText={(text) => searchFilter(text)}
        />

        <FlatList
          data={filterData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            // console.log("FlatList Data-market tab", item);
            let priceColor =
              item.percentage == 0
                ? COLORS.lightGray3
                : item.percentage > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    marginLeft: 20,
                    flex: 1,
                  }}
                >
                  {/* companyName */}
                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}
                  >
                    {item.companyName}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    marginRight: 80,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    {parseFloat(item?.price).toFixed(2) ?? 0.0}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {item.percentage != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.percentage > 0
                              ? [{ rotate: "45deg" }]
                              : [{ rotate: "125deg" }],
                        }}
                      />
                    )}

                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,

                        ...FONTS.body5,
                        lineHeight: 15,
                      }}
                    >
                      {item?.percentage}%
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      justifyContent: "center",
                      marginRight: -50,
                      marginTop: -25,
                    }}
                  >
                    <TouchableOpacity onPress={() => submitData(item)}>
                      <Text
                        style={{
                          color: "#1F51FF",
                        }}
                      >
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={{ flex: 0.6, width: SIZES.width }}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Your Watchlist
        </Text>
        <FlatList
          data={watchlistInfo}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            console.log("watchlist data", item);
            let priceColor =
              item.percentage == 0
                ? COLORS.lightGray3
                : item.percentage > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    marginLeft: 20,
                    flex: 1,
                  }}
                >
                  {/* companyName */}
                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}
                  >
                    {item.companyName}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    marginRight: 80,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    {parseFloat(item?.price).toFixed(2) ?? 0.0}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {item.percentage != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.percentage > 0
                              ? [{ rotate: "45deg" }]
                              : [{ rotate: "125deg" }],
                        }}
                      />
                    )}

                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,

                        ...FONTS.body5,
                        lineHeight: 15,
                      }}
                    >
                      {item?.percentage}%
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      justifyContent: "center",
                      marginRight: -50,
                      marginTop: -25,
                    }}
                  >
                    <TouchableOpacity onPress={() => deleteData(item._id)}>
                      <Image
                        source={icons.remove}
                        style={{
                          height: 20,
                          width: 20,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
export default AddWatchList;
