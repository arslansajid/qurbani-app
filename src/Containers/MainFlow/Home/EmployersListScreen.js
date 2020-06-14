import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { totalSize, height, width } from 'react-native-dimension';
import commonStyles from '../../Styles/commonStyles';
import colors from '../../../Themes/Colors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllEmployers } from '../../../Api/ApiManager';
import EmployerCard from '../../../Components/EmployerCard';
import TopFilters from '../../../Components/TopFilters';
import JobCardPlaceHolder from '../../../Components/JobCardPlaceHolder';
import ScreenTitle from '../../../Components/ScreenTitle';
import { Icon } from 'react-native-elements';

class EmployersListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employers: [],
      favoriteJobs: [],
    };
  }

  static navigationOptions = ({ navigation, screenProps, navigationOptions }) => {
    const employersCount = navigation.getParam('employersCount', 0);
    return {
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.appColor,
      },
      headerStyle: {
        elevation: 0,
        borderWidth: 1,
        borderColor: '#ededed',
      },
      headerTitle: <ScreenTitle employersCount={employersCount} />,
      headerRight: (
        <TouchableOpacity
          style={commonStyles.filterIcon}
          underlayColor={'transparent'}
          onPress={() => {
            navigation.navigate('FavoriteJobsScreen');
          }}>
          <Icon
            type="materialIcon"
            style={{ zIndex: 20 }}
            name={'filter-list'}
            size={22}
          />
        </TouchableOpacity>
      ),
    };
  };

  async componentDidMount() {
    const employers = await getAllEmployers();
    console.log('employers', employers);
    this.setState({ employers });
    this.updateScreenHeader(employers);
  }

  updateFavoriteJobs = job => {
    const { favoriteJobs } = this.state;
    let searchIndex = null;

    if (!!favoriteJobs.length) {
      favoriteJobs.find((favJob, i) => {
        if (favJob.id === job.id) {
          searchIndex = i;
          return true; // stop searching
        }
      });
    }
    if (searchIndex !== null && searchIndex > -1) {
      favJobs = favoriteJobs.slice();
      favJobs.splice(searchIndex, 1);
    } else {
      favJobs = [...favoriteJobs, job];
    }
    this.setState({ favoriteJobs: favJobs });
  };

  updateScreenHeader = (employers = null) => {
    if (this.props == null || this.props.navigation == null) {
      return;
    }

    let params = null;

    if (employers != null) {
      const employersCount = employers.length;

      if (this.props.navigation.getParam('employersCount', 0) !== employersCount) {
        if (params == null) {
          params = { employersCount };
        } else {
          params.employersCount = employersCount;
        }
      }
    }

    if (params != null) {
      this.props.navigation.setParams(params);
    }
  };

  renderPlaceHolders = () => {
    return (
      [...Array(4)].map((e, index) => {
        return (
          <View key={index}>
            <JobCardPlaceHolder />
          </View>
        )
      })
    )
  }

  render() {
    const navigate = this.props.navigation.navigate;
    const { employers } = this.state;
    return (
      <>
        <TopFilters {...this.props} />
        <View style={styles.mainContainer}>
          <View style={styles.jobsContainer}>
            <FlatList
              ListEmptyComponent={this.renderPlaceHolders}
              showsVerticalScrollIndicator={false}
              data={employers}
              renderItem={({ item }) => (
                <EmployerCard
                  title={item.attributes.name}
                  categoryName={item.attributes.categoryName}
                  companyName={item.attributes.name}
                  jobCity={item.attributes.cityName}
                  jobCountry={item.attributes.countryName}
                  navigate={navigate}
                  employer={item}
                />
              )}
              keyExtractor={item => item.attributes.id}
            // ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: width(5),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  jobsContainer: {
    marginBottom: height(5),
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginVertical: height(2),
  },
  applyBtn: {
    // borderWidth: 1,
    // borderColor: colors.appColor1,
    backgroundColor: colors.appColor1,
    padding: width(2),
    borderRadius: 5,
  },
  applyBtnText: {
    color: 'white',
    fontSize: totalSize(2),
  },
});

EmployersListScreen.propTypes = {
  selectedCity: PropTypes.object,
  selectedCategory: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedCity: state.city,
    selectedCategory: state.category,
  };
}

export default connect(mapStateToProps)(EmployersListScreen);
