import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { totalSize, height, width } from 'react-native-dimension';
import commonStyles from '../../Styles/commonStyles';
import colors from '../../../Themes/Colors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmployerDetailById } from '../../../Api/ApiManager';
import { ActivityIndicator } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import QurbaniFooter from '../../../Components/QurbaniFooter';
import images from '../../../Themes/Images';
import Carousel from "react-native-snap-carousel";
import Swiper from "react-native-swiper";
import { Animals } from "../../../Api/static/data"
import { SafeAreaView } from "react-navigation";
import { Rating, AirbnbRating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';

const SCREEN_WIDTH = Dimensions.get("window").width;

class AnimaRecommendationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employer: [],
      images: [...Animals]
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
        color: colors.appColor1,
      },
      headerStyle: {
        elevation: 0,
        borderWidth: 1,
        borderColor: '#ededed',
      },
      headerTitle: 'Recommendation',
      headerRight: (<View />)
    };
  };

  async componentDidMount() {
    // using hard coded employer id for the time being
    // logic to fetch employer is present, just uncomment te beolow line
    // const employerId = this.props.navigation.getParam('employerId');
    // const employerId = '85dfad03-ee10-4b3f-9765-1cfd550db70e';
    // let employer = await getEmployerDetailById(employerId);
    // employer = employer.attributes;
    const animal = {
      id: 3,
      label: 'Shakeel',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1200px-Hausziege_04.jpg',
      weight: '140 kg',
      location: 'Islamabad',
      price: '1,00,000',
      phone: '0321-6375414',
      datePosted: '12-April-2019',
    }
    this.setState({ employer: animal });
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ height: 250, width: "100%", marginVertical: 5, borderRadius: 7 }}
        onPress={() => {
          if (this.props.navigation != null) {
            this.props.navigation.navigate("FullscreenGalleryScreen", {
              selectedIndex: index,
              images: this.state.images
            });
          }
        }}
        activeOpacity={0.9}
      >
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const navigate = this.props.navigation.navigate;
    const { employer, images } = this.state;
    return (
      <>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "never", bottom: "always" }}>
          {Object.keys(employer).length && Object.keys(employer).length > 0 ? (
            <View style={styles.mainContainer}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.body]}>
                <Carousel
                  ref={c => (this._carousel = c)}
                  initialNumToRender={2}
                  windowSize={2}
                  data={images}
                  renderItem={this._renderItem}
                  sliderWidth={SCREEN_WIDTH}
                  itemWidth={SCREEN_WIDTH - 20}
                  inactiveSlideOpacity={1}
                  inactiveSlideScale={0.99}
                  useScrollView={false}
                  scrollEnabled={true}
                  layout={"default"}
                  removeClippedSubviews={false} // https://github.com/archriss/react-native-snap-carousel/issues/238, see description of method triggerRenderingHack() on githubb docs. settin false addreses issue where carosuel is not visible on first render.
                // contentContainerCustomStyle={{width: 300}}
                // loop={true}
                />
                <View style={[commonStyles.space_btw, commonStyles.row, commonStyles.align_center, styles.detailsContainer]}>
                  <Text style={[commonStyles.h3]}>{employer.label}</Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={4}
                  // selectedStar={(rating) => this.onStarRatingPress(rating)}
                  fullStarColor={colors.appColor1}
                  starSize={totalSize(2.25)}
                  starStyle={{paddingLeft: 3}}
                />
                </View>
 
                {/* <Text style={[commonStyles.h5, styles.textRow]}>Date Posted: {employer.datePosted}</Text> */}

                {/* <View style={styles.locationContainer}>
                  <Icon
                    name="map-marker"
                    type="material-community"
                    color={colors.appColor1}
                    size={totalSize(3.5)}
                  />
                  <Text style={[commonStyles.h4, styles.textRow]}>Location: {employer.location}, Pakistan</Text>
                  <Text style={[commonStyles.h4, styles.textRow]}>Weight: {employer.weight} (3.5 mann)</Text>
                  <Text style={[commonStyles.h4, styles.textRow]}>Price: {employer.price}/- Rs</Text>
                </View> */}

                <View style={[{marginTop: 10}, styles.dataContainer]}>
                <View style={styles.detailsRow}>
                    <View style={styles.leftContainer}>
                      <Text style={[commonStyles.h4]}>{'Price:'} {employer.price}/- Rs</Text>
                    </View>
                    <View style={styles.rightContainer}>
                      <Text style={[commonStyles.h4]}>{'Wgt:'} {employer.weight} kg ({employer.weight.split(" ")[0] / 40} mann)</Text>
                    </View>
                  </View>

                  <View style={styles.detailsRow}>
                    <View style={styles.leftContainer}>
                      <Text style={[commonStyles.h4]}>{'Animal ID: 1234'}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                      <Text style={[commonStyles.h4]}>Cell #: {employer.phone}</Text>
                    </View>
                  </View>

                  <View style={styles.detailsRow}>
                    <View style={styles.leftContainer}>
                      <Text style={[commonStyles.h4]}>Gender: {'Male'}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                      <Text style={[commonStyles.h4]}>{employer.location}</Text>
                    </View>
                  </View>
                  </View>

                <View style={styles.detailsContainer}>
                  <View style={styles.separator} />
                  <View style={styles.detailsRow}>
                    <View style={styles.labelContainer}>
                      <Text style={[commonStyles.h5, commonStyles.bold, styles.textRow]}>{'Description'}</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={[commonStyles.h5, styles.textRow]}>{employer.description}</Text>
                    </View>
                  </View>
                </View>

              </ScrollView>

            </View>
          ) : (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.appColor1} />
              </View>
            )}
          <View>
            <QurbaniFooter title={"Follow Employer"} />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    zIndex: 1
  },
  body: {
    // flex: 1,
    paddingBottom: 100
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
    paddingHorizontal: width(3),
    // paddingTop: width(5),
    width: '100%',
    // backgroundColor: 'green'
  },
  dataContainer: {
    alignSelf: 'flex-start',
    paddingLeft: width(3),
    paddingRight: width(2),
    width: '100%',
  },
  leftContainer: {
    flex: 1,
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: colors.appColor1,
    borderRightWidth: 2
  },
  rightContainer: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    paddingLeft: width(2),
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
    marginVertical: height(2),
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
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
    backgroundColor: colors.steel
  },
});

AnimaRecommendationScreen.propTypes = {
  selectedCity: PropTypes.object,
  selectedCategory: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedCity: state.city,
    selectedCategory: state.category,
  };
}

export default connect(mapStateToProps)(AnimaRecommendationScreen);
