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
  TextInput as Input,
  Image
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { totalSize, height, width } from 'react-native-dimension';
import commonStyles from '../../Styles/commonStyles';
import Colors from '../../../Themes/Colors';
import DropDownFilter from '../../../Components/DropDownFilter';
import CategoryCard from '../../../Components/CategoryCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Icon } from 'react-native-elements';
import { Cities, Categories } from "../../../Api/static/data"
import ImagePicker from 'react-native-image-picker';
import Autocomplete from 'react-native-autocomplete-input';
// import ImagePicker from 'react-native-image-crop-picker';
// import { Switch } from 'react-native-switch';
import { Switch } from 'react-native-paper';
import {addBull} from "../../../Backend/Services/bullService";
import {firebase} from "../../../Backend/firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';
import RNFetchBlob from 'react-native-fetch-blob'

// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob

const tempWindowXMLHttpRequest = window.XMLHttpRequest;

const options = {
  title: 'Select Files',
  multi: true,
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class AnimalUploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedItems: [],
      avatarSource: null,
      isPicture: true,
      query: "",
      data: [...Cities],
      gender: "Male",
      imageUrl: '',
    };
    this.arrayholder = [...Cities];
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  showImagePicker = () => {
    // ImagePicker.openPicker({
    //   includeBase64: true, // for base 64 string
    //   multiple: true,// To support multiple image selection
    //   quality: 1.0,
    //   maxWidth: 200,
    //   maxHeight: 200,
    // }).then(image => {
    //   for (i = 0; i < image.length; i++) {
    //     this.state.images.push(image[i].data)//image[i].data=>base64 string
    //   }
    // })
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const image = response.uri;

        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        
        this.setState({
          avatarSource: source,
          image
        });
      }
    });
  }

  uploadImage(uri, mime = 'image/jpeg') {
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null

      const randomName = Math.floor(Math.random() * 10000) + 1 ;
      const imageRef = firebase
          .storage()
          .ref()
          .child('Events')
          .child(`${uuidv4()}.jpeg`);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }

  _onToggleSwitch = value => {
    this.setState({
      isPicture: value
    });
  }


  removeSelectedItem = itemIndex => {
    const { selectedItems } = this.state;
    const Items = selectedItems.slice();
    Items.splice(itemIndex, 1);
    this.setState({ selectedItems: Items });
  };

  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;  
    });
    this.setState({ data: newData, query: text });
  };

  submitForm = async () => {
    const {location, price, contact, weight, gender, description, image } = this.state;

    const downloadUrl = await this.uploadImage(image)
    console.log("downloadUrl", downloadUrl)

          const animal = {
            image: downloadUrl,
            location: location,
            price: price ,
            contact: contact,
            weight: weight,
            gender: gender,
            description: description,
          }
          this.setState({ loading: true });
          window.XMLHttpRequest = tempWindowXMLHttpRequest;
          addBull(animal)
          .then((res) => {
            console.log("###### res", res)
            alert("Animal Added")
            this.setState({ loading: false });
          })
          .catch((err) => {
            console.log("###### err", err)
            alert("Error Adding Animal!")
            this.setState({ loading: false });
          })
  }

  render() {
    const { selectedCity, selectedCategory } = this.props;
    const navigate = this.props.navigation.navigate;
    const { query, data, isPicture } = this.state;
    // const data = this.searchFilterFunction(query);
    console.log("###### STATE", this.state)
    return (
      <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => this.showImagePicker()}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.appColor1, paddingVertical: 20, marginBottom: 5, borderRadius: 7 }}>
          <Icon
            name="camera"
            type="material-community"
            color={Colors.appColor1}
            size={totalSize(5)}
          // iconStyle={{marginRight: width(10)}}
          />
          <Text style={[commonStyles.h4]}>Select pictures</Text>
        </TouchableOpacity>
        {
          !!this.state.images && this.state.images.length >= 1 && this.state.images.map((image, index) => {
            return (
              <Image key={index} source={image} style={styles.uploadAvatar} />
            )
          })
        }
        {
          !!this.state.avatarSource && (
              <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
            )
        }
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            Categories.map((category, index) => {
              return (
                <TouchableOpacity
                  // onPress={() => navigate('SearchResultsScreen')}
                  key={"category-" + index} style={{ width: '50%', padding: 5 }}>
                  <CategoryCard
                    title={category.label}
                    image={category.image}
                    selected={category.selected}
                    parent="upload"
                    {...this.props}
                  />
                </TouchableOpacity>
              )
            })
          }
        </View>
      
      {/* <View style={{paddingVertical: 10}}>
        <Switch
          value={this.state.isPicture}
          onValueChange={(val) => this.setState({ isPicture: val })}
          disabled={false}
          activeText={'On'}
          inActiveText={'Off'}
          circleSize={30}
          barHeight={3}
          circleBorderWidth={3}
          backgroundActive={'green'}
          backgroundInactive={'gray'}
          circleActiveColor={'#30a566'}
          circleInActiveColor={'#000000'}
          changeValueImmediately={true}
          // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
          changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
          innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
          outerCircleStyle={{}} // style for outer animated circle
          renderActiveText={false}
          renderInActiveText={false}
          switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
          switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
          switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
        />
      </View> */}

      <View style={{minHeight: 50}}>
      <Text style={commonStyles.h4}>Select Type: {!!isPicture ? "Picture" : "Video" }</Text>
      <View style={{position: 'relative'}}>
      <Switch
        color={Colors.appColor1}
        value={isPicture}
        onValueChange={this._onToggleSwitch}
        style={{position: 'absolute', left: 0}}
      />
      </View>
      </View>

      {/* <View style={styles.autocompleteContainer}>
        <Autocomplete
          value={query}
          data={data}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          renderItem={({ item, i }) => (
            <TouchableOpacity onPress={() => this.setState({ query: item.label })}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
        </View> */}

        <Input
          placeholder="City *"
          style={{ borderBottomColor: Colors.steel, borderBottomWidth: 1 }}
          onChangeText={location => this.setState({location})}
        />

        <Input
          placeholder="Price *"
          style={{ borderBottomColor: Colors.steel, borderBottomWidth: 1 }}
          onChangeText={price => this.setState({price})}
          keyboardType="numeric"
        />

        <Input
          placeholder="Contact Number *"
          style={{ borderBottomColor: Colors.steel, borderBottomWidth: 1 }}
          onChangeText={contact => this.setState({contact})}
          keyboardType="numeric"
        />

        <Input
          placeholder="Weight *"
          style={{ borderBottomColor: Colors.steel, borderBottomWidth: 1 }}
          onChangeText={weight => this.setState({weight})}
          keyboardType="numeric"
        />

      <View style={{height: 50, width: '100%', borderBottomColor: Colors.steel, borderBottomWidth: 1}}>
      <Picker
        selectedValue={this.state.gender}
        style={{height: 50, width: '100%', color: Colors.steel, fontSize: 12, marginLeft: -2}}
        mode={"dropdown"}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({gender: itemValue})
        }>
        <Picker.Item label="Gender*" value="java" />
        <Picker.Item label="Male" value="java" />
        <Picker.Item label="Female" value="js" />
      </Picker>
      </View>

        {/* <Input
          placeholder="Gender *"
          style={{ borderBottomColor: Colors.steel, borderBottomWidth: 1 }}
        /> */}

        <Input
          placeholder="Description"
          style={{ borderBottomColor: Colors.steel, borderBottomWidth: 1 }}
          onChangeText={description => this.setState({description})}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[commonStyles.buttonColored]}
            onPress={() => this.submitForm()}>
            <Text style={[commonStyles.textButton, {}]}>Upload</Text>
            {this.state.loading ? (
              <View style={commonStyles.btnLoader}>
                <ActivityIndicator color="white" size="small" />
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

AnimalUploadScreen.propTypes = {
  selectedCity: PropTypes.object,
  selectedCategory: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedCity: state.city,
    selectedCategory: state.category,
  };
}

export default connect(mapStateToProps)(AnimalUploadScreen);

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    padding: width(3),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  uploadAvatar: {
    width: 150,
    height: 150,
    borderRadius: 7,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    marginTop: height(1),
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: Colors.appColor1,
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
    color: Colors.appColor1,
    fontSize: 13,
    marginRight: 0,
  },
  chipIcon: {
    color: Colors.appColor1,
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
