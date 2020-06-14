import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import {getCategories, getCities} from '../../../Api/ApiManager';
import {Cities} from '../../../Api/static/data';
// import colors from '../../../Themes/Colors';
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
      data: [],
      error: null,
      value: '',
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    this.setState({loading: true});
    const type = this.props.navigation.getParam('type');
    if (type === 'Cities') {
      // const cities = await getCities();
      // console.log('cities', cities);
      this.setState({data: Cities, loading: false});
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
    if (type === 'Cities') {
      this.props.dispatch(setCity(selectedItem));
    } else if (type === 'Categories') {
      this.props.dispatch(setCategory(selectedItem));
    }
    this.props.navigation.navigate('Home');
  };

  searchFilterFunction = text => {
    this.setState(
      {
        searchedInput: text,
      },
      () => {
        this.makeRemoteRequest();
      },
    );
  };

  render() {
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
              title={item ? item.label : ''}
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
