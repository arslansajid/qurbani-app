import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import commonStyles from '../Styles/commonStyles';
import images from '../../Themes/Images';
import {height, width, totalSize} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import colors from '../../Themes/Colors';
import Config from '../../Config';
import axiosInstance from '../../api.config';
import {userSignIn} from '../../Api/ApiManager';
import {connect} from 'react-redux';
import {userLogin} from '../../redux/actions/LoginActions';
import translations from '../../Translations/Translations.js';
import FacebookIcon from '../../../Icons/social-icons/facebook-icon.png';
import GoogleIcon from '../../../Icons/social-icons/google-icon.png';
import LanguageSelect from '../../Components/LanguageSelect';
import {LanguageConsumer} from '../../Context/LanguageContext';
// import auth from '@react-native-firebase/auth';
import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
 

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
      email: '',
      password: '',
      loading: false,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: 'AIzaSyCPmI-UrrHYM4F-MjDCiDeADdnqDc7NYs8', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('###### userInfo', userInfo)
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log('some other error happened')
        this.props.navigation.navigate('App');
        // some other error happened
      }
    }
  };

  onFacebookButtonPress = async() => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    console.log("AccessToken AccessToken AccessToken ########## ", data)
    this.props.navigation.navigate('App');
  
    // Create a Firebase credential with the AccessToken
    // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // // Sign-in the user with the credential
    // return auth().signInWithCredential(facebookCredential);
  }

  selectUserforSignIn = selected => {
    this.setState({selectedUser: selected});
  };

  handleSignIn = async () => {
    const {email, password} = this.state;
    this.setState({loading: true});
    // const user = await userSignIn(email, password);
    // if (user) {
    //   this.setState({loading: false});
    //   this.props.dispatch(userLogin(user));
    //   this.props.navigation.navigate('App');
    // } else {
    //   this.setState({loading: false});
    //   Alert.alert('Something went wrong!');
    // }
    this.props.navigation.navigate('App');
  };

  render() {
    const {selectedUser} = this.state;
    const navigate = this.props.navigation.navigate;
    return (
      <LanguageConsumer>
        {props => {
          return (
            <View style={[commonStyles.mainContainer, styles.container]}>
              {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <View style={{marginVertical: height(3)}}>
                  <Image
                    source={images.goatLogo}
                    resizeMode="contain"
                    style={commonStyles.smallLogoStyle}
                  />
                  </View>
                  {/* <Text>{props.language}</Text>
                  <LanguageSelect /> */}

                  {/* <View style={styles.userButtonsContainer}>
                    <TouchableOpacity
                      onPress={() => this.selectUserforSignIn('candidate')}
                      style={[
                        selectedUser === 'candidate'
                          ? {...commonStyles.buttonPinkBordered}
                          : {...commonStyles.buttonBlueBordered},
                        styles.userSelectionButton,
                      ]}>
                      <Text style={styles.userSelectionButtonText}>
                        Candidate
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.selectUserforSignIn('employer')}
                      style={[
                        selectedUser === 'employer'
                          ? {...commonStyles.buttonPinkBordered}
                          : {...commonStyles.buttonBlueBordered},
                        styles.userSelectionButton,
                      ]}>
                      <Text style={styles.userSelectionButtonText}>
                        Employer
                      </Text>
                    </TouchableOpacity>
                  </View> */}
                  <View>
                    <View style={commonStyles.inputContainer}>
                      <Icon
                        name="email"
                        color={colors.appColor1}
                        size={totalSize(2.5)}
                      />
                      <TextInput
                        placeholder="Email"
                        placeholderTextColor="#000000"
                        style={commonStyles.inputStyle}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                      />
                    </View>
                    <View
                      style={[
                        commonStyles.inputContainer,
                        {marginTop: height(2.5)},
                      ]}>
                      <Icon
                        name="lock"
                        color={colors.appColor1}
                        size={totalSize(2.5)}
                      />
                      <TextInput
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor="#000000"
                        style={commonStyles.inputStyle}
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                      />
                    </View>
                  </View>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                      style={[commonStyles.buttonColored]}
                      onPress={() => this.handleSignIn()}>
                      <Text style={[commonStyles.textButton, {}]}>Signin</Text>
                      {this.state.loading ? (
                        <View style={commonStyles.btnLoader}>
                          <ActivityIndicator color="white" size="small" />
                        </View>
                      ) : null}
                    </TouchableOpacity>
                    <Text
                      style={[commonStyles.h5, {marginVertical: height(2.5)}]}>
                      OR
                    </Text>
                    <TouchableOpacity
                      style={[commonStyles.buttonBordered, {}]}
                      onPress={() => navigate('SignUp')}>
                      <Text
                        style={[
                          commonStyles.textButton,
                          {color: colors.appColor1},
                        ]}>
                        Request an Account
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={commonStyles.oAuthButtonsContainer}>
                  <View style={styles.center}>
                    <View style={commonStyles.oAuthBtnContainer}>
                      <TouchableOpacity
                        underlayColor="#dfe3ee"
                        onPress={() => this.onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
                        style={[
                          commonStyles.oAuthBtn,
                          {backgroundColor: '#3B5998'},
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
                        onPress={() => {this.googleSignIn()}}
                        style={[
                          commonStyles.oAuthBtn,
                          {backgroundColor: '#fff'},
                        ]}>
                        <Image
                          source={GoogleIcon}
                          style={commonStyles.oAuthBtnImage}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
            </View>
          );
        }}
      </LanguageConsumer>
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
  center: {
    alignItems: 'center',
  },
});

export default connect(null)(SignIn);
