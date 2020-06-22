import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import commonStyles from '../Styles/commonStyles';
import images from '../../Themes/Images';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import colors from '../../Themes/Colors';
import type from '../../Themes/Fonts';
import Modal from 'react-native-modal';
import Config from '../../Config';
import axiosInstance from '../../api.config';
import {signUp} from '../../Backend/Services/authService';
import { SafeAreaView } from "react-navigation";

import FacebookIcon from '../../../Icons/social-icons/facebook-icon.png';
import GoogleIcon from '../../../Icons/social-icons/google-icon.png';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequestSendModalVisible: false,
      selectedUser: null,
      name: '',
      email: '',
      address: '',
      company: '',
      phone: '',
      role: '',
      loading: false,
      success: null,
    };
  }

  sendRequestForSignup = () => {
    const { selectedUser } = this.state;
    // const selectedRole =
    //   selectedUser === 'employer' ? 'ROLE_EMPLOYER' : 'ROLE_CANDIDATE';
    // let body = new FormData();

    // let data = {
    //   name: this.state.name,
    //   email: this.state.email,
    //   role: selectedRole,
    // };

    // Object.keys(data).forEach((item, index) => {
    //   body.append(`${item}`, data[item]);
    // });

    // const headers = {
    //   password: '12345678',
    // };
    this.setState({ loading: true });
    // axiosInstance
    //   .post(Config.API_END_POINT + '/user', body, {
    //     headers: headers,
    //   })
    //   .then(response => {
    //     if (response != null && response.data != null) {
    //       this.setState({ loading: false, success: true });
    //       console.log('response ####', response.data);
    //       setTimeout(() => {
    //         this.props.navigation.navigate('signIn');
    //       }, 3000);
    //     }
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false, success: false });
    //     console.log('################ ERROR', error);
    //   });

    signUp("arslan@gmail.com", "123456")
    .then((res) => {
      console.log("######## res", res)
    })
    .catch((err) => {
      console.log("######## err", err)
    })
    
          setTimeout(() => {
            this.props.navigation.navigate('SignIn');
          }, 2000);
  };

  selectUserforSignup = selected => {
    this.setState({ selectedUser: selected });
  };

  render() {
    const { selectedUser } = this.state;
    const navigate = this.props.navigation.navigate;
    return (
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always", bottom: "always" }}>
        <View style={[commonStyles.mainContainer, styles.container]}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center' }}>
            <View style={{marginVertical: height(3)}}>
              <Image
                source={images.goatLogo}
                resizeMode="contain"
                style={commonStyles.smallLogoStyle}
              />
              </View>
              {/* <View style={styles.userButtonsContainer}>
                <TouchableOpacity
                  onPress={() => this.selectUserforSignup('candidate')}
                  style={[
                    selectedUser === 'candidate'
                      ? { ...commonStyles.buttonPinkBordered }
                      : { ...commonStyles.buttonBlueBordered },
                    styles.userSelectionButton,
                  ]}>
                  <Text style={styles.userSelectionButtonText}>Candidate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.selectUserforSignup('employer')}
                  style={[
                    selectedUser === 'employer'
                      ? { ...commonStyles.buttonPinkBordered }
                      : { ...commonStyles.buttonBlueBordered },
                    styles.userSelectionButton,
                  ]}>
                  <Text style={styles.userSelectionButtonText}>Employer</Text>
                </TouchableOpacity>
              </View> */}
              <View style={commonStyles.inputContainer}>
                <Icon
                  name="person"
                  color={colors.appColor1}
                  size={totalSize(2.5)}
                />
                <TextInput
                  placeholder="Full Name"
                  onChangeText={name => this.setState({ name })}
                  value={this.state.name}
                  placeholderTextColor="#000000"
                  style={commonStyles.inputStyle}
                />
              </View>
              {/* <View
                style={[commonStyles.inputContainer, { marginTop: height(2.5) }]}>
                <Icon
                  name="building"
                  type="font-awesome"
                  color={colors.appColor1}
                  size={totalSize(2.5)}
                />
                <TextInput
                  placeholder="Company Name"
                  placeholderTextColor="#000000"
                  style={commonStyles.inputStyle}
                  onChangeText={company => this.setState({ company })}
                  value={this.state.company}
                />
              </View> */}
              <View
                style={[commonStyles.inputContainer, { marginTop: height(2.5) }]}>
                <Icon
                  name="location-on"
                  type="material"
                  color={colors.appColor1}
                  size={totalSize(2.5)}
                />
                <TextInput
                  placeholder="Address"
                  placeholderTextColor="#000000"
                  style={commonStyles.inputStyle}
                  onChangeText={address => this.setState({ address })}
                  value={this.state.address}
                />
              </View>
              <View
                style={[commonStyles.inputContainer, { marginTop: height(2.5) }]}>
                <Icon
                  name="phone"
                  color={colors.appColor1}
                  size={totalSize(2.5)}
                />
                <TextInput
                  placeholder="Telephone"
                  placeholderTextColor="#000000"
                  style={commonStyles.inputStyle}
                  onChangeText={phone => this.setState({ phone })}
                  value={this.state.phone}
                />
              </View>
              <View
                style={[commonStyles.inputContainer, { marginTop: height(2.5) }]}>
                <Icon
                  name="email"
                  color={colors.appColor1}
                  size={totalSize(2.5)}
                />
                <TextInput
                  placeholder="Email"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                  placeholderTextColor="#000000"
                  style={commonStyles.inputStyle}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={commonStyles.buttonColored}
                  onPress={this.sendRequestForSignup}>
                  <Text style={[commonStyles.textButton, {}]}>
                    Sign Up
                  </Text>
                  {this.state.loading &&
                    <View style={commonStyles.btnLoader}>
                      <ActivityIndicator color="white" size="small" />
                    </View>
                  }
                </TouchableOpacity>
              </View>
              <View style={commonStyles.oAuthButtonsContainer}>
                <View style={styles.center}>
                  <View style={commonStyles.oAuthBtnContainer}>
                    <TouchableOpacity
                      underlayColor="#dfe3ee"
                      onPress={() => { }}
                      style={[
                        commonStyles.oAuthBtn,
                        { backgroundColor: '#3B5998' },
                      ]}>
                      <Image
                        source={FacebookIcon}
                        style={commonStyles.oAuthBtnImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.center}>
                  <View style={commonStyles.oAuthBtnContainer}>
                    <TouchableOpacity
                      underlayColor="#cccccc"
                      onPress={() => { }}
                      style={[
                        commonStyles.oAuthBtn,
                        { backgroundColor: '#fff' },
                      ]}>
                      <Image
                        source={GoogleIcon}
                        style={commonStyles.oAuthBtnImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: height(5) }}>
                <Text style={commonStyles.h5}>
                  Already have an account?{' '}
                  <Text
                    style={{
                      color: colors.appColor1,
                      fontFamily: type.appTextMedium,
                    }}
                    onPress={() => navigate('SignIn')}>
                    Signin
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <Modal
          isVisible={this.state.isRequestSendModalVisible}
        // onBackdropPress={this.toggleModalRequestSend}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBody}>
              <View style={styles.modalContent}>
                {this.state.success ? (
                  <Fragment>
                    <Icon
                      name="md-checkmark-circle-outline"
                      type="ionicon"
                      color={'lightgreen'}
                      size={totalSize(10)}
                    />
                    <Text style={commonStyles.h4}>
                      Your Request has been send
                    </Text>
                    <View style={{ width: width(60), alignItems: 'center' }}>
                      <Text style={[commonStyles.h5, styles.modalContactText]}>
                        We'll contact you in 2-3 working days and discus your
                        request
                      </Text>
                    </View>
                  </Fragment>
                ) : (
                    <Text>Error Occured!</Text>
                  )}
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff80',
    justifyContent: 'center',
  },
  buttonsContainer: {
    marginVertical: height(5),
    alignItems: 'center',
  },
  userButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
  },
  userSelectionButton: {
    width: width(30),
    borderRadius: 5,
    marginBottom: height(5),
  },
  userSelectionButtonText: {
    fontSize: totalSize(2),
    color: '#000000',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    width: width(80),
    backgroundColor: '#FFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
    marginVertical: height(5),
  },
  modalContactText: {
    textAlign: 'center',
    marginTop: height(1),
  },
});

export default SignUp;
