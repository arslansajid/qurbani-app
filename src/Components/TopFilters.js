import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Colors from '../Themes/Colors';
import {height} from 'react-native-dimension';
// import moment from 'moment';

let {width} = Dimensions.get('window');

class TopFilters extends Component {
  render() {
    const {startDate, endDate} = this.props;
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
        <TouchableHighlight
          underlayColor={'#f7f7f7'}
          onPress={() =>
            this.props.navigation.navigate('LocationsScreen', {
              parent: 'TopFilters',
              hideClear:
                this.props.navigation.state.routeName === 'ReservationScreen'
                  ? true
                  : false,
            })
          }
          style={styles.filterContainer}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.filterLabel}>Location</Text>
            {this.props.selectedLocation ? (
              <Text style={styles.filterValue}>
                {this.props.selectedLocation}
              </Text>
            ) : null}
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={'#f7f7f7'}
          onPress={() =>
            this.props.navigation.navigate('CalendarScreen', {
              hideClear:
                this.props.navigation.state.routeName === 'ReservationScreen'
                  ? true
                  : false,
            })
          }
          style={styles.filterContainer}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.filterLabel}>Dates</Text>
            {startDate && endDate ? (
              <Text style={styles.filterValue}>Haha</Text>
            ) : null}
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={'#f7f7f7'}
          onPress={() =>
            this.props.navigation.navigate('BookRoomFiltersModal', {
              activeFilter: 'rooms',
            })
          }
          style={styles.filterContainer}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.filterLabel}>Rooms</Text>
            {this.props.totalRoomCount ? (
              <Text style={styles.filterValue}>
                {this.props.totalRoomCount}
              </Text>
            ) : null}
          </View>
        </TouchableHighlight>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('BookRoomFiltersModal', {
                route:
                  this.props.navigation.state.routeName === 'ReservationScreen'
                    ? 'ReservationScreen'
                    : '',
              })
            }
            style={styles.editBtn}>
            <Text style={{color: Colors.appColor1, fontSize: 14}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1,
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
  editBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.appColor1,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 4,
    flex: 1,
    width: '100%',
  },
  filterContainer: {
    minWidth: width / 4,
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
