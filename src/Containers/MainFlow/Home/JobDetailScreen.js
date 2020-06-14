import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { totalSize, height, width } from 'react-native-dimension';
import commonStyles from '../../Styles/commonStyles';
import colors from '../../../Themes/Colors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJobDetailById } from '../../../Api/ApiManager';
import { ActivityIndicator } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import ApplyJobFooter from '../../../Components/ApplyJobFooter'; 

class JobDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: [],
    };
  }

  static navigationOptions = ({ navigation, screenProps, navigationOptions }) => {
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
      headerTitle: 'Job Details',
    };
  };

  async componentDidMount() {
    const jobId = this.props.navigation.getParam('jobId');
    let job = await getJobDetailById(jobId);
    job = job.attributes;
    console.log('job', job);
    this.setState({ job });
    // this.updateScreenHeader(job);
  }

  render() {
    const navigate = this.props.navigation.navigate;
    const { job } = this.state;
    return (
      <>
        {Object.keys(job).length && Object.keys(job).length > 0 ? (
          <View style={styles.mainContainer}>
          <ScrollView style={styles.body} showsVerticalScrollIndicator={false} contentContainerStyle={commonStyles.align_center}>
            <Text style={[commonStyles.h3, styles.textRow]}>{job.title}</Text>
            <Text style={[commonStyles.h4, styles.textRow]}>{job.companyName}</Text>

            <View style={styles.locationContainer}>
              <Icon
                name="map-marker"
                type="material-community"
                color={colors.appColor1}
                size={totalSize(3.5)}
              />
              <Text style={[commonStyles.h5, styles.textRow]}>Location: {job.jobCity}, {job.jobCountry}</Text>
              <Text style={[commonStyles.h5, styles.textRow]}>Experience: {job.minExperienceYears} {job.minExperienceYears > 1 ? 'years' : 'year'}</Text>
              <Text style={[commonStyles.h5, styles.textRow]}>{job.categoryName}</Text>
            </View>

            <View style={styles.datesContainer}>
              <View style={styles.dateBox}>
                <Text style={[commonStyles.h5, styles.textRow, { color: colors.appColor }]}>{'PUBLISHED'}</Text>
                <Text style={[commonStyles.h4, styles.textRow, { color: colors.appColor1 }]}>{job.deadline}</Text>
              </View>
              <View style={[styles.dateBox, { borderLeftWidth: 1, borderColor: colors.steel }]}>
                <Text style={[commonStyles.h5, styles.textRow]}>{'APPLY BY'}</Text>
                <Text style={[commonStyles.h4, styles.textRow, { color: colors.appColor1 }]}>{job.deadline}</Text>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailsRow}>
                <View style={styles.labelContainer}>
                  <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Industry'}</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[commonStyles.h5, styles.textRow]}>{job.categoryName}</Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.labelContainer}>
                  <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'JobType'}</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[commonStyles.h5, styles.textRow]}>{job.type}</Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.labelContainer}>
                  <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Salary'}</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[commonStyles.h5, styles.textRow]}>{job.salaryFrom}$ - {job.salaryTo}$</Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.labelContainer}>
                  <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Education'}</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[commonStyles.h5, styles.textRow]}>{job.minEducationLevel}</Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.labelContainer}>
                  <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Career Level'}</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[commonStyles.h5, styles.textRow]}>{'Professional'}</Text>
                </View>
              </View>
              <View style={styles.separator} />
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={[commonStyles.h4, styles.textRow]}>Job Description</Text>
              <Text style={[commonStyles.h5, styles.textRow]}>{job.description}</Text>
            </View>
            </ScrollView>
            <ApplyJobFooter title={"Apply Job"} />
          </View>
        ) : (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={colors.appColor1} />
            </View>
          )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingVertical: height(2),
  },
  textRow: {
    marginTop: height(1),
  },
  datesContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: colors.borderColor,
    borderColor: colors.steel,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: height(2),
  },
  dateBox: {
    flex: 1,
    alignItems: 'center'
  },
  detailsContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: width(5),
    paddingTop: width(5),
    width: '100%',
    // backgroundColor: 'green'
  },
  detailsRow: {
    flexDirection: 'row',
    marginTop: height(1),
    // backgroundColor: 'red'
  },
  labelContainer: {
    flex: 1
  },
  valueContainer: {
    flex: 2
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height(3),
  },
  descriptionContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: width(5),
    paddingTop: width(5),
    width: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginTop: height(2),
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

JobDetailScreen.propTypes = {
  selectedCity: PropTypes.object,
  selectedCategory: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedCity: state.city,
    selectedCategory: state.category,
  };
}

export default connect(mapStateToProps)(JobDetailScreen);
