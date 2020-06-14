import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import commonStyles from '../Containers/Styles/commonStyles';
import colors from '../Themes/Colors';
import { Icon } from 'react-native-elements';
import { totalSize, width, height } from 'react-native-dimension';
import { SafeAreaView } from "react-navigation";

class ApplyJobFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardShown: false // Android only.
    };
  }

  render() {

    return (
      <SafeAreaView /* style={GlobalStyles.safeAreaView} */ forceInset={{ top: "never", bottom: "always" }}>
        <View style={{ flex: 1 }}>
          <View
            style={styles.container}
            ref={ref => {
              this.ApplyJobFooter = ref;
            }}
          >
            <View style={[{zIndex: 999}, commonStyles.row, commonStyles.space_btw, commonStyles.align_center]}>
              <TouchableOpacity>
                <Icon
                  name={'heart-o'}
                  type="font-awesome"
                  size={totalSize(5)}
                  color={colors.appColor1}
                // onPress={() => setFavorite(!isFavorite)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[commonStyles.buttonColored, { width: width(70) }]}
                onPress={() => { }}>
                <Text style={[commonStyles.textButton, { fontWeight: 'bold' }]}>{this.props.title}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    // alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 24,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: colors.borderColor,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    // for ios only
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    zIndex: 999,
    width: '100%'
  },
  bookingDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 10
    // paddingHorizontal: 16
  },
  label: {
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.TEXT_GREY,
    paddingBottom: "3.7%"
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.TEXT_BLACK
  },
  seperator: {
    // marginHorizontal: 15,
    backgroundColor: colors.TAB_UNSELECTED,
    width: 0.8,
    height: "100%"
  }
});

ApplyJobFooter.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(null)(ApplyJobFooter);
