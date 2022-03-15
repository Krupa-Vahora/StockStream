import React from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";

import { MainLayout } from ".";

import { COLORS, FONTS, SIZES, icons } from "../constants";
import { IconTextButton, StockDetailInfo } from "../components";
import Overview from "../components/Overview";
const StockDetail = (props) => {
  const { navigation, route } = props;
  const stockData = route.params.stock;
  const BackHome = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        // onPress={() => navigation.navigate("Home")}
        onPress={() => navigation.goBack()}
      >
        <Text
          style={{
            flex: 1,
            color: COLORS.white,
            ...FONTS.h3,
            textAlign: "left",
            marginTop: -70,
          }}
        >
          <Image
            source={icons.leftArrow}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.white,
            }}
          />
        </Text>
      </TouchableOpacity>
    );
  };

  function renderCompanyInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        {/* company name-stock info */}

        <StockDetailInfo
          title={stockData.companyName}
          displayAmount={stockData.price}
          changePct={stockData.percentage}
          containerStyle={{
            marginTop: 60,
            alignItems: "center",
          }}
        />
        <BackHome type="button" />
        {/* button -transfer & widthdraw */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log("transfer")}
          />

          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log("withdraw")}
          />
        </View>
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
        {renderCompanyInfoSection()}
        {/* static Chart  */}
        <View
          style={{
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.chart}
            style={{
              height: 200,
              alignItems: "center",
            }}
          />
        </View>

        {/* company details with high low  */}
        <Text
          style={{
            color: COLORS.white,
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 40,
            textAlign: "center",
          }}
        >
          Overview
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          <Overview
            label="High"
            price={stockData.high.toFixed(2)}
            containerStyle={{ color: COLORS.green }}
          />
          <Overview
            label="Low"
            price={stockData.low.toFixed(2)}
            containerStyle={{ color: COLORS.red }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          <Overview
            label="Volume"
            price={stockData.volume.toFixed(2)}
            containerStyle={{ color: COLORS.white }}
          />
          <Overview
            label="Sector"
            price={stockData.sector}
            containerStyle={{ color: COLORS.white }}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default StockDetail;
