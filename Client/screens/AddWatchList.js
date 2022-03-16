import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import * as stockAction from "../store/market/stockAction";
import { connect, useDispatch, useSelector } from "react-redux";
const AddWatchList = ({ navigation }) => {
  const [stockData, setStockData] = useState([]);
  const stock = useSelector((state) => state.stock.stocks);
  const stockInfo = useSelector((state) => state.stock.stockInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stockAction.getStock());
    dispatch(stockAction.getStockInfo());
  }, []);
  useEffect(() => {
    stock?.map((item, key) => {
      if (stockInfo?.length > 0) {
        item.price = stockInfo[key]?.price ?? 0;
        item.high = stockInfo[key]?.high ?? 0;
        item.low = stockInfo[key]?.low ?? 0;
        item.qty = stockInfo[key]?.qty ?? 0;
        item.volume = stockInfo[key]?.volume ?? 0;
        item.percentage = stockInfo[key]?.percentage ?? 0;
      }
      // console.log("NewDataa on watchlist", item, stockInfo);
      setStockData({ ...stockData, item });
    });
  }, [stock]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      <Text
        style={{
          marginTop: 80,
          marginLeft: 10,
          color: COLORS.white,
          ...FONTS.h1,
          textAlign: "center",
        }}
      >
        Update Your Watchlist
      </Text>

      <View style={{ flex: 0.8, width: SIZES.width, marginTop: 60 }}>
        <FlatList
          data={stock}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            console.log("FlatList Data-market tab", item);
            let priceColor =
              item.percentage == 0
                ? COLORS.lightGray3
                : item.percentage > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("StockDetail", {
                    stock: item,
                  })
                }
              >
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
                      marginRight: 40,
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
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <Button
          title="Add Watchlist"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
};
export default AddWatchList;
