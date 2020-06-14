import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PriceRange from "../../../Components/PriceRange";
import { SafeAreaView } from "react-navigation";
import { Button } from "react-native-paper";

class FiltersScreen extends Component {

  applyFilter = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView /* style={GlobalStyles.safeAreaView} */ forceInset={{ top: "never", bottom: "always" }}>
        {/* <OfflineNotice /> */}

        <View style={{ flex: 1 }}>
          {/* <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} style={{ marginBottom: 80 }}> */}
            <PriceRange />
          {/* </ScrollView> */}
          {/* <View style={styles.searchButton}>
            <Button onPress={this.applyFilter} height={60} data={"Apply Filter"} />
          </View> */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#ffffff",
    padding: 16
  },
  searchButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
    height: 80,
    paddingHorizontal: 16,
    elevation: 5,
    borderTopWidth: 1,
    borderColor: "#ccc"
  }
});

export default connect(null)(FiltersScreen);
