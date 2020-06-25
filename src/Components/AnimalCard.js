import React, { Fragment, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { totalSize, width, height } from 'react-native-dimension';
import commonStyles from '../Containers/Styles/commonStyles';
import colors from '../Themes/Colors';
import images from '../Themes/Images';

const EmployerCard = props => {
  return (
    <TouchableOpacity onPress={() => props.navigate('AnimalDetailScreen', {
      selectedAnimal: props.animal
    })}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.imgContainer}>
            <Image
              source={!!props.image ? { uri: props.image } : images.placeholder}
              resizeMode="cover"
              style={styles.imgContainer}
            />
          </View>
          <View style={styles.detailsContainer}>
            {/* <View
              style={[
                commonStyles.row,
                commonStyles.space_btw,
                commonStyles.align_center,
              ]}>
              <Text style={commonStyles.h4}>{props.title}</Text>
              <Icon
                name={isFavorite ? 'star' : 'star-o'}
                type="font-awesome"
                size={totalSize(2)}
                color={colors.appColor1}
                onPress={() => setFavorite(!isFavorite)}
              />
            </View> */}
                <Text style={[commonStyles.h4, commonStyles.bold]}>
                  Price: {props.price}/- Rs
                </Text>
                <Text style={[commonStyles.h5, commonStyles.bold, { marginTop: height(1) }]}>
                  Weight: {props.weight} ({props.weight / 40} mann)
                </Text>
            
            {/* <Text style={[commonStyles.h5, { marginTop: height(1) }]}>
              Gender: Male
            </Text> */}
            {/* <View
              style={[
                commonStyles.row,
                commonStyles.space_btw,
                commonStyles.align_center,
                { marginTop: height(1) },
              ]}>
              <Text style={commonStyles.h4}>
                City:{' '}
                <Text style={commonStyles.h5}>
                  {props.jobCity}
                </Text>
              </Text>
            </View> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: height(1.5),
    //ios shadow styles
    elevation: 2,
    shadowOffset: { width: 1, height: 3 },
    shadowColor: '#d8d8d8',
    shadowOpacity: 0.5,
    borderWidth: 1,
    borderColor: colors.steel,
    backgroundColor: 'white',
    // padding: 15,
    // borderRadius: 5,
    width: width(50),
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
  card: {
    // flexDirection: 'row',
    flex: 1,
  },
  imgContainer: {
    width: '100%',
    height: height(20),
    // marginRight: width(3),
    // borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5
  }
});

export default EmployerCard;
