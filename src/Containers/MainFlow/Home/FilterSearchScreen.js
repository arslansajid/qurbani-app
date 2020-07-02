import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import {getCategories, getCities} from '../../../Api/ApiManager';
import {Cities} from '../../../Api/static/data';
import colors from '../../../Themes/Colors';
// import commonStyles from '../../Styles/commonStyles';
import {width} from 'react-native-dimension';
import {
  setCategory,
  setCity,
} from '../../../redux/actions/CandidateFiltersActions';
import {connect} from 'react-redux';

class FilterSearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      searchedInput: '',
      // data: [],
      data: [...Cities],
      error: null,
      value: '',
    };
    this.arrayholder = [...Cities];
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
      headerTitle: "Select",
      headerRight: (<View />)
    };
  };

  componentDidMount() {
    // this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    this.setState({loading: true});
    const type = this.props.navigation.getParam('type');
    if (type === 'City') {
      const cities = await getCities();
      console.log('cities', cities);
      this.setState({data: cities, loading: false});
    } else if (type === 'Categories') {
      const categories = await getCategories();
      console.log('categories', categories);
      this.setState({data: categories, loading: false});
    }
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  onItemPress = selectedItem => {
    console.log('######', selectedItem);
    const type = this.props.navigation.getParam('type');
    if (type === 'City') {
      this.props.dispatch(setCity(selectedItem));
    } else if (type === 'Categories') {
      this.props.dispatch(setCategory(selectedItem));
    }
    this.props.navigation.navigate('Home');
  };

  // searchFilterFunction = text => {
  //   this.setState(
  //     {
  //       searchedInput: text,
  //     },
  //     () => {
  //       this.makeRemoteRequest();
  //     },
  //   );
  // };

  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;  
    });
    this.setState({ data: newData, searchedInput: text });  
  };

  render() {
    console.log('######', this.state);
    return (
      <View>
        <SearchBar
          ref={search => (this.search = search)}
          placeholder="Type Here..."
          lightTheme
          round={false}
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.searchedInput}
          showLoading={this.state.loading ? true : null}
          {...this.props}
        />
        <FlatList
          data={this.state.data}
          keyboardShouldPersistTaps="always" // select item when keyboard is open
          renderItem={({item}) => (
            <ListItem
              // leftAvatar={{source: {uri: `${item.image}`}}}
              title={item ? item.name : ''}
              titleStyle={styles.title}
              // subtitle={item.attributes ? item.attributes.name : ''}
              subtitleStyle={styles.subTitle}
              onPress={() => this.onItemPress(item)}
            />
          )}
          keyExtractor={item => item.display}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: 20,
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginHorizontal: width(5),
  },
});

export default connect(null)(FilterSearchScreen);
