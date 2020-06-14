import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {totalSize, width, height} from 'react-native-dimension';
import commonStyles from '../Containers/Styles/commonStyles';
import colors from '../Themes/Colors';
import {LanguageConsumer} from '../Context/LanguageContext';

class LanguageSelect extends Component {
  render() {
    return (
      <LanguageConsumer>
        {props => {
          return (
            <View style={styles.container}>
              <TouchableOpacity
                style={[
                  commonStyles.textButton,
                  {
                    paddingHorizontal: width(5),
                    paddingVertical: height(1),
                    backgroundColor: colors.appColor,
                  },
                ]}
                onPress={() => {
                  props.updateLanguage('en');
                }}>
                <Text style={[commonStyles.h4, styles.btnText]}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  commonStyles.textButton,
                  {
                    paddingHorizontal: width(5),
                    paddingVertical: height(1),
                    backgroundColor: colors.appColor1,
                  },
                ]}
                onPress={() => {
                  props.updateLanguage('hr');
                }}>
                <Text style={[commonStyles.h4, styles.btnText]}>HR</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </LanguageConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: height(3),
  },
  btnText: {
    color: 'white',
  },
});

export default LanguageSelect;
