import React, {Fragment, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {totalSize, width, height} from 'react-native-dimension';
import commonStyles from '../Containers/Styles/commonStyles';
import colors from '../Themes/Colors';

const JobCard = props => {
  const [isFavorite, setFavorite] = useState(false);
  return (
    <View style={styles.container}>
      <View
        style={[
          commonStyles.row,
          commonStyles.space_btw,
          commonStyles.align_center,
        ]}>
        <Text style={commonStyles.h3}>{props.title}</Text>
        <Icon
          name={isFavorite ? 'heart' : 'heart-o'}
          type="font-awesome"
          size={totalSize(2)}
          color={colors.appColor1}
          onPress={() => setFavorite(!isFavorite)}
        />
      </View>
      <Text style={[commonStyles.h5, {marginTop: height(1)}]}>
        {props.categoryName}
      </Text>
      <Text style={[commonStyles.h5, {marginTop: height(1)}]}>
        {props.companyName}
      </Text>
      <View
        style={[
          commonStyles.row,
          commonStyles.space_btw,
          commonStyles.align_center,
          {marginTop: height(1)},
        ]}>
        <Text style={commonStyles.h4}>
          Location:{' '}
          <Text style={commonStyles.h5}>
            {props.jobCity}, {props.jobCountry}
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() =>
            props.navigate('JobDetailScreen', {jobId: props.job.id})
          }>
          <Text style={styles.applyBtnText}>View Details</Text>
        </TouchableOpacity>
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
    backgroundColor: colors.appColor1,
    padding: width(2),
    borderRadius: 5,
  },
  applyBtnText: {
    color: 'white',
    fontSize: totalSize(2),
  },
});

export default JobCard;
