import React from 'react';
import {Text, View} from 'react-native';
import Colors from '../Themes/Colors';

const ScreenTitle = props => {
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <Text style={{color: Colors.appColor1, fontSize: 16, fontWeight: 'bold'}}>
        Search Results
      </Text>
      {!!props.jobsCount && props.jobsCount !== 0 && (
        <Text style={{color: Colors.appColor1, fontSize: 12}}>
          {props.jobsCount}
          {props.jobsCount === 1 ? ' animal' : ' animals'} found
        </Text>
      )}
      {!!props.employersCount && props.employersCount !== 0 && (
        <Text style={{color: Colors.appColor1, fontSize: 12}}>
          {props.employersCount}
          {props.employersCount === 1 ? ' employer' : ' employers'} found
        </Text>
      )}
    </View>
  );
};

export default ScreenTitle;
