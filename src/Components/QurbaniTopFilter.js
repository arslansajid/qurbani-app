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
      selectedPrice: null,
      selectedWeight: null,
    }
  }

  render() {
    let weight = [
      {
        label: '< 40 kg (1 mann)',
        value: '0-40'
      },
      {
        label: '40 - 80 kg (2-3 mann)',
        value: '40-80'
      }, {
        label: '80 - 120 kg (3-4 mann)',
        value: '80-120'
      }, {
        label: '120 - 160 kg (3-4 mann)',
        value: '120-160'
      }, {
        label: '160 - 200 kg (3-4 mann)',
        value: '160-200'
      }, {
        label: '200 - 240 kg (3-4 mann)',
        value: '200-240'
      }, {
        label: '240 - 280 kg (3-4 mann)',
        value: '240-280'
      }, {
        label: '280 - 320 kg (3-4 mann)',
        value: '280-320'
      }, {
        label: '320 - 360 kg (3-4 mann)',
        value: '320-360'
      }, {
        label: '360 - 400 kg (3-4 mann)',
        value: '360-400'
      }, {
        label: '> 400 kg (10 mann)',
        value: '400-999999'
      },
    ];
    let price = [
      {
        label: '< 20,000 Rs',
        value: '0-20000'
      },
      {
        label: '20,000 - 40,000 Rs',
        value: '20000-40000'
      },
      {
        label: '40,000 - 60,000 Rs',
        value: '40000-60000'
      }, {
        label: '60,000 - 80,000 Rs',
        value: '60000-80000'
      }, {
        label: '80,000 - 1,00,000 Rs',
        value: '80000-100000'
      }, {
        label: '1,00,000 - 1,20,000 Rs',
        value: '100000-1200000'
      }, {
        label: '1,20,000 - 1,40,000 Rs',
        value: '120000-1400000'
      }, {
        label: '1,40,0000 - 1,60,000 Rs',
        value: '140000-1600000'
      }, {
        label: '1,60,000 - 1,80,000 Rs',
        value: '160000-1800000'
      }, {
        label: '1,80,000 - 2,00,000 Rs',
        value: '180000-2000000'
      }, {
        label: '2,00,000 - 2,20,000 Rs',
        value: '200000-2200000'
      }, {
        label: '2,20,000 - 2,40,000 Rs',
        value: '220000-2400000'
      }, {
        label: '2,40,0000 - 2,60,000 Rs',
        value: '240000-2600000'
      }, {
        label: '2,60,000 - 2,80,000 Rs',
        value: '260000-2800000'
      }, {
        label: '2,80,000 - 3,00,000 Rs',
        value: '280000-3000000'
      }, {
        label: '> 3,00,000 Rs',
        value: '300000-99999999'
      },
    ];
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
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ selectedWeight: itemValue });
                  this.props.weightFilterCallback(itemValue === 0 ? "0-999999" : weight[itemIndex - 1].value)
                }}>
                <Picker.Item label="Select Weight" value={0} />
                {
                  weight.map((option, index) => {
                    return (
                      <Picker.Item label={option.label} value={option.value} />
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
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ selectedPrice: itemValue })
                  this.props.priceFilterCallback(itemValue === 0 ? "0-999999" : price[itemIndex - 1].value)
                }}>
                <Picker.Item label="Select Price" value={0} />
                {
                  price.map((option, index) => {
                    return (
                      <Picker.Item label={option.label} value={option.value} />
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
