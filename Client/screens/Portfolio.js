import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import { MainLayout } from ".";
import { BalanceInfo } from "../components";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import * as portfolioAction from "../store/portfolio/portfolioAction";

const Portfolio = (props) => {
  const { navigation, route } = props;
  const [newcount, setcount] = useState("");

  // const stockInfo = route.params.stock;
  // console.log("portfolio data from param==>", stockInfo);

  const portfolio = useSelector((state) => state.portfolio.getportfolio);
  console.log("portfolio", portfolio);

  useEffect(() => {
    let count = 0;
    portfolio?.map((data) => {
      count = count + data?.price;
    });
    setcount(count);
    console.log("total", count);
  }, [portfolio]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(portfolioAction.getPort());
  }, []);

  const totalWallet = newcount;

  function deleteData(id) {
    dispatch(portfolioAction.deletePort(id));
    dispatch(portfolioAction.getPort());
  }

  function renderCurrentBalanceSection() {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          borderBottomLeftRadius: 22,
          borderBottomRightRadius: 22,
          backgroundColor: COLORS.gray,
        }}
      >
        <View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              source={icons.leftArrow}
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.white,
                marginTop: 50,
              }}
            />
            <Text
              style={{
                marginTop: 50,
                marginLeft: 10,
                color: COLORS.white,
                ...FONTS.largeTitle,
              }}
            >
              Portfolio
            </Text>
          </TouchableOpacity>
        </View>
        <AddPortfolio value="Add New Stock" type="button" />

        <BalanceInfo
          title="Current Balance"
          displayAmount={totalWallet}
          containerStyle={{
            marginTop: SIZES.radiusTop,
            marginBottom: SIZES.padding,
            marginLeft: 25,
          }}
        />
      </View>
    );
  }

  const AddPortfolio = ({ value, type }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
        }}
        // onPress={() => navigation.navigate("AddPortfolio")}
        // onPress={() => navigation.navigate("SignIn")}
      >
        <Text
          style={{
            flex: 1,
            color: COLORS.white,
            ...FONTS.h3,
            textAlign: "right",
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
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* header section-current balance */}
        {renderCurrentBalanceSection()}

        {/* your assets */}
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Your Assets
        </Text>
        <FlatList
          data={portfolio}
          keyExtractor={(item) => item._id}
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
                  flexDirection: "row",
                  marginTop: 30,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    marginLeft: 20,
                    marginTop: 10,
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
                    marginRight: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: COLORS.white,
                      ...FONTS.h4,
                      // marginLeft: 10,
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
                <TouchableOpacity
                  style={{
                    marginTop: 12,
                  }}
                  onPress={() => deleteData(item._id)}
                >
                  <Image
                    source={icons.remove}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

export default Portfolio;
