import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import colors from '../Themes/Colors';
import {Icon} from 'react-native-elements';
import {totalSize, height, width} from 'react-native-dimension';
import commonStyles from '../Containers/Styles/commonStyles';
import images from '../Themes/Images';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: colors.appColor1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          </View>
          <View style={{flex: 7}}>
            <ScrollView>
              <DrawerItems {...this.props} />
              {/* <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('EmployersListScreen');
                  this.props.navigation.toggleDrawer();
                }}
                style={{marginHorizontal: width(5)}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: height(2),
                  }}>
                  <Icon
                    name="fire"
                    type="material-community"
                    color={colors.white}
                    size={totalSize(2.5)}
                    iconStyle={{marginRight: width(10)}}
                  />
                  <Text style={[commonStyles.h4, {color: colors.white}]}>Employers</Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('shopByCategory');
                  this.props.navigation.toggleDrawer();
                }}
                style={{marginHorizontal: width(5)}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: height(2),
                  }}>
                  <Icon
                    name="view-grid"
                    type="material-community"
                    color={colors.white}
                    size={totalSize(2)}
                    iconStyle={{marginRight: width(12)}}
                  />
                  <Text style={[commonStyles.h4, {color: colors.white}]}>Blog</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Favourites');
                  this.props.navigation.closeDrawer();
                }}
                style={{marginHorizontal: width(5)}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: height(2),
                  }}>
                  <Icon
                    name="heart-outline"
                    type="material-community"
                    color={colors.white}
                    size={totalSize(2)}
                    iconStyle={{marginRight: width(12)}}
                  />
                  <Text style={[commonStyles.h4, {color: colors.white}]}>Jobs</Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Profile');
                  this.props.navigation.closeDrawer();
                }}
                style={{marginHorizontal: width(5)}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: height(2),
                  }}>
                  <Icon
                    name="account-circle-outline"
                    type="material-community"
                    color={colors.white}
                    size={totalSize(2.5)}
                    iconStyle={{marginRight: width(10)}}
                  />
                  <Text style={[commonStyles.h4, {color: colors.white}]}>Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('aboutUs');
                  this.props.navigation.closeDrawer();
                }}
                style={{
                  marginHorizontal: width(5),
                  borderTopWidth: 1,
                  borderTopColor: colors.steel,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: height(2),
                  }}>
                  <Icon
                    name="information-variant"
                    type="material-community"
                    color={colors.white}
                    size={totalSize(2)}
                    iconStyle={{marginRight: width(12)}}
                  />
                  <Text style={[commonStyles.h4, {color: colors.white}]}>About Us</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('contactUs');
                  this.props.navigation.closeDrawer();
                }}
                style={{marginHorizontal: width(5)}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: height(2),
                  }}>
                  <Icon
                    name="contact-phone"
                    type="antDesign"
                    color={colors.white}
                    size={totalSize(2.5)}
                    iconStyle={{marginRight: width(10)}}
                  />
                  <Text style={[commonStyles.h4, {color: colors.white}]}>Contact Us</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('termsAndCond');
                  this.props.navigation.closeDrawer();
                }}
                style={{marginHorizontal: width(5)}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: height(2),
                  }}>
                  <Icon
                    name="contacts"
                    type="enTypo"
                    color={colors.white}
                    size={totalSize(2.5)}
                    iconStyle={{marginRight: width(10)}}
                  />
                  <Text style={[commonStyles.h4, {color: colors.white}]}>Terms and Condition</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('privacyPolicy');
                  this.props.navigation.closeDrawer();
                }}
                style={{marginHorizontal: width(5)}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: height(2),
                  }}>
                  <Icon
                    name="security"
                    type="material-community"
                    color={colors.white}
                    size={totalSize(2.5)}
                    iconStyle={{marginRight: width(10)}}
                  />
                  <Text style={[commonStyles.h4, {color: colors.white}]}>Privacy Policy</Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SignIn');
                  this.props.navigation.closeDrawer();
                }}
                style={{marginHorizontal: width(5)}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: height(2),
                  }}>
                  <Icon
                    name="security"
                    type="material-community"
                    color={colors.white}
                    size={totalSize(2.5)}
                    iconStyle={{marginRight: width(10)}}
                  />
                  <Text style={[commonStyles.h4, {color: colors.white}]}>Log Out</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={{}}>
              <Image
                source={images.logo}
                resizeMode="contain"
                style={{
                  height: totalSize(10),
                  width: totalSize(10),
                  borderRadius: 5,
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
