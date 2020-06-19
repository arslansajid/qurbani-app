import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../Themes/Colors';
import commonStyles from '../Containers/Styles/commonStyles';
import { Select, Option } from "react-native-chooser";
import { Dropdown } from 'react-native-material-dropdown';
import { Picker } from '@react-native-community/picker';
import colors from '../Themes/Colors';
// import moment from 'moment';

let { width } = Dimensions.get('window');

class TopFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Select Me Please",
      selectedFilter: null,
      selectedPrice: null,
      selectedWeight: "",
      language: 'java',
    }
  }

  onSelect(value, label) {
    this.setState({ value: value });
  }

  toggleFilter = (selected) => {
    if (selected === this.state.selectedFilter) {
      this.setState({ selectedFilter: null })
    } else {
      this.setState({
        selectedFilter: selected,
      })
    }
  }

  render() {
    console.log(this.state);
    let weight = [{
      value: '40 - 80 kg (2-3 mann)',
    }, {
      value: '80 - 120 kg (3-4 mann)',
    }, {
      value: '120 - 160 kg (3-4 mann)',
    }];
    let price = [{
      value: '40,000 - 50,000 Rs',
    }, {
      value: '50,000 - 60,000 Rs',
    }, {
      value: '60,000 - 70,000 Rs'
    }];
    return (
      <>
        <View
          style={styles.container}>

          <View style={styles.filterContainer}>
          <View style={styles.editBtnContainer}>
            <Picker
              mode={"dropdown"}
              selectedValue={this.state.selectedWeight}
              style={styles.editBtn}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedWeight: itemValue })
              }>
              <Picker.Item label="Select Weight" value="0" />
              {
                weight.map((option, index) => {
                  return (
                    <Picker.Item label={option.value} value={option.value} />
                  )
                })
              }
            </Picker>
            </View>
          </View>

          <View style={styles.filterContainer}>
            <View style={styles.editBtnContainer}>
            <Picker
              mode={"dropdown"}
              selectedValue={this.state.selectedPrice}
              style={styles.editBtn}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedPrice: itemValue })
              }>
              <Picker.Item label="Select Price" value="0" />
              {
                price.map((option, index) => {
                  return (
                    <Picker.Item label={option.value} value={option.value} />
                  )
                })
              }
            </Picker>
            </View>
          </View>

        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    zIndex: 100,
    minHeight: 55,
    maxHeight: 55,
    // borderBottomColor: '#d8d8d8',
    // borderBottomWidth: 1,
    elevation: 2,
    //ios shadow styles
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  editBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.appColor1,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 4,
    flex: 1,
    width: '100%',
  },
  editBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    color: colors.white,
    backgroundColor: colors.appColor1
  },
  filterContainer: {
    minWidth: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#d8d8d8',
    paddingHorizontal: 5,
  },
  filterLabel: {
    color: Colors.TEXT_GREY,
    fontSize: 12,
  },
  filterValue: {
    color: Colors.TEXT_BLACK,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
});

// TopFilters.propTypes = {
//   selectedLocation: PropTypes.string,
//   startDate: PropTypes.object,
//   endDate: PropTypes.object,
//   totalRoomCount: PropTypes.number,
// };

// function mapStateToProps(state) {
//   return {
//     selectedLocation: state.selectedLocation.location,
//     startDate: state.dates.checkInDate,
//     endDate: state.dates.checkOutDate,
//     totalRoomCount: state.totalRoomCount,
//   };
// }

export default connect(null)(TopFilters);
