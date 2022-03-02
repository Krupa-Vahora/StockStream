import React from "react";
import { View, Text } from "react-native";
import { MainLayout } from ".";
import { connect } from "react-redux";
import { getCoinMarket, getHoldings } from "../store/market/marketAction";
import { useFocusEffect } from "@react-navigation/native";

import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  useFocusEffect(
    React.useCallback(() => {
      console.log("hi");
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, [getHoldings, getCoinMarket])
  );

  return (
    <MainLayout>
      <View>
        <Text>Home</Text>
      </View>
    </MainLayout>
  );
};

// export default Home;
function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getHoldings(
          holdings,
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
