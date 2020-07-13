import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Picker,
} from 'react-native';
import {totalSize, width, height} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import colors from '../../../Themes/Colors';
import type from '../../../Themes/Fonts';
import commonStyles from '../../Styles/commonStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignIn: false,
    };
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.RowCompContainer}>
            <Text style={commonStyles.h3}>{this.props.user?.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="md-cart"
                type="ionicon"
                color={colors.appTextColor1}
                size={totalSize(2.5)}
              />
            </View>
          </View>
          <View>
            <View
              style={[
                styles.compContainer,
                {marginVertical: 0, marginTop: height(3)},
              ]}>
              <Text style={commonStyles.h4}>My Location</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigate('location')}
              style={{borderBottomWidth: 0.5, borderBottomColor: colors.steel}}>
              <View style={styles.RowCompContainer}>
                <Text style={styles.h5}>{this.props.user?.city}</Text>
                <Icon
                  name="ios-arrow-forward"
                  type="ionicon"
                  size={totalSize(2)}
                  color={colors.winterSale_txt1}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <View
              style={[
                styles.compContainer,
                {marginVertical: 0, marginTop: height(3)},
              ]}>
              <Text style={commonStyles.h4}>My Settings</Text>
            </View>
            <TouchableOpacity
              style={{borderBottomWidth: 0.5, borderBottomColor: colors.steel}}>
              <View style={styles.RowCompContainer}>
                <Text style={commonStyles.h5}>Payment</Text>
                <Icon
                  name="ios-arrow-forward"
                  type="ionicon"
                  size={totalSize(2)}
                  color={colors.winterSale_txt1}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('notificationSetting')}
              style={{borderBottomWidth: 0.5, borderBottomColor: colors.steel}}>
              <View style={styles.RowCompContainer}>
                <Text style={commonStyles.h5}>Notification</Text>
                <Icon
                  name="ios-arrow-forward"
                  type="ionicon"
                  size={totalSize(2)}
                  color={colors.winterSale_txt1}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('language')}
              style={{borderBottomWidth: 0.5, borderBottomColor: colors.steel}}>
              <View style={styles.RowCompContainer}>
                <Text style={commonStyles.h5}>Language</Text>
                <Icon
                  name="ios-arrow-forward"
                  type="ionicon"
                  size={totalSize(2)}
                  color={colors.winterSale_txt1}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('changePassword')}
              style={{borderBottomWidth: 0.5, borderBottomColor: colors.steel}}>
              <View style={styles.RowCompContainer}>
                <Text style={commonStyles.h5}>Change Password</Text>
                <Icon
                  name="ios-arrow-forward"
                  type="ionicon"
                  size={totalSize(2)}
                  color={colors.winterSale_txt1}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <View
              style={[
                styles.compContainer,
                {marginVertical: 0, marginTop: height(3)},
              ]}>
              <Text style={commonStyles.h4}>Support</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigate('aboutUs')}
              style={{borderBottomWidth: 0.5, borderBottomColor: colors.steel}}>
              <View style={styles.RowCompContainer}>
                <Text style={commonStyles.h5}>About Us</Text>
                <Icon
                  name="ios-arrow-forward"
                  type="ionicon"
                  size={totalSize(2)}
                  color={colors.winterSale_txt1}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('termsAndCond')}
              style={{borderBottomWidth: 0.5, borderBottomColor: colors.steel}}>
              <View style={styles.RowCompContainer}>
                <Text style={commonStyles.h5}>Terms & conditions</Text>
                <Icon
                  name="ios-arrow-forward"
                  type="ionicon"
                  size={totalSize(2)}
                  color={colors.winterSale_txt1}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('privacyPolicy')}
              style={{borderBottomWidth: 0.5, borderBottomColor: colors.steel}}>
              <View style={styles.RowCompContainer}>
                <Text style={commonStyles.h5}>Privacy Policy</Text>
                <Icon
                  name="ios-arrow-forward"
                  type="ionicon"
                  size={totalSize(2)}
                  color={colors.winterSale_txt1}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('SignIn')}
              style={{borderBottomWidth: 0.5, borderBottomColor: colors.steel}}>
              <View style={styles.RowCompContainer}>
                <Text style={commonStyles.h5}>Log Out</Text>
                <Icon
                  name="ios-arrow-forward"
                  type="ionicon"
                  size={totalSize(2)}
                  color={colors.winterSale_txt1}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: height(2.5)}}>
            <Text style={commonStyles.h5}>Contact Us</Text>
          </View>
          <View
            style={[
              styles.RowCompContainer,
              {
                width: width(100),
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: colors.steel,
                justifyContent: 'space-around',
              },
            ]}>
            <TouchableOpacity
              style={{alignItems: 'center', marginVertical: height(1)}}>
              <Icon
                name="phone"
                size={totalSize(3)}
                color={colors.winterSale_txt1}
              />
              <Text style={commonStyles.h5}>Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', marginVertical: height(1)}}>
              <Icon
                name="email"
                size={totalSize(3)}
                color={colors.winterSale_txt1}
              />
              <Text style={commonStyles.h5}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: colors.silver
  },
  compContainer: {
    width: width(90),
    alignItems: 'flex-start',
    marginVertical: height(2.5),
  },
  RowCompContainer: {
    width: width(90),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height(2),
  },
  h1: {
    fontSize: totalSize(5),
    color: colors.winterSale_txt1,
    //  fontWeight: 'bold',
    fontFamily: type.winterSale_bold,
  },
  h2: {
    fontSize: totalSize(4),
    color: colors.winterSale_txt1,
    //fontWeight: 'bold',
    fontFamily: type.winterSale_bold,
  },
  h3: {
    fontSize: totalSize(3),
    color: colors.winterSale_txt1,
    //fontWeight: 'bold',
    fontFamily: type.winterSale_bold,
  },
  h4: {
    fontSize: totalSize(2),
    color: colors.winterSale_txt1,
    //  fontWeight: 'bold',
    fontFamily: type.winterSale_bold,
  },
  h5: {
    fontSize: totalSize(1.5),
    color: colors.winterSale_txt1,
    //fontWeight: 'bold',
    fontFamily: type.winterSale_normal,
  },
  h6: {
    fontSize: totalSize(1.25),
    color: colors.winterSale_txt3,
    // fontWeight: 'bold',
    fontFamily: type.winterSale_normal,
  },
  BorderedButtonView: {
    height: height(6),
    width: width(44),
    borderWidth: 0.5,
    borderColor: colors.winterSale_txt1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coloredButtonView: {
    height: height(6),
    width: width(90),
    // borderWidth: 0.5,
    // borderColor: colors.winterSale_txt1,
    backgroundColor: colors.winterSale_txt1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProductImgStyle: {
    height: height(30),
    width: width(40),
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    //borderRadius: 10,
    //position: 'absolute',
    //: 'center',
    //justifyContent: 'center',
    //backgroundColor: '#ffffff80'
  },
  inputStyle: {
    height: height(6),
    width: width(40),
    fontSize: totalSize(1.5),
    // backgroundColor: 'red',
    //marginHorizontal: 10
  },
  inputContainer: {
    height: height(5),
    width: width(50),
    borderRadius: 100,
    backgroundColor: '#ffffff',
    //marginHorizontal: 10,
    //elevation: 5,
    borderWidth: 0.5,
    borderColor: colors.steel,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});


Profile.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Profile)