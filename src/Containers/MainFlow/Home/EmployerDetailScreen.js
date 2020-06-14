import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { totalSize, height, width } from 'react-native-dimension';
import commonStyles from '../../Styles/commonStyles';
import colors from '../../../Themes/Colors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmployerDetailById } from '../../../Api/ApiManager';
import { ActivityIndicator } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import ApplyJobFooter from '../../../Components/ApplyJobFooter';
import images from '../../../Themes/Images';

class EmployerDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employer: [],
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
      headerTitle: 'Employer Details',
    };
  };

  async componentDidMount() {
    // using hard coded employer id for the time being
    // logic to fetch employer is present, just uncomment te beolow line
    // const employerId = this.props.navigation.getParam('employerId');
    const employerId = '85dfad03-ee10-4b3f-9765-1cfd550db70e';
    let employer = await getEmployerDetailById(employerId);
    // employer = employer.attributes;
    console.log('employer', employer);
    this.setState({ employer });
  }

  render() {
    const navigate = this.props.navigation.navigate;
    const { employer } = this.state;
    return (
      <>
        {Object.keys(employer).length && Object.keys(employer).length > 0 ? (
          <View style={styles.mainContainer}>
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false} contentContainerStyle={commonStyles.align_center}>
              <View style={styles.imgContainer}>
                <Image
                  source={images.placeholder}
                  resizeMode="cover"
                  style={styles.imgContainer}
                />
              </View>
              <Text style={[commonStyles.h3, styles.textRow]}>{employer.title}</Text>
              <Text style={[commonStyles.h4, styles.textRow]}>{employer.name}</Text>

              <View style={styles.locationContainer}>
                <Icon
                  name="map-marker"
                  type="material-community"
                  color={colors.appColor1}
                  size={totalSize(3.5)}
                />
                <Text style={[commonStyles.h5, styles.textRow]}>Location: {employer.cityName}, {employer.countryName}</Text>
                {/* <Text style={[commonStyles.h5, styles.textRow]}>Experience: {employer.minExperienceYears} {employer.minExperienceYears > 1 ? 'years' : 'year'}</Text> */}
                <Text style={[commonStyles.h5, styles.textRow]}>Year Founded: {employer.founded}</Text>
                <Text style={[commonStyles.h5, styles.textRow]}>Category: {employer.categoryName}</Text>
              </View>

              {/* <View style={styles.datesContainer}>
              <View style={styles.dateBox}>
                <Text style={[commonStyles.h5, styles.textRow, { color: colors.appColor }]}>{'PUBLISHED'}</Text>
                <Text style={[commonStyles.h4, styles.textRow, { color: colors.appColor1 }]}>{employer.deadline}</Text>
              </View>
              <View style={[styles.dateBox, { borderLeftWidth: 1, borderColor: colors.steel }]}>
                <Text style={[commonStyles.h5, styles.textRow]}>{'APPLY BY'}</Text>
                <Text style={[commonStyles.h4, styles.textRow, { color: colors.appColor1 }]}>{employer.deadline}</Text>
              </View>
            </View> */}

              <View style={styles.detailsContainer}>
                <View style={styles.separator} />
                <View style={styles.detailsRow}>
                  <View style={styles.labelContainer}>
                    <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Address'}</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={[commonStyles.h5, styles.textRow]}>{employer.streetAddress}</Text>
                  </View>
                </View>
                <View style={styles.detailsRow}>
                  <View style={styles.labelContainer}>
                    <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Website'}</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={[commonStyles.h5, styles.textRow]}>{!!employer.web ? employer.web : "N/A"}</Text>
                  </View>
                </View>
                <View style={styles.detailsRow}>
                  <View style={styles.labelContainer}>
                    <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Contact Number'}</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={[commonStyles.h5, styles.textRow]}>{!!employer.phone ? employer.phone : "N/A"}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.separator} />
                <View style={styles.detailsRow}>
                  <View style={styles.labelContainer}>
                    <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Industry'}</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={[commonStyles.h5, styles.textRow]}>{employer.categoryName}</Text>
                  </View>
                </View>
                <View style={styles.detailsRow}>
                  <View style={styles.labelContainer}>
                    <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Open Positions'}</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={[commonStyles.h5, styles.textRow]}>{employer.openPositionsCount}</Text>
                  </View>
                </View>
                {/* <View style={styles.detailsRow}>
                <View style={styles.labelContainer}>
                  <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Salary'}</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[commonStyles.h5, styles.textRow]}>{employer.salaryFrom}$ - {employer.salaryTo}$</Text>
                </View>
              </View> */}
                {/* <View style={styles.detailsRow}>
                <View style={styles.labelContainer}>
                  <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Education'}</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={[commonStyles.h5, styles.textRow]}>{employer.minEducationLevel}</Text>
                </View>
              </View> */}
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
                <Text style={[commonStyles.h5, styles.textRow]}>{employer.description}</Text>
              </View>
            </ScrollView>
            <ApplyJobFooter title={"Follow Employer"} />
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
    // paddingTop: width(5),
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
  imgContainer: {
    width: width(25),
    height: height(12),
    borderRadius: 5,
  },
});

EmployerDetailScreen.propTypes = {
  selectedCity: PropTypes.object,
  selectedCategory: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedCity: state.city,
    selectedCategory: state.category,
  };
}

export default connect(mapStateToProps)(EmployerDetailScreen);
