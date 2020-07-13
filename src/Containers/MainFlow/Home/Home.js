import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { totalSize, height, width } from 'react-native-dimension';
import commonStyles from '../../Styles/commonStyles';
import colors from '../../../Themes/Colors';
import DropDownFilter from '../../../Components/DropDownFilter';
import CategoryCard from '../../../Components/CategoryCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Icon } from 'react-native-elements';
import {Categories} from "../../../Api/static/data";
import {userLogin} from '../../../redux/actions/LoginActions';
import {firebase} from "../../../Backend/firebase";
import { getUserByEmail } from '../../../Backend/Services/usersService';

const items = [
  // this is the parent or 'item'
  {
    name: 'Categories',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Cow',
        id: 1,
      },
      {
        name: 'Goat',
        id: 2,
      },
      {
        name: 'Sheep',
        id: 3,
      },
      {
        name: 'Sadqa',
        id: 4,
      },
      {
        name: 'Architect',
        id: 5,
      },
      {
        name: 'Featured',
        id: 6,
      },
    ],
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      showError: false
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
      headerTitle: 'Home',
      headerRight: <View />,
    };
  };

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(async(user) => {
      if (user) {
        // User is signed in.
        const userData = await getUserByEmail(user.email)
        this.props.dispatch(userLogin(userData[0]));
        await AsyncStorage.setItem("userToken", user.email);
        // this.props.dispatch(userLogin(user));
      }
  })
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  toggleErrorState = (value) => {
    this.setState({
      showError: value
    })
  }

  _renderChips = () => {
    const { selectedItems } = this.state;
    return (
      selectedItems.length > 0 && (
        <TouchableHighlight style={styles.chipsContainer}>
          <View style={{ flexDirection: 'row' }}>
            {selectedItems.map((singleSelectedItem, index) => {
              return (
                <View style={styles.singleChipContainer}>
                  <Text numberOfLines={1} style={styles.chipText}>
                    {Object.values(items[0].children).map(key => {
                      if (key.id === singleSelectedItem) {
                        return key.name;
                      }
                    })}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.removeSelectedItem(index);
                    }}>
                    <Icon
                      name="times-circle"
                      type="font-awesome"
                      iconStyle={styles.chipIcon}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </TouchableHighlight>
      )
    );
  };

  removeSelectedItem = itemIndex => {
    const { selectedItems } = this.state;
    const Items = selectedItems.slice();
    Items.splice(itemIndex, 1);
    this.setState({ selectedItems: Items });
  };

  render() {
    const { selectedCity, selectedCategory } = this.props;
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.mainContainer}>
        {/* <SectionedMultiSelect
          ref={Select => (this.Select = Select)}
          items={items}
          uniqueKey="id"
          subKey="children"
          selectText="Search by keyword...."
          showDropDowns={false}
          hideSelect={true}
          showChips={false}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          styles={{ modalWrapper: { paddingVertical: width(5) } }}
          colors={{ primary: colors.appColor1 }}
        /> */}

        {/* <TouchableOpacity
          style={[commonStyles.filterContainer, { zIndex: 1 }]}
          onPress={() => this.Select._toggleSelector()}>
          {this.state.selectedItems.length === 0 ? (
            <Text style={commonStyles.filterText}>
              Search by Caregory....
            </Text>
          ) : (
              <ScrollView horizontal={true}>{this._renderChips()}</ScrollView>
            )}
        </TouchableOpacity> */}
        {
          this.state.showError && !selectedCity.name && (
            <Text style={[commonStyles.h4, {color: 'red', position: 'absolute', top: 0}]}>Please Select City</Text>
          )
        }
        <DropDownFilter
          label={'Select City'}
          filter={'City'}
          value={selectedCity.name
            // Object.keys(selectedCity).length
            //   ? selectedCity.attributes.name
            //   : null
          }
          hasError={this.state.showError && !selectedCity.name}
          {...this.props}
        />

        {/* <DropDownFilter
          label={'Categories'}
          value={
            Object.keys(selectedCategory).length
              ? selectedCategory.attributes.name
              : null
          }
          {...this.props}
        /> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {

              Categories.map((category, index) => {
                return (
                  <View
                    // onPress={() => navigate('SearchResultsScreen')}
                    key={"category-" + index} style={{width: '50%', padding: 5}}>
                  <CategoryCard
                    title={category.label}
                    image={category.image}
                    selected={category.selected}
                    toggleErrorState={this.toggleErrorState}
                    {...this.props}
                  />
                  </View>
                )
              })

            }
          </View>
        </ScrollView>

        {/* <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={commonStyles.buttonColored}
            onPress={() => navigate('SearchResultsScreen')}>
            <Text style={[commonStyles.textButton, {}]}>Search</Text>
            {this.state.loading ? (
              <View style={commonStyles.btnLoader}>
                <ActivityIndicator color="white" size="small" />
              </View>
            ) : null}
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

Home.propTypes = {
  selectedCity: PropTypes.object,
  selectedCategory: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedCity: state.city,
    selectedCategory: state.category,
  };
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 7,
    paddingHorizontal: width(5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: width(6)
  },
  buttonsContainer: {
    marginTop: height(1),
    alignItems: 'center',
  },
  chipsContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  singleChipContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    height: 34,
    borderColor: colors.appColor1,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    margin: 3,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
  },
  chipText: {
    color: colors.appColor1,
    fontSize: 13,
    marginRight: 0,
  },
  chipIcon: {
    color: colors.appColor1,
    fontSize: 16,
    marginHorizontal: 6,
    marginVertical: 7,
  },
  locationsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    // justifyContent: "space-between",
    // paddingHorizontal: 24,
    // marginBottom: 24
  },
});
