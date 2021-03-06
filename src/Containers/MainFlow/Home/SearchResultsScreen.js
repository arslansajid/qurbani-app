import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { totalSize, height, width } from 'react-native-dimension';
import commonStyles from '../../Styles/commonStyles';
import colors from '../../../Themes/Colors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJobsByUserId } from '../../../Api/ApiManager';
import JobCard from '../../../Components/JobCard';
import AnimalCard from '../../../Components/AnimalCard';
import TopFilters from '../../../Components/QurbaniTopFilter';
import JobCardPlaceHolder from '../../../Components/JobCardPlaceHolder';
import ScreenTitle from '../../../Components/ScreenTitle';
import { Icon } from 'react-native-elements';
import { FavoriteJobsProvider } from '../../../Context/FavoriteJobsContext';
import {Animals} from "../../../Api/static/data"
import {getBulls, getSaands, getCamels, getBakras, getSheeps, getDumbas, getAnimalsByCity, getAnimalsByFilter} from "../../../Backend/Services/bullService";

class SearchResultsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loading: false
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
        color: colors.appColor1,
      },
      headerStyle: {
        elevation: 0,
        borderWidth: 1,
        borderColor: '#ededed',
      },
      headerTitle: <ScreenTitle jobsCount={jobsCount} />,
      headerRight: (
        // <TouchableOpacity
        //   style={commonStyles.filterIcon}
        //   underlayColor={'transparent'}
        //   onPress={() => {
        //     navigation.navigate('FiltersScreen');
        //   }}>
        //   <Icon
        //     type="materialIcon"
        //     style={{ zIndex: 20 }}
        //     name={'filter-list'}
        //     size={22}
        //   />
        // </TouchableOpacity>
        <View />
      ),
    };
  };

  fetchBulls = () => {
    this.setState({
      loading: true
    })
    getBulls()
    .then((res) => {
      const jobs = [...res];
      this.setState({ jobs, loading: false });
      this.updateScreenHeader(jobs);
    })
    .catch((err) => {
      console.log("########### err", err)
      this.setState({ loading: false });
    })
  }

  fetchSaands = () => {
    this.setState({
      loading: true
    })
    getSaands()
    .then((res) => {
      const jobs = [...res];
      this.setState({ jobs, loading: false });
      this.updateScreenHeader(jobs);
    })
    .catch((err) => {
      console.log("########### err", err)
      this.setState({ loading: false });
    })
  }

  fetchCamels = () => {
    this.setState({
      loading: true
    })
    getCamels()
    .then((res) => {
      const jobs = [...res];
      this.setState({ jobs, loading: false });
      this.updateScreenHeader(jobs);
    })
    .catch((err) => {
      console.log("########### err", err)
      this.setState({ loading: false });
    })
  }

  fetchBakras = () => {
    this.setState({
      loading: true
    })
    getBakras()
    .then((res) => {
      const jobs = [...res];
      this.setState({ jobs, loading: false });
      this.updateScreenHeader(jobs);
    })
    .catch((err) => {
      console.log("########### err", err)
      this.setState({ loading: false });
    })
  }

  fetchSheeps = () => {
    this.setState({
      loading: true
    })
    getSheeps()
    .then((res) => {
      const jobs = [...res];
      this.setState({ jobs, loading: false });
      this.updateScreenHeader(jobs);
    })
    .catch((err) => {
      console.log("########### err", err)
      this.setState({ loading: false });
    })
  }

  fetchDumbas = () => {
    this.setState({
      loading: true
    })
    getDumbas()
    .then((res) => {
      const jobs = [...res];
      this.setState({ jobs, loading: false });
      this.updateScreenHeader(jobs);
    })
    .catch((err) => {
      console.log("########### err", err)
      this.setState({ loading: false });
    })
  }

  fetchAnimalsByCity = () => {
    const {selectedCategory, selectedCity} = this.props;
    this.setState({
      loading: true
    })
    getAnimalsByCity(selectedCategory, selectedCity.name)
    .then((res) => {
      const jobs = [...res];
      this.setState({ jobs, loading: false });
      this.updateScreenHeader(jobs);
      this.setState({ loading: false });
    })
    .catch((err) => {
      this.setState({ loading: false });
    })
  }

  fetchAnimalsByFilter = () => {
    const {selectedCategory, selectedCity} = this.props;
    const {weightFilter, priceFilter} = this.state;
    this.setState({
      loading: true
    })
    getAnimalsByFilter(selectedCategory, selectedCity.name, weightFilter, priceFilter)
    .then((res) => {
      const jobs = [...res];
      this.setState({ jobs, loading: false });
      this.updateScreenHeader(jobs);
      console.log("########### res", res)
      this.setState({ loading: false });
    })
    .catch((err) => {
      console.log("########### err", err)
      this.setState({ loading: false });
    })
  }

  handleWeightFilter = (value) => {
    this.setState({ weightFilter: value }, () => {
      this.fetchAnimalsByFilter();
    })
  }

  handlePriceFilter = (value) => {
    this.setState({ priceFilter: value }, () => {
      this.fetchAnimalsByFilter();
    })
  }

  async componentDidMount() {
    // const jobs = await getJobsByUserId(/* this.props.selectedCategory.id */);
    // console.log('jobs', jobs);
    
    // const jobs = [...Animals];
    // this.setState({ jobs });
    // this.updateScreenHeader(jobs);
    this.fetchAnimalsByCity();

    // if(this.props.selectedCategory === "Bull") {
    //   this.fetchBulls();
    // } else if(this.props.selectedCategory === "Saand") {
    //   this.fetchSaands();
    // } else if(this.props.selectedCategory === "Camel") {
    //   this.fetchCamels();
    // } else if(this.props.selectedCategory === "Bakra") {
    //   this.fetchBakras();
    // } else if(this.props.selectedCategory === "Sheep") {
    //   this.fetchSheeps();
    // } else if(this.props.selectedCategory === "Dumba") {
    //   this.fetchDumbas();
    // }
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

  updateScreenHeader = (jobs = null) => {
    if (this.props == null || this.props.navigation == null) {
      return;
    }

    let params = null;

    if (jobs != null) {
      const jobsCount = jobs.length;

      if (this.props.navigation.getParam('jobsCount', 0) !== jobsCount) {
        if (params == null) {
          params = { jobsCount };
        } else {
          params.jobsCount = jobsCount;
        }
      }
    }

    if (params != null) {
      this.props.navigation.setParams(params);
    }
  };

  renderPlaceHolders = () => {
    if(this.state.loading) {
    return (
      [...Array(6)].map((e, index) => {
        return (
          <View key={index}>
            <JobCardPlaceHolder />
          </View>
        )
      })
    )
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={commonStyles.h4}>No animal in this category found!</Text>
        </View>
      )
    }
  }

  render() {
    const navigate = this.props.navigation.navigate;
    const { jobs } = this.state;
    console.log("STATE ##########", this.state);
    return (
      <>
        <TopFilters
          weightFilterCallback={(value) => this.handleWeightFilter(value)}
          priceFilterCallback={(value) => this.handlePriceFilter(value)}
          {...this.props}
        />
        <View style={styles.mainContainer}>
          <View style={styles.jobsContainer}>
            <FlatList
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
              ListEmptyComponent={this.renderPlaceHolders}
              showsVerticalScrollIndicator={false}
              data={jobs}
              renderItem={({ item }) => (
                <AnimalCard
                  title={item.label}
                  image={item.image[0]}
                  price={item.price}
                  weight={item.weight}
                  weightUnit={item.weightUnit}
                  categoryName={item.categoryName}
                  companyName={item.companyName}
                  jobCity={item.location}
                  navigate={navigate}
                  animal={item}
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
    // paddingHorizontal: width(5),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  jobsContainer: {
    // marginBottom: height(5),
    // flexDirection: 'row'
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

export default connect(mapStateToProps)(SearchResultsScreen);
