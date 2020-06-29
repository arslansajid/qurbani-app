import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {totalSize, height, width} from 'react-native-dimension';
import colors from '../Themes/Colors';
import commonStyles from '../Containers/Styles/commonStyles';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  resetCity,
  resetCategory,
} from '../redux/actions/CandidateFiltersActions';

class DropDownFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {label, value, dispatch, filter, hasError} = this.props;
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => {
          this.props.navigation.navigate('FilterSearchScreen', {
            type: filter,
          });
        }}>
        <View style={[commonStyles.filterContainer, hasError && {borderColor: 'red', borderWidth: 2}]}>
          <Text style={commonStyles.filterText}>{value ? value : label}</Text>
          <Icon
            name={value ? 'times-circle' : 'angle-down'}
            type="font-awesome"
            color={colors.white}
            size={totalSize(2.5)}
            onPress={
              value && filter === 'City'
                ? () => dispatch(resetCity())
                : () => dispatch(resetCategory())
            }
          />
        </View>
      </TouchableHighlight>
    );
  }
}

export default connect(null)(DropDownFilter);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: width(5),
  },
});
