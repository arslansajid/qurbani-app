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
import { Picker } from '@react-native-community/picker';
import { totalSize, height, width } from 'react-native-dimension';
import commonStyles from '../../Styles/commonStyles';
import Colors from '../../../Themes/Colors';
import DropDownFilter from '../../../Components/DropDownFilter';
import CategoryCard from '../../../Components/CategoryCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Icon } from 'react-native-elements';
import { Cities, Categories } from "../../../Api/static/data"
// import ImagePicker from 'react-native-image-picker';
// import Autocomplete from 'react-native-autocomplete-input';
import ImageCropPicker from 'react-native-image-crop-picker';
import { addBull, addSaand, addCamel, addBakra, addSheep, addDumba } from "../../../Backend/Services/bullService";
import { firebase } from "../../../Backend/firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';
import RNFetchBlob from 'react-native-fetch-blob'
import colors from '../../../Themes/Colors';
import { Overlay } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';

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
      gender: null,
      imageUrl: '',
      selectedCategory: null,
      categories: [...Categories],
      showImagePickerAlert: false,
      images: [],
      imageFilesArray: [],
      visible: false,
      selectedCities: [],
    };
    this.arrayholder = [...Cities];
    this.picker = React.createRef()
  }

  toggleOverlay = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  onSelectCategory = (value) => {
    this.setState({ selectedCategory: value })
  }

  toggleImagePickerAlert = () => {
    this.setState({
      showImagePickerAlert: !this.state.showImagePickerAlert
    })
  }

  // showImagePicker = () => {
  //   // ImagePicker.openPicker({
  //   //   includeBase64: true, // for base 64 string
  //   //   multiple: true,// To support multiple image selection
  //   //   quality: 1.0,
  //   //   maxWidth: 200,
  //   //   maxHeight: 200,
  //   // }).then(image => {
  //   //   for (i = 0; i < image.length; i++) {
  //   //     this.state.images.push(image[i].data)//image[i].data=>base64 string
  //   //   }
  //   // })
  //   ImagePicker.showImagePicker(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       const image = response.uri;

  //       // You can also display the image using data:
  //       const source = { uri: 'data:image/jpeg;base64,' + response.data };

  //       this.setState({
  //         avatarSource: source,
  //         image
  //       });
  //     }
  //   });
  // }

  uploadImage(uri, mime = 'image/jpeg') {
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null

      const imageRef = firebase
        .storage()
        .ref()
        .child(this.state.selectedCategory)
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
    const { location, price, contact, weight, gender, description, image, selectedCategory, imageFilesArray, selectedCities } = this.state;

    if (!!selectedCities && price && contact && weight && gender && description && imageFilesArray && selectedCategory) {

      this.setState({ loading: true });

      // const downloadUrl = await this.uploadImage(image)

      let imagesArray = [];
      for await (const image of imageFilesArray) {
        console.log("#####", image);

        let imageFile = image[0];
        let imageUri;

        if (imageFile) {
          imageUri = await this.uploadImage(image)
        }
        imagesArray.push(imageUri)
      }

      console.log("downloadUrl", imagesArray)

      const animal = {
        image: imagesArray,
        location: selectedCities,
        price: price,
        contact: contact,
        weight: weight,
        gender: gender,
        description: description,
      }

      window.XMLHttpRequest = tempWindowXMLHttpRequest;

      if (selectedCategory === "Bull") {
        this.createBull(animal)
      } else if (selectedCategory === "Saand") {
        this.createSaand(animal)
      } else if (selectedCategory === "Camel") {
        this.createCamel(animal)
      } else if (selectedCategory === "Bakra") {
        this.createBakra(animal)
      } else if (selectedCategory === "Sheep") {
        this.createSheep(animal)
      } else if (selectedCategory === "Dumba") {
        this.createDumba(animal)
      }
    } else {
      alert('Some mandatory field(s) are missing!')
    }
  }

  createBull = (animal) => {
    addBull(animal)
      .then(() => {
        alert("Animal Added Successfully!")
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log("###### err", err)
        alert("Error Adding Animal!")
        this.setState({ loading: false });
      })
  }

  createSaand = (animal) => {
    addSaand(animal)
      .then(() => {
        alert("Animal Added Successfully!")
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log("###### err", err)
        alert("Error Adding Animal!")
        this.setState({ loading: false });
      })
  }

  createCamel = (animal) => {
    addCamel(animal)
      .then(() => {
        alert("Animal Added Successfully!")
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log("###### err", err)
        alert("Error Adding Animal!")
        this.setState({ loading: false });
      })
  }

  createBakra = (animal) => {
    addBakra(animal)
      .then(() => {
        alert("Animal Added Successfully!")
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log("###### err", err)
        alert("Error Adding Animal!")
        this.setState({ loading: false });
      })
  }

  createSheep = (animal) => {
    addSheep(animal)
      .then(() => {
        alert("Animal Added Successfully!")
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log("###### err", err)
        alert("Error Adding Animal!")
        this.setState({ loading: false });
      })
  }

  createDumba = (animal) => {
    addDumba(animal)
      .then(() => {
        alert("Animal Added Successfully!")
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log("###### err", err)
        alert("Error Adding Animal!")
        this.setState({ loading: false });
      })
  }

  imagePickerAlertHandler = (itemValue, itemIndex) => {
    this.toggleOverlay();
    if (itemValue === 'gallery') {
      if (this.state.isPicture) {
        ImageCropPicker.openPicker({
          multiple: true,
          includeBase64: true,
          cropping: true,
        }).then(images => {
          console.log("##############", images)
          let arr = [...this.state.images]
          let filesArray = [...this.state.imageFilesArray]
          for (let i = 0; i < images.length; i++) {
            arr.push({ uri: 'data:image/jpeg;base64,' + images[i].data })//image[i].data=>base64 string
            filesArray.push(images[i].path)
          }
          this.setState({ images: [...arr], imageFilesArray: [...filesArray] })
        });
      } else {
        ImageCropPicker.openPicker({
          mediaType: "video",
        }).then((video) => {
          console.log(video);
        });
      }
    } else if (itemValue === 'camera') {
      if (this.state.isPicture) {
        ImageCropPicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          // includeBase64: true,
        }).then(image => {
          console.log(image);
        });
      } else {
        ImageCropPicker.openCamera({
          mediaType: 'video',
        }).then(image => {
          console.log(image);
        });
      }
    }
  }

  selectMediaCategory = value => {
    this.setState({ isPicture: value });
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems }, () => {
      let arr = [];
      this.state.selectedItems.map((item) => {
        arr.push(this.state.data[item - 1].name);
      })
      this.setState({ selectedCities: [...arr] })
    })
  }

  render() {
    const { selectedCity, selectedCategory } = this.props;
    const navigate = this.props.navigation.navigate;
    const { data, isPicture, gender, visible, selectedItems } = this.state;

    console.log("###### STATE", this.state)
    return (
      <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <Overlay height={200} isVisible={visible} onBackdropPress={() => this.toggleOverlay()}>
          <View style={[commonStyles.align_center, { justifyContent: 'center', flex: 1 }]}>
            <TouchableOpacity style={[commonStyles.buttonModalBordered]} onPress={() => this.imagePickerAlertHandler('camera')}>
              <Text style={commonStyles.h4}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[commonStyles.buttonModalBordered]} onPress={() => this.imagePickerAlertHandler('gallery')}>
              <Text style={commonStyles.h4}>Select from Gallery</Text>
            </TouchableOpacity>
          </View>
        </Overlay>

        <TouchableOpacity
          onPress={() => {
            this.toggleOverlay()
          }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.appColor1, borderRadius: 7, minHeight: 175 }}>
          <Icon
            name="camera"
            type="material-community"
            color={Colors.appColor1}
            size={totalSize(5)}
          // iconStyle={{marginRight: width(10)}}
          />
          <Text style={commonStyles.h4}>Upload {!!isPicture ? "Picture" : "Video"}</Text>
        </TouchableOpacity>

        {
          !!this.state.avatarSource && (
            <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
          )
        }

        <View style={styles.userButtonsContainer}>
          <TouchableOpacity
            onPress={() => this.selectMediaCategory(true)}
            style={[
              isPicture
                ? [commonStyles.buttonPinkBordered, { backgroundColor: colors.appColor1 }]
                : [commonStyles.buttonPinkBordered],
              styles.userSelectionButton,
            ]}>
            <Text style={[styles.userSelectionButtonText, isPicture && { color: 'white' }]}>
              Picture
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.selectMediaCategory(false)}
            style={[
              !isPicture
                ? [commonStyles.buttonPinkBordered, { backgroundColor: colors.appColor1 }]
                : [commonStyles.buttonPinkBordered],
              styles.userSelectionButton,
            ]}>
            <Text style={[styles.userSelectionButtonText, !isPicture && { color: 'white' }]}>
              Video
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
        >
          {
            !!this.state.images && this.state.images.length >= 1 && this.state.images.map((image, index) => {
              return (
                <Image key={index} source={image} style={styles.uploadAvatar} />
              )
            })
          }
        </ScrollView>

        <Text style={commonStyles.h3}>Select Category</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            this.state.categories.map((category, index) => {
              return (
                <View
                  // onPress={() => navigate('SearchResultsScreen')}
                  key={"category-" + index} style={{ width: '50%', padding: 5 }}>
                  <CategoryCard
                    title={category.label}
                    image={category.image}
                    selected={category.selected}
                    parent="upload"
                    index={index}
                    {...this.props}
                    onSelect={this.onSelectCategory}
                    selected={this.state.selectedCategory === category.label}
                  />
                </View>
              )
            })
          }
        </View>

        <View style={{ flex: 1 }}>
        <MultiSelect
          // hideTags
          hideSubmitButton={true}
          iconSearch={true}
          items={data}
          uniqueKey="id"
          ref={this.picker}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Select City(s)"
          searchInputPlaceholderText="Search Cities..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor={colors.appColor1}
          tagBorderColor={colors.appColor1}
          tagTextColor={colors.appColor1}
          selectedItemTextColor={colors.appColor1}
          selectedItemIconColor={colors.appColor1}
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor={colors.appColor1}
          submitButtonText="Submit"
        />
      </View>

        {/* <Input
          placeholder="City *"
          style={{ borderBottomColor: Colors.steel, borderBottomWidth: 1 }}
          onChangeText={location => this.setState({ location })}
        /> */}

        <Input
          placeholder="Price *"
          style={{ borderBottomColor: Colors.steel, borderBottomWidth: 1 }}
          onChangeText={price => this.setState({ price })}
          keyboardType="numeric"
        />

        <Input
          placeholder="Contact Number *"
          style={{ borderBottomColor: Colors.steel, borderBottomWidth: 1 }}
          onChangeText={contact => this.setState({ contact })}
          keyboardType="numeric"
        />

        <Input
          placeholder="Weight *"
          style={{ borderBottomColor: Colors.steel, borderBottomWidth: 1 }}
          onChangeText={weight => this.setState({ weight })}
          keyboardType="numeric"
        />

        <View style={{ height: 50, width: '100%', borderBottomColor: Colors.steel, borderBottomWidth: 1 }}>
          <Picker
            selectedValue={gender}
            style={[{ height: '100%', width: '100%', fontSize: 10, marginLeft: -2 }, !!gender ? { color: 'black' } : { color: colors.steel }]}
            mode={"dropdown"}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ gender: itemValue })
            }>
            <Picker.Item label="Gender*" value="java" />
            <Picker.Item label="Male" value="java" />
            <Picker.Item label="Female" value="js" />
          </Picker>
        </View>

        <Input
          placeholder="Description"
          style={{ borderBottomColor: Colors.steel, borderBottomWidth: 1 }}
          onChangeText={description => this.setState({ description })}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            disabled={this.state.loading}
            style={[commonStyles.buttonColored, this.state.loading ? commonStyles.disabled : {}]}
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
  userButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
    marginVertical: height(3),
  },
  userSelectionButton: {
    width: width(30),
  },
  userSelectionButtonText: {
    fontSize: totalSize(2),
  },
  center: {
    alignItems: 'center',
  },
});
