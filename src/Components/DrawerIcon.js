import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {totalSize, width} from 'react-native-dimension';

const DrawerButton = props => {
  return (
    <TouchableOpacity
      style={{paddingHorizontal: width(5)}}
      onPress={() => props.navigation.openDrawer()}>
      <Icon
        name="menu"
        size={totalSize(3)}
        onPress={() => props.navigation.openDrawer()}
      />
    </TouchableOpacity>
  );
};

export default DrawerButton;
