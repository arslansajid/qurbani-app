import React, {Component} from 'react';
import {View, ImageBackground, Image, ActivityIndicator} from 'react-native';
import commonStyles from '../Styles/commonStyles';
import images from '../../Themes/Images';
import {height} from 'react-native-dimension';
import colors from '../../Themes/Colors';

class Splash extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Auth');
    }, 2500);
  };

  render() {
    return (
      <View
        style={[
          commonStyles.mainContainer,
          {justifyContent: 'center', backgroundColor: colors.appColor1},
        ]}>
        <Image
          source={images.goatLogo}
          resizeMode="contain"
          style={commonStyles.logoStyle}
        />
        <View style={{position: 'absolute', bottom: height(5)}}>
          <ActivityIndicator color={colors.appColor1} size="large" />
        </View>
      </View>
    );
  }
}

export default Splash;
