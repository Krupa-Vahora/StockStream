import React, {
  useCallback,
  useEffect,
  createRef,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from "react-native";

import { connect, useDispatch, useSelector } from "react-redux";
import { LineChart } from "react-native-chart-kit";
import { getCoinMarket } from "../store/market/marketAction";
import { MainLayout } from ".";
import { COLORS, FONTS, SIZES, icons, constants } from "../constants";
import { Headerbar, TextButton } from "../components";

import * as stockAction from "../store/market/stockAction";

const marketTabs = constants.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: createRef,
}));

const TabIndicator = ({ measureLayout, scrollX }) => {
  // const inputRange = marketTabs.map((_, i) => {
  //   i * SIZES.width;
  // });
  // const translateX = scrollX.interpolate({
  //   inputRange,
  //   outputRange: measureLayout.map((measure) => measure.x),
  // });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        height: "100%",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.red,
        // transform: [
        //   {
        //     translateX,
        //   },
        // ],
      }}
    />
  );
};

const Tabs = ({ scrollX, onMarketTabPress }) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = useRef();
  useEffect(() => {
    marketTabs.forEach((marketTab) => {
      marketTab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });
          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);
  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: "row",
      }}
    >
      {/* tab indicator  */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}
      {/* Tabs */}
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${index}`}
            style={{
              flex: 1,
            }}
            onPress={() => onMarketTabPress(index)}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Market = ({ getCoinMarket, coins, navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [stockData, setStockData] = useState([]);
  const marketTabScrollViewRef = useRef();
  const onMarketTabPress = useCallback((marketTabIndex) => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  });
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
      // console.log("NewDataa", item, stockInfo);
      setStockData({ ...stockData, item });
    });
  }, [stock]);

  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}
      >
        <Tabs scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
      </View>
    );
  }

  function renderList() {
    return (
      <Animated.FlatList
        ref={marketTabScrollViewRef}
        data={marketTabs}
        containerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={() => {
          return (
            <View style={{ flex: 1, width: SIZES.width }}>
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
                          marginTop: 30,
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
              {/* <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency == 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: SIZES.padding,
                        marginHorizontal: SIZES.radius,
                      }}
                    >
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            height: 25,
                            width: 25,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.h3,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.h4,
                          }}
                        >
                          ${item.current_price}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          {item.price_change_percentage_7d_in_currency != 0 && (
                            <Image
                              source={icons.upArrow}
                              style={{
                                height: 10,
                                width: 10,
                                tintColor: priceColor,
                                transform:
                                  item.price_change_percentage_7d_in_currency >
                                  0
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
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              /> */}
            </View>
          );
        }}
      />
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
        {/* header */}
        <Headerbar title="Market" />
        {/* tab bar  */}
        {renderTabBar()}
        {/* buttons  */}
        {/* {renderButtons()} */}
        {/* market list  */}
        {renderList()}
      </View>
    </MainLayout>
  );
};

// export default Market;
function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Market);
