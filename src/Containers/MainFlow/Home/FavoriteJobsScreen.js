import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { totalSize, height, width } from 'react-native-dimension';
import commonStyles from '../../Styles/commonStyles';
import colors from '../../../Themes/Colors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJobsByUserId } from '../../../Api/ApiManager';
import JobCard from '../../../Components/JobCard';
import TopFilters from '../../../Components/TopFilters';
import JobCardPlaceHolder from '../../../Components/JobCardPlaceHolder';
import ScreenTitle from '../../../Components/ScreenTitle';
import { Icon } from 'react-native-elements';
import { withGlobalContext } from '../../../Context/GlobalContextProvider';

class SearchResultsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      favoriteJobs: [],
    };
  }

  static navigationOptions = ({ navigation, screenProps, navigationOptions }) => {
    const jobsCount = navigation.getParam('jobsCount', 0);
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
      headerTitle: 'Favorite Jobs',
      // headerRight: (
      //   <TouchableOpacity
      //     style={commonStyles.filterIcon}
      //     underlayColor={'transparent'}
      //     onPress={() => {
      //       navigation.navigate('FiltersScreen');
      //     }}>
      //     <Icon
      //       type="materialIcon"
      //       style={{ zIndex: 20 }}
      //       name={'filter-list'}
      //       size={22}
      //     />
      //   </TouchableOpacity>
      // ),
    };
  };

  async componentDidMount() {
    const jobs = this.props.navigation.getParam("jobs");
    console.log('jobs', jobs);
    this.setState({ jobs });
  }


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
    const { jobs } = this.state;
    console.log("ASDASDASd", this.props.global)
    return (
      <>
          <TopFilters {...this.props} />
          <View style={styles.mainContainer}>
            <View style={styles.jobsContainer}>
              <FlatList
                ListEmptyComponent={this.renderPlaceHolders}
                showsVerticalScrollIndicator={false}
                data={this.props.global.favoriteJobs}
                renderItem={({ item }) => (
                  <JobCard
                    title={item.title}
                    categoryName={item.categoryName}
                    companyName={item.companyName}
                    jobCity={item.jobCity}
                    jobCountry={item.jobCountry}
                    navigate={navigate}
                    job={item}
                  />
                )}
                keyExtractor={item => item.id}
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

SearchResultsScreen.propTypes = {
  selectedCity: PropTypes.object,
  selectedCategory: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedCity: state.city,
    selectedCategory: state.category,
  };
}

export default connect(mapStateToProps)(withGlobalContext(SearchResultsScreen));
