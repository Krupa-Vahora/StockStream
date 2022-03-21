import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { MainLayout } from ".";
import { useDispatch, useSelector } from "react-redux";

import { COLORS, FONTS, SIZES, icons } from "../constants";

import * as stockAction from "../store/market/stockAction";
import { WatchListButton, ScriptInfo } from "../components";
import * as watchlistAction from "../store/watchlist/watchlistAction";

const SCRIPT_DATA = [
  {
    name: "SENSEX",
    value: "53,900.0",
    per: "0.87%",
  },
  {
    name: "NIFTY 50",
    value: "16,135.05",
    per: "0.78%",
  },
];

const Home = ({ coins, navigation }) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  const stock = useSelector((state) => state.stock.stocks);
  const stockInfo = useSelector((state) => state.stock.stockInfo);
  const watchlistInfo = useSelector((state) => state.watchlist.getwatchlist);
  // console.log("watch", watchlistInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stockAction.getStock());
    dispatch(stockAction.getStockInfo());
    dispatch(watchlistAction.getWatch());
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
        item.id = stockInfo[key]?._id ?? 0;
        // console.log("id", item.id);
      }
    });
  }, [stock]);

  const ItemDivider = () => {
    return (
      <View
        style={{
          marginTop: 20,
          height: 110,
          width: 1,
          backgroundColor: "white",
        }}
      />
    );
  };
  const ItemDividerWatch = () => {
    return (
      <View
        style={{
          height: 80,
          width: 1,
          backgroundColor: "white",
        }}
      />
    );
  };

  function renderScriptInfoSection() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        {/* sensex and nifty info  */}

        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
          }}
          horizontal={true}
          data={SCRIPT_DATA}
          renderItem={({ item }) => {
            return <ScriptInfo item={item} />;
          }}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={ItemDivider}
        />
      </View>
    );
  }

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header  */}
        {renderScriptInfoSection()}

        {/* watchlist */}
        <View
          style={{
            marginTop: 40,
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              // fontSize: 21,
              marginLeft: 10,
            }}
          >
            My Watchlist
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 50,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("AddWatchList")}
          >
            <Text
              style={{
                flex: 1,
                color: COLORS.white,
                ...FONTS.h3,
                textAlign: "right",
                marginTop: -80,
              }}
            >
              Add Watchlist
            </Text>
            <Image
              source={icons.rightArrow}
              style={{
                height: 15,
                width: 15,
                tintColor: COLORS.white,
                marginTop: -80,
              }}
            />
          </TouchableOpacity>

          {/* Add Watch List */}
          <View
            style={{
              flexDirection: "row",

              marginTop: -20,
            }}
          >
            <FlatList
              contentContainerStyle={{
                justifyContent: "center",
              }}
              horizontal={true}
              data={watchlistInfo}
              renderItem={({ item }) => {
                let priceColor =
                  item.percentage == 0
                    ? COLORS.lightGray3
                    : item.percentage > 0
                    ? COLORS.lightGreen
                    : COLORS.red;
                return (
                  <View
                    style={{
                      marginHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.h3,
                      }}
                    >
                      {item.companyName}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.h4,
                      }}
                    >
                      {item.price.toFixed(2)}
                    </Text>
                    {item.percentage != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          marginTop: 10,
                          transform:
                            item.percentage > 0
                              ? [{ rotate: "45deg" }]
                              : [{ rotate: "125deg" }],
                        }}
                      />
                    )}

                    <Text
                      style={{
                        marginLeft: 20,
                        color: priceColor,
                        ...FONTS.body5,
                        lineHeight: 15,
                        marginTop: -12,
                      }}
                    >
                      {item?.percentage}%
                    </Text>
                  </View>
                );
              }}
              keyExtractor={(item) => item._id}
              ItemSeparatorComponent={ItemDividerWatch}
            />
          </View>
        </View>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
            marginTop: 25,
            // marginLeft: -10,
            textAlign: "center",
          }}
        >
          Top Shares
        </Text>
        {/* Top currency  */}
        <FlatList
          data={stock}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          renderItem={({ item }) => {
            // console.log("id", item.id);
            let priceColor =
              item.percentage == 0
                ? COLORS.lightGray3
                : item.percentage > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate("StockDetail", {
                    stock: item,
                  })
                }
              >
                {/* name  */}
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}
                  >
                    {item.companyName}
                  </Text>
                </View>
                {/* figures */}

                <View>
                  <Text
                    style={{
                      textAlign: "right",
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
                      justifyContent: "flex-end",
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
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={{ marginBottom: 50 }} />}
        />
      </View>
    </MainLayout>
  );
};

export default Home;
// function mapStateToProps(state) {
//   return {
//     myHoldings: state.marketReducer.myHoldings,
//     coins: state.marketReducer.coins,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getHoldings: (
//       holdings,
//       currency,
//       coinList,
//       orderBy,
//       sparkline,
//       priceChangePerc,
//       perPage,
//       page
//     ) => {
//       return dispatch(
//         getHoldings(
//           holdings,
//           currency,
//           coinList,
//           orderBy,
//           sparkline,
//           priceChangePerc,
//           perPage,
//           page
//         )
//       );
//     },

//     getCoinMarket: (
//       currency,
//       coinList,
//       orderBy,
//       sparkline,
//       priceChangePerc,
//       perPage,
//       page
//     ) => {
//       return dispatch(
//         getCoinMarket(
//           currency,
//           coinList,
//           orderBy,
//           sparkline,
//           priceChangePerc,
//           perPage,
//           page
//         )
//       );
//     },
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
