import React, {Fragment, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {totalSize, width, height} from 'react-native-dimension';
import commonStyles from '../Containers/Styles/commonStyles';
import colors from '../Themes/Colors';

const JobCard = props => {
  return (
    <View style={styles.container}>
      <View
        style={[
          commonStyles.row,
          commonStyles.space_btw,
          commonStyles.align_center,
        ]}>
        <Text style={[commonStyles.h3, styles.placeHolderLine]}>
          {'                     '}
        </Text>
      </View>
      <Text
        style={[
          commonStyles.h5,
          {marginTop: height(1)},
          styles.placeHolderLine,
        ]}>
        {'                '}
      </Text>
      <Text
        style={[
          commonStyles.h5,
          {marginTop: height(1)},
          styles.placeHolderLine,
        ]}>
        {'           '}
      </Text>
      <View
        style={[
          commonStyles.row,
          commonStyles.space_btw,
          commonStyles.align_center,
          {marginTop: height(1)},
        ]}>
        <Text style={[commonStyles.h4, styles.placeHolderLine]}>
          {'                         '}
          <Text style={commonStyles.h5}>{'                     '}</Text>
        </Text>
        <View style={styles.applyBtn}>
          <Text style={styles.applyBtnText}>{'          '}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height(3),
    //ios shadow styles
    elevation: 2,
    shadowOffset: {width: 1, height: 3},
    shadowColor: '#d8d8d8',
    shadowOpacity: 0.5,
    borderWidth: 1,
    borderColor: colors.steel,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
  applyBtn: {
    backgroundColor: colors.borderColor,
    padding: width(2),
    borderRadius: 5,
  },
  applyBtnText: {
    color: 'white',
    fontSize: totalSize(2),
  },
  placeHolderLine: {
    backgroundColor: colors.borderColor,
  },
});

export default JobCard;
