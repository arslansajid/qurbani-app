import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert, Share } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import commonStyles from '../Containers/Styles/commonStyles';
import colors from '../Themes/Colors';
import { Icon } from 'react-native-elements';
import { totalSize, width, height } from 'react-native-dimension';
import { SafeAreaView } from "react-navigation";
import Styles from "../Containers/GalleryScreens/styles/GalleryScreenStyles";

class ApplyJobFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Qurbani App is the best app."
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const SUPPORT_EMAIL = "support@qurbaniapp.com";
    const SUPPORT_PHONE_NUMBER = "+92 3 111 444 100";
    return (
      <View
        style={styles.container}
        ref={ref => {
          this.ApplyJobFooter = ref;
        }}
      >
        <View style={[{ zIndex: 1 }, commonStyles.row, commonStyles.space_btw, commonStyles.align_center]}>
          <TouchableOpacity
            onPress={() => Linking.openURL("tel:" + SUPPORT_PHONE_NUMBER)}
            style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, styles.item]}>
            <Icon
              name={'phone'}
              type="font-awesome"
              size={totalSize(2.5)}
              color={colors.white}
            />
            <Text style={[commonStyles.h4, styles.label]}>Call</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:" + SUPPORT_EMAIL)}
            style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, styles.item]}>
            <Icon
              name={'envelope'}
              type="font-awesome"
              size={totalSize(2.5)}
              color={colors.white}
            />
            <Text style={[commonStyles.h4, styles.label]}>Chat</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={this.onShare}
            style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
            <Icon
              name={'share'}
              type="font-awesome"
              size={totalSize(2.5)}
              color={colors.white}
            />
            <Text style={[commonStyles.h4, styles.label]}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    backgroundColor: colors.appColor1,
    // alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    elevation: 24,
    borderColor: colors.borderColor,
    // for ios only
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    zIndex: 999
  },
  bookingDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 10,
    zIndex: 999
    // paddingHorizontal: 16
  },
  label: {
    fontWeight: "bold",
    letterSpacing: 0,
    paddingHorizontal: 10,
    color: colors.white
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
  },
  item: {
    // height: '100%',
    // width: 1,
    height: '100%',
    width: '100%',
    paddingVertical: 10,
  },
  divider: {
    height: '100%',
    width: 2,
    backgroundColor: colors.white
  }
});

ApplyJobFooter.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(null)(ApplyJobFooter);
