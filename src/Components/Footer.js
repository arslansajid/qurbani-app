import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Colors from "../Themes/Colors";
import { SafeAreaView } from "react-navigation";
import colors from "../Themes/Colors";
import { Icon } from 'react-native-elements';
import { totalSize } from 'react-native-dimension';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // var { height, width } = Dimensions.get("window");
    return (
      <SafeAreaView
        style={[/*GlobalStyles.safeAreaView,*/ styles.footer]}
        forceInset={{ top: "never", bottom: "always" }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.touchable}
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
              <View style={styles.touchable}>
                <Icon
                  name="home-outline"
                  color={this.props.navigation.state.index === 0 ? Colors.white : Colors.steel}
                  size={totalSize(3.25)}
                  type="material-community"
                />
                <Text style={this.props.navigation.state.index === 0 ? styles.tabSelected : styles.tab}>Buy</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.touchable}
              onPress={() => {
                this.props.navigation.navigate("AnimalUpload");
              }}
            >
              <View style={styles.touchable}>
                <Icon
                  name="cash"
                  color={this.props.navigation.state.index === 1 ? Colors.white : Colors.steel}
                  size={totalSize(3.25)}
                  type="material-community"
                />
                <Text style={this.props.navigation.state.index === 1 ? styles.tabSelected : styles.tab}>Sell</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.touchable}
              onPress={() => {
                this.props.navigation.navigate("Profile");
              }}
            >
              <View style={styles.touchable}>
                <Icon
                  name="account"
                  color={this.props.navigation.state.index === 2 ? Colors.white : Colors.steel}
                  size={totalSize(3.25)}
                  type="material-community"
                />
                <Text style={this.props.navigation.state.index === 2 ? styles.tabSelected : styles.tab}>Profile</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.appColor1,
    height: 60,
    elevation: 30,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#cbcbcb",
    shadowOpacity: 1.0,
    borderTopWidth: 1,
    borderColor: "#f5f5f5"
  },
  footerForNotConnected: {
    height: 60 + 25,
    paddingBottom: 12
  },
  touchable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  tab: {
    color: 'white',
    fontWeight: "400",
    fontSize: 12
  },
  tabSelected: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 12
  }
});
